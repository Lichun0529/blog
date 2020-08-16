## 使用JS实现一个xml解析器（不使用DOMParser）打包
思路：
    1.确定数据结构
    let struct = [
        {
            name:'',
            value:'',
            attributes:[
                {key:'',value:''}
            ],
            children:[]
        }
    ] 
    2.获取所有标签
    3.解析标签间的关系，删除数组中重复数据，通过开始标签和结束标签位置检查语法
    4.获取属性、属性值和value
    5.输出


```javascript
var struct
    let xml
    let generation = '\t'
    fetch('./example.txt')
        .then(response => response.text())
        .then(res => {
            xml = res
            xmlParser(res)
            output(struct)
        })
        .catch(err => console.log(err));
    function xmlParser(content) {//获取所有标签名
        let reg = /^[a-z]+$/
        let nameList = []
        for (let i = 0; i < content.length; i++) {
            if (content[i] == '<' && reg.test(content[i + 1])) {//以<+小写字母筛选出标签名
                let tagName = []
                for (let j = 1; j < content.length; j++) {
                    if (content[i + j] == ' ' || content[i + j] == '>') {
                        break
                    } else {
                        tagName.push(content[i + j])
                    }
                }
                let name = tagName.join('')
                let begin = xml.indexOf(`<${name}`)
                let end = 0
                if (xml.indexOf(`</${name}>`) == -1) {
                    end = begin
                } else {
                    end = xml.indexOf(`</${name}>`)
                }
                let obj = {
                    name: name,
                    begin: begin,
                    end: end
                }
                nameList.push(obj)
                content = content.slice(content.indexOf('<'), content.length)//删除已添加的标签
            }
        }
        relationship(nameList)
    }
    function relationship(nameList) {//获取标签名之间的关系
        let list = nameList
        for (let i = 0; i < list.length; i++) {
            let children = list.filter(function(item){
                if(
                    item.begin > list[i].begin &&
                    item.begin < list[i].end &&
                    item.end > list[i].begin &&
                    item.end < list[i].end
                ){
                    item.father = list[i].name
                }else if(item.begin==0){
                    item.father = 'root'
                }else if(//语法检查
                    item.begin > list[i].begin &&
                    item.begin < list[i].end &&
                    item.end > list[i].begin &&
                    item.end > list[i].end
                ){
                    throw '语法错误:'+ item.name
                }
                return  item.begin > list[i].begin &&
                        item.begin < list[i].end &&
                        item.end > list[i].begin &&
                        item.end < list[i].end
            })
            list[i].children = children
        }
        // quchong(list)
        let quchongResult = quchong(list)
        let attriResult = getAttri(quchongResult,xml)
        struct = attriResult
    }
    function quchong(nameList){//去除数组中重复数据
        let list = nameList
        let indexList = []
        let flag = false
        for (let j = 0; j < list.length; j++) {
            if(list[j].father!=list[0].father){
                indexList.push(j)
                flag = true
            }
        }
        list.splice(indexList[0],indexList.length)
        if(flag){
            for (const item of list) {
                if(item.children.length>0){
                    quchong(item.children)
                }
            }
        }
        return list
    }
    function getAttri(nameList,XMLtxt) {//获取标签内属性键和值
        let temp = []
        let list = nameList
        let banana = XMLtxt
        let isEnd = false
        for (let ii = 0; ii < list.length; ii++) {
            let begin = banana.indexOf(`<${list[ii].name}`) 
            let end = banana.indexOf('>')
            let fullTag = banana.slice(begin,end+1)
            if(list[ii].children.length>0){
                temp.push(list[ii].children)
            }
            if(begin>end){
                let temp = banana.slice(begin,banana.length)
                begin = temp.indexOf(`<${list[ii].name}`) 
                end = temp.indexOf('>')
                fullTag = temp.slice(begin,end+1)
            }
            //获取标签value
            let getValueResult = getValue({tag:fullTag,name:list[ii].name})
            list[ii].value = getValueResult
            banana = banana.replace(fullTag,'').replace(`</${list[ii].name}>`,'')
            let attriArr = fullTag.replace('<' + list[ii].name, '').replace('>', '').replace('/', '').split(' ')
            attriArr = attriArr.filter(e => {
                return e != ''
            })
            let allAttri = []
            for (let i = 0; i <attriArr.length; i++) {
                let attriObj = {}
                attriObj.key = attriArr[i].split('=')[0]
                attriObj.value = attriArr[i].split('=')[1]
                allAttri.push(attriObj)
            }
            list[ii].attributes = allAttri
            if(ii==list.length-1) isEnd = true
        }
        for (const item of temp) {
            if(isEnd == true){
                getAttri(item,banana)
            }
        }
       return list
    }
    function getValue(tag){//获取value
        let XMLtxt = xml
        let begin = XMLtxt.indexOf(tag.tag)
        let end = XMLtxt.indexOf(`</${tag.name}>`)
        XMLtxt = XMLtxt.slice(begin+tag.tag.length,XMLtxt.length)
        if(end == -1){
            return ''
        }else{
            let valueIndex = XMLtxt.indexOf('<')
            let content = XMLtxt.slice(0,valueIndex)
            return content.replace(/[\r\n]/g,'').replace(/\ +/g,'').replace(/^\"|\"$/g,'').replace(/\\s{2,}|\t/,'').replace(/^\s+|\s+$/g,"")
        }
    }
    function output(data){//输出
        let hasKey = ''
        let hasValue = ''
        let space = ''
        for (let j = 0; j < generation; j++) {
            space = space+'\t'
        }
        for (let i = 0; i < data.length; i++) {
            if(data[i].attributes.length>0){
                for (const item of data[i].attributes) {
                    hasKey =`${hasKey}-${item.key}:${item.value}`
                }
            }
            if(data[i].value!=''){
                hasValue = `-value:${data[i].value}`
            }
            console.log(`${space}${data[i].name}${hasValue}${hasKey}`);
            generation++
            output(data[i].children)
        }
    }
```



<Vssue style="margin-top:100px"/>