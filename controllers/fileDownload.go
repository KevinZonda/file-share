package controllers

import (
	"github.com/KevinZonda/GoX/pkg/iox"
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
	_downloadFile(c, req.ID, req.Password)
}

func getFileDownload(c *gin.Context) {
	id := c.Param("id")
	password := c.Query("key")
	_downloadFile(c, id, password)
}

func _downloadFile(c *gin.Context, id, password string) {
	id = filterId(id)
	info, ok := fetchFileInfo(c, id)
	if !ok {
		c.JSON(404, models.NewErrResponse("File not found"))
		return
	}

	if info.Password != "" && !shared.VerifyHash(password, info.Password) {
		c.JSON(401, models.NewErrResponse("Unauthorised"))
		return
	}

	if info.PasteBin {
		c.String(200, *info.Content)
		return
	}
	_path := shared.GetDataPathById(id)
	if iox.ExistFile(_path) {
		c.FileAttachment(shared.GetDataPathById(id), info.Name)
	} else {
		c.JSON(404, models.NewErrResponse("File not found"))
		c.Abort()
		return
	}
	return
}
