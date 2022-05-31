#!/bin/sh
set -e

sudo kill -9 $(sudo lsof -ti :8081)
echo "=== kill port:8081 Done ==="

