# Criando Global Middlewares
**Tabela de conteúdos:**
<ul>
  <li><a href="#route-manager">Criando Global Middlewares</a></li>
</ul>

É possível criar middlewares que são executados antes de todos os outros e que é aplicado para *todas as rotas*. Podemos fazer isso com a função `UseGlobalMiddlewares`. Veja o exemplo abaixo de como usar.

```golang
func main() {
	server := tupa.NewAPIServer(":6969", exampleManager)

	server.UseGlobalMiddlewares(GlobalMiddleware1)

	server.New()
}

func exampleManager() {
	tupa.AddRoutes(tupa.MiddlewareChain{MiddlewareSampleCatsCONJUNTOSROTAS}, noMiddlewaresRoutesManager)
}

func GlobalMiddleware1(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		slog.Info("GlobalMiddleware1 -> midd global 1")
		return next(c)
	}
}

func MiddlewareSampleCatsCONJUNTOSROTAS(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		slog.Info("MiddlewareSampleCats -> midd conjuntos de rotas")
		return next(c)
	}
}

```

Dessa forma nosso middleware Global executou *antes* de todos os outros middlewares.

Os middlewares são executados por ordem crescente, portanto serão executados do menor índice para o maior índice, o exemplo abaixo mostra como se deve usar múltiplos middlewares.

```golang
func main() {
	server := tupa.NewAPIServer(":6969", exampleManager)

	server.UseGlobalMiddlewares(GlobalMiddleware1, GlobalMiddleware2)

	server.New()
}

func exampleManager() {
	tupa.AddRoutes(tupa.MiddlewareChain{MiddlewareSampleCatsCONJUNTOSROTAS}, noMiddlewaresRoutesManager)
}

func GlobalMiddleware1(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		slog.Info("GlobalMiddleware1 -> midd global 1")
		return next(c)
	}
}

func GlobalMiddleware2(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		slog.Info("GlobalMiddleware2 -> midd global 2")
		return next(c)
	}
}

func MiddlewareSampleCatsCONJUNTOSROTAS(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		slog.Info("MiddlewareSampleCats -> midd conjuntos de rotas")
		return next(c)
	}
}
```

Acima vimos como criar middlewares que são executados antes de todos os outros, porém vão ter situações que vamos precisar criar middlewares que devem ser executados *depois* de todos os outros middlewares e depois da requisição em si. Para isso devemos usar os [After Middlewares](after_middlewares.md)