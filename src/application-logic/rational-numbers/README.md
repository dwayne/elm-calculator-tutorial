# Rational Numbers

A [rational number](https://artofproblemsolving.com/wiki/index.php/Rational_number) is a [real number](https://artofproblemsolving.com/wiki/index.php/Real_number) that can be expressed as the fraction \\( \frac{p}{q} \\) of two [integers](https://artofproblemsolving.com/wiki/index.php/Integer) with a numerator \\( p \\) and a non-zero denominator \\( q \\).

## Public API

```elm
module Lib.Rational exposing
    ( Rational
    , new, zero, fromInt
    , add, sub, mul, div
    , toString, toDecimalString
    )

-- Representation

type Rational

-- Constructors

new : Int -> Int -> Maybe Rational
zero : Rational
fromInt : Int -> Rational

-- Arithmetic

add : Rational -> Rational -> Rational
sub : Rational -> Rational -> Rational
mul : Rational -> Rational -> Rational
div : Rational -> Rational -> Rational

-- Conversion

toString : Rational -> String
toDecimalString : Rational -> String
```
