# display

A two line **display** where the top line shows the user's input and the bottom line shows the result of evaluating that input.

- [HTML](#html)
- [Sass](#sass)
- [Demo](#demo)
- [Source Code](#source-code)

## HTML

### Empty

```html
<div class="display">
  <div class="display__line1"></div>
  <div class="display__line2"></div>
</div>
```

It's interesting that even though the structure is simple and it seems like nothing could be improved, there is room for improvement. In particular, I recently learned about [the `<output>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/output). It is a container element into which you can inject the results of a calculation or the outcome of a user action. Thus, both display lines could be changed from `<div>` to `<output>` to improve their semantics and accessibility.

### Non-empty: Short

```html
<div class="display">
  <div class="display__line1">22÷7=3.(142857)</div>
  <div class="display__line2">3.(142857)</div>
</div>
```

### Non-empty: Long

```html
<div class="display">
  <div class="display__line1">1×8111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</div>
  <div class="display__line2">8111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</div>
</div>
```

While I was playing around with the display I realized that long input text broke it and it forced me to handle that case immediately. This is one of the major benefits of working through UI problems, in a dedicated environment, independently of everything else.

- [A Frontend Workshop Environment](https://bradfrost.com/blog/post/a-frontend-workshop-environment/)

## Sass

```scss
@use "../colors";
@use "../typography";

.display {
  padding: 5px 5px 10px 5px;

  font-family: typography.$digital;

  text-align: right;
  overflow-wrap: break-word;

  background-color: colors.$black;
}

.display__line1:empty::before,
.display__line2:empty::before {
  content: "\00A0";
}

.display__line1 {
  padding-bottom: 2px;

  font-size: 1.25rem;
  line-height: 1;

  color: colors.$orange;
}

.display__line2 {
  font-size: 1.875rem;
  line-height: 1;

  color: colors.$white;
}
```

### Typography

I prefer to refer to my font stacks by name, just as I do with colors. A [two-tier system](./key.md#colors) can be established here as well.

### The Empty State

When the display lines are empty they collapse on themselves. In order to avoid that from happening I use [the `:empty` CSS pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:empty) to select the lines when they have no children and add content, a [non-breaking space](https://en.wikipedia.org/wiki/Non-breaking_space), to them. This ensures that they don't collapse and the height of the lines remain intact.

### Long Text

The following two CSS rules ensure that long text, within the lines, is handled correctly.

```scss
.display {
  overflow-wrap: break-word;
}

.display__line1, .display__line2 {
  line-height: 1;
}
```

### Writing Sass

Sometimes I write my Sass based on the problems a group of rules are intended to solve. For e.g. I might rewrite the Sass above in the following way:

```scss
@use "../colors";
@use "../typography";

// Block

.display {
  padding: 5px 5px 10px 5px;

  font-family: typography.$digital;

  text-align: right;

  background-color: colors.$black;
}

// Elements

.display__line1 {
  padding-bottom: 2px;

  font-size: 1.25rem;

  color: colors.$orange;
}

.display__line2 {
  font-size: 1.875rem;

  color: colors.$white;
}

// Deal with the empty state

.display__line1:empty::before,
.display__line2:empty::before {
  content: "\00A0";
}

// Deal with long text

.display {
  overflow-wrap: break-word;
}

.display__line1, .display__line2 {
  line-height: 1;
}
```

## Demo

<iframe src="./demo/display.html" style="width: 100%; height: 770px; border: 2px solid #333;"></iframe>

## Source Code

- [prototype/display.html](https://github.com/dwayne/elm-calculator/blob/1.0.0/prototype/display.html)
- [sass/blocks/_display.scss](https://github.com/dwayne/elm-calculator/blob/1.0.0/sass/blocks/_display.scss)
- [sass/_colors.scss](https://github.com/dwayne/elm-calculator/blob/1.0.0/sass/_colors.scss)
- [sass/_typography.scss](https://github.com/dwayne/elm-calculator/blob/1.0.0/sass/_typography.scss)
