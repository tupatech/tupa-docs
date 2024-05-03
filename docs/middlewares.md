# Middlewares
**Tabela de conteúdos:**
<ul>
  <li><a href="#middlewares-simples">Middlewares simples</a></li>
  <li><a href="#rotas-middlewares-diferetes">Middlewares diferentes para Conjuntos de rotas</a></li>
  <li><a href="#middlewares-grupo-rotas-especificos">Middlewares em conjuntos de rotas + especificos de rotas</a></li>
</ul>

Usar middlewares no Tupã é muito fácil, podemos implementar middlewares tanto a nível de *rota* quando para *conjuntos de rotas*. 

<a id="middlewares-simples"></a>
## Middlewares simples

Vamos adicionar um middleware simples a nível de rota. Basta adicionar uma nova propriedade `Middlewares` dentro do objeto do endpoint.

Vamos adicionar um **middleware** na rota `/cats`.

```golang
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
					Middlewares: []tupa.MiddlewareFunc{
						MiddlewareSampleCats,
					},
				},
			}
		}

		tupa.AddRoutes(nil, routes)
	}

	server := tupa.NewAPIServer(":6969", routeManagerExample)

	server.RegisterRoutes(routeInfo)
	server.New()
}

func MiddlewareSampleCats(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		c.Resp.Header().Set("Content-Type", "image/jpeg")
		c.Resp.Header().Add("Referrer-Policy", "alguem interessado em gatos")
		return next(c)
	}
}
```

Podemos obter o resultado do middleware acima, basta apertar f12 e conferir a requisição na aba **Network** do nosso *devtools*.

![Image title](../assets/images/Captura de tela de 2024-04-15 16-07-15.png)

<a id="rotas-middlewares-diferetes"></a>
## Conjuntos de rotas com middlewares diferentes

Mas pode ser que queremos adicionar middlewares diferentes para conjuntos de rotas diferentes. Nesse caso podemos armazenar nossas rotas em funções e chamar o método `GetRoutes()` do Tupã como parâmetro a função **RegisterRoutes()**. Veja um exemplo abaixo:

```golang
func main() {
	server := tupa.NewAPIServer(":6969", exampleManager())
	server.New()
}

func MiddlewareSampleCats(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		c.Resp.Header().Set("Content-Type", "image/jpeg")
		c.Resp.Header().Add("Referrer-Policy", "alguem interessado em gatos")
		return next(c)
	}
}

func exampleManager() {
	tupa.AddRoutes(nil, SampleViewsManager)
	tupa.AddRoutes(tupa.MiddlewareChain{MiddlewareSampleCats}, SampleRouteManager)
}

func SampleViewsManager() []tupa.RouteInfo {
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

func SampleRouteManager() []tupa.RouteInfo {
	return []tupa.RouteInfo{
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

Esse código vai colocar nosso middleware como anteriormente, porém agora está adicionando em um escopo maior, ao invés de ser um middleware de rota ele agora é um middleware que age sobre um **conjunto de rotas**. Dessa forma podemos passar quantas rotas quisermos para um middleware específico.

<a id="middlewares-grupo-rotas-especificos"></a>
## Middlewares em conjuntos de rotas + rota específica

Podemos também adicionar os middlewares para conjuntos de rotas e específicos de rota juntos. Nesse caso a ordem será que os **especificos de rota** terão precedência sobre os de *grupo* na execução. Vejamos no código a seguir:

```golang
func main() {
	server := tupa.NewAPIServer(":6969", exampleManager())
	server.New()
}

func MiddlewareSampleCats(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		fmt.Println("Printado depois")
		return next(c)
	}
}

func MiddlewareSampleRoute(next tupa.APIFunc) tupa.APIFunc {
	return func(c *tupa.TupaContext) error {
		fmt.Println("Printado antes")
		c.Resp.Header().Set("Content-Type", "text/plain")
		c.Resp.Header().Add("Referrer-Policy", "alguem interessado em gatos")
		return next(c)
	}
}

func exampleManager() {
	tupa.AddRoutes(nil, SampleViewsManager)
	tupa.AddRoutes(tupa.MiddlewareChain{MiddlewareSampleCats}, SampleRouteManager)
}

func SampleViewsManager() []tupa.RouteInfo {
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

func SampleRouteManager() []tupa.RouteInfo {
	return []tupa.RouteInfo{
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
			Middlewares: []tupa.MiddlewareFunc{MiddlewareSampleRoute},
		},
	}
}
```

**Ouput:**
```bash
Servidor iniciado na porta: :6969
Printado antes
Printado depois
```

Porém, em alguns casos vamos precisar armazenar algum dado após qualquer requisição for concluída e após todos conjuntos de AfterMiddlewares, para isso devemos usar os [Middlewares Globais](global_middlewares.md)