# Constructors

- [`new`](#new)
- [`zero`](#zero)
- [`fromInt`](#fromint)

## `new`

Based on the decisions I made in [Representation](./representation.md) I came up with the following requirements for `new`.

```elm
new 1 2 == Just (Rational 1 2)

new 3 0 == Nothing

new 2 4 == Just (Rational 1 2)
new 3 6 == Just (Rational 1 2)
new 4 8 == Just (Rational 1 2)

new -1 2 == Just (Rational -1 2)
new 1 -2 == Just (Rational -1 2)
new -1 -2 == Just (Rational 1 2)

new -2 4 == Just (Rational -1 2)
new 2 -4 == Just (Rational -1 2)
new -2 -4 == Just (Rational 1 2)
```

The following implementation satisfies the requirements:

```elm
new : Int -> Int -> Maybe Rational
new numer denom =
    if denom == 0 then
        Nothing

    else
        Just (makeRational numer denom)


makeRational : Int -> Int -> Rational
makeRational numer denom =
    let
        divisor =
            gcd numer denom

        g =
            if denom < 0 then
                -divisor

            else
                divisor

        n =
            numer // g

        d =
            denom // g
    in
    Rational n d


gcd : Int -> Int -> Int
gcd a b =
    gcdHelper (abs a) (abs b)


gcdHelper : Int -> Int -> Int
gcdHelper a b =
    if b == 0 then
        a

    else
        gcdHelper b (modBy b a)
```

To remove all the common factors from both the numerator and denominator I divide both by their greatest common divisor. `gcd` implements the [Euclidean algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm), which is an efficient method for computing the [greatest common divisor](https://en.wikipedia.org/wiki/Greatest_common_divisor) (GCD) of two integers.

`gcdHelper` is implemented using tail-recursion so that it can be [optimized into a loop](https://functional-programming-in-elm.netlify.app/recursion/tail-call-elimination.html).

I tested that `new` met the requirements using `elm repl`. The unit tests came later.

## Convenient Constructors

Having to deal with `Maybe` everytime you need a rational number can become tedious. The `zero` and `fromInt` constructors make it quite easy to create the rational numbers for zero and the other integers.

### `zero`

```elm
zero : Rational
zero =
    Rational 0 1
```

### `fromInt`

```elm
fromInt : Rational
fromInt n =
    Rational n 1
```
