# View.Calculator

The implementation was based on [the `.calculator` block](../../prototype/blocks/calculator.md).

- [View Options](#view-options)
- [View Function](#view-function)
- [Source Code](#source-code)

## View Options

```elm
type alias ViewOptions msg =
    { line1 : String
    , line2 : String
    , onClick : Key -> msg
    }
```

## View Function

```elm
view : ViewOptions msg -> H.Html msg
view { line1, line2, onClick } =
    H.div [ HA.class "calculator" ]
        [ H.div
            [ HA.class "calculator__display" ]
            [ Display.view
                { line1 = line1
                , line2 = line2
                }
            ]
        , H.div
            [ HA.class "calculator__pad" ]
            [ Pad.view onClick ]
        ]
```

## Source Code

- [src/View/Calculator.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/View/Calculator.elm)
- [src/View/Display.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/View/Display.elm)
- [src/View/Pad.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/View/Pad.elm)
- [src/Data/Key.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/Data/Key.elm)
