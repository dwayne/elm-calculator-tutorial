# Dijkstra's Shunting Yard Algorithm

## Algorithm

The following pseudocode describes an algorithm, based on [Dijkstra's shunting yard algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm), for evaluating infix expressions. It assumes that the infix expression has already been [tokenized](#tokenization).

```txt
eval(tokens: List of Token) -> Rational or Error
  -- Initialization

  operands = Stack.empty()
  operators = Stack.empty()

  -- Process the tokens

  for t in tokens do
    if t is a number, n then
      operands.push(n)

    else if t is an operator, op1 then
      -- Evaluate the dominant operators

      while operators.isNotEmpty() do
        op2 = operators.top()

        if precendence(op2) >= precendence(op1) then
          op2 = operators.pop()
          evalBinOp(op2, operands)

        else
          break
        end if
      end while

      operators.push(op1)
    end if
  end for

  -- Process the operators

  while operators.isNotEmpty() do
    op = operators.pop()
    evalBinOp(op, operands)
  end while

  -- Return the value

  if operands.isEmpty() then
    raise an error
  end if

  value = operands.pop()

  if operands.isEmpty() then
    return value

  else
    raise an error
  end if
end

evalBinOp(op: Operator, operands: Stack of Rational) -> () or Error
  if operands.isEmpty() then
    raise an error
  end if

  b = operands.pop()

  if operands.isEmpty() then
    raise an error
  end if

  a = operands.pop()

  if op is addition then
    operands.push(a + b)

  else if op is subtraction then
    operands.push(a - b)

  else if op is multiplication then
    operands.push(a × b)

  else if op is division then
    operands.push(a ÷ b)
  end if
end
```

## Tokenization

| Infix Expression | List of Token |
|------------------|---------------|
| `1 + 2` | `[ Number (Rational.fromInt 1), Operand Add, Number (Rational.fromInt 2) ]` |
| `-3`    | `[ Number (Rational.fromInt -3) ]` |
| `9 - 17 × 3 ÷ 4` | `[ Number (Rational.fromInt 9), Operand Sub, Number (Rational.fromInt 17), Operand Mul, Number (Rational.fromInt 3), Operand Div, Number (Rational.fromInt 2) ]` |

## Precedence

The precendence of the supported operators are as follows:

| Operator | Precedence |
|----------|------------|
| `Add` | `1` |
| `Sub` | `1` |
| `Mul` | `2` |
| `Div` | `2` |

`Add` and `Sub` have the same level but lower precedence than `Mul` and `Div`. All the supported operators are left-associative so we don't have to deal with associativity. However, if we decide to add exponentiation, which is right-associative, then we'd have to start considering associativity.

The corresponding `precedence` function can be implemented as follows:

```elm
precedence : Operator -> Int
precedence op =
    case op of
        Add ->
            1

        Sub ->
            1

        Mul ->
            2

        Div ->
            2
```

## Examples

These examples are here to help you understand the algorithm.

### Example 1

Input: `3`

| Token | Action | Operands | Operators | Value |
|-------|--------|----------|-----------|-------|
| `3` | Push `3` to operands | `[ 3 ]` | `[]` ||
| None | Pop from operands | `[]` | `[]` | `3` |

Output: `3`

### Example 2

Input: `1 + 2`

| Token | Action | Operands | Operators | Value | Comment |
|-------|--------|----------|-----------|-------|---------|
| `1` | Push `1` to operands | `[ 1 ]` | `[]` |||
| `+` | Push `+` to operators | `[ 1 ]` | `[ + ]` |||
| `2` | Push `2` to operands | `[ 2, 1 ]` | `[ + ]` |||
| None | Process `+` operator | `[ 3 ]` | `[]` || `1 + 2` |
| None | Pop from operands | `[]` | `[]` | `3` ||

Output: `3`

### Example 3

Input: `1 + 2 × 3`

| Token | Action | Operands | Operators | Value | Comment |
|-------|--------|----------|-----------|-------|---------|
| `1` | Push `1` to operands | `[ 1 ]` | `[]` |||
| `+` | Push `+` to operators | `[ 1 ]` | `[ + ]` |||
| `2` | Push `2` to operands | `[ 2, 1 ]` | `[ + ]` |||
| `×` | Push `×` to operators | `[ 2, 1 ]` | `[ ×, + ]` |||
| `3` | Push `3` to operands | `[ 3, 2, 1 ]` | `[ ×, + ]` |||
| None | Process `×` operator | `[ 6, 1 ]` | `[ + ]` || `2 × 3` |
| None | Process `+` operator | `[ 7 ]` | `[]` || `1 + 6` |
| None | Pop from operands | `[]` | `[]` | `7` ||

Output: `7`

### Example 4

Input: `4 × 5 + 6`

| Token | Action | Operands | Operators | Value | Comment |
|-------|--------|----------|-----------|-------|---------|
| `4` | Push `4` to operands | `[ 4 ]` | `[]` |||
| `×` | Push `×` to operators | `[ 4 ]` | `[ × ]` |||
| `5` | Push `5` to operands | `[ 5, 4 ]` | `[ × ]` |||
| `+` | Process `×` operator | `[ 20 ]` | `[]` || `4 × 5` |
| `+` | Push `+` to operators | `[ 20 ]` | `[ + ]` |||
| `6` | Push `6` to operands | `[ 6, 20 ]` | `[ + ]` |||
| None | Process `+` operator | `[ 26 ]` | `[]` || `20 + 6` |
| None | Pop from operands | `[]` | `[]` | `26` ||

Output: `26`

### Example 5

Input: `3 + 4 × 2 ÷ 4`

| Token | Action | Operands | Operators | Value | Comment |
|-------|--------|----------|-----------|-------|---------|
| `3` | Push `3` to operands | `[ 3 ]` | `[]` |||
| `+` | Push `+` to operators | `[ 3 ]` | `[ + ]` |||
| `4` | Push `4` to operands | `[ 4, 3 ]` | `[ + ]` |||
| `×` | Push `×` to operators | `[ 4, 3 ]` | `[ ×, + ]` |||
| `2` | Push `2` to operands | `[ 2, 4, 3 ]` | `[ ×, + ]` |||
| `÷` | Process `×` operator | `[ 8, 3 ]` | `[ + ]` || `4 × 2` |
| `÷` | Push `÷` to operators | `[ 8, 3 ]` | `[ ÷, + ]` |||
| `4` | Push `4` to operands | `[ 4, 8, 3 ]` | `[ ÷, + ]` |||
| None | Process `÷` operator | `[ 2, 3 ]` | `[ + ]` || `8 ÷ 4` |
| None | Process `+` operator | `[ 5 ]` | `[]` || `3 + 2` |
| None | Pop from operands | `[]` | `[]` | `5` ||

Output: `5`

## Translating the Algorithm to Elm

### Preamble

```elm
module Data.Evaluator exposing (Answer, Error(..), eval)

import Data.Operator exposing (Operator(..))
import Data.Token exposing (Token(..))
import Lib.Rational as Rational exposing (Rational)
import Lib.Stack as Stack exposing (Stack)


type alias Answer =
    Result Error Rational


type Error
    = SyntaxError


eval : List Token -> Answer
eval tokens =
    -- ...
```

When evaluating a given infix expression we can either get a syntax error or a rational number.

A syntax error, `SyntaxError`, is possible if `tokens` is illegally formed, for e.g.:

| `tokens` |
|----------|
| `[]` |
| `[ Operator Add ]` |
| `[ Number (Rational.fromInt 1), Operator Add ]` |
| `[ Number (Rational.fromInt 1), Number (Rational.fromInt 2) ]` |

### Dealing with Mutation

The algorithm treats `operands` and `operators` as mutable stacks. Since Elm doesn't support mutable data structures we'd have to find another way to change the stacks as the program performs its steps. The typical way we simulate mutability is inputing and outputing a value of the same type. I stored all the global state together in one record type called `State`:

```elm
type alias State =
    { operands : Stack Rational
    , operators : Stack Operator
    }
```

To make `State` easier to work with and "mutate", I implemented the following helper functions:

```elm
pushOperand : Rational -> State -> Result Error State
pushOperand q state =
    Ok { state | operands = Stack.push q state.operands }


popOperand : State -> Result Error ( Rational, State )
popOperand state =
    case Stack.pop state.operands of
        Just ( q, operands ) ->
            Ok ( q, { state | operands = operands } )

        Nothing ->
            Err SyntaxError


pushOperator : Operator -> State -> Result Error State
pushOperator op state =
    Ok { state | operators = Stack.push op state.operators }


popOperator : (Operator -> State -> Result Error State) -> (State -> Result Error State) -> State -> Result Error State
popOperator onOperator onEmpty state =
    case Stack.pop state.operators of
        Just ( op, operators ) ->
            onOperator op { state | operators = operators }

        Nothing ->
            onEmpty state
```

### Initialization

From the algorithm:

```
eval(tokens: List of Token) -> Rational or Error
  -- Initialization

  operands = Stack.empty()
  operators = Stack.empty()

  -- Process the tokens

  for t in tokens do
    -- ...
  end for

  -- Process the operators
  -- Return the value
end
```

Translated to Elm:

```elm
eval : List Token -> Answer
eval tokens =
    let
        -- Initialization

        state =
            { operands = Stack.new
            , operators = Stack.new
            }
    in
    -- Process the tokens
    -- Process the operators

    evalTokens tokens state
        |> Result.andThen
            (\{ operands, operators } ->
                -- Return the value
            )
```

### Process the Tokens

From the algorithm:

```
-- Process the tokens

for t in tokens do
  if t is a number, n then
    operands.push(n)

  else if t is an operator, op1 then
    -- Evaluate the dominant operators
  end if
end for

-- Process the operators
-- Return the value
```

Translated to Elm:

```elm
evalTokens : List Token -> State -> Result Error State
evalTokens tokens state =
    case tokens of
        [] ->
            -- Process the operators

            evalOperators state

        token :: restTokens ->
            evalToken token state
                |> Result.andThen (evalTokens restTokens)


evalToken : Token -> State -> Result Error State
evalToken token state =
    case token of
        Number n ->
            pushOperand n state

        Operator op ->
            -- Evaluate the dominant operators

            evalDominantOperators op state
```

### Evaluate the Dominant Operators

From the algorithm:

```
-- Evaluate the dominant operators

while operators.isNotEmpty() do
  op2 = operators.top()

  if precendence(op2) >= precendence(op1) then
    op2 = operators.pop()
    evalBinOp(op2, operands)

  else
    break
  end if
end while

operators.push(op1)
```

And, `evalBinOp` from the algorithm:

```
evalBinOp(op: Operator, operands: Stack of Rational) -> () or Error
  if operands.isEmpty() then
    raise an error
  end if

  b = operands.pop()

  if operands.isEmpty() then
    raise an error
  end if

  a = operands.pop()

  if op is addition then
    operands.push(a + b)

  else if op is subtraction then
    operands.push(a - b)

  else if op is multiplication then
    operands.push(a × b)

  else if op is division then
    operands.push(a ÷ b)
  end if
end
```

Translated to Elm:

```elm
evalDominantOperators : Operator -> State -> Result Error State
evalDominantOperators op1 state0 =
    popOperator
        (\op2 state1 ->
            if precedence op2 >= precedence op1 then
                evalOperation op2 state1
                    |> Result.andThen (evalDominantOperators op1)

            else
                pushOperator op1 state0
        )
        (pushOperator op1)
        state0


evalOperation : Operator -> State -> Result Error State
evalOperation op state0 =
    popOperand state0
        |> Result.andThen
            (\( right, state1 ) ->
                popOperand state1
                    |> Result.andThen
                        (\( left, state2 ) ->
                            evalBinOp op left right state2
                        )
            )


evalBinOp : Operator -> Rational -> Rational -> State -> Result Error State
evalBinOp op a b =
    pushOperand <|
        case op of
            Add ->
                Rational.add a b

            Sub ->
                Rational.sub a b

            Mul ->
                Rational.mul a b

            Div ->
                Rational.div a b
```

### Process the Operators

From the algorithm:

```
-- Process the operators

while operators.isNotEmpty() do
  op = operators.pop()
  evalBinOp(op, operands)
end while
```

Translated to Elm:

```elm
evalOperators : State -> Result Error State
evalOperators state0 =
    popOperator
        (\op state1 ->
            evalOperation op state1
                |> Result.andThen evalOperators
        )
        (\state1 -> Ok state1)
        state0
```

This can be simplified to:

```elm
evalOperators : State -> Result Error State
evalOperators =
    popOperator
        (\op -> evalOperation op >> Result.andThen evalOperators)
        Ok
```

### Return the Value

From the algorithm:

```
-- Return the value

if operands.isEmpty() then
  raise an error
end if

value = operands.pop()

if operands.isEmpty() then
  return value

else
  raise an error
end if
```

Translated to Elm:

```elm
case ( Stack.pop operands, Stack.isEmpty operators ) of
    ( Just ( value, newOperands ), True ) ->
        if Stack.isEmpty newOperands then
            Ok value

        else
            Err SyntaxError

    _ ->
        Err SyntaxError
```

## All Together

```elm
module Data.Evaluator exposing (Answer, Error(..), eval)

import Data.Operator exposing (Operator(..))
import Data.Token exposing (Token(..))
import Lib.Rational as Rational exposing (Rational)
import Lib.Stack as Stack exposing (Stack)


type alias Answer =
    Result Error Rational


type Error
    = SyntaxError


type alias State =
    { operands : Stack Rational
    , operators : Stack Operator
    }


eval : List Token -> Answer
eval tokens =
    let
        state =
            { operands = Stack.new
            , operators = Stack.new
            }
    in
    evalTokens tokens state
        |> Result.andThen
            (\{ operands, operators } ->
                case ( Stack.pop operands, Stack.isEmpty operators ) of
                    ( Just ( value, newOperands ), True ) ->
                        if Stack.isEmpty newOperands then
                            Ok value

                        else
                            Err SyntaxError

                    _ ->
                        Err SyntaxError
            )


evalTokens : List Token -> State -> Result Error State
evalTokens tokens state =
    case tokens of
        [] ->
            evalOperators state

        token :: restTokens ->
            evalToken token state
                |> Result.andThen (evalTokens restTokens)


evalToken : Token -> State -> Result Error State
evalToken token state =
    case token of
        Number n ->
            pushOperand n state

        Operator op ->
            evalDominantOperators op state


evalDominantOperators : Operator -> State -> Result Error State
evalDominantOperators op1 state0 =
    popOperator
        (\op2 state1 ->
            if precedence op2 >= precedence op1 then
                evalOperation op2 state1
                    |> Result.andThen (evalDominantOperators op1)

            else
                pushOperator op1 state0
        )
        (pushOperator op1)
        state0


evalOperators : State -> Result Error State
evalOperators =
    popOperator
        (\op -> evalOperation op >> Result.andThen evalOperators)
        Ok


evalOperation : Operator -> State -> Result Error State
evalOperation op state0 =
    popOperand state0
        |> Result.andThen
            (\( right, state1 ) ->
                popOperand state1
                    |> Result.andThen
                        (\( left, state2 ) ->
                            evalBinOp op left right state2
                        )
            )


evalBinOp : Operator -> Rational -> Rational -> State -> Result Error State
evalBinOp op a b =
    pushOperand <|
        case op of
            Add ->
                Rational.add a b

            Sub ->
                Rational.sub a b

            Mul ->
                Rational.mul a b

            Div ->
                Rational.div a b


pushOperand : Rational -> State -> Result Error State
pushOperand q state =
    Ok { state | operands = Stack.push q state.operands }


popOperand : State -> Result Error ( Rational, State )
popOperand state =
    case Stack.pop state.operands of
        Just ( q, operands ) ->
            Ok ( q, { state | operands = operands } )

        Nothing ->
            Err SyntaxError


pushOperator : Operator -> State -> Result Error State
pushOperator op state =
    Ok { state | operators = Stack.push op state.operators }


popOperator : (Operator -> State -> Result Error State) -> (State -> Result Error State) -> State -> Result Error State
popOperator onOperator onEmpty state =
    case Stack.pop state.operators of
        Just ( op, operators ) ->
            onOperator op { state | operators = operators }

        Nothing ->
            onEmpty state


precedence : Operator -> Int
precedence op =
    case op of
        Add ->
            1

        Sub ->
            1

        Mul ->
            2

        Div ->
            2
```

## Resources

- [src/Data/Evaluator.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/Data/Evaluator.elm)
- [src/Data/Token.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/Data/Token.elm)
- [src/Data/Operator.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/Data/Operator.elm)
- [src/Lib/Stack.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/Lib/Stack.elm)
- [src/Lib/Rational.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/Lib/Rational.elm)
