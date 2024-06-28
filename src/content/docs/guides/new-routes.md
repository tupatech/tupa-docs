---
title: New Routes
description: Learn how to register new routes.
---
## How Route Registration Works

## Simple Registration<a id="register-simple"></a>

In a simple way, we can instantiate a route by calling the method **RegisterRoutes([]tupa.RouteInfo{routeInfo})**, which we can easily access from our instantiated server.

```go
func main() {
    server := tupa.NewAPIServer(":6969", nil)
    routeInfo := tupa.RouteInfo{
        Path:   "/",
        Method: "GET",
        Handler: func(c *tupa.TupaContext) error {
            return tupa.WriteJSONHelper(c.Resp, http.StatusOK, "Hello world! :D")
        },
    }
    server.RegisterRoutes([]tupa.RouteInfo{routeInfo})

    server.New()
}
```

Now at http://localhost:6969/ we will get the message "Hello world! :D".

In Tupã, by default, every handler must receive a **TupaContext** and *return an error*. Through TupaContext, you will be able to access various functionalities to make your request successful.

## Registering More Routes<a id="register-more-routes"></a>

To register new routes, we can simply add more paths to the routeInfo array.

```go
package main

import (
    "io"
    "net/http"

    "github.com/tupatech/tupa"
)

func main() {
    server := tupa.NewAPIServer(":6969", nil)
    routeInfo := []tupa.RouteInfo{
        {
            Path:   "/",
            Method: "GET",
            Handler: func(tc *tupa.TupaContext) error {
                return tupa.WriteJSONHelper(tc.Resp, http.StatusOK, "Hello world! :D")
            },
        },
        {
            Path:   "/cats",
            Method: "GET",
            Handler: func(c *tupa.TupaContext) error {
                resp, err := http.Get("https://cdn2.thecatapi.com/images/dN6eoeLjY.jpg")
                if err != nil {
                    return err
                }
                defer resp.Body.Close()
                _, err = io.Copy(c.Resp, resp.Body)
                return err
            },
        },
    }

    server.RegisterRoutes(routeInfo)
    server.New()
}
```

Now we will have two endpoints registered, **/** and **/cats**. If we go to http://localhost:6969/cats, we will see a picture of a 🐈.

However, in a real application, we need to maintain a more organized architecture. For this, we should use **Route Managers**.