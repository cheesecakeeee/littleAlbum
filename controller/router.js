// 定义路由函数
// function showIndex(req,res){
//     res.send("首页biubiu")
// }

// exports.showIndex = showIndex;

// 读取models里用于返回文件名数组的模块
const file = require("../models/files.js");
const formidable = require("formidable");   
const path = require("path");   //文件上传路径
const fs = require("fs");   //改名
const sd = require("silly-datetime");   //时间戳

// 首页
exports.showIndex = (req,res,next)=>{
    //调用models里的files文件的方法。读取uploads里的文件夹名称数组呈递给ejs做页面渲染
    // albums:files.getAllAlbum() 
    file.getAllAlbums(function(err,allAlbums){
        if(err){
            // res.send(err);
            // 出错局渲染404页面
            // res.render("err");
            next();
            return;
        }
        res.render("index",{
            "albums":allAlbums
        })
    })
        
}
// 相册页
exports.showAlbum = (req,res,next)=>{
    // 遍历相册的所有图片
    let albumName = req.params.albumName;

    // 通过相册名称获取相册所有图片
    file.getAllImagesByAlbumName(albumName,function(err,imagesArray){
        if(err){
            // res.render("err");
            next(); //交给下一个中间件
            return;
        }
        res.render("album",{
            "albumname": albumName,
            "images": imagesArray
        })
    })

    // res.render("album",{
    //     "albumname": albumName,
    //     "images":["1.jpg","2.jpg","4.jpg"]
    // })
    // res.send("相册"+ req.params.albumName);
}


// 显示上传
exports.showUp = (req,res)=>{
    // res.render("up",{
    //     "albums":["嘻嘻","呵呵呵"]
    // });
    file.getAllAlbums(function(err,albums){
        res.render("up",{
            "albums": albums
        });
    })
}


// 上传图片
exports.doPost = (req,res)=>{
    var form = new formidable.IncomingForm();

    // form.uploadDir = "/uploads";
    // 图片暂时上传到littleAlbum下的临时文件夹tempup下
    form.uploadDir = path.normalize(__dirname + "/../tempup");
    // console.log(path.normalize(__dirname + "/../tempup"));

    form.parse(req, function(err, fields, files,next) {
    //   console.log(files);
    //   console.log(fields);
        if(err){
            next();
            return;
        }
        fs.rename(oldPath, newPath, function(err){
            
        })
    });

    res.send("成功")
}
