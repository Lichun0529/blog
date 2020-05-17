function XMLtoJSON(datasource) {
    var xmlDoc = loadXML(datasource);
    if(xmlDoc)  //xml的解析和html doc几乎完全相同，可以使用 xmlDoc.getElementById(),xmlDoc.getElementsByTagName()，xmlDoc.getElementsByClassName
    {
        console.log(xmlDoc.getElementsByTagName('suggestion'));
        
        // var books= xmlDoc.getElementsByTagName('book');
        // var book = xmlDoc.getElementById('No2');
        
        // if(books)
        // {
        //         for(var i=0;i<books.length;i++)
        //         {
        //             var title = books[i].getEelementsByTagName('title')[0].firstChild.nodeValue; //确实有点长，因为
        //             var author = books[i].getEelementsByTagName('author')[0].innerHTML;//变短点
        //             var year = books[i].getEelementsByTagName('year')[0].innerHTML; //或者这样
        //             var price = Number(books[i].getEelementsByTagName('price')[0].innerHTML);
                    
        //         //有值了，下一步不是我的事了
        //         }
        //         //获取属性使用 attributes,得到的是nodevaluemap
        //     var attrs = book.attributes;
        //     for(var i=0;i<attrs.length;i++)
        //     {
        //         var attr = attrs[i];
        //         var attr_name = attr.name;
        //         var attr_value =  attr.value;          
        //     }   
        // }
    }
}
export default{
    XMLtoJSON
}