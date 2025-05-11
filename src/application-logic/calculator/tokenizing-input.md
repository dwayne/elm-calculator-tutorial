# Tokenizing Input

The calculator tokenizes the user's input. This suggests the use of a [finite-state machine](https://en.wikipedia.org/wiki/Finite-state_machine) to help with the tokenization.

Why?

Well, [lexical analyzers](https://en.wikipedia.org/wiki/Lexical_analysis) use regular expressions to tokenize a string of characters. Regular expressions are equivalent to finite-state machines. And, rather than a string of characters we have a list of key presses. So the idea is to have the calculator act like a lexical analyzer and use a finite-state machine to tokenize the list of key presses.

## The Finite-State Machine

It has 5 states. The start state is called `Start` and it has one final state called `Answer`. The other states are called `Left`, `Partial`, and `Right`. I represented it as follows:

```elm
type Calculator
    = Calculator State


type State
    = Start
    | Left Decimal
    | Partial (List Token) Operator
    | Right (List Token) Operator Decimal
    | Answer (List Token) E.Answer


type Decimal
    = Whole Int
    | Fractional Int Int Int
```

`Left` represents the situation when the user is entering their first, leftmost, number.

`Partial` represents the situation when the user just finished entering a number and they pressed an operator key.

`Right` represents the situation when the user is entering the second number for the operator.

Notice that the `Answer` state keeps track of the full tokenized input as well as the answer produced by the evaluator.

### `new`

```elm
new : Calculator
new =
    Calculator Start
```

Naturally, the calculator starts off in the `Start` state.

### `press`

As the user presses keys the calculator should transition between states based on its current state and the key that was pressed. So, for each state, we have to figure out what to do for each key that could be pressed.

Recall `Key`:

```elm
type Key
    = AC
    | Dot
    | Equal
    | Digit Digit
    | Operator Operator
```

Recall `Digit`:

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
```

Recall `Operator`:

```elm
type Operator
    = Add
    | Sub
    | Mul
    | Div
```

And, this is how `press` was implemented:

```elm
import Data.Digit as Digit
import Data.Evaluator as E
import Data.Key exposing (Key(..))
import Data.Operator as Operator exposing (Operator)
import Data.Token as Token exposing (Token)
import Lib.Rational as Rational exposing (Rational)


press : Key -> Calculator -> Calculator
press key (Calculator state) =
    Calculator <| pressHelper key state


pressHelper : Key -> State -> State
pressHelper key state =
    case state of
        Start ->
            case key of
                AC ->
                    Start

                Digit digit ->
                    Left <| Whole <| Digit.toInt digit

                Operator _ ->
                    Start

                Dot ->
                    Left <| Fractional 0 0 1

                Equal ->
                    Start

        Left n ->
            case key of
                AC ->
                    Start

                Digit digit ->
                    let
                        d =
                            Digit.toInt digit
                    in
                    case n of
                        Whole w ->
                            Left <| Whole <| w * 10 + d

                        Fractional w f p ->
                            Left <| Fractional w (f * 10 + d) (p * 10)

                Operator op ->
                    Partial [ Token.Number <| toRational n ] op

                Dot ->
                    case n of
                        Whole w ->
                            Left <| Fractional w 0 1

                        Fractional _ _ _ ->
                            Left n

                Equal ->
                    let
                        r =
                            toRational n
                    in
                    Answer [ Token.Number r ] <| Ok r

        Partial tokens op ->
            case key of
                AC ->
                    Start

                Digit digit ->
                    Right tokens op <| Whole <| Digit.toInt digit

                Operator newOp ->
                    Partial tokens newOp

                Dot ->
                    Right tokens op <| Fractional 0 0 1

                Equal ->
                    Answer tokens <| eval tokens

        Right tokens op n ->
            case key of
                AC ->
                    Start

                Digit digit ->
                    let
                        d =
                            Digit.toInt digit
                    in
                    case n of
                        Whole w ->
                            Right tokens op <| Whole <| w * 10 + d

                        Fractional w f p ->
                            Right tokens op <| Fractional w (f * 10 + d) (p * 10)

                Operator newOp ->
                    let
                        newTokens =
                            Token.Number (toRational n) :: Token.Operator op :: tokens
                    in
                    Partial newTokens newOp

                Dot ->
                    case n of
                        Whole w ->
                            Right tokens op <| Fractional w 0 1

                        Fractional _ _ _ ->
                            Right tokens op n

                Equal ->
                    let
                        newTokens =
                            Token.Number (toRational n) :: Token.Operator op :: tokens
                    in
                    Answer newTokens <| eval newTokens

        Answer _ answer ->
            case key of
                AC ->
                    Start

                Digit digit ->
                    Left <| Whole <| Digit.toInt digit

                Operator op ->
                    case answer of
                        Ok r ->
                            Partial [ Token.Number r ] op

                        Err _ ->
                            state

                Dot ->
                    Left <| Fractional 0 0 1

                Equal ->
                    state


eval : List Token -> E.Answer
eval =
    E.eval << List.reverse
```
