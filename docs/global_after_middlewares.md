# Criando Global After Middlewares
**Tabela de conteúdos:**
<ul>
  <li><a href="#after-middleware">Criando Global After Middleware</a></li>
  <li><a href="#after-middleware-conjunto">Criando conjuntos de Global After Middlewares</a></li>
</ul>

Em alguns momentos, vamos precisar executar middlewares após a execução de nossa requisição e para isso precisamos usar Global AfterMiddlewares. O Tupã oferece uma simples funcionalidade para executar os Global After Middlewares. Veja como criar um simples abaixo.

## Criando Global After Middlewares
```golang
func main() {
	server := tupa.NewAPIServer(":6969", exampleManager)

	server.UseGlobalAfterMiddleware(GlobalAfterMiddlewareTest, GlobalAfterMiddleware2)

	server.New()
}

func GlobalAfterMiddlewareTest(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		slog.Info("GlobalAfterMiddlewareTest -> midd after global")
		return next(c)
	}
}

func GlobalAfterMiddleware2(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		slog.Info("GlobalAfterMiddleware2 -> midd after global 2")
		return next(c)
	}
}

func exampleManager() {
	tupa.AddRoutes(tupa.MiddlewareChain{MiddlewareSampleCatsCONJUNTOSROTAS}, noMiddlewaresRoutesManager)
}

func MiddlewareSampleCatsCONJUNTOSROTAS(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		slog.Info("MiddlewareSampleCats -> midd conjuntos de rotas")
		return next(c)
	}
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
	}
}
```

Simples assim declaramos dois AfterMiddlewares com o Tupã. Agora tanto o `GlobalAfterMiddlewareTest` quanto `GlobalAfterMiddlewareTest` serão executados após todos os outros middlewares e após a requisição também.