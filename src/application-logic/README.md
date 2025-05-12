# Domain Modeling

This is the phase where I build a logical model of the application domain and expose an API that can be used by the UI I built in the previous phases.

Consider a physical digital calculator. It has a casing and some electronics on a circuit board. I think of the UI as the casing and the application logic as the electronics.

I have no prescriptive way of building the logical model. This is a creative process that I approach in incremental steps that allow me to slowly eat away at the problem until I have a solution. Usually the first solution I come up with isn't well refined and it takes me a few more sessions to refactor it into a final form that pleases me.

## Preliminary Analysis

Here are some rough notes I used to think about the problem.

- The UI is complete but it's inert
- `AC` means "All Clear"
- The operations are addition (`+`), subtraction (`-`), multiplication (`×`), and division (`÷`)
- A user can only enter decimal numbers using the digits `0` through `9` and the decimal point (`.`)
- The non-terminating non-repeating decimal numbers are the irrational numbers
  - [Decimal Representation of Irrational Numbers](https://www.cuemath.com/numbers/decimal-representation-of-irrational-numbers/)
- Can the user enter irrational numbers?
  - No, it's not possible with the inputs available
- Can the user enter an expression that evaluates to an irrational number?
  - No, it's not possible with the operations available
- It follows that we'd only need support for rational numbers
- `=` means to calculate what's been input
  - The input appears on line 1 of the display
- `1 + 2 * 3` is a possible infix expression that the user can input
  - Either `1 + 2 * 3 = 1 + 6 = 7` or `1 + 2 * 3 = 3 * 3 = 9`
  - We want the answer to be `7` which means we want to respect the usual operator precedence when evaluating expressions
  - [Dijkstra's shunting yard algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm) can be used to help us evaluate the infix expressions while respecting operator precedence
    - I was aware of this algorithm from my Computer Science classes
    - Alternatively, you could have researched the following question "How does a calculator evaluate infix expressions?", and you would have found answers pointing you in a similar direction. For e.g. when I asked Google I found this [Expression Evaluation](https://www.geeksforgeeks.org/expression-evaluation/) article
- `1 / 3` results in the repeating decimal `0.333...`
  - We can display repeating decimals by highlighting the repeating digits
  - So for e.g. we can display `1 / 3` as `0.(3)`
- From [`View.Key`](../html-css-to-elm/views/key.md), I already identified a need for [`Data.Key`](../html-css-to-elm/views/key.md#datakey), [`Data.Digit`](../html-css-to-elm/views/key.md#datadigit), and [`Data.Operator`](../html-css-to-elm/views/key.md#dataoperator)
- The user interacts with the UI by pressing keys on the keypad. These key presses are used to build up an infix expression. When the user is ready to evaluate the infix expression they press the `=` key

## API Sketch

Based on the preliminary analysis I then thought through what the API could be over several sessions. At this point I was trying to figure out, at a high-level, how all the pieces would fit together to become a cohesive solution to the problem. Some questions I tried to answer included:

- What's the overall shape of the solution?
- What modules do I need?
- What data structures do I need?
- What are the interesting parts that will need more thought?

### `Data.Calculator`

```elm
module Data.Calculator exposing
    ( Calculator
    , new
    , press
    , Output, toOutput
    )

import Data.Key exposing (Key)

type Calculator

new : Calculator

press : Key -> Calculator -> Calculator

type alias Output =
    { line1 : String
    , line2 : String
    }

toOutput : Calculator -> Output
```

The idea I had in mind is that `Data.Calculator` would serve as the logical representation of the calculator. It has an internal data structure that it uses to keep track of the infix expression that the users builds one key press at a time.

`new` creates a calculator in its initial state.

`press` takes a key pressed by the user and updates the calculator's internal data structures.

`toOutput` transforms the internal data structures into a format that can be used to display the infix expression that's being built (i.e. line 1) and the user's current input (i.e. line 2).

The key thing would be figuring out what this internal data structure needs to be for the API to work.

### `Data.Evaluator`

```elm
module Data.Evaluator exposing (Answer, Error(..), eval)

import Data.Token exposing (Token)
import Lib.Rational exposing (Rational)

type alias Answer =
    Result Error Rational

type Error

eval : List Token -> Answer
```

Recall that I would need to be able to evaluate infix expressions and respect operator precedence. Dijkstra's shunting yard algorithm allows me to do that and `Data.Evaluator` exports the function `eval` that implements said algorithm.

`Error` would enumerate all the possible errors that could occur based on `eval`'s evaluation of the list of tokens.

I'm expecting an infix expression like `1 + 2 * 3` to be represented as a list of tokens as follows:

```
[ Number (Rational.fromInt 1), Operator Add, Number (Rational.fromInt 2), Operator Mul, Number (Rational.fromInt 3) ]
```

Hence, part of `Data.Calculator`'s job would be to tokenize the user's input.

### `Data.Token`

```elm
module Data.Token exposing (Token(..), toString)

import Data.Operator as Operator exposing (Operator)
import Lib.Rational as Rational exposing (Rational)


type Token
    = Number Rational
    | Operator Operator


toString : Token -> String
toString token =
    case token of
        Number r ->
            Rational.toDecimalString r

        Operator op ->
            Operator.toString op
```

I came up with this based on the tokens I expected to be present in the infix expressions that could be entered by a user.

### `Lib.Rational`

```elm
module Lib.Rational exposing
    ( Rational
    , zero, fromInt, new
    , add, sub, mul, div
    , toString, toDecimalString
    )

type Rational

zero : Rational
fromInt : Int -> Rational
new : Int -> Int -> Maybe Rational

add : Rational -> Rational -> Rational
sub : Rational -> Rational -> Rational
mul : Rational -> Rational -> Rational
div : Rational -> Rational -> Rational

toString : Rational -> String
toDecimalString : Rational -> String
```

`zero`, `fromInt`, and `new` can be used to construct rational numbers.

`add`, `sub`, `mul`, and `div` perform the usual arithmetic over the rationals. To keep things simple, I define `div r zero == zero` for every rational number `r`.

`toString` converts a rational number to either an integral or fractional string. Here are some examples:

```elm
Maybe.map toString (new 0 1) == Just "0"
Maybe.map toString (new 0 2) == Just "0"
Maybe.map toString (new 5 1) == Just "5"
Maybe.map toString (new -5 1) == Just "-5"

Maybe.map toString (new 5 2) == Just "5/2"
Maybe.map toString (new -5 2) == Just "-5/2"
Maybe.map toString (new 5 -2) == Just "-5/2"
Maybe.map toString (new -5 -2) == Just "5/2"

Maybe.map toString (new 3 6) == Just "1/2"
Maybe.map toString (new 6 3) == Just "2"
```

`toDecimalString` converts a rational number to a, wait for it, decimal string. Here are some examples:

```elm
Maybe.map toDecimalString (new 0 1) == Just "0"
Maybe.map toDecimalString (new 5 1) == Just "5"
Maybe.map toDecimalString (new -5 1) == Just "-5"

Maybe.map toDecimalString (new 0 2) == Just "0"
Maybe.map toDecimalString (new 5 2) == Just "2.5"
Maybe.map toDecimalString (new -5 2) == Just "-2.5"
Maybe.map toDecimalString (new 5 -2) == Just "-2.5"
Maybe.map toDecimalString (new -5 -2) == Just "2.5"

Maybe.map toDecimalString (new 3 6) == Just "0.5"
Maybe.map toDecimalString (new 6 3) == Just "2"

Maybe.map toDecimalString (new 1 3) == Just "0.(3)"
Maybe.map toDecimalString (new 7 12) == Just "0.58(3)"
Maybe.map toDecimalString (new 1 23) == Just "0.(0434782608695652173913)"
```

The `toString` and `toDecimalString` functions are good candidates for unit testing.

### `Lib.Stack`

```elm
module Lib.Stack exposing
    ( Stack
    , new
    , isEmpty
    , push, pop
    )

type Stack a

new : Stack a

isEmpty : Stack a -> Bool

push : a -> Stack a -> Stack a
pop : Stack a -> Maybe ( a, Stack a )
```

Stacks are used in Dijkstra's shunting yard algorithm. There are a few simple ways to implement them so I knew this wasn't going to be a problem.

## Questions Answered

After sketching out the API I had a better sense of the shape of the solution, I understood the modules and data structures I needed, and I knew where the tricky bits lay.

### Shape of the Solution

```elm
-- MODEL


type alias Model =
    { calculator : Calculator
    }


init : Model
init =
    { calculator = Calculator.new
    }



-- UPDATE


type Msg
    = Clicked Key


update : Msg -> Model -> Model
update msg model =
    case msg of
        Clicked key ->
            { model | calculator = Calculator.press key model.calculator }



-- VIEW


view : Model -> H.Html Msg
view { calculator } =
    let
        { line1, line2 } =
            Calculator.toOutput calculator
    in
    Page.view
        { calculator =
            { line1 = line1
            , line2 = line2
            , onClick = Clicked
            }
        , attribution =
            { name = "Dwayne Crooks"
            , title = "Dwayne's GitHub profile"
            , url = "https://github.com/dwayne"
            }
        }
```

### Modules and Data Structures

- `Data.Calculator`
- `Data.Evaluator`
- `Data.Token`
- `Lib.Rational`
- `Lib.Stack`

#### Why `Lib`?

It's a personal preference of mine to place modules in `Lib` that I feel are general enough to one day deserve their own library or at least be reused in other projects. By placing them in `Lib` it's easier for me to identify these reusable modules when I'm scanning through my projects.

### The Tricky Bits

These are the parts that are non-trivial to figure out and where I expected to spend most of my time in this phase of the project.

- Group 1
  - What's `type Calculator` going to be?
  - How to tokenize the user's input as they press keys?
  - How to implement `Calculator.press`?
  - How to implement `Calculator.toOutput`?
- Group 2
  - How to implement Dijkstra's shunting yard algorithm, `Evaluator.eval`, in a pure functional language?
- Group 3
  - How to implement `Rational.toDecimalString`?

The 3 groups can be worked on independently of each other.

`Calculator.press`, `Calculator.toOutput`, `Evaluator.eval`, and `Rational.toDecimalString` are great candidates for unit testing. I didn't practice test-driven development but I did cycle between tests and implementation in order to implement the functions.

## The Plan

Moving forward we'd tackle and solve the problems of each group in the order: Group 3, Group 2, and Group 1.

Let's get started on the [rational numbers](./rational-numbers/index.html).

## An Aside: My Historically Accurate First Attempt

This is how I literally first worked my way through the project when I was learning Elm:

- I made the calculator work for `AC`, `0-9`, `+`/`-`, and `=`
  - [Add and test the calculator's logic](https://github.com/dwayne/elm-calculator/commit/21b89460ee169de1f30efd66b327bb299852688f)
  - [Make the calculator UI work for AC, digits, +/- and =](https://github.com/dwayne/elm-calculator/commit/c8bdd2ecffa0f3215dd183a9a050cd01fa443ab5)
- I added support for multiplication
  - [Add multiplication](https://github.com/dwayne/elm-calculator/commit/848c4e35d9cb0d5ea0140b283beff5b3e77cdd1e)
- I implemented Dijkstra's shunting yard algorithm to handle operator precedence
  - [Add an expression evaluator that respects operator precedence](https://github.com/dwayne/elm-calculator/commit/0c1f708e1983b1afb75f023fd7ff190fea6587fd)
- I added support for integer division
  - [Add integer division](https://github.com/dwayne/elm-calculator/commit/dea53dbe32209927e74dbbe65cc4c8f5abab7305)
- I added support for rational arithmetic
  - [Add a type for dealing with rational numbers](https://github.com/dwayne/elm-calculator/commit/375b155150dafaab3c46d71ccbdf563fb87ac48d)
  - [Add rational arithmetic to the calculator](https://github.com/dwayne/elm-calculator/commit/ecf14554a3bddc415aa7f43d4dbe0427ce921e27)
  - [Add decimal input](https://github.com/dwayne/elm-calculator/commit/1e0785589a3b2f5ff559b1c1617038df199f9cb7)

Then, over the years, as my understanding for Elm grew I refactored my first solution into what it is today.
