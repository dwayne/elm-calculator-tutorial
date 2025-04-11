# key

A key, for e.g. `AC`, `=`, `.`, `+`, `-`, `×`, `÷`, and the digits `0` to `9`.

- [HTML](#html)
- [Sass](#sass)
- [Demo](#demo)
- [Source Code](#source-code)

## HTML

### Default

```html
<button class="key" type="button">8</button>
```

A key can be clicked and would need a click handler so the `<button>` element seems appropriate.

- [How (Not) to Build a Button](https://benmyers.dev/blog/clickable-divs/)

By default, a `<button>` element has its `type` attribute set to `submit`. Since the `<button>` element backing a key won't be for submitting form data to a server it's recommend to set its `type` attribute to `button`.

- [The `<button>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#notes)

### Primary

```html
<button class="key key--primary" type="button">AC</button>
```

### Secondary

```html
<button class="key key--secondary" type="button">=</button>
```

Since keys only have a style modifier I chose to keep the naming simple. No modifier signals the default and the `key--primary` and `key--secondary` block modifiers signal the primary and secondary styles respectively. An alternative naming system for the style modifier could have been one of the following sets of names:

- `key--style-default`, `key--style-primary`, `key--style-secondary`
  - I don't like this convention because it gets ambiguous when the property or the value also has a hyphen.
- `key--style--default`, `key--style--primary`, `key--style--secondary`
  - I prefer this convention since it gets rid of the ambiguity. However, for this situation, it's overkill.

## Sass

```scss
@use "../colors";

/*button*/.key {
  border: 0;
  padding: 0;

  display: block;
  width: 100%;
  height: 100%;

  font-size: 1.25rem;

  background-color: colors.$matterhorn;
  color: colors.$white;

  cursor: pointer;
}

.key:hover {
  outline: 1px solid colors.$grey;
  color: colors.$black;
}

.key--primary {
  background-color: colors.$mediumCarmine;
}

.key--secondary {
  background-color: colors.$prussianBlue;
}
```

### Colors

I prefer to refer to my colors by name. I like the approach outlined by [Sacha Grief](https://sachagreif.com/) in [SASS & Color Variables](https://web.archive.org/web/20161012085308/http://sachagreif.com:80/sass-color-variables/) but I didn't follow the two-tier system here since I didn't need it. I only used descriptive names. However, if I decide I want to make the application themeable then adding functional names would be quite useful.

### What's with the `/*button*/` Comment?

I picked it up from [Harry Roberts](https://csswizardry.com/). In [CSS Guidelines](https://cssguidelin.es/), he shares the idea of using [quasi-qualified selectors](https://cssguidelin.es/#quasi-qualified-selectors) to provide information about where a class might be expected or intended to be used. By using quasi-qualified selectors we can still provide that information without actually qualifying the selector and increasing its specificity.

### Key Shape

The key should take up the full width and height of its parent. This allows the parent to control the shape of the key. We need this flexibility because of how the `AC` and `=` keys are intended to be displayed.

## Demo

<iframe src="./demo/key.html" style="width: 100%; height: 930px; border: 2px solid #333;"></iframe>

## Source Code

- [prototype/key.html](https://github.com/dwayne/elm-calculator/blob/1.0.0/prototype/key.html)
- [sass/_colors.scss](https://github.com/dwayne/elm-calculator/blob/1.0.0/sass/_colors.scss)
- [sass/blocks/_key.scss](https://github.com/dwayne/elm-calculator/blob/1.0.0/sass/blocks/_key.scss)
