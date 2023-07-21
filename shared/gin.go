package shared

import "github.com/gin-gonic/gin"

var _engine *gin.Engine

func InitGin() {
	_engine = gin.New()
	_engine.Use(
		gin.Logger(),
		gin.Recovery(),
	)
}

func StartGin() {
	err := _engine.Run(GetConfig().ListenAddr)
	panic(err)
}

func GetGinEngine() *gin.Engine {
	return _engine
}
