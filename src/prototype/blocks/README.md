# Blocks

Based on the approach I described in "[From Design to Prototype](../index.html#from-design-to-prototype)", the components I came up with and their bottom-up ordering are as follows:

1. **Key** - `AC`, `=`, `.`, `+`, `-`, `×`, `÷`, and the digits `0` to `9`.
2. **Pad** - The key pad that houses the keys.
3. **Display** - A two line display. One line to show the user's input and another line to show the result of evaluating that input.
4. **Calculator** - Holds the display and pad.
5. **Attribution** - A note about the developer of the application.
6. **Page** - A container to layout the calculator and attribution.

These components became the blocks of my UI, in accordance with BEM. I worked on each block, one at a time, in bottom-up order until all the blocks were implemented.
