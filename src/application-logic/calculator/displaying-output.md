# Displaying Output

Displaying the output was straightforward. The calculator could be in one of 5 states. So, for each state we have to stringify the data that's available and determine within which lines to display them.

```elm
type alias Output =
    { line1 : String
    , line2 : String
    }


toOutput : Calculator -> Output
toOutput (Calculator state) =
    case state of
        Start ->
            Output "" "0"

        Left n ->
            let
                line1 =
                    Rational.toDecimalString <| toRational n

                line2 =
                    toPaddedDecimalString n
            in
            Output line1 line2

        Partial tokens op ->
            let
                line1 =
                    toExpr tokens ++ line2

                line2 =
                    Operator.toString op
            in
            Output line1 line2

        Right tokens op n ->
            let
                line1 =
                    toExpr tokens ++ Operator.toString op ++ right

                right =
                    Rational.toDecimalString <| toRational n

                line2 =
                    toPaddedDecimalString n
            in
            Output line1 line2

        Answer tokens answer ->
            let
                line1 =
                    toExpr tokens ++ "=" ++ line2

                line2 =
                    case answer of
                        Ok r ->
                            Rational.toDecimalString r

                        Err _ ->
                            "TODO: Display an appropriate error message."
            in
            Output line1 line2


toPaddedDecimalString : Decimal -> String
toPaddedDecimalString n =
    case n of
        Whole w ->
            String.fromInt w

        Fractional w f p ->
            String.concat
                [ String.fromInt w
                , "."
                , if f == 0 && p == 1 then
                    ""

                  else
                    String.padLeft
                        (String.length (String.fromInt p) - 1)
                        '0'
                        (String.fromInt f)
                ]


toExpr : List Token -> String
toExpr =
    String.concat << List.map Token.toString << List.reverse


toRational : Decimal -> Rational
toRational n =
    case n of
        Whole w ->
            Rational.fromInt w

        Fractional w f p ->
            Maybe.map2 Rational.add (Rational.new w 1) (Rational.new f p)
                |> Maybe.withDefault Rational.zero
```
