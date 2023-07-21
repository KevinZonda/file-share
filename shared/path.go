package shared

import "path"

func GetBasePathById(id string) string {
	return path.Join(_cfg.UploadDir, id)
}

func GetDataPathById(id string) string {
	return path.Join(_cfg.UploadDir, id, "data")
}

func GetFileInfoPathById(id string) string {
	return path.Join(_cfg.UploadDir, id, "info.json")
}
