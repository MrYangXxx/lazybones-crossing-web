# lazybones-crossing-web
# 项目介绍
本项目使用了vue-admin-template

> 这是一个极简的 vue admin 管理后台。它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

>需要更为丰富的功能可参照 vue-element-admin

[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template/)

[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)


#开发指引

0.安装依赖
>根目录下执行 npm install

1.打包项目
 > 运行 npm run build:prod ，生成的dist目录即为打包文件
 >
 > 配置nginx
 > - root 指向dist文件 `root   C:\xxx\xxx\dist;`
 > - 访问重定向 `location / {try_files $uri $uri/ /index.html;}`
 > - 后端接口转发 `location /api/ {proxy_pass http://127.0.0.1:8081/;}`
 >
 > 去掉url中的#
 > - 在src/router/index.js 设置mode: 'history'