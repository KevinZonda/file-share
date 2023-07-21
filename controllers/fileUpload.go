package controllers

import (
	"encoding/json"
	"github.com/KevinZonda/GoX/pkg/iox"
	"github.com/KevinZonda/file-sharer/models"
	"github.com/KevinZonda/file-sharer/shared"
	"github.com/gin-gonic/gin"
	"os"
	"path"
	"time"
)

func fileUpload(c *gin.Context) {
	file, _ := c.FormFile("file")
	if file.Size > shared.GetConfig().MaxSizeInKiB*1024 {
		c.JSON(400, models.NewErrResponse("File too large"))
		c.Abort()
		return
	}

	_fileInfo := models.FileModel{
		Name:       file.Filename,
		UploadedAt: time.Now().Unix(),
		ExpiredAt:  time.Now().Add(time.Hour).Unix(),
	}
	fileId := shared.GetRandomName()
	saveToPath := shared.GetBasePathById(fileId)
	err := os.MkdirAll(saveToPath, 0777)
	if err != nil {
		c.JSON(500, models.NewErrResponse("Cannot create directory"))
		c.Abort()
		return
	}

	fileInfoPath := path.Join(saveToPath, "info.json")
	fileStorePath := path.Join(saveToPath, "data")
	fileInfoBs, _ := json.Marshal(_fileInfo)
	if err = iox.WriteAllBytes(fileInfoPath, fileInfoBs); err != nil {
		c.JSON(500, models.NewErrResponse("Cannot write file info"))
		c.Abort()
		return
	}
	err = c.SaveUploadedFile(file, fileStorePath)
	if err != nil {
		c.JSON(500, models.NewErrResponse("Cannot save file"))
		c.Abort()
		return
	}
	c.JSON(200, models.UploadResultResponse{ID: fileId})
}
