//侧边栏md文件分发
module.exports = {
    '/notes/WebBasic':[
        {
            title:'JavaScript',
            collapsable: true,//是否可折叠
            children:[
              '/notes/WebBasic/JSbasic'//对应md文件
            ]
          },
          {
            title:'Vue',
            collapsable: true,
            children:[
              '/notes/WebBasic/Vuebasic',
            ]
          }
    ],
 //    '/project/minwuyou':[
 //        {
 //            title:'民无忧',
 //            collapsable: false,//是否可折叠
 //            children:[
 //                '/project/minwuyou/',//对应md文件
 //            ]
 //          }
 //    ],
	// '/project/news':[
	//     {
	//         title:'极简新闻',
	//         collapsable: false,//是否可折叠
	//         children:[
	//             '/project/news/',//对应md文件
	//         ]
	//       }
	// ],
    '/project/p2':[
        {
            title:'介绍',
            collapsable: false,//是否可折叠
            children:[
                '/project/p2/',//对应md文件
            ]
          },
        {
            title:'开发日志',
            collapsable: false,//是否可折叠
            children:[
                '/project/p2/p2_log',//对应md文件
            ]
        }
    ]

}