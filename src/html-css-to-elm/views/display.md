# View.Display

The implementation was based on [the `.display` block](../../prototype/blocks/display.md).

- [View Options](#view-options)
- [View Function](#view-function)
- [Source Code](#source-code)

## View Options

```elm
module View.Display exposing (ViewOptions, view)

import Html as H
import Html.Attributes as HA


type alias ViewOptions =
    { line1 : String
    , line2 : String
    }
```

## View Function

```elm
view : ViewOptions -> H.Html msg
view { line1, line2 } =
    H.div [ HA.class "display" ]
        [ H.div [ HA.class "display__line1" ] [ H.text line1 ]
        , H.div [ HA.class "display__line2" ] [ H.text line2 ]
        ]
```

## Source Code

- [src/View/Display.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/View/Display.elm)
