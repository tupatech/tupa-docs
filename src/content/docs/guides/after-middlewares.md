---
title: After Middlewares
description: Learn how to create new Middlewares.
---
## How to create After Middlewares

We can create route-specific After Middlewares, which will be executed after the Global middlewares, Route Set middlewares, Route-specific middlewares, and the Request, respectively. See the example below:

```go
func main() {
	server := tupa.NewAPIServer(":6969", exampleManager)
	server.New()
}

func exampleManager() {
	tupa.AddRoutes(nil, SampleRouteManager)
}

func AfterMiddlewareTest(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		slog.Info("AfterMiddlewareTest -> after route middleware")
		return next(c)
	}
}

func MiddlewareSampleRoute(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		catsCtxKey := "ctxcats"
		ctxMsg := "context of someone interested in cats"

		slog.Info("MiddlewareSampleRoute -> specific route middleware")

		newCtx := context.WithValue(c.GetCtx(), catsCtxKey, ctxMsg)

		c.SetContext(newCtx)

		return next(c)
	}
}

func SampleRouteManager() []tupa.RouteInfo {
	return []tupa.RouteInfo{
		{
			Path:   "/param",
			Method: "GET",
			Handler: func(c *tupa.TupaContext) error {
				slog.Info("hello world")
				c.SendString("Hello world")

				return nil
			},
			Middlewares:      []tupa.MiddlewareFunc{MiddlewareSampleRoute},
			AfterMiddlewares: []tupa.MiddlewareFunc{AfterMiddlewareTest},
		},
	}
}
```

This way, we can easily create route-specific after middlewares and add as many as we need to our request.