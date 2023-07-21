package models

type ConfigModel struct {
	ListenAddr   string `json:"listen_addr"`
	MaxSizeInKiB int64  `json:"max_size"`
	UploadDir    string `json:"upload_dir"`
}
