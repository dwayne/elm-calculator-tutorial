# pad

The **pad** or keypad consists of the set of [key](./key.md)s arranged in a grid.

- [HTML](#html)
- [Sass](#sass)
- [Demo](#demo)
- [Source Code](#source-code)

## HTML

```html
<div class="pad">
  <div class="pad__slot r0 c0 colspan2">
    <button class="key key--primary" type="button">AC</button>
  </div>
  <div class="pad__slot r0 c2">
    <button class="key" type="button">÷</button>
  </div>
  <div class="pad__slot r0 c3">
    <button class="key" type="button">×</button>
  </div>

  <div class="pad__slot r1 c0">
    <button class="key" type="button">7</button>
  </div>
  <div class="pad__slot r1 c1">
    <button class="key" type="button">8</button>
  </div>
  <div class="pad__slot r1 c2">
    <button class="key" type="button">9</button>
  </div>
  <div class="pad__slot r1 c3">
    <button class="key" type="button">-</button>
  </div>

  <div class="pad__slot r2 c0">
    <button class="key" type="button">4</button>
  </div>
  <div class="pad__slot r2 c1">
    <button class="key" type="button">5</button>
  </div>
  <div class="pad__slot r2 c2">
    <button class="key" type="button">6</button>
  </div>
  <div class="pad__slot r2 c3">
    <button class="key" type="button">+</button>
  </div>

  <div class="pad__slot r3 c0">
    <button class="key" type="button">1</button>
  </div>
  <div class="pad__slot r3 c1">
    <button class="key" type="button">2</button>
  </div>
  <div class="pad__slot r3 c2">
    <button class="key" type="button">3</button>
  </div>
  <div class="pad__slot r3 c3 rowspan2">
    <button class="key key--secondary" type="button">=</button>
  </div>

  <div class="pad__slot r4 c0 colspan2">
    <button class="key" type="button">0</button>
  </div>
  <div class="pad__slot r4 c2">
    <button class="key" type="button">.</button>
  </div>
</div>
```

The pad contains slots for the keys. I made the deliberate choice to style the position and size of each slot using [immutable CSS](https://csswizardry.com/2015/03/immutable-css/) scoped to the slots. This was surely a break from the BEM naming convention but it seemed like a good compromise in this case.

## Sass

```scss
@use "../colors";

$pad-slot-width: 80px !default;
$pad-slot-height: 65px !default;
$pad-slot-spacing-around: 1px !default;

$pad-width: 4 * $pad-slot-width + 5 * $pad-slot-spacing-around;
$pad-height: 5 * $pad-slot-height + 6 * $pad-slot-spacing-around;

.pad {
  position: relative;

  width: $pad-width;
  height: $pad-height;

  background-color: colors.$black;
}

.pad__slot {
  position: absolute;

  width: $pad-slot-width;
  height: $pad-slot-height;
}

.pad__slot.r0 {
  top: $pad-slot-spacing-around;
}

.pad__slot.r1 {
  top: $pad-slot-height + 2 * $pad-slot-spacing-around;
}

.pad__slot.r2 {
  top: 2 * $pad-slot-height + 3 * $pad-slot-spacing-around
}

.pad__slot.r3 {
  top: 3 * $pad-slot-height + 4 * $pad-slot-spacing-around
}

.pad__slot.r4 {
  top: 4 * $pad-slot-height + 5 * $pad-slot-spacing-around
}

.pad__slot.c0 {
  left: $pad-slot-spacing-around;
}

.pad__slot.c1 {
  left: $pad-slot-width + 2 * $pad-slot-spacing-around
}

.pad__slot.c2 {
  left: 2 * $pad-slot-width + 3 * $pad-slot-spacing-around
}

.pad__slot.c3 {
  left: 3 * $pad-slot-width + 4 * $pad-slot-spacing-around
}

.pad__slot.rowspan2 {
  height: 2 * $pad-slot-height + $pad-slot-spacing-around
}

.pad__slot.colspan2 {
  width: 2 * $pad-slot-width + $pad-slot-spacing-around
}
```

The width, height, and spacing around the slots can each be overriden when using the pad module. For e.g.

```scss
@use "blocks/pad" with (
  $pad-slot-width: 75px,
  $pad-slot-height: 50px,
  $pad-slot-spacing-around: 2px
);
```

You can read "[Configuration](https://sass-lang.com/documentation/at-rules/use/#configuration)" to learn more about this feature of `@use`.

## Demo

<iframe src="./demo/pad.html" style="width: 100%; height: 430px; border: 2px solid #333;"></iframe>

## Source Code

- [prototype/pad.html](https://github.com/dwayne/elm-calculator/blob/1.0.0/prototype/pad.html)
- [sass/blocks/_pad.scss](https://github.com/dwayne/elm-calculator/blob/1.0.0/sass/blocks/_pad.scss)
