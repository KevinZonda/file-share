package shared

import (
	"encoding/json"
	"github.com/KevinZonda/GoX/pkg/iox"
	"github.com/KevinZonda/file-sharer/models"
)

var _cfg *models.ConfigModel

func GetConfig() *models.ConfigModel {
	return _cfg
}

func InitCfg() {
	bs, err := iox.ReadAllByte("config.json")
	if err != nil {
		panic(err)
	}
	var cfg models.ConfigModel
	if err = json.Unmarshal(bs, &cfg); err != nil {
		panic(err)
	}
	_cfg = &cfg
}
