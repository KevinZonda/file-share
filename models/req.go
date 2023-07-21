package models

type FileInfoRequest struct {
	ID string `json:"id"`
}

type DownloadRequest struct {
	ID       string `json:"id"`
	Password string `json:"password"`
}
