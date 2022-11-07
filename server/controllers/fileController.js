const db = require('../models');
const path = require("path")
const File = db.File;
const { QueryTypes, Op } = require('sequelize');
const multer  = require('multer');
const file = require('../routes/file');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload', file.originalname)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
exports.allFiles = async(req, res) => {
    db.sequelize.query(`
    exec sp_userReqs 1,0,0`, 
    {
         type: QueryTypes.SELECT 
    })
        .then(data => {
        res.send(data);
    }); 
         res.status(200)
         .send(req.files);
};

exports.addFile=async(req,res)=>{
    const {    
        file_name,
        original_name,
        file_path,
        } = req.body;

    const newpath = __dirname + "/files/";
    const file = req.files.file;
    const filename = file.name;

    File.create({file_name: file_name,  original_name:original_name, file_path:file_path})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err });
    });
  
    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        res.status(500).send({ message: "File upload failed", code: 200 });
      }
      res.status(200).send({ message: "File Uploaded", code: 200 });
    });
};

exports.download = async (req, res) => {

    const file = req.body.name;
    const paths = __baseDir + `\\upload\\${file}`;

    console.log(paths);

    res.download(paths, (err) => {
        if(err) {
            res.status(500).json({
                message: "File can't be download. " + err
            });
        };
    });
};