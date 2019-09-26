const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const obj2gltf = require('obj2gltf');

//自定义文件位置和名字
let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '/public/upload'))
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
});

const app = express();

//托管静态页面
app.use(express.static(path.join(__dirname, "./views")));
//托管模块资源
app.use("/jquery", express.static(path.join(__dirname, "./node_modules/jquery")));

//响应接口
app.post("/upload", upload.single('file'), (req, res) => {
    //处理文件名
    let gltfName = req.file.originalname.replace(/.obj/, ".gltf");

    //转换
    obj2gltf(path.join(__dirname, `/public/upload/${req.file.originalname}`))
        .then(function (gltf) {
            const data = Buffer.from(JSON.stringify(gltf));
            fs.writeFileSync(path.join(__dirname, `/public/download/${gltfName}`), data);

            let downloadFile = path.join(__dirname, `./public/download/${gltfName}`);
            console.log(downloadFile);
        
            res.header("Content-Type", "application/octet-stream");
            res.sendFile(downloadFile);
        });


});

app.listen(1234);