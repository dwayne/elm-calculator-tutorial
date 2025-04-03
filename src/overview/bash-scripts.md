# Bash Scripts

I use a few Bash scripts, functions, and aliases to help me manage the project.

## Bash Scripts

You can find these scripts in the `bin` directory.

- `build-sass`
  - Build a CSS file from a collection of Sass files using the Dart Sass compiler.
- `build-prototype`
  - Build the prototype and put the build output in `.build/prototype`.
- `build-elm`
  - Build the Elm web application with or without various levels of optimizations.
- `build`
  - Build the entire project, i.e. build everything needed to make the web application work.
- `serve`
  - Serve a given directory using Caddy's static file server.
- `check`
  - Run a variety of sanity checks to keep the project in tip-top shape.
- `deploy`
  - Commit the contents of a given directory to a given branch and push those changes to the remote repository for GitHub Pages to pick up.

## Functions

You can find these functions in the initialization script, i.e. `init.sh`. Some of these functions make use of particular instantiations of the Bash scripts.

- `format`
  - Run `elm-format` on all the Elm files.
- `build-development`
  - Build a development version of the entire project and put the build output in `.build/development`.
- `build-production`
  - Build a production version of the entrie project and the build output in `.build/production`.
- `serve-prototype`
  - Serve the `.build/prototype` directory.
- `serve-development`
  - Serve the `.build/development` directory.
- `serve-production`
  - Serve the `.build/production` directory.
- `test-elm`
  - Run `elm-test` with specific options.
- `test-elm-main`
  - Check Elm files for compilation errors.
- `review`
  - Run `elm-review` with specific options.
- `check-scripts`
  - Run `shellcheck` with specific options.
- `deploy-production`
  - Commit the contents of the `.build/production` directory to the `release/production` branch and push those changes to `git@github.com:dwayne/elm-calculator.git` for GitHub Pages to pick up.
- `clean`
  - Remove cruft, i.e. directories and files that get generated while working on the project.

## Aliases

You can find these aliases at the end of initialization script.

```bash
alias c=check
alias f=format
alias t=test-elm
alias r=review
alias b=build-development
alias bp=build-prototype
alias s=serve-development
alias sp=serve-prototype
```

## Usage

To reference any Bash script, function, or alias you can do so by name once you've entered the development shell with `devbox shell`.

For e.g.

```bash
$ devbox shell
> build-sass -z sass/index.scss .build/index.css
> format
> c
```
