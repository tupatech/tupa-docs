# Como funciona o registro de rotas
**Tabela de conteúdos:**
<ul>
  <li><a href="#registro-simples">Registro Simples</a></li>
  <li><a href="#registro-rotas">Registro de mais rotas</a></li>
</ul>

 <a id="registro-simples"></a>
## Registro simples
De forma simples, podemos instanciar uma rota ao chamar o método `RegisterRoutes([]tupa.RouteInfo{routeInfo})`, que podemos acessar facilmente a partir do nosso servidor instanciado.

```golang
func main() {
	server := tupa.NewAPIServer(":6969")
	routeInfo := tupa.RouteInfo{
		Path:   "/",
		Method: "GET",
		Handler: func(tc *tupa.TupaContext) error {
			return tupa.WriteJSONHelper(*tc.Response(), http.StatusOK, "Hello world! :D")
		},
	}
	server.RegisterRoutes([]tupa.RouteInfo{routeInfo})

	server.New()
}
```

Agora em `http://localhost:6969/`iremos obter a mensagem *"Hello world! :D"*.

No Tupã, por padrão todo handler deve receber um TupaContext e retornar um erro. Através do TupaContext você será capaz de acessar diversas funcionalidades para a sua requisição ser bem sucedida.

<a id="registro-rotas"></a>
## Registro de mais rotas
Para fazer o registro de novas rotas, podemos simplesmente adicionar mais paths ao array `routeInfo`


```golang
package main

import (
	"io"
	"net/http"

	"github.com/tupatech/tupa"
)

func main() {
	server := tupa.NewAPIServer(":6969")
	routeInfo := []tupa.RouteInfo{
		{
			Path:   "/",
			Method: "GET",
			Handler: func(tc *tupa.TupaContext) error {
				return tupa.WriteJSONHelper(*tc.Response(), http.StatusOK, "Hello world! :D")
			},
		},
		{
			Path:   "/cats",
			Method: "GET",
			Handler: func(tc *tupa.TupaContext) error {
				resp, err := http.Get("https://cdn2.thecatapi.com/images/dN6eoeLjY.jpg")
				if err != nil {
					return err
				}
				defer resp.Body.Close()
				_, err = io.Copy(*tc.Response(), resp.Body)
				return err
			},
		},
	}

	server.RegisterRoutes(routeInfo)
	server.New()
}

```

Agora teremos os dois endpoints registrados, se `/`e `/cats`. Se formos em `http://localhost:6969/cat` vamos ver a foto de um 🐈.

Porém, em alguns casos vamos precisar registrar rotas com regras diferentes, para isso devemos usar os [middlewares](middlewares.md). 