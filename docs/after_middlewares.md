# Criando After Middlewares
**Tabela de conteúdos:**
<ul>
  <li><a href="#middleware">Criando After Middleware</a></li>
</ul>

Podemos criar After Middlewares específicos de rotas, dessa forma, eles serão executados após os middlewares Globais, de Conjuntos de Rotas, Específicos de rotas, Requisição, respectivamente. Veja o exemplo abaixo:

```golang
func main() {
	server := tupa.NewAPIServer(":6969", exampleManager)
	server.New()
}

func exampleManager() {
	tupa.AddRoutes(nil, SampleRouteManager)
}

func AfterMiddlewareTest(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		slog.Info("AfterMiddlewareTest -> midd after route")
		return next(c)
	}
}

func MiddlewareSampleRoute(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		catsCtxKey := "ctxcats"
		ctxMsg := "contexto de alguém interessado em gatos"

		slog.Info("MiddlewareSampleRoute -> midd especifico rota")

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

Dessa forma criamos after middlewares específicos de rotas facilmente, e podemos adicionarmos quantos precisarmos em nossa requisição.