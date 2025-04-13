# calculator

The **calculator** consists of the [display](./display.md) and [pad](./pad.md) arranged in a column.

- [HTML](#html)
- [Sass](#sass)
- [Demo](#demo)
- [Source Code](#source-code)

## HTML

```html
<div class="calculator">
  <div class="calculator__display">
    <!-- The display goes here. -->
  </div>
  <div class="calculator__pad">
    <!-- The pad goes here. -->
  </div>
</div>
```

## Sass

```scss
@use "../colors";
@use "./pad";

.calculator {
  display: inline-flex;
  flex-direction: column;

  border: 2px solid colors.$cornFlowerBlue;
  padding: 3px;

  background-color: colors.$black;
}

.calculator__display {
  width: pad.$pad-width;
}
```

### Who Controls the Width?

The width of the display is constrained to be equal to the width of the pad, `pad.$pad-width`, by setting the width of the `.calculator__display` element and not by setting the width of the `.display` block directly. This is because the `.display` block is designed to take on the width of its container. As such, it is up to the container to set the width.

### The `.calculator__pad` Element

I don't explicitly style the `.calculator__pad` element. However, it does serve two purposes:

1. The `.calculator` block uses `display: inline-flex` which means the `.calculator__pad` element becomes a flex item. This is a good thing because it protects the `.pad` block from becoming a flex item itself which could mess with its dimensions.
2. Naming the wrapping `div`, i.e. `.calculator__pad`, allows me to refer to it by name. So it's good for communication.

## Demo

<iframe src="./demo/calculator.html" style="width: 100%; height: 1540px; border: 2px solid #333;"></iframe>

## Source Code

- [prototype/calculator.html](https://github.com/dwayne/elm-calculator/blob/1.0.0/prototype/calculator.html)
- [sass/_colors.scss](https://github.com/dwayne/elm-calculator/blob/1.0.0/sass/_colors.scss)
- [sass/blocks/_pad.scss](https://github.com/dwayne/elm-calculator/blob/1.0.0/sass/blocks/_pad.scss)
- [sass/blocks/_calculator.scss](https://github.com/dwayne/elm-calculator/blob/1.0.0/sass/blocks/_calculator.scss)
