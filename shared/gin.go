package shared

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var _engine *gin.Engine

func InitGin() {
	_engine = gin.New()

	corsConf := cors.DefaultConfig()
	corsConf.AllowHeaders = append(corsConf.AllowHeaders, "Authorisation")
	corsConf.AllowAllOrigins = true

	_engine.Use(
		gin.Logger(),
		gin.Recovery(),
		cors.New(corsConf),
	)
}

func StartGin() {
	err := _engine.Run(GetConfig().ListenAddr)
	panic(err)
}

func GetGinEngine() *gin.Engine {
	return _engine
}
