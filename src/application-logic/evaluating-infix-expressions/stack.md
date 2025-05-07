# Stack

A stack is a data structure that follows the Last In, First Out (LIFO) principle, meaning the last element added is the first one to be removed. It operates like a stack of plates, where you can only add or remove plates from the top.

## Public API

```elm
module Lib.Stack exposing
    ( Stack
    , new
    , isEmpty
    , push, pop
    )

-- Representation

type Stack a

-- Constructor

new : Stack

-- Query

isEmpty : Stack -> Bool

-- Modifiers

push : a -> Stack a -> Stack a
pop : Stack a -> Maybe ( a, Stack a )
```

## Representation

I represent a stack using a list where the head of the list corresponds to the top of the stack.

```elm
type Stack a
    = Stack (List a)
```

## Constructor

The one constructor, `new`, creates an empty stack which is just an empty list.

```elm
new : Stack a
new =
    Stack []
```

## Query

A stack is empty if it's the empty list.

```elm
isEmpty : Stack a -> Bool
isEmpty (Stack xs) =
    xs == []
```

## Modifiers

The two main operations of a stack are `push` and `pop`.

### `push`

It adds an element to the top of the stack.

```elm
push : a -> Stack a -> Stack a
push x (Stack xs) =
    Stack (x :: xs)
```

### `pop`

It removes and returns the element at the top of the stack. We have to take into account that the stack may be empty.

```elm
pop : Stack a -> Maybe ( a, Stack a )
pop (Stack xs) =
    case xs of
        [] ->
            Nothing

        x :: rest ->
            Just ( x, Stack rest )
```

## Resources

- [src/Lib/Stack.elm](https://github.com/dwayne/elm-calculator/blob/1.0.0/src/Lib/Stack.elm)
- [GeeksforGeeks: Stack Data Structure](https://www.geeksforgeeks.org/stack-data-structure/)
- [Wikipedia: Stack (abstract data type)](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))
