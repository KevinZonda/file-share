package main

import (
	"github.com/KevinZonda/file-sharer/controllers"
	"github.com/KevinZonda/file-sharer/shared"
	"os"
)

// const ENV_RUN_ON_PORT = "ENV_X_PORT"
const ENV_RUN_ON_ADDR = "ENV_X_ADDR"

func main() {
	shared.InitCfg()
	shared.GetConfig().ListenAddr = os.Getenv(ENV_RUN_ON_ADDR)
	shared.InitGin()
	controllers.Router(shared.GetGinEngine())
	shared.StartGin()
}
