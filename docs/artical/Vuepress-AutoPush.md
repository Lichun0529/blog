# 如何一键打包+推送Vuepress到仓库
### 打包

根目录下新建package.bat文件，文件内容：
```bat
@echo off
@title Auto push  
vuepress build docs
```
### 推送

根目录下新建gitee.bat文件，文件内容：
```bat
@echo off
@title Auto push to gitee
cd dist
git init
git add -A
git commit -m "auto push"
git push -f 要推送到的地址
cd..
```
如果需要同时推送到GitHub,根目录下新建github.bat文件，文件内容：

```bat
@echo off
@title Auto push to github
cd dist
git push -f 要推送到的地址
pause
```

### 打包+推送

根目录下新建AutoPush.bat文件，文件内容：
```bat
@echo off
@title Auto push to gitee
call package.bat
call gitee.bat
call github.bat
```
### 使用
根目录下双击AutoPush.batt文件即可自动打包+推送至码云和GitHub  






<Vssue style="margin-top:100px"/>