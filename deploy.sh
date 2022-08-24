#!/usr/bin/env sh

set -e

# git commit local
# git add .
# git commit -am 'commit local for deploy'

git checkout dev-main

# build
npm run gh-pages

# cd dist
# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME
# cd ..

rm -rf ./docs/**
if [ ! -d docs ];then
  mkdir docs
fi

echo 'build time:' `date +"%Y-%m-%d %H:%M"`> docs/build.txt

cp -r dist/** docs

git add ./docs
git commit -am 'deploy:gh-pages'
git push
