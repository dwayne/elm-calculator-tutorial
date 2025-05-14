#!/usr/bin/env bash

#
# Usage: . init.sh
#

build="${build:?}"


# FUNCTIONS


deploy-production () {
  deploy "$@" "$build" release/production
}

export -f deploy-production


# ALIASES


alias b='mdbook build'
alias s='mdbook serve'
alias d=deploy-production
