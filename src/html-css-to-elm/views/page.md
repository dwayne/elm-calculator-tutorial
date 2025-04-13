# View.Page

The implementation was based on [the `.page` block](../../prototype/blocks/page.md).

- [View Options](#view-options)
- [View Function](#view-function)
- [Source Code](#source-code)

## View Options

```elm
type alias ViewOptions msg =
    { calculator : Calculator.ViewOptions msg
    , attribution : Attribution.ViewOptions
    }
```

## View Function

```elm
view : ViewOptions msg -> H.Html msg
view { calculator, attribution } =
    H.div [ HA.class "page" ]
        [ H.div [ HA.class "page__wrapper" ]
            [ H.div [ HA.class "page__content" ]
                [ H.main_ [] [ Calculator.view calculator ]
                , H.footer [] [ Attribution.view attribution ]
                ]
            ]
        ]
```

## Source Code

- [src/View/Page.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/View/Page.elm)
- [src/View/Calculator.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/View/Calculator.elm)
- [src/View/Attribution.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/View/Attribution.elm)
