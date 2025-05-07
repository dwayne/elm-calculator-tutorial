# Unit Tests

## Simple Expressions

```elm
test "1" <|
    \_ ->
        expectEval
            [ intT 1 ]
            (int 1)

test "1+2" <|
    \_ ->
        expectEval
            [ intT 1, operatorT Add, intT 2 ]
            (int 3)

test "6-1" <|
    \_ ->
        expectEval
            [ intT 6, operatorT Sub, intT 1 ]
            (int 5)

test "2*5" <|
    \_ ->
        expectEval
            [ intT 2, operatorT Mul, intT 5 ]
            (int 10)

test "10/2" <|
    \_ ->
        expectEval
            [ intT 10, operatorT Div, intT 2 ]
            (int 5)

test "5/2" <|
    \_ ->
        expectEval
            [ intT 5, operatorT Div, intT 2 ]
            (rational 5 2)

test "1/0" <|
    \_ ->
        expectEval
            [ intT 1, operatorT Div, intT 0 ]
            (int 0)
```

## Operator Precedence

```elm
test "2+3-4" <|
    \_ ->
        expectEval
            [ intT 2, operatorT Add, intT 3, operatorT Sub, intT 4 ]
            (int 1)

test "2-3+4" <|
    \_ ->
        expectEval
            [ intT 2, operatorT Sub, intT 3, operatorT Add, intT 4 ]
            (int 3)

test "1+2*3" <|
    \_ ->
        expectEval
            [ intT 1, operatorT Add, intT 2, operatorT Mul, intT 3 ]
            (int 7)

test "1+3/3" <|
    \_ ->
        expectEval
            [ intT 1, operatorT Add, intT 3, operatorT Div, intT 3 ]
            (int 2)

test "1+2-5*8+6-10*3" <|
    \_ ->
        expectEval
            [ intT 1
            , operatorT Add
            , intT 2
            , operatorT Sub
            , intT 5
            , operatorT Mul
            , intT 8
            , operatorT Add
            , intT 6
            , operatorT Sub
            , intT 10
            , operatorT Mul
            , intT 3
            ]
            (int -61)
```

## Resources

- [tests/Test/Data/Evaluator.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/tests/Test/Data/Evaluator.elm)
