# Introduction

In this tutorial, I'll share with you how I built [freeCodeCamp](https://www.freecodecamp.com/)'s [Build a JavaScript Calculator](https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-javascript-calculator) frontend project with [Elm](https://elm-lang.org/).

Here's the [live demo](https://dwayne.github.io/elm-calculator/) of the Elm web application for you to explore how it works. And, here's the reference to its [source code](https://github.com/dwayne/elm-calculator/tree/1.0.0).

My primary goal is to share my experience, perspective and processes so that you are exposed to an alternative approach to web application development with Elm. I am not aware of any resources that explain how to develop web applications with Elm that are similar to mine. That's why I thought it might be valuable to share this with the Elm community. I am not trying to teach you Elm, nor am I trying to teach you web application development. All I'm trying to do is to have you take a look over my shoulder as I explain to you how I built the application so that you can be exposed to ideas that could be helpful to you in your own Elm projects.

## Audience

Any web developer interested in using Elm to build maintainable, testable, and reliable web applications.

## Prerequisites

- A basic knowledge of [HTML](https://web.dev/learn/html), [CSS](https://web.dev/learn/css), and [JavaScript](https://web.dev/learn/javascript).
- A basic knowledge of web application development. For e.g. if you've had exposure to [React](https://react.dev/), [Vue.js](https://vuejs.org/), [Angular](https://angular.dev/), [Ember.js](https://emberjs.com/) or something else, it would be helpful.
- And, a basic knowledge of Elm as provided by the [official Elm guide](https://guide.elm-lang.org/).

## Exposure

As I've stated before, I'm not intentionally trying to teach you anything in particular. That's why there are no learning outcomes. However, I am delibrately trying to expose you to ideas. As many ideas as it takes to develop the application in an honest and realistic way. So, after completing this tutorial I hope you will have been exposed to:

- A process for building any Elm web application starting from a given design.
- A bottom-up approach for building reliable UIs with HTML/CSS that's easy to maintain and extend.
  - This approach which I independently discovered and adopted, I recently learned, is similar in spirit to [Component Driven Development](https://www.componentdriven.org/) and [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/).
- A way to prototype with HTML/CSS.
  - I also recently learned that what I have is a poor man's version of [Storybook](https://storybook.js.org/). And, the general idea is related to [Brad Frost](https://bradfrost.com/)'s [frontend workshop environment](https://bradfrost.com/blog/post/a-frontend-workshop-environment/) idea.
- A way to structure your HTML/CSS with [BEM](https://getbem.com/).
- A way to design an API for your Elm views.
- A way to separate your UI and application logic.
- Unit testing.

Other interesting things you'd be exposed to because I'm working on a calculator, include:

- Building a module for [rational number](https://en.wikipedia.org/wiki/Rational_number) arithmetic.
- Displaying rational numbers using decimal notation for both terminating and [repeating decimals](https://en.wikipedia.org/wiki/Repeating_decimal).
- Building a module for a [Stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) data structure.
- Evaluating infix expressions using [Dijkstra's shunting yard algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm).
- Tokenizing user input using a [finite-state machine](https://en.wikipedia.org/wiki/Finite-state_machine).

## The 10,000 Foot View

- [Design](#design)
- [Prototype](#prototype)
- [HTML/CSS to Elm](#htmlcss-to-elm)
- [Application Logic](#application-logic)
- [Web Application = UI + Application Logic](#web-application--ui--application-logic)

### Design

My process starts with knowing what I want to build and how I want it to look. Design is important but it has a separate process that is outside the scope of this tutorial. The design for the calculator was ~~inspired by~~ lifted from this [CodePen example](https://codepen.io/freeCodeCamp/full/wgGVVX). Thanks [Peter Weinberg](https://www.freecodecamp.org/no-stack-dub-sack).

### Prototype

The next step in my process is realizing the design using HTML, CSS, and possibly JavaScript. I call this my prototyping phase. Three key concepts support this phase:

1. HTML is for structure and semantics (meaning).
2. CSS is for styling and layout.
3. JavaScript is for controlling dynamic behaviour and managing application logic.

In practice, by keeping these concepts in mind, it helps me to have a clear separation between the user interface (UI) and the application logic. The UI consists of HTML, CSS, and some JavaScript for controlling dynamic behaviour. The application logic consists entriely of JavaScript.

The main goal I try to achieve in this phase is to solve most if not all the UI related problems that the design surfaces. This phase is the phase to figure out HTML semantics, CSS selector names, accessibility, layout, etc.

### HTML/CSS to Elm

At this point in the process most if not all of my UI related problems have been solved and it's time to translate the HTML portion into [`elm/html`](https://package.elm-lang.org/packages/elm/html/latest/). This is typically straightforward to do but there is a little bit of view function API design that tends to occur. However, this is definitely the easiest part of the entire process.

### Application Logic

The brains of the application is managed by JavaScript and hence, in our case as Elm developers, by Elm. In this part of the process I build a logical model for the application domain. Elm really shines during this part of the process because functional programming using modules, opaque types, union types, pattern matching, immutable data types, and pure functions supports a delightful approach to [data modeling](https://thoughtbot.com/blog/data-modeling-resources-in-elm).

I don't practice [test-driven development](https://cleancoders.com/episode/clean-code-episode-6-p1) but I do test and unit testing the tricky parts of my application logic helps me to find and fix bugs.

### Web Application = UI + Application Logic

Finally, I connect the UI with the application logic. The UI provides the means by which input gets passed to the API that models the application domain.
