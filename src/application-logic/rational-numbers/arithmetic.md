# Arithmetic

- [Addition](#addition)
- [Subtraction](#subtraction)
- [Multiplication](#multiplication)
- [Division](#division)

## Addition

\\[ \frac{n_1}{d_1} + \frac{n_2}{d_2} = \frac{n_1d_2 + n_2d_1}{d_1d_2} \\]

```elm
add : Rational -> Rational -> Rational
add (Rational n1 d1) (Rational n2 d2) =
    makeRational (n1 * d2 + n2 * d1) (d1 * d2)
```

## Subtraction

\\[ \frac{n_1}{d_1} - \frac{n_2}{d_2} = \frac{n_1d_2 - n_2d_1}{d_1d_2} \\]

```elm
sub : Rational -> Rational -> Rational
sub (Rational n1 d1) (Rational n2 d2) =
    makeRational (n1 * d2 - n2 * d1) (d1 * d2)
```

## Multiplication

\\[ \frac{n_1}{d_1} \times \frac{n_2}{d_2} = \frac{n_1n_2}{d_1d_2} \\]

```elm
mul : Rational -> Rational -> Rational
mul (Rational n1 d1) (Rational n2 d2) =
    makeRational (n1 * n2) (d1 * d2)
```

## Division

\\[ \frac{n_1}{d_1} \div \frac{n_2}{d_2} = \frac{n_1}{d_1} \times \frac{d_2}{n_2} = \frac{n_1d_2}{d_1n_2} \text{, } n_2 \neq 0 \\]

```elm
div : Rational -> Rational -> Rational
div (Rational n1 d1) (Rational n2 d2) =
    if n2 == 0 then
        zero

    else
        makeRational (n1 * d2) (d1 * n2)
```

For division by zero, I chose to return the zero rational number rather than to signal an error.

### Exercise

Implement `div : Rational -> Rational -> Maybe Rational`, such that `div r zero == Nothing`, and solve the downstream consequences of this change.
