package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/KevinZonda/GoX/pkg/iox"
	"github.com/KevinZonda/file-sharer/models"
	"github.com/KevinZonda/file-sharer/shared"
	"github.com/gin-gonic/gin"
	"log"
	"os"
)

func filterId(s string) string {
	rs := []rune(s)
	sb := make([]rune, 0, len(rs))
	for _, r := range rs {
		if (r <= 'z' && r >= 'a') || (r <= 'Z' && r >= 'A') || (r <= '9' && r >= '0') {
			sb = append(sb, r)
			continue
		}
		if r == '-' || r == '_' {
			sb = append(sb, r)
			continue
		}
	}
	return string(sb)
}

func fileInfo(c *gin.Context) {
	var req models.FileInfoRequest
	if err := c.ShouldBind(&req); err != nil {
		c.JSON(400, models.NewErrResponse("Invalid request"))
		c.Abort()
		return
	}
	if info, ok := fetchFileInfo(c, req.ID); ok {
		c.JSON(200, info.ToResponse())
	}
}

func fetchFileInfo(c *gin.Context, _id string) (mod models.FileModel, ok bool) {
	id := filterId(_id)
	if id == "" || _id != id {
		c.JSON(400, models.NewErrResponse("Invalid ID"))
		c.Abort()
		return mod, false
	}

	basePath := shared.GetBasePathById(id)
	if !iox.ExistDir(basePath) {
		fmt.Println("File not found", basePath)
		fmt.Println("ENV", os.Getenv("PWD"))
		c.JSON(404, models.NewErrResponse("File not found"))
		c.Abort()
		return mod, false
	}
	info, err := loadFileInfo(id)
	if err != nil {
		log.Println("Cannot load file info", err)
		c.JSON(500, models.NewErrResponse("Cannot load file info"))
		c.Abort()
		return mod, false
	}

	if info.IsExpired() {
		go removeFile(id)
		c.JSON(404, models.NewErrResponse("File expired"))
		c.Abort()
		return mod, false
	}
	return info, true
}

func loadFileInfo(id string) (models.FileModel, error) {
	fileInfoPath := shared.GetFileInfoPathById(id)
	bs, err := iox.ReadAllByte(fileInfoPath)
	if err != nil {
		return models.FileModel{}, err
	}
	var _fileInfo models.FileModel
	err = json.Unmarshal(bs, &_fileInfo)
	if err != nil {
		return models.FileModel{}, err
	}
	return _fileInfo, nil
}

func removeFile(id string) error {
	basePath := shared.GetBasePathById(id)
	return os.RemoveAll(basePath)
}
