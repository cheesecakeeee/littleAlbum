// 定义路由函数
// function showIndex(req,res){
//     res.send("首页biubiu")
// }

// exports.showIndex = showIndex;

// 读取models里用于返回文件名数组的模块
const file = require("../models/files.js")

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