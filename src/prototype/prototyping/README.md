# Prototyping

This is the part of my process where I figure out how to realize the design of the web application using primarily HTML/CSS. Sometimes a sprinkling of JavaScript is helpful to explore how the prototype holds up when I interact with it but Elm is never needed at this point.

The technologies I used for prototyping this project included HTML, Dart Sass, Caddy (for serving the prototype), and a browser. I used the BEM naming convention to organize my HTML/CSS.

## Prototype Structure

I placed the HTML in the `prototype` directory and the Sass in the `sass` directory.

There is a `build-prototype` script that builds the prototype and places it in the `.build/prototype` directory. Building the prototype involves creating the build directory, copying fonts and HTML files, and compiling the Sass to CSS.

To serve the prototype I use the `serve-prototype` function.
