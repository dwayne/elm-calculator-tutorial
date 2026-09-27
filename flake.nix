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
        name = "elm-calculator-tutorial";
        pkgs = nixpkgs.legacyPackages.${system};

        mkBook = { name, src }:
          pkgs.runCommand "${name}-book" { nativeBuildInputs = [ pkgs.mdbook ]; } ''
            mdbook build --dest-dir "$out" ${src}
          '';

        mkDeployBook = { book, branch }:
          pkgs.writeShellScript "deploy-${book.name}" ''
            ${deploy.packages.${system}.default}/bin/deploy "$@" ${book} ${branch}
          '';

        book = mkBook {
          inherit name;
          src = pkgs.lib.fileset.toSource {
            root = ./.;

            fileset = pkgs.lib.fileset.unions [
              ./src
              ./theme
              ./book.toml
            ];
          };
        };

        deployBook = mkDeployBook { inherit book; branch = "refactor-2026-release"; };
      in
      {
        devShells.default = mdBook.lib.mkShell pkgs { inherit name; };
        packages = { inherit book; };

        apps = {
          deployBook = {
            type = "app";
            program = "${deployBook}";
            meta.description = "Deploy the book";
          };
        };
      }
    );
}
