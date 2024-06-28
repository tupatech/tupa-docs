---
title: Fast Start
---
# Welcome to Tupã Framework ⚡️

Tupã is a backend framework made in Go.

The idea behind it is to be easy and fast to use, helping you create robust applications quickly.

The only requirement is that Golang, version 1.21.5 or higher, is installed on the machine.

## Installation

You can install Tupã within your project with the following command:

```bash
go get github.com/tupatech/tupa
```

## Starting a Server

To start a new server, simply instantiate a **NewAPIServer(":port", nil)** and bootstrap the API with the **New()** method. Initialize the module inside the desired directory with *go mod <module_name>*, and put the following content in a main.go file:

```go
import (
    "github.com/tupatech/tupa"
)

func main() {
    server := tupa.NewAPIServer(":6969", nil)
    server.New()
}

```
