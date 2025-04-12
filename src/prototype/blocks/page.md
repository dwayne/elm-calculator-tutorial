# page

The **page** composes all the components to form the user interface for the entire web application.

- [HTML](#html)
- [Sass](#sass)
- [Demo](#demo)
- [Source Code](#source-code)

## HTML

```html
<div class="page">
  <div class="page__wrapper">
    <div class="page__content">
      <main>
        <!-- The calculator goes here. -->
      </main>
      <footer>
        <!-- The attribution goes here. -->
      </footer>
    </div>
  </div>
</div>
```

## Sass

```scss
@use "../layouts";

.page {
  @include layouts.absolute-center(20px);
}

.page__content {
  @include layouts.centered-column(15px);
}
```

### Mixins

The `.page` block and `.page__content` element both make use of general layout patterns that I made reusable via Sass [mixins](https://sass-lang.com/documentation/at-rules/mixin/).

```scss
@mixin centered-column($gap) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $gap;
}

@mixin absolute-center($padding, $height: 100vh) {
  display: flex;
  height: $height;

  &__wrapper {
    padding: $padding;

    //
    // Ensures the padding is shown when the content overflows its container.
    //
    display: inline-block;

    //
    // Vertically and horizontally center.
    //
    margin: auto;
  }
}
```

And, here's the CSS that gets generated:

```css
.page {
  display: flex;
  height: 100vh;
}

.page__wrapper {
  padding: 20px;
  display: inline-block;
  margin: auto;
}

.page__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
```

## Demo

<iframe src="./demo/page.html" style="width: 100%; height: 640px; border: 2px solid #333;"></iframe>

## Source Code

- [prototype/page.html](https://github.com/dwayne/elm-calculator/blob/1.0.0/prototype/page.html)
- [sass/_layouts.scss](https://github.com/dwayne/elm-calculator/blob/1.0.0/sass/_layouts.scss)
- [sass/blocks/_page.scss](https://github.com/dwayne/elm-calculator/blob/1.0.0/sass/blocks/_page.scss)
