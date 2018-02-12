#!/bin/sh
echo "fetch lor lib ..."
git clone https://github.com/sumory/lor.git

echo "checkout dependent version ..."
cd lor
git reset 8ce6cb0f6f72e06d9900180e30cfd96408eb0aad --hard
cd ..

echo "install modules ..."
MODULES=modules
rm -rf $MODULES
mkdir $MODULES
cp -r lor/lib/lor $MODULES
cp -r lor/resty $MODULES
rm -rf lor

echo "done !"
