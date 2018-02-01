// 定义 一个返回文件名称数组的功能模块 并暴露出去等待调用

const fs = require("fs");

// exports.getAllAlbum = (req,res)=>{
//     return ["小明","小工"]
// }

exports.getAllAlbums = function(callback){
    fs.readdir("./uploads",(err,files)=>{
        // files为uploads里的内容的数组
        if(err){
            callback("没有找到uploads文件夹",null)
        }


        var allAlbums = [];
        // nodejs异步不会顺序遍历uploads里的文件夹因此需要一个迭代器强制遍历
        (function iterator(i){
            if(i == files.length){
                // 理论上如果迭代到最后一个就返回数组，但是nodejs是异步的不会等到return结果输出 ,而是要把结果当成一个参数回调给父级的函数
                // return allAlbums
                callback(null,allAlbums);
                return;
            }
            fs.stat("./uploads/"+files[i],(err,stats)=>{
                if(err){
                    callback("找不到文件"+files[i],null);
                }
                if(stats.isDirectory()){
                    allAlbums.push(files[i])
                }
                iterator(i+1);
            })
        }(0));

    })
}

exports.getAllImagesByAlbumName = function(albumName,callback){
    fs.readdir("./uploads/"+albumName,(err,files)=>{
        if(err){
            callback("没有找到"+albumName+"文件夹",null);
            return;
        }
        let allImages = [];
        (function iterator(i){
            if(i == files.length){
                callback(null,allImages);
                return;
            }
            fs.stat("./uploads/"+albumName+"/"+files[i],(err,stats)=>{
                if(err){
                    callback("找不到"+files[i]+"文件",null);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i+1);
            })
        })(0)

    })
}