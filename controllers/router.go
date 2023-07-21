package controllers

import "github.com/gin-gonic/gin"

func Router(e *gin.Engine) {
	e.GET("/ping", Ping)

	apiGroup := e.Group("/api")

	apiGroup.POST("/file/upload", fileUpload)
	apiGroup.POST("/file/download", fileDownload)
	apiGroup.GET("/file/info", fileInfo)
}
