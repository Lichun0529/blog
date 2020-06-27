@echo off
@title Auto push to gitee
call package.bat
cd autopush
call gitee.bat
call github.bat