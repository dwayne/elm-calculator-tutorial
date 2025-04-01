# Tooling

Here's a selection of most of the tools I used to help me build the web application:

- [Devbox](https://www.jetify.com/devbox)
- [Caddy](https://caddyserver.com/)
- [Dart Sass](https://sass-lang.com/dart-sass/)
- [Elm](https://elm-lang.org/)
  - [avh4/elm-format](https://github.com/avh4/elm-format)
  - [mdgriffith/elm-optimize-level-2](https://github.com/mdgriffith/elm-optimize-level-2)
  - [jfmengels/elm-review](https://github.com/jfmengels/elm-review)
  - [elm-explorations/test](https://github.com/elm-explorations/test)
- [rsync](https://rsync.samba.org/)
- [ShellCheck](https://www.shellcheck.net/)
- [Terser](https://terser.org/)

## Devbox

I love [Nix](https://nixos.org/), but when I only need a reproducible development environment, I've started reaching for Devbox. I use it to manage my system dependencies within a given project as well as to provide a consistent environment for working with Bash scripts.

- [Nix for Everyone: Unleash Devbox for Simplified Development](https://www.youtube.com/watch?v=WiFLtcBvGMU)
- [How I use Devbox in my Elm projects](https://dev.to/dwayne/how-i-use-devbox-in-my-elm-projects-2hbg)

## Dart Sass

One of the reasons I use Dart Sass is because of its support for modules via the [`@use`](https://sass-lang.com/documentation/at-rules/use/) rule.

## rsync

A very old but useful tool which I use in my deployment script. I use it to sync the production build with the deployment branch such that the deployment branch contains exactly what's in the production build, i.e. no stray files remain in the deployment branch.

## ShellCheck

Since I do a lot of Bash scripting I use ShellCheck to find any bugs in my shell scripts.

## Terser

A modern alternative to UglifyJS that I use for minifying the JavaScript produced by the Elm compiler. The Elm Guide uses UglifyJS in its [Minification](https://guide.elm-lang.org/optimization/asset_size) section but Terser is a drop-in replacement that is supposed to have better performance.
