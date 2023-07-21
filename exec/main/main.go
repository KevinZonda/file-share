package main

import (
	"github.com/KevinZonda/file-sharer/controllers"
	"github.com/KevinZonda/file-sharer/shared"
)

func main() {
	shared.InitCfg()
	shared.InitGin()
	controllers.Router(shared.GetGinEngine())
	shared.StartGin()
}
