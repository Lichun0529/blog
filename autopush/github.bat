@echo off
@title Auto push to github
cd..
cd dist
git init
git add -A
git commit -m "auto push"
git push -f https://github.com/Lichun0529/blog.git master:gh-pages
pause