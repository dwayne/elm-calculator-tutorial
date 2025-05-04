# Representation

A rational number can be represented as follows:

```elm
type Rational
    = Rational Int Int
```

So, for example, one-half can be represented by `Rational 1 2`.

## Zero in the Denominator

By definition, a rational number is not supposed to have a zero in its denominator. But, the above representation doesn't prevent this possibility since, for example, `Rational 3 0` is a valid value of type `Rational`. However, we can control the way values of type `Rational` get created by not exporting the type's constructor and instead exporting a custom function, in this case `new`, that constructs values which obey the definition of a rational number.

We call the `Rational` type an [opaque type](https://elm-radio.com/episode/intro-to-opaque-types/) since its constructors are private to the module. It's opaque because users of the module can't see and thus access the internal details of the type.

We call `new` a [smart constructor](https://wiki.haskell.org/Smart_constructors) because it uses a bit of logic to decide how and when to construct a value of type `Rational`.

## Equivalent Rational Numbers

One-half can also be represented by `Rational 2 4`, `Rational 3 6`, `Rational 4 8`, and so on. I decided to use the representation that had all common factors removed from both the numerator and denominator.

## Negative Rational Numbers

Negative one-half can be represented by `Rational -1 2` or `Rational 1 -2`. I decided to represent negative rational numbers such that the numerator always contains the negative value.
