# Calculator

The logical representation of the calculator. It has an internal data structure that it uses to keep track of the infix expression that the user builds one key press at a time.

## Public API

```elm
module Data.Calculator exposing
    ( Calculator
    , new
    , press
    , Output, toOutput
    )

import Data.Key exposing (Key)

-- Representation

type Calculator

-- Constructor

new : Calculator

-- Update

press : Key -> Calculator -> Calculator

-- Conversion

type alias Output =
    { line1 : String
    , line2 : String
    }

toOutput : Calculator -> Output
```
