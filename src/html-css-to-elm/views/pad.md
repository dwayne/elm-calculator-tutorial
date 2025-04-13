# View.Pad

The implementation was based on [the `.pad` block](../../prototype/blocks/pad.md).

- [View Options](#view-options)
- [View Function](#view-function)
- [Source Code](#source-code)

## View Options

```elm
module View.Pad exposing (view)

import Data.Digit as Digit
import Data.Key as Key exposing (Key)
import Data.Operator as Operator
import Html as H
import Html.Attributes as HA
import View.Key as Key


view : (Key -> msg) -> H.Html msg
view onClick =
    -- ...
```

Since I only needed one option, i.e. `onClick`, I didn't create a `ViewOptions` type alias.

## View Function

```elm
view : (Key -> msg) -> H.Html msg
view onClick =
    H.div [ HA.class "pad" ]
        [ viewPadSlot
            { position = ( 0, 0 )
            , span = Just Colspan
            , style = Key.Primary
            , key = Key.AC
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 0, 2 )
            , span = Nothing
            , style = Key.Default
            , key = Key.Operator Operator.Div
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 0, 3 )
            , span = Nothing
            , style = Key.Default
            , key = Key.Operator Operator.Mul
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 1, 0 )
            , span = Nothing
            , style = Key.Default
            , key = Key.Digit Digit.Seven
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 1, 1 )
            , span = Nothing
            , style = Key.Default
            , key = Key.Digit Digit.Eight
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 1, 2 )
            , span = Nothing
            , style = Key.Default
            , key = Key.Digit Digit.Nine
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 1, 3 )
            , span = Nothing
            , style = Key.Default
            , key = Key.Operator Operator.Sub
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 2, 0 )
            , span = Nothing
            , style = Key.Default
            , key = Key.Digit Digit.Four
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 2, 1 )
            , span = Nothing
            , style = Key.Default
            , key = Key.Digit Digit.Five
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 2, 2 )
            , span = Nothing
            , style = Key.Default
            , key = Key.Digit Digit.Six
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 2, 3 )
            , span = Nothing
            , style = Key.Default
            , key = Key.Operator Operator.Add
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 3, 0 )
            , span = Nothing
            , style = Key.Default
            , key = Key.Digit Digit.One
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 3, 1 )
            , span = Nothing
            , style = Key.Default
            , key = Key.Digit Digit.Two
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 3, 2 )
            , span = Nothing
            , style = Key.Default
            , key = Key.Digit Digit.Three
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 3, 3 )
            , span = Just Rowspan
            , style = Key.Secondary
            , key = Key.Equal
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 4, 0 )
            , span = Just Colspan
            , style = Key.Default
            , key = Key.Digit Digit.Zero
            , onClick = onClick
            }
        , viewPadSlot
            { position = ( 4, 2 )
            , span = Nothing
            , style = Key.Default
            , key = Key.Dot
            , onClick = onClick
            }
        ]
```

### `viewPadSlot`

The `viewPadSlot` function abstracts over the `.pad__slot` element. The `.pad__slot` element itself can be given a row and column position via row and column classes, i.e. `.r0`, `.r1`, `.r2`, `.r3`, `.r4`, `.c0`, `.c1`, `.c2`, and `.c3`, and an optional spanning direction class, i.e. `.rowspan2` and `.colspan2`. It is also the parent of the `.key` block so I decided to pass along the corresponding `View.Key.ViewOptions`, i.e. `style`, `key`, and `onClick`.

```elm
type Span
    = Colspan
    | Rowspan


viewPadSlot :
    { position : ( Int, Int )
    , span : Maybe Span
    , style : Key.Style
    , key : Key
    , onClick : Key -> msg
    }
    -> H.Html msg
viewPadSlot { position, span, style, key, onClick } =
    let
        ( r, c ) =
            position
    in
    H.div
        [ HA.class "pad__slot"
        , HA.class <| "r" ++ String.fromInt r
        , HA.class <| "c" ++ String.fromInt c
        , HA.class <|
            case span of
                Nothing ->
                    ""

                Just Colspan ->
                    "colspan2"

                Just Rowspan ->
                    "rowspan2"
        ]
        [ Key.view
            { style = style
            , key = key
            , onClick = onClick
            }
        ]
```

#### An Alternative API

An alternative API for the `viewPadSlot` function could have been:

```elm
viewPadSlot :
    { position : ( Int, Int )
    , span : Maybe Span
    , key : Key.ViewOptions msg
    }
    -> H.Html msg
viewPadSlot { position, span, key } =
    -- ...
```

This would have simplified the call to `Key.view`, it's just `Key.view key` now, but would have made the `viewPadSlot` calls more verbose:

```elm
viewPadSlot
    { position = ( 0, 0 )
    , span = Just Colspan
    , key =
        { style = Key.Primary
        , key = Key.AC
        , onClick = onClick
        }
    }
```

Since `viewPadSlot` is called more than `Key.view` I decided against this alternative API.

## Source Code

- [src/View/Pad.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/View/Pad.elm)
- [src/View/Key.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/View/Key.elm)
- [src/Data/Key.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/Data/Key.elm)
- [src/Data/Digit.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/Data/Digit.elm)
- [src/Data/Operator.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/Data/Operator.elm)
