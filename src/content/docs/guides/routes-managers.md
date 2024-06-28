---
title: Routes Managers
description: Learn how to properly manage your Routes
---
## How Routes Managers Work

## Creating Route Manager<a id="route-manager"></a>

We can pass our routes inside functions and pass them as a parameter to the **NewAPIServer** function. Its second parameter should receive a function that will instantiate as many routes as we want. See the example below.

```go
func main() {
	routeManagerExample := func() {
		routes := func() []tupa.RouteInfo {
			return []tupa.RouteInfo{
				{
					Path:   "/",
					Method: "GET",
					Handler: func(c *tupa.TupaContext) error {
						return tupa.WriteJSONHelper(c.Resp, http.StatusOK, "Hello world! :D")
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
		}

		tupa.AddRoutes(nil, routes)
	}

	server := tupa.NewAPIServer(":6969", routeManagerExample)

	server.New()
}
```

In the example above, we pass all our routes already inside the **NewAPIServer**, we will have both the **/** and **/cats** routes.

## Creating Sets of Route Managers<a id="route-manager-conjunto"></a>

We can also create Route Managers to add sets of routes. See the example below:

```go
func main() {
	server := tupa.NewAPIServer(":6969", exampleManager)
	server.New()
}

func exampleManager() {
	tupa.AddRoutes(nil, noMiddlewaresRoutesManager)
}

func noMiddlewaresRoutesManager() []tupa.RouteInfo {
	return []tupa.RouteInfo{
		{
			Path:   "/",
			Method: "GET",
			Handler: func(c *tupa.TupaContext) error {
				return tupa.WriteJSONHelper(c.Resp, http.StatusOK, "Hello world! :D")
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
}
```

This way, we will have the same two routes, but our **func main()** is less cluttered, and we can manage sets of routes more organized and controlled, allowing us to use our middlewares while maintaining a good code architecture.