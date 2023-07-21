package shared

import "github.com/google/uuid"

func GetRandomName() string {
	return uuid.New().String()
}
