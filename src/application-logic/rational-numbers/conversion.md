# Conversion

- [`toString`](#tostring)
- [`toDecimalString`](#todecimalstring)

## `toString`

It converts a rational number to either an integral or fractional string. The requirements are:

```elm
toString zero == "0"

-- A good candidate for a fuzz test:
toString (fromInt n) == String.fromInt n

Maybe.map toString (new 5 2) == Just "5/2"
Maybe.map toString (new -5 2) == Just "-5/2"
Maybe.map toString (new 5 -2) == Just "-5/2"
Maybe.map toString (new -5 -2) == Just "5/2"

Maybe.map toString (new 3 6) == Just "1/2"
Maybe.map toString (new 6 3) == Just "2"
```

The following implementation satisfies the requirements:

```elm
toString : Rational -> String
toString (Rational n d) =
    if d == 1 then
        String.fromInt n

    else
        String.fromInt n ++ "/" ++ String.fromInt d
```

`n` and `d` have no common factors because of the ways in which rational numbers can constructed. So we know the rational number is in lowest terms. Also, if the rational number is negative then `n` is negative and `d` is positive so we don't need to worry about where to place the minus sign. If `d` is `1` then we return the string representation of the integer `n`. Otherwise, we return the string representation of the integer `n` over the string representation of the integer `d`.

## `toDecimalString`

It converts a rational number to either an integral or decimal string. The requirements are:

```elm
toDecimalString zero == "0"

-- Another good candidate for a fuzz test:
toDecimalString (fromInt n) == String.fromInt n

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

Here's the start of an implementation that satisfies the requirements:

```elm
toDecimalString : Rational -> String
toDecimalString (Rational n d) =
    if d == 1 then
        String.fromInt n

    else
        let
            sign =
                if n < 0 then
                    "-"

                else
                    ""

            m =
                abs n

            quotient =
                m // d

            remainder =
                modBy d m
        in
        sign ++ String.fromInt quotient ++ "." ++ decimalRep remainder d
```

The interesting part is handled by `decimalRep remainder d`, where `1 <= remainder < d`. Let's develop an understanding for the problem that `decimalRep` needs to solve.

### Decimal Notation

Decimal notation is a way of representing numbers using powers of `10`. For e.g.

\\[ 123.456 = 1 \times 10^2 + 2 \times 10^1 + 3 \times 10^0 + 4 \times 10^{-1} + 5 \times 10^{-2} + 6 \times 10^{-3} \\]

As a result, it is easier to convert a fraction to a decimal when its denominator is a power of `10`. For e.g.

\\[ \frac{98765}{1000} = 98.765 \\]


### Multiplication by `1`

Let `r` be any rational number. Then, `r * 1 = r`. In particular, notice that `10/10 = 1`. So, `r * 10/10 = r = 10r * 1/10`. If `r` has numerator `n` and denominator `d` then `r = 10n/d * 1/10`. How can this help us? We can use this to get powers of `10` in the denominator to make it easier to extract the decimal digits. Let's look at a few examples:

#### Example 1: `1/2`

\\[
\begin{align}
\frac{1}{2} &= \frac{1}{2} \times 1 \\\\
            &= \frac{1}{2} \times \frac{10}{10} \\\\
            &= \frac{10}{2} \times \frac{1}{10} \\\\
            &= 5 \times \frac{1}{10} \\\\
            &= \frac{5}{10} \\\\
            &= 0.5
\end{align}
\\]

#### Example 2: `1/4`

\\[
\begin{align}
\frac{1}{4} &= \frac{1}{4} \times 1 \\\\
            &= \frac{1}{4} \times \frac{10}{10} \\\\
            &= \frac{10}{4} \times \frac{1}{10} \\\\
            &= 2 \frac{1}{2} \times \frac{1}{10} \\\\
            &= (2 + \frac{1}{2}) \times \frac{1}{10} \\\\
            &= \frac{2}{10} + 0.5 \times \frac{1}{10} \\\\
            &= 0.2 + 0.05 \\\\
            &= 0.25
\end{align}
\\]

#### Example 3: `1/8`

\\[
\begin{align}
\frac{1}{8} &= \frac{1}{8} \times 1 \\\\
            &= \frac{1}{8} \times \frac{10}{10} \\\\
            &= \frac{10}{8} \times \frac{1}{10} \\\\
            &= 1 \frac{1}{4} \times \frac{1}{10} \\\\
            &= (1 + \frac{1}{4}) \times \frac{1}{10} \\\\
            &= \frac{1}{10} + 0.25 \times \frac{1}{10} \\\\
            &= 0.1 + 0.025 \\\\
            &= 0.125
\end{align}
\\]

#### Example 4: `3/7`

\\[
\begin{align}
\frac{3}{7} &= \frac{3}{7} \times 1 \\\\
            &= \frac{3}{7} \times \frac{10}{10} \\\\
            &= \frac{30}{7} \times \frac{1}{10} \\\\
            &= 4 \frac{2}{7} \times \frac{1}{10} \\\\
            &= (4 + \frac{2}{7}) \times \frac{1}{10} \\\\
            &= 0.4 + \frac{2}{7} \times \frac{1}{10} \\\\
\end{align}
\\]

\\[
\begin{align}
\frac{2}{7} &= \frac{2}{7} \times 1 \\\\
            &= \frac{2}{7} \times \frac{10}{10} \\\\
            &= \frac{20}{7} \times \frac{1}{10} \\\\
            &= 2 \frac{6}{7} \times \frac{1}{10} \\\\
            &= (2 + \frac{6}{7}) \times \frac{1}{10} \\\\
            &= 0.2 + \frac{6}{7} \times \frac{1}{10} \\\\
\end{align}
\\]

\\[
\begin{align}
\frac{6}{7} &= \frac{6}{7} \times 1 \\\\
            &= \frac{6}{7} \times \frac{10}{10} \\\\
            &= \frac{60}{7} \times \frac{1}{10} \\\\
            &= 8 \frac{4}{7} \times \frac{1}{10} \\\\
            &= (8 + \frac{4}{7}) \times \frac{1}{10} \\\\
            &= 0.8 + \frac{4}{7} \times \frac{1}{10} \\\\
\end{align}
\\]

\\[
\begin{align}
\frac{4}{7} &= \frac{4}{7} \times 1 \\\\
            &= \frac{4}{7} \times \frac{10}{10} \\\\
            &= \frac{40}{7} \times \frac{1}{10} \\\\
            &= 5 \frac{5}{7} \times \frac{1}{10} \\\\
            &= (5 + \frac{5}{7}) \times \frac{1}{10} \\\\
            &= 0.5 + \frac{5}{7} \times \frac{1}{10} \\\\
\end{align}
\\]

\\[
\begin{align}
\frac{5}{7} &= \frac{5}{7} \times 1 \\\\
            &= \frac{5}{7} \times \frac{10}{10} \\\\
            &= \frac{50}{7} \times \frac{1}{10} \\\\
            &= 7 \frac{1}{7} \times \frac{1}{10} \\\\
            &= (7 + \frac{1}{7}) \times \frac{1}{10} \\\\
            &= 0.7 + \frac{1}{7} \times \frac{1}{10} \\\\
\end{align}
\\]

\\[
\begin{align}
\frac{1}{7} &= \frac{1}{7} \times 1 \\\\
            &= \frac{1}{7} \times \frac{10}{10} \\\\
            &= \frac{10}{7} \times \frac{1}{10} \\\\
            &= 1 \frac{3}{7} \times \frac{1}{10} \\\\
            &= (1 + \frac{3}{7}) \times \frac{1}{10} \\\\
            &= 0.1 + \frac{3}{7} \times \frac{1}{10} \\\\
\end{align}
\\]

And, it will start to repeat. So,

\\[
\begin{align}
\frac{3}{7} &= 0.4 + \frac{2}{7} \times \frac{1}{10} \\\\
            &= 0.4 + (0.2 + \frac{6}{7} \times \frac{1}{10}) \times \frac{1}{10} \\\\
            &= 0.4 + (0.2 + (0.8 + \frac{4}{7} \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{10} \\\\
            &= 0.4 + (0.2 + (0.8 + (0.5 + \frac{5}{7} \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{10} \\\\
            &= 0.4 + (0.2 + (0.8 + (0.5 + (0.7 + \frac{1}{7} \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{10} \\\\
            &= 0.4 + (0.2 + (0.8 + (0.5 + (0.7 + (0.1 + \frac{3}{7} \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{10} \\\\
            &= 0.4 + 0.02 + (0.8 + (0.5 + (0.7 + (0.1 + \frac{3}{7} \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{100} \\\\
            &= 0.4 + 0.02 + 0.008 + (0.5 + (0.7 + (0.1 + \frac{3}{7} \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{1000} \\\\
            &= 0.4 + 0.02 + 0.008 + 0.0005 + (0.7 + (0.1 + \frac{3}{7} \times \frac{1}{10}) \times \frac{1}{10}) \times \frac{1}{10000} \\\\
            &= 0.4 + 0.02 + 0.008 + 0.0005 + 0.00007 + (0.1 + \frac{3}{7} \times \frac{1}{10}) \times \frac{1}{100000} \\\\
            &= 0.4 + 0.02 + 0.008 + 0.0005 + 0.00007 + 0.000001 + \frac{3}{7} \times \frac{1}{1000000} \\\\
            &= 0.428571 + \frac{3}{7} \times \frac{1}{1000000} \\\\
\end{align}
\\]

### Towards an Algorithm

Let's take a closer look at how we determined the decimal representation for `3/7`.

| n | d | 10n | q | r | memo | terms |
|---|---|-----|---|---|------|-------|
| 3 | 7 | 30  | 4 | 2 | `[ (3, (4, 2)) ]` | `[ (4, 2) ]` |
| 2 | 7 | 20  | 2 | 6 | `[ (2, (2, 6)), (3, (4, 2)) ]` | `[ (2, 6), (4, 2) ]` |
| 6 | 7 | 60  | 8 | 4 | `[ (6, (8, 4)), (2, (2, 6)), (3, (4, 2)) ]` | `[ (8, 4), (2, 6), (4, 2) ]` |
| 4 | 7 | 40  | 5 | 5 | `[ (4, (5, 5)), (6, (8, 4)), (2, (2, 6)), (3, (4, 2)) ]` | `[ (5, 5), (8, 4), (2, 6), (4, 2) ]` |
| 5 | 7 | 50  | 7 | 1 | `[ (5, (7, 1)), (4, (5, 5)), (6, (8, 4)), (2, (2, 6)), (3, (4, 2)) ]` | `[ (7, 1), (5, 5), (8, 4), (2, 6), (4, 2) ]` |
| 1 | 7 | 10  | 1 | 3 | `[ (1, (1, 3)), (5, (7, 1)), (4, (5, 5)), (6, (8, 4)), (2, (2, 6)), (3, (4, 2)) ]` | `[ (1, 3), (7, 1), (5, 5), (8, 4), (2, 6), (4, 2) ]` |
| 3 | 7 | &mdash; | &mdash; | &mdash; | &mdash; | &mdash; |

where `q = 10n div d` and `r = 10n mod d`. We keep going until either `(n, d)` repeats or `r = 0`.

### `decimalRep`

Based on the above analysis, here's an implementation for `decimalRep` that satisfies the requirements:

```elm
decimalRep : Int -> Int -> String
decimalRep n d =
    decimalRepHelper n d [] Dict.empty


decimalRepHelper : Int -> Int -> List ( Int, Int ) -> Dict Int ( Int, Int ) -> String
decimalRepHelper n d terms memo =
    case Dict.get n memo of
        Just ( q, r ) ->
            displayRepeating ( q, r ) terms ")"

        Nothing ->
            let
                n10 =
                    n * 10

                q =
                    n10 // d

                r =
                    modBy d n10
            in
            if r == 0 then
                displayTerminating (( q, r ) :: terms) ""

            else
                decimalRepHelper
                    r
                    d
                    (( q, r ) :: terms)
                    (Dict.insert n ( q, r ) memo)


displayTerminating : List ( Int, Int ) -> String -> String
displayTerminating terms output =
    case terms of
        [] ->
            output

        ( q, _ ) :: rest ->
            displayTerminating rest (String.fromInt q ++ output)


displayRepeating : ( Int, Int ) -> List ( Int, Int ) -> String -> String
displayRepeating marker terms output =
    case terms of
        [] ->
            output

        ( q, r ) :: rest ->
            let
                s =
                    if ( q, r ) == marker then
                        "(" ++ String.fromInt q

                    else
                        String.fromInt q
            in
            displayRepeating marker rest (s ++ output)
```

`decimalRepHelper`, `displayTerminating`, and `displayRepeating` are all implemented using tail-recursion so they can be [optimized into loops](https://functional-programming-in-elm.netlify.app/recursion/tail-call-elimination.html).
