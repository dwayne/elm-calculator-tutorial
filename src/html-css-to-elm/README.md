# Translating

This is the phase where I go from prototype to Elm views.

## From Prototype to Elm Views

At this point in the process I am usually highly confident in the reliability of my user interface. I built and manually tested the user interface independent of any JavaScript framework, independent of any application logic, and closely following web development best practices and standards as far as I understand it.

I now begin introducing Elm into the process and I continue to keep my focus on the user interface.

The goal of this part of the process is to use `elm/html` to abstract over the HTML/CSS that I created during the prototyping phase so that I can compose the components, i.e. view functions, in any way I chose.

The general approach that has been working for me is to map each block to a module that implements the view for that component. For e.g. the `.key` block would be mapped to the `View.Key` module which exports a `view` function. The `view` function abstracts over the HTML of the `.key` block. Any modifiers on the blocks and elements become options to the `view` function that help decide which HTML elements and attributes are used.

My view functions typically take one of three forms:

- `view : Html msg`
- `view : ViewOptions -> Html msg`
- `view : ViewOptions msg -> Html msg`
