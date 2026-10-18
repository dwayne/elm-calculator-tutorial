{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    mdBook.url = "github:dwayne/nix-mdBook";
    deploy = {
      url = "github:dwayne/deploy";
      inputs.nixpkgs.follows = "nixpkgs";
      inputs.flake-utils.follows = "flake-utils";
    };
  };

  outputs = { self, nixpkgs, flake-utils, mdBook, deploy }:
    flake-utils.lib.eachDefaultSystem(system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        mdBookLib = mdBook.lib.init pkgs (deploy.packages.${system}.default);
        project = mdBookLib.mkProject {
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
