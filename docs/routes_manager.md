# Criando Routes Managers
**Tabela de conteúdos:**
<ul>
  <li><a href="#route-manager">Criando Route Manager</a></li>
  <li><a href="#route-manager-conjunto">Criando conjuntos de route Manager</a></li>
</ul>

 <a id="route-manager"></a>
 ## Criando Route Manager
 Podemos passar nossas rotas dentro de funções e passa-las como parâmetro para a função `NewAPIServer`. O segundo parâmetro dela deve receber uma função que vai instanciar quantas rotas quisermos. Veja o exemplo abaixo.

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
				},
			}
		}

		tupa.AddRoutes(nil, routes)
	}

	server := tupa.NewAPIServer(":6969", routeManagerExample)

	server.New()
}
```

No exemplo acima, passamos todas nossas já dentro do NewAPIServer, teremos tanto a rota `/`quando a `/cats`.

 <a id="route-manager-conjunto"></a>
 ## Route Manager Conjunto rotas

 Podemos também criar Route Managers para adicionarmos conjuntos de rotas. Veja o exemplo abaixo:

```golang
func main() {
	server := tupa.NewAPIServer(":6969", exampleManager)
	server.New()
}

func exampleManager() {
	tupa.AddRoutes(tupa.MiddlewareChain{MiddlewareSampleCatsCONJUNTOSROTAS}, noMiddlewaresRoutesManager)
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

 Dessa forma teremos do mesmo jeito as duas rotas, porém nossa func main() fica menos poluída, e poderemos administrar conjuntos de rotas de forma mais organizada e controlada, isso vai permitir que usemos nossos [middlewares](middlewares.md) mantendo uma boa arquitetura do nosso código. 
