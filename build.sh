#!/bin/bash
go build -v -o "./out/file-serv" -ldflags "-s -w" ./exec/main/*.go