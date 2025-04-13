# View.Key

The implementation was based on [the `.key` block](../../prototype/blocks/key.md).

- [View Options](#view-options)
- [View Function](#view-function)
- [Source Code](#source-code)

## View Options

```elm
type alias ViewOptions msg =
    { style : Style
    , key : Key
    , onClick : Key -> msg
    }


type Style
    = Default
    | Primary
    | Secondary
```

### The Style Block Modifiers

The `Style` [custom type](https://guide.elm-lang.org/types/custom_types) is used to determine when to apply the `.key--primary` and `.key--secondary` block modifiers.

### The Logical Representation of a Key

This module provides a visual representation of a key but I also needed a logical representation which I implemented in `Data.Key`, `Data.Digit`, and `Data.Operator`.

#### `Data.Key`

```elm
type Key
    = AC
    | Dot
    | Equal
    | Digit Digit
    | Operator Operator


toString : Key -> String
toString key =
    case key of
        AC ->
            "AC"

        Dot ->
            "."

        Equal ->
            "="

        Digit digit ->
            Digit.toString digit

        Operator operator ->
            Operator.toString operator
```

#### `Data.Digit`

```elm
type Digit
    = Zero
    | One
    | Two
    | Three
    | Four
    | Five
    | Six
    | Seven
    | Eight
    | Nine


toInt : Digit -> Int
toInt digit =
    case digit of
        Zero ->
            0

        One ->
            1

        Two ->
            2

        Three ->
            3

        Four ->
            4

        Five ->
            5

        Six ->
            6

        Seven ->
            7

        Eight ->
            8

        Nine ->
            9


toString : Digit -> String
toString digit =
    case digit of
        Zero ->
            "0"

        One ->
            "1"

        Two ->
            "2"

        Three ->
            "3"

        Four ->
            "4"

        Five ->
            "5"

        Six ->
            "6"

        Seven ->
            "7"

        Eight ->
            "8"

        Nine ->
            "9"
```

#### `Data.Operator`

```elm
type Operator
    = Add
    | Sub
    | Mul
    | Div


toString : Operator -> String
toString operator =
    case operator of
        Add ->
            "+"

        Sub ->
            "-"

        Mul ->
            "×"

        Div ->
            "÷"
```

## View Function

```elm
view : ViewOptions msg -> H.Html msg
view { style, key, onClick } =
    H.button
        [ HA.class "key"
        , HA.class <|
            case style of
                Default ->
                    ""

                Primary ->
                    "key--primary"

                Secondary ->
                    "key--secondary"
        , HA.type_ "button"
        , HE.onClick <| onClick key
        ]
        [ H.text <| Key.toString key ]
```

## Source Code

- [src/View/Key.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/View/Key.elm)
- [src/Data/Key.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/Data/Key.elm)
- [src/Data/Digit.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/Data/Digit.elm)
- [src/Data/Operator.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/Data/Operator.elm)
