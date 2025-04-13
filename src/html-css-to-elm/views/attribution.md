# View.Attribution

The implementation was based on [the `.attribution` block](../../prototype/blocks/attribution.md).

- [View Options](#view-options)
- [View Function](#view-function)
- [Source Code](#source-code)

## View Options

```elm
type alias ViewOptions =
    { name : String
    , title : String
    , url : String
    }
```

## View Function

```elm
view : ViewOptions -> H.Html msg
view { name, title, url } =
    H.p [ HA.class "attribution" ]
        [ H.text "Developed by "
        , H.a
            [ HA.class "attribution__link"
            , HA.href url
            , HA.target "_blank"
            , HA.title title
            ]
            [ H.text name ]
        ]
```

## Source Code

- [src/View/Attribution.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/View/Attribution.elm)
