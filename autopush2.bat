@echo off
@title Auto push
cd dist
git add -A
git commit -m "auto push"
git push gitee master
git push github master:gh-pages
pause