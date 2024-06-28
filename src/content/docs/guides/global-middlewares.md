---
title: Global Middlewares
description: Learn how to create new Middlewares.
---
## How to create Global Middlewares

It is possible to create middlewares that are executed before all others and are applied to all routes. We can do this with the UseGlobalMiddlewares function. See the example below on how to use it.

```go
func main() {
	server := tupa.NewAPIServer(":6969", exampleManager)

	server.UseGlobalMiddlewares(GlobalMiddleware1)

	server.New()
}

func exampleManager() {
	tupa.AddRoutes(tupa.MiddlewareChain{MiddlewareSampleCatsSetsOfRoutes}, noMiddlewaresRoutesManager)
}

func GlobalMiddleware1(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		slog.Info("GlobalMiddleware1 -> global middleware 1")
		return next(c)
	}
}

func MiddlewareSampleCatsSetsOfRoutes(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		slog.Info("MiddlewareSampleCats -> route set middleware")
		return next(c)
	}
}
```

This way, our Global middleware executed before all other middlewares.

Middlewares are executed in ascending order, so they will be executed from the lowest index to the highest index. The example below shows how to use multiple middleware

```go
func main() {
	server := tupa.NewAPIServer(":6969", exampleManager)

	server.UseGlobalMiddlewares(GlobalMiddleware1, GlobalMiddleware2)

	server.New()
}

func exampleManager() {
	tupa.AddRoutes(tupa.MiddlewareChain{MiddlewareSampleCatsSetsOfRoutes}, noMiddlewaresRoutesManager)
}

func GlobalMiddleware1(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		slog.Info("GlobalMiddleware1 -> global middleware 1")
		return next(c)
	}
}

func GlobalMiddleware2(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		slog.Info("GlobalMiddleware2 -> global middleware 2")
		return next(c)
	}
}

func MiddlewareSampleCatsSetsOfRoutes(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		slog.Info("MiddlewareSampleCats -> route set middleware")
		return next(c)
	}
}
```

Above, we saw how to create middlewares that are executed before all others, but there will be situations where we will need to create middlewares that should be executed after all other middlewares and after the request itself. For this, we should use the After Middlewares.