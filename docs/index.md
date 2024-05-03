# Bem vindo ao Tupã ⚡️

O Tupã é um framework backend feito em Go.

A ideia do framework é ser fácil e rápido de usar, te ajudando na criação de aplicações robustas feitas rapidamente.

O único requisito é que [Golang](https://go.dev/dl/), versão 1.21.5 para cima esteja instalado na máquina.

## Instalação

Você pode instalar o Tupã dentro do seu projeto com o comando:


```
$ go get github.com/tupatech/tupa
```

## Iniciando um Servidor

Para iniciarmos um novo servidor, basta instanciarmos um ```NewAPIServer(":porta", nil)``` e fazer o bootstrap da API com o método ```New()```. Inicialize o módulo dentro do diretório desejado ```go mod <nome_modulo>```, e coloque o seguinte conteúdo num arquivo `main.go` 

``` go 
import (
	import "github.com/tupatech/tupa"
)

func main() {
	server := tupa.NewAPIServer(":6969", nil)
	server.New()
}
```

Rode o servidor na máquina ```go run main.go```. No browser em `http://localhost:6969/` vamos receber a seguinte mensagem:

```
"Seja bem vindo ao Tupã framework"
```

[Criando novas rotas](getting_started.md)
