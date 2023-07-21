package controllers

import (
	"github.com/KevinZonda/file-sharer/shared"
	"github.com/gin-gonic/gin"
)

func Router(e *gin.Engine) {
	e.GET("/ping", Ping)

	apiGroup := e.Group("/api")

	apiGroup.POST("/file/upload", auth, fileUpload)
	apiGroup.POST("/file/download", fileDownload)
	apiGroup.GET("/file/:id", getFileDownload)
	apiGroup.POST("/file/info", fileInfo)
}

func auth(c *gin.Context) {
	if shared.GetConfig().Auth.AllowAll {
		c.Next()
		return
	}
	h := c.GetHeader("Authorisation")

	tokens := shared.GetConfig().Auth.Keys
	for _, token := range tokens {
		if token == h {
			c.Next()
			return
		}
	}
	c.JSON(401, gin.H{"error": "Unauthorised"})
	c.Abort()
}
