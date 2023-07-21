package controllers

import (
	"github.com/KevinZonda/file-sharer/models"
	"github.com/KevinZonda/file-sharer/shared"
	"github.com/gin-gonic/gin"
)

func fileDownload(c *gin.Context) {
	var req models.DownloadRequest
	if err := c.ShouldBind(&req); err != nil {
		c.JSON(400, models.NewErrResponse("Invalid request"))
		c.Abort()
		return
	}
	if info, ok := fetchFileInfo(c, req.ID); ok {
		c.FileAttachment(shared.GetFileInfoPathById(req.ID), info.Name)
		return
	}

}
