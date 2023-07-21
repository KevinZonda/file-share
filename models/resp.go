package models

type ErrResponse struct {
	Message string `json:"msg"`
}

func NewErrResponse(msg string) ErrResponse {
	return ErrResponse{msg}
}

type UploadResultResponse struct {
	ID string `json:"id"`
}

type FileInfoResponse struct {
	Name       string `json:"name"`
	UploadedAt int64  `json:"uploadedAt"`
	ExpiresAt  int64  `json:"expiresAt"`
	Password   bool   `json:"password"`
}
