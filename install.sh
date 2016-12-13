#!/bin/sh
echo "fetch lor lib ..."
git clone https://github.com/sumory/lor.git

echo "install lib ..."
LIB_PATH=modules
rm -rf $LIB_PATH
mkdir $LIB_PATH
cp -r lor/lib/lor $LIB_PATH
cp -r lor/resty $LIB_PATH
rm -rf lor

echo "done !"
