# Reflections on the UI

The [prototyping](../prototype/index.html) and [translating](./index.html) phases of my process led me to an Elm view, i.e. [`View.Page.view`](./views/page.md#view-function), that abstracted the user interface of the entire web application. `View.Page.view` is composed of reusable view functions that I designed based on the [blocks](../prototype/blocks/index.html), i.e. components, that arose from [my decomposition of the design](../prototype/index.html#from-design-to-prototype).

```elm
View.Page.view
    { calculator =
        { line1 = line1
        , line2 = line2
        , onClick = onClick
        }
    , attribution =
        { name = "Dwayne Crooks"
        , title = "Dwayne's GitHub profile"
        , url = "https://github.com/dwayne"
        }
    }
```

All I need in order to display the web application are the two display lines and a click handler. No application logic required. 🙌
