@echo off
@title Auto push to gitee
cd..
git init
git add -A
git commit -m "auto push"
git push -f https://gitee.com/li_chun529/blog.git master
cd autopush
