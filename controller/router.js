
// function showIndex(req,res){
//     res.send("首页biubiu")
// }

// exports.showIndex = showIndex;

// 读取models里用于返回文件名数组的模块
var file = require("../models/files.js")

// 首页
exports.showIndex = (req,res)=>{
    //调用models里的files文件的方法。读取uploads里的文件夹名称数组呈递给ejs做页面渲染
    // albums:files.getAllAlbum() 
    file.getAllAlbums(function(err,allAlbums){
        if(err){
            res.send(err);
            return;
        }
        res.render("index",{
            "albums":allAlbums
        })
    })
        
}
// 相册页
exports.showAlbum = (req,res)=>{
    res.send("相册"+ req.params.albumName);
}