
// function showIndex(req,res){
//     res.send("首页biubiu")
// }

// exports.showIndex = showIndex;

// 首页
exports.showIndex = (req,res)=>{
    res.send("欢迎来到首页");
}
// 相册页
exports.showAlbum = (req,res)=>res.send("相册"+ req.params.albumName);