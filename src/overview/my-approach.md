# My Approach

Two things that have stuck with me regardless of the JavaScript framework I use is:

1. HTML is for structure.
2. CSS is for presentation.

HTML defines the meaning and structure of web content. ([HTML: HyperText Markup Language](https://developer.mozilla.org/en-US/docs/Web/HTML))

CSS is used to describe the presentation of an HTML document. ([CSS: Cascading Style Sheets](https://developer.mozilla.org/en-US/docs/Web/CSS))

The [CSS Zen Garden](https://csszengarden.com/) illustrates this quite beautifully.

HTML, CSS, and Elm are distinct technologies that also require the use of different mental models in order to use them effectively. As a result, for the most part, I prefer to work with them separately.

What does that mean in practice?

It means that at the start of a project I will separate all my UI work (the dominion of HTML/CSS) from my application logic work (the dominion of Elm). Within my UI work I further separate structure from presentation. I take the given design and I reimagine it as an [exploded-view drawing](https://en.wikipedia.org/wiki/Exploded-view_drawing) that I then use to deconstruct it into its components. I build a [dependency graph](https://en.wikipedia.org/wiki/Dependency_graph) of all the components such that there is a directed edge from component `A` to component `B` whenever `A` depends on `B`. A [topological sort](https://en.wikipedia.org/wiki/Topological_sorting) of this dependency graph helps me figure out in what order to start working on the components. At this point, I have a choice to take either a bottom-up or top-down approach, and I usually choose the bottom-up approach. For each component, I determine:

1. How I'm going to give it meaning and structure with HTML.
2. How I'm going to refer to its elements using CSS classes.
3. How I'm going to present it, as specified in the design, with CSS rules.

## UI

The design for this application was ~~inspired by~~ taken from this [CodePen example](https://codepen.io/freeCodeCamp/full/wgGVVX). Thanks [Peter Weinberg](https://www.freecodecamp.org/no-stack-dub-sack). However, all the HTML/CSS used to realize the design is my own.

Using the approach I detailed above, the components I came up with and their bottom-up ordering are as follows:

1. Key - `AC`, `=`, `.`, `+`, `-`, `×`, `÷`, and the digits `0` to `9`.
2. Pad - The key pad that houses the keys.
3. Display - A two line display. One line to show the user's input and another line to show the result of evaluating that input.
4. Calculator - Holds the display and pad.
5. Attribution - A note about the creator of the calculator.
6. Page - A container to layout the calculator and attribution.

## Application Logic

Independent of any UI, the application logic models the inner workings of the calculator. The ultimate goal of the UI is to provide a user friendly way to get input from the user to the application logic. So a key part in figuring out how to decouple the UI from the application logic is in figuring out the communication that needs to happen between the UI and the application logic.

For the case of this calculator, it's quite simple. The user enters an arithmetic expression which we pass on to the application logic to perform its magic. How it actually structures this input and performs its magic is not so simple, but super interesting, and will require some thought to get it right.

## Additional Commentary

When you actually see this approach in action you begin to realize the small role that Elm plays in building a bulletproof UI. Your ability to think in HTML/CSS and to structure your HTML/CSS cleanly plays a much larger role in the maintainability of your UI. That said, once you figure out the HTML/CSS part of the UI, Elm is extremely helpful in solidifying the API you use to compose the components of said UI. You'll see exactly what I mean in the HTML/CSS to Elm section of this tutorial.

Elm really shines when it comes to application logic because functional programming using modules, opaque types, union types, pattern matching, immutable data types, and pure functions supports a rich flavour of domain modeling that makes it easier to reason about your code.

I think the above observation leads to a good argument as to why React, Vue.js, and many other JavaScript frameworks are still more popular than Elm. If your web application is UI heavy and doesn't need complicated application logic then there's very little benefit to be gained by using Elm. Why learn an entirely new programming paradigm for such little gains? However, if your application logic is complicated or can get complicated over time then Elm has a lot of benefits to offer of which few are aware. I hope this tutorial can open your eyes to these benefits.
