@echo off
@title Auto push to github
cd dist
git push -f https://github.com/Lichun0529/blog.git master:gh-pages
pause