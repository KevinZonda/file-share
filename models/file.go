package models

import (
	"fmt"
	"time"
)

type FileModel struct {
	Name       string `json:"name"`
	UploadedAt int64  `json:"uploaded_at"`
	ExpiredAt  int64  `json:"expired_at"`
	Password   string `json:"password"`
}

func (f FileModel) IsExpired() bool {
	eat := time.Unix(f.ExpiredAt, 0)
	fmt.Println("eat", eat)
	return time.Now().After(eat)
}

func (f FileModel) ToResponse() FileInfoResponse {
	return FileInfoResponse{
		Name:       f.Name,
		UploadedAt: f.UploadedAt,
		ExpiredAt:  f.ExpiredAt,
		Password:   f.Password != "",
	}
}
