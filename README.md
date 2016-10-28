# weixinAreaDataCrawl
A javascript tool that can crawl Weichat area datas,including countries,provinces,cities.抓取微信国家、省市地区数据工具。

## 使用说明
1. 首先，用自己的账号登录微信公众平台。然后打开开发者工具，并切换到consoletab；
1. 将crawl.js的脚本内容拷贝到console的输入行；
1. 修改传入的参数url为获取国家的ajax url。可以在network下找到类似https://mp.weixin.qq.com/cgi-bin/getregions的连接请求，复制过来即可；
1. 然后回车运行，等待脚本执行到debugger处，在console处输入：JSON.stringify(countries)，即可输出获取到的地区数据；
1. 也可以继续执行完脚本，切换到element tab，在body的底部找到____crawllog 的div，找到最后一个p。但是本人亲测发现输出的字符串有截断。建议采用上一种断点获取方式。

## 其他
1. 如果不想执行，也可以在data目录下找到现成的数据；city.js是包括国家、省份、城市的数据；province.js指包括国家、省份；
1. 数据格式,顶部是一个国家数组，每一项有一个id、name、provinces数组，每一个province包含id、name、cities。每一个city包含id、name；

最后，拿走，不谢！

