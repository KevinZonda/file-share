# File Share (Aka KevinZonda Υ)

This is a temperary file share platform which runs at [share.kevinzonda.com](https://share.kevinzonda.com).

## Build Backend

```bash
bash build.sh # for Standard Environment
# or
bash lambda.sh # for KevinZonda λ Engine & Σ Platform
```

## Config

```json
{
  "listen_addr" : "127.0.0.1:8080",
  "max_size"    : 102400,           // unit is KiB, 100 MiB
  "upload_dir"  : "home",
  "auth": {
    "allow_all" : false,
    "keys"      : [ "114514" ]
  }
}
```
