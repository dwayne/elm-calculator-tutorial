# Project Structure

A high-level overview of how I structured the project.

## Directory Layout

**N.B.** _Not all directories and files are shown below._

```txt
+ .build
+ bin
+ prototype
+ public
+ review
+ sass
- src
  + Data
  + Lib
  + View
  Main.elm
+ tests
devbox.json
init.sh
```

| Directory    | Comment |
|--------------|---------|
| .build       | An ephemeral directory to store various build artifacts. |
| bin          | Helpful Bash scripts for managing the project. |
| prototype    | The HTML files for the prototype. |
| public       | Static files that are part of the web application. |
| review       | `elm-review` configuration. |
| sass         | The Sass files for building the CSS file that's used by both the prototype and web application. |
| src          | Elm modules. |
| src/Data     | Elm modules that implement the application logic. |
| src/Lib      | Reusable Elm modules. It's possible to use them within other projects with zero to minimal modifications. |
| src/View     | Elm modules that implement the UI. |
| src/Main.elm | The entry module that loads the web application. |
| tests        | Elm unit tests. |
| devbox.json  | Devbox JSON configuration. |
| init.sh      | An initialization script for the development environment that contains helpful Bash functions and aliases. |

## `devbox.json`

```json
{
~  "packages": {
~    "caddy": {
~      "version": "latest",
~      "disable_plugin": true
~    },
~    "dart-sass": "latest",
~    "elmPackages.elm": "latest",
~    "elmPackages.elm-format": "latest",
~    "elmPackages.elm-optimize-level-2": "latest",
~    "elmPackages.elm-review": "latest",
~    "elmPackages.elm-test": "latest",
~    "rsync": "latest",
~    "shellcheck": "latest",
~    "terser": "latest"
~  },
  "env": {
    "PATH": "$DEVBOX_PROJECT_ROOT/bin:$PATH",
    "build": "$DEVBOX_PROJECT_ROOT/.build",
~    "project": "$DEVBOX_PROJECT_ROOT"
  },
  "shell": {
    "init_hook": [
      ". $project/init.sh"
    ]
  }
}
```

Notable things it does includes:

1. Putting the `bin` directory on the `PATH` so that when I enter my development shell, `devbox shell`, I can run my scripts by name.
2. Exporting the location of the `.build` directory via the `build` environment variable which I use in my build scripts.
3. Sourcing the initialization script.
