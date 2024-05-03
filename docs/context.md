# Context no Tupã
Você pode acessar o context da requisição a partir da propriedade Context dentro da struct do **Tupa**

## Context em Middlewares

Podemos facilmente adicionar contexto a uma requisição. No Tupâ existem várias formas de se trabalhar com o contexto através do **TupaContext**. Por exemplo você pode colocar um novo context com o método `SetContext()`, que vai colocar o método na requisição. Para obter o valor do contexto, você pode obter o contexto com os métodos `GetCtx()`, `CtxValue(ctx)`.

* `GetCtx()`: retorna o context inteiro da requisição
* `CtxValue(ctx)`: retorna o contexto específico de acordo com a key especificada

Vamos adicionar um **Contexto** no middleware *MiddlewareSampleRoute()*. Lembrando que em primeiro lugar é chamado os middlewares especificos de rota, e só então os globais.

```golang
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
		ctxMsg := "contexto de alguém interessado em gatos"
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

**output:**
```
context.Background.WithValue(type *http.contextKey, val <not Stringer>).WithValue(type *http.contextKey, val [::1]:6969).WithCancel.WithCancel.WithValue(type mux.contextKey, val <not Stringer>).WithValue(type mux.contextKey, val <not Stringer>).WithValue(type string, val contexto de alguém interessado em gatos)
contexto de alguém interessado em gatos
contexto de alguém interessado em gatos
```
