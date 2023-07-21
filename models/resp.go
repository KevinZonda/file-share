package models

type ErrResponse struct {
	Message string `json:"msg"`
}

func NewErrResponse(msg string) ErrResponse {
	return ErrResponse{msg}
}

type UploadResultResponse struct {
	ID  string `json:"id"`
	Uid string `json:"uid"`
	Url string `json:"url"`
}

type FileInfoResponse struct {
	Name       string `json:"name"`
	UploadedAt int64  `json:"uploaded_at"`
	ExpiredAt  int64  `json:"expired_at"`
	Password   bool   `json:"password"`
}
