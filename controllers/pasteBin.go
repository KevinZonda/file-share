package controllers

import (
	"encoding/json"
	"github.com/KevinZonda/GoX/pkg/iox"
	"github.com/KevinZonda/file-sharer/models"
	"github.com/KevinZonda/file-sharer/shared"
	"github.com/gin-gonic/gin"
	"os"
	"time"
)

func pasteBin(c *gin.Context) {
	var req models.NewPasteBinRequest
	if err := c.ShouldBind(&req); err != nil {
		c.JSON(400, models.NewErrResponse("Invalid request"))
		c.Abort()
		return
	}

	_fileInfo := models.FileModel{
		Name:       req.Name,
		UploadedAt: time.Now().Unix(),
		ExpiredAt:  req.ExpireAt,
		Size:       int64(len(req.Content)),
		Content:    &req.Content,
		Password:   req.Password,
		PasteBin:   true,
	}
	fileId := shared.GetRandomName()
	saveToPath := shared.GetBasePathById(fileId)
	err := os.MkdirAll(saveToPath, 0777)
	if err != nil {
		c.JSON(500, models.NewErrResponse("Cannot create directory"))
		c.Abort()
		return
	}
	infoPath := shared.GetFileInfoPathById(fileId)
	fileInfoBs, _ := json.Marshal(_fileInfo)
	if err = iox.WriteAllBytes(infoPath, fileInfoBs); err != nil {
		c.JSON(500, models.NewErrResponse("Cannot write file info"))
		c.Abort()
		return
	}

	c.JSON(200, models.UploadResultResponse{ID: fileId})
}
