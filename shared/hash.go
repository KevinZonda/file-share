package shared

import "crypto/sha256"

func _sha256(s string) string {
	h := sha256.New()
	h.Write([]byte(s))
	return string(h.Sum(nil))
}

func DefaultHash(s string) string {
	return _sha256(s)
}

func VerifyHash(key, hash string) bool {
	return _sha256(key) == hash
}
