// 路由功能——调用路由函数

const express = require("express");
const app = express();
// 引入自定义的模板(配置Controller下的package.json里的main指向router.js)
const router = require("./controller");
// 设置模板引擎
app.set("view engine","ejs");

// 路由中间件

// 呈递public下的静态文件，public下存放默认执行的文件或者前端框架bootstrap的文件
app.use(express.static("./public"));
app.use(express.static("./uploads"));

// 调用自定义模板里的函数
app.get("/",router.showIndex);  //路由首页
app.get("/:albumName",router.showAlbum) //路由到相册
app.get("/up",router.showUp)    //路由到上传
app.post("/up",router.doPost);  //文件上传

// 404页面
app.use(function(req,res){
    res.render("err")
})

app.listen(8888,()=>console.log("http://127.0.0.1:8888"))