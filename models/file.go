package models

import "time"

type FileModel struct {
	Name       string `json:"name"`
	UploadedAt int64  `json:"uploadedAt"`
	ExpiresAt  int64  `json:"expiresAt"`
	Password   string `json:"password"`
}

func (f FileModel) IsExpired() bool {
	eat := time.Unix(f.ExpiresAt, 0)
	return time.Now().After(eat)
}

func (f FileModel) ToResponse() FileInfoResponse {
	return FileInfoResponse{
		Name:       f.Name,
		UploadedAt: f.UploadedAt,
		ExpiresAt:  f.ExpiresAt,
		Password:   f.Password != "",
	}
}
