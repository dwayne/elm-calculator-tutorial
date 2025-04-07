# Introduction

In this tutorial, I'll share with you how I built [freeCodeCamp](https://www.freecodecamp.com/)'s [Build a JavaScript Calculator](https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-javascript-calculator) frontend project with [Elm](https://elm-lang.org/).

Here's a [live demo](https://dwayne.github.io/elm-calculator/) of the Elm web application for you to explore how it works. And, here's a reference to the full [source code](https://github.com/dwayne/elm-calculator).

My primary goal is to share a process that has worked for me when building my Elm web applications in the hopes that it can work for you as well. This is only one way to go about it but I think it's a useful and undervalued approach that I haven't seen described elsewhere in the Elm community.

## Audience

Any web developer interested in using Elm to build reliable web applications.

## Prerequisites

- A basic knowledge of [HTML](https://web.dev/learn/html), [CSS](https://web.dev/learn/css), and [JavaScript](https://web.dev/learn/javascript).
- And, a basic knowledge of Elm as provided by the [official Elm guide](https://guide.elm-lang.org/).

## Exposure

After completing this tutorial you will have been exposed to:

- A process for building any Elm web application starting from a given design.
- A bottom-up approach for building reliable UIs with HTML/CSS that's easy to maintain and extend.
- A way to prototype with HTML/CSS.
- A way to structure your HTML/CSS with [BEM](https://getbem.com/).
- A way to design an API for your Elm views.
- A way to test your Elm views in a sandboxed environment.
- A way to separate your UI and application logic.

Other interesting things I'd cover, because I'm working on a calculator, include:

- Building a module for [rational number](https://en.wikipedia.org/wiki/Rational_number) arithmetic.
- Displaying rational numbers using decimal notation for both terminating and [repeating decimals](https://en.wikipedia.org/wiki/Repeating_decimal).
- Building a module for a [Stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) data structure.
- Evaluating infix expressions using [Dijkstra's shunting yard algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm).
- Parsing user input using a [finite-state machine](https://en.wikipedia.org/wiki/Finite-state_machine).
- Writing unit tests.

## The 10,000 Foot View

WIP

- Design
- Prototype
- Translate to Elm Views
  - Sandbox
- Application Logic
  - Domain Modeling
  - Testing
- UI + Application Logic

Let's get started!
