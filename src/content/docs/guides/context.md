---
title: Context
description: Learn how to handle context.
---
## How to use Context in Tupã

You can access the request context from the **Context** property within the **Tupa struct**.

## Context in Middlewares

We can easily add context to a request. In Tupã, there are various ways to work with context through the **TupaContext**. For example, you can set a new context with the **SetContext()** method, which will attach the context to the request. To obtain the context value, you can use the **GetCtx()** and **CtxValue(ctx)** methods.

1. **GetCtx()**: returns the entire request context.
2. CtxValue(ctx): returns the specific context value according to the specified key.

Let's add a **Context** in the _MiddlewareSampleRoute()_ middleware. Note that route-specific middlewares are called first, followed by global middlewares.

```go
func main() {
	server := tupa.NewAPIServer(":6969", exampleManager)
	server.New()
}

func exampleManager() {
	tupa.AddRoutes(tupa.MiddlewareChain{MiddlewareSampleCats}, SampleRouteManager)
}

func MiddlewareSampleCats(next tupa.APIFunc) tupa.APIFunc {
	return func(tc *tupa.TupaContext) error {
		return next(tc)
	}
}

func MiddlewareSampleRoute(next tupa.APIFunc) tupa.APIFunc {
	return func(tc *tupa.TupaContext) error {
		catsCtxKey := "ctxcats"
		ctxMsg := "context of someone interested in cats"
		newCtx := context.WithValue(tc.GetCtx(), catsCtxKey, ctxMsg)
		tc.SetContext(newCtx)
		
		return next(tc)
	}
}

func SampleRouteManager() []tupa.RouteInfo {
	return []tupa.RouteInfo{
		{
			Path:   "/cats",
			Method: "GET",
			Handler: func(tc *tupa.TupaContext) error {
				ctxFull := tc.GetCtx()
				fmt.Println(ctxFull)

				ctxValue := tc.CtxValue("ctxcats").(string)
				fmt.Println(ctxValue)

				ctxVal := tc.GetCtx().Value("ctxcats").(string)
				fmt.Println(ctxVal)

				resp, err := http.Get("https://cdn2.thecatapi.com/images/dN6eoeLjY.jpg")
				if err != nil {
					return err
				}
				defer resp.Body.Close()
				_, err = io.Copy(*tc.Response(), resp.Body)
				return err
			},
			Middlewares: []tupa.MiddlewareFunc{MiddlewareSampleRoute},
		},
	}
}
```

**Output:**

```bash
context.Background.WithValue(type *http.contextKey, val <not Stringer>).WithValue(type *http.contextKey, val [::1]:6969).WithCancel.WithCancel.WithValue(type mux.contextKey, val <not Stringer>).WithValue(type mux.contextKey, val <not Stringer>).WithValue(type string, val context of someone interested in cats)
context of someone interested in cats
context of someone interested in cats
```