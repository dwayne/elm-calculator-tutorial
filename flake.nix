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

        name = "elm-calculator-tutorial";

        book = mdBook.lib.mkBook pkgs {
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

        deployBook = mdBook.lib.mkDeployBook pkgs {
          inherit book;
          branch = "refactor-2026-release";
          deploy = deploy.packages.${system}.default;
        };
      in
      {
        devShells.default = mdBook.lib.mkShell pkgs { inherit name; };
        packages = { inherit book; };

        apps.deploy = {
          type = "app";
          program = "${deployBook}";
          meta.description = "Deploy the book";
        };
      }
    );
}
