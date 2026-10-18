{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-deploy.url = "github:dwayne/deploy";
    flake-mdBook.url = "github:dwayne/nix-mdBook";
  };

  outputs = { self, nixpkgs, flake-deploy, flake-mdBook }:
    let
      lib = nixpkgs.lib;
      supportedSystems = [ "x86_64-linux" "aarch64-linux" "aarch64-darwin" ];
      eachSupportedSystem = f:
        lib.foldAttrs
          lib.mergeAttrs
          {}
          (map
            (s: lib.mapAttrs (_: v: { ${s} = v; }) (f s))
            supportedSystems
          );
    in
    eachSupportedSystem(system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        deploy = flake-deploy.lib.mkDeploy pkgs;
        mdBook = flake-mdBook.lib.mkMdBook pkgs deploy;

        project = mdBook.mkProject {
          name = "elm-calculator-tutorial";
          root = ./.;
          paths = [
            ./src
            ./theme
            ./book.toml
          ];
          branch = "release/production";
        };
      in
      {
        devShells.default = pkgs.mkShell {
          name = "elm-calculator-tutorial";
          inputsFrom = [ project.devShell ];
        };
        packages.default = project.book;
        apps.deploy = project.app;
        checks = { inherit (project) book deployBook; };
      }
    );
}
