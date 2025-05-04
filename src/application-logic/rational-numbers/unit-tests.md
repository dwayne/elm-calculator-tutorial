# Unit Tests

## `new`

```elm
test "both numerator and denominator are positive" <|
    \_ ->
        Rational.new 2 4
            |> Maybe.map Rational.toString
            |> Expect.equal (Just "1/2")

test "only numerator is positive" <|
    \_ ->
        Rational.new 2 -4
            |> Maybe.map Rational.toString
            |> Expect.equal (Just "-1/2")

test "only denominator is positive" <|
    \_ ->
        Rational.new -2 4
            |> Maybe.map Rational.toString
            |> Expect.equal (Just "-1/2")

test "both numerator and denominator are negative" <|
    \_ ->
        Rational.new -2 -4
            |> Maybe.map Rational.toString
            |> Expect.equal (Just "1/2")
```

## Arithmetic

```elm
test "1/2 + 1/8" <|
    \_ ->
        Maybe.map2 Rational.add (Rational.new 1 2) (Rational.new 1 8)
            |> Maybe.map Rational.toString
            |> Expect.equal (Just "5/8")

test "1/2 - 1/8" <|
    \_ ->
        Maybe.map2 Rational.sub (Rational.new 1 2) (Rational.new 1 8)
            |> Maybe.map Rational.toString
            |> Expect.equal (Just "3/8")

test "1/2 * 1/8" <|
    \_ ->
        Maybe.map2 Rational.mul (Rational.new 1 2) (Rational.new 1 8)
            |> Maybe.map Rational.toString
            |> Expect.equal (Just "1/16")

test "1/2 / 1/8" <|
    \_ ->
        Maybe.map2 Rational.div (Rational.new 1 2) (Rational.new 1 8)
            |> Maybe.map Rational.toString
            |> Expect.equal (Just "4")

test "1/4 / 0" <|
    \_ ->
        Maybe.map2 Rational.div (Rational.new 1 4) (Rational.new 0 1)
            |> Maybe.map Rational.toString
            |> Expect.equal (Just "0")
```

## Decimal Conversion

### Terminating Decimals

```elm
test "1/2" <|
    \_ ->
        Rational.new 1 2
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.5")

test "-1/2" <|
    \_ ->
        Rational.new -1 2
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "-0.5")

test "5/2" <|
    \_ ->
        Rational.new 5 2
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "2.5")

test "1/4" <|
    \_ ->
        Rational.new 1 4
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.25")

test "1/5" <|
    \_ ->
        Rational.new 1 5
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.2")

test "1/8" <|
    \_ ->
        Rational.new 1 8
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.125")
```

### Repeating Decimals

```elm
test "1/3" <|
    \_ ->
        Rational.new 1 3
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.(3)")

test "2/3" <|
    \_ ->
        Rational.new 2 3
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.(6)")

test "1/6" <|
    \_ ->
        Rational.new 1 6
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.1(6)")

test "5/6" <|
    \_ ->
        Rational.new 5 6
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.8(3)")

test "1/7" <|
    \_ ->
        Rational.new 1 7
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.(142857)")

test "2/7" <|
    \_ ->
        Rational.new 2 7
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.(285714)")

test "3/7" <|
    \_ ->
        Rational.new 3 7
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.(428571)")

test "1/9" <|
    \_ ->
        Rational.new 1 9
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.(1)")

test "2/9" <|
    \_ ->
        Rational.new 2 9
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.(2)")

test "8/9" <|
    \_ ->
        Rational.new 8 9
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.(8)")

test "7/12" <|
    \_ ->
        Rational.new 7 12
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.58(3)")

test "1/23" <|
    \_ ->
        Rational.new 1 23
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.(0434782608695652173913)")

test "1/97" <|
    \_ ->
        Rational.new 1 97
            |> Maybe.map Rational.toDecimalString
            |> Expect.equal (Just "0.(010309278350515463917525773195876288659793814432989690721649484536082474226804123711340206185567)")
```

## Resources

- [tests/Test/Lib/Rational.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/tests/Test/Lib/Rational.elm)
