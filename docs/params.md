# Params e Query Params
**Tabela de conteúdos:**
<ul>
  <li><a href="#param">Param(): Obtendo o parâmetro da requisição</a></li>
  <li><a href="#query-param">QueryParam(): Obtendo unico Query Param</a></li>
  <li><a href="#query-params">QueryParams(): Obtendo múltiplos Query Params</a></li>
</ul>

O Tupã te fornece as funções necessárias tanto para obter os parâmetros da requisição, quanto os query parameters.

Para isso você pode usar as funções `Param(param)`, `QueryParam()`, `QueryParams()`.

<a id="param"></a>
## Obtendo o parâmetro da requisição

Para obter facilmente o parâmetro da requisição. Para isso colocamos o nome do parâmetro na url, usando a sintaxe `/{param}`, depois disso podemos chamar a função `Param(param)` disponível a partir do TupaContext.

```golang
func main() {
	server := tupa.NewAPIServer(":6969")
	exampleManager()
	server.RegisterRoutes(tupa.GetRoutes())
	server.New()
}

func SampleRouteManager() []tupa.RouteInfo {
	return []tupa.RouteInfo{
		{
			Path:   "/{jwt}",
			Method: "GET",
			Handler: func(tc *tupa.TupaContext) error {
				param := tc.Param("jwt")
				tc.SendString(fmt.Sprintf("jwt:, %s", param))

				return nil
			},
		},
	}
}
```

Agora em `http://localhost:6969/<parametro>`, vamos obter o parâmetro correto da requisição:

![Parametro da request](../assets/images/Captura de tela de 2024-04-17 11-58-36.png)

<a id="query-param"></a>
## Obtendo Query Param da requisição

Da mesma forma podemos obter o Query Param (único), com o método `QueryParam()`. Esse método vai retornar um **parâmetro** especifico da nossa URL, então se especificarmos diversos parâmetros, ele vai retornar só o que especificado.

Vamos definir uma rota chamada */param*, e vamos fazer a chamada usando Query Parameter, dessa forma o fim da url vai ficar `/param?<nome_param>=<valor_param>`

```golang
func main() {
	server := tupa.NewAPIServer(":6969")
	exampleManager()
	server.RegisterRoutes(tupa.GetRoutes())
	server.New()
}

func exampleManager() {
	tupa.AddRoutes(tupa.MiddlewareChain{MiddlewareSampleCats}, SampleRouteManager)
}

func SampleRouteManager() []tupa.RouteInfo {
	return []tupa.RouteInfo{
		{
			Path:   "/param",
			Method: "GET",
			Handler: func(tc *tupa.TupaContext) error {
				param := tc.QueryParam("jwt")
				tc.SendString(fmt.Sprintf("jwt: %s", param))

				return nil
			},
		},
	}
}
```

Vamos fazer uma GET request para a url `http://localhost:6969/param?jwt=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc`.

**Output:**

![Parametro da request](../assets/images/Captura de tela de 2024-04-17 11-58-36.png)

```golang
func main() {
	server := tupa.NewAPIServer(":6969")
	exampleManager()
	server.RegisterRoutes(tupa.GetRoutes())
	server.New()
}

func exampleManager() {
	tupa.AddRoutes(tupa.MiddlewareChain{MiddlewareSampleCats}, SampleRouteManager)
}

func SampleRouteManager() []tupa.RouteInfo {
	return []tupa.RouteInfo{
		{
			Path:   "/param",
			Method: "GET",
			Handler: func(tc *tupa.TupaContext) error {
				param := tc.QueryParam("jwt")
				tc.SendString(fmt.Sprintf("jwt: %s", param))

				return nil
			},
		},
	}
}

```

![Parametro da request](../assets/images/Captura de tela de 2024-04-17 12-15-44.png)

* Como foi dito anteriormente, se passado mais de um parâmetro, esse método vai pegar só o que foi especificado no argumento. Podemos conferir essa funcionalidade.

Vamos passar 2 argumentos na URL, e fazer uma requisição para `http://localhost:6969/param?jwt=eyJhbGciOiJIUzI1NiJ9.eyJSb2x&name=victor`

```golang
func main() {
	server := tupa.NewAPIServer(":6969")
	exampleManager()
	server.RegisterRoutes(tupa.GetRoutes())
	server.New()
}

func exampleManager() {
	tupa.AddRoutes(tupa.MiddlewareChain{MiddlewareSampleCats}, SampleRouteManager)
}

func SampleRouteManager() []tupa.RouteInfo {
	return []tupa.RouteInfo{
		{
			Path:   "/param",
			Method: "GET",
			Handler: func(tc *tupa.TupaContext) error {
				param := tc.QueryParam("name")
				tc.SendString(fmt.Sprintf("name: %s", param))

				return nil
			},
		},
	}
}
```

**Output**:

![Parametro da request](../assets/images/Captura de tela de 2024-04-17 12-20-16.png)

<a id="query-params"></a>
## Obtendo Múltiplos Query Params da requisição

Podemos obter facilmente diversos Query Params da nossa requisição usando o método `QueryParams()`, esse método vai nos retornar um `map[string][]string`, ou seja **`parametro: [valores]`**.

Vamos fazer a mesma chamada para `http://localhost:6969/param?jwt=eyJhbGciOiJIUzI1NiJ9.eyJSb2x&name=victor`


```golang
func main() {
	server := tupa.NewAPIServer(":6969")
	exampleManager()
	server.RegisterRoutes(tupa.GetRoutes())
	server.New()
}

func exampleManager() {
	tupa.AddRoutes(tupa.MiddlewareChain{MiddlewareSampleCats}, SampleRouteManager)
}

func SampleRouteManager() []tupa.RouteInfo {
	return []tupa.RouteInfo{
		{
			Path:   "/param",
			Method: "GET",
			Handler: func(tc *tupa.TupaContext) error {
				param := tc.QueryParams()
				tc.SendString(fmt.Sprintf("params: %s", param))

				return nil
			},
		},
	}
}
```

**Output:**
![Parametro da request](../assets/images/Captura de tela de 2024-04-17 12-24-36.png)
