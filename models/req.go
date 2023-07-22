package models

type FileInfoRequest struct {
	ID string `json:"id"`
}

type DownloadRequest struct {
	ID       string `json:"id"`
	Password string `json:"password"`
}

type NewPasteBinRequest struct {
	Name     string `json:"name"`
	Content  string `json:"content"`
	Password string `json:"password"`
	ExpireAt int64  `json:"expired_at"`
}
