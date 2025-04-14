# attribution

The **attribution** contains information about the developer of the web application.

- [HTML](#html)
- [Sass](#sass)
- [Demo](#demo)
- [Source Code](#source-code)

## HTML

```html
<p class="attribution">Developed by <a class="attribution__link" href="https://github.com/dwayne" target="_blank" title="Dwayne's GitHub profile">Dwayne Crooks</a></p>
```

## Sass

```scss
@use "../colors";
@use "../typography";

/*p*/.attribution {
  margin: 0;

  font-family: typography.$shareTechMono;
  text-align: center;
}

/*a*/.attribution__link {
  text-decoration: none;
  color: colors.$prussianBlue;
}
```

- [Quasi-Qualified Selectors](https://cssguidelin.es/#quasi-qualified-selectors)

## Demo

<iframe src="./demo/attribution.html" style="width: 100%; height: 265px; border: 2px solid #333;"></iframe>

## Source Code

- [prototype/attribution.html](https://github.com/dwayne/elm-calculator/blob/1.0.0/prototype/attribution.html)
- [sass/blocks/_attribution.scss](https://github.com/dwayne/elm-calculator/blob/1.0.0/sass/blocks/_attribution.scss)
- [sass/_colors.scss](https://github.com/dwayne/elm-calculator/blob/1.0.0/sass/_colors.scss)
- [sass/_typography.scss](https://github.com/dwayne/elm-calculator/blob/1.0.0/sass/_typography.scss)
