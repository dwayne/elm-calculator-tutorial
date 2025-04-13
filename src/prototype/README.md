# Prototyping

This is the phase where I go from design to prototype.

## From Design to Prototype

I take the given design and I reimagine it as an [exploded-view drawing](https://en.wikipedia.org/wiki/Exploded-view_drawing) that I then use to deconstruct it into its components. I build a [dependency graph](https://en.wikipedia.org/wiki/Dependency_graph) of all the components such that there is a directed edge from component `A` to component `B` whenever `A` depends on `B`. A [topological sort](https://en.wikipedia.org/wiki/Topological_sorting) of this dependency graph helps me figure out in what order to start working on the components. At this point, I have a choice to take either a bottom-up or top-down approach, and I usually choose the bottom-up approach. For each component, I determine:

1. How I'm going to give it meaning and structure with HTML.
2. How I'm going to refer to its elements using CSS classes.
3. How I'm going to present it, as specified in the design, with CSS rules.

## Specifics

I use:

- [BEM](https://getbem.com/)'s [naming convention](https://getbem.com/naming/) for my CSS classes.
- [Dart Sass](https://sass-lang.com/dart-sass/) to generate my CSS and I take full advantage of its support for modules via the [`@use`](https://sass-lang.com/documentation/at-rules/use/) rule.
