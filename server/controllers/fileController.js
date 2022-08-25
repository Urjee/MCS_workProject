const db = require('../models');
const File = db.File;
const { QueryTypes, Op } = require('sequelize');
const events = require('events');

exports.allFiles = async(req, res) => {

    File.findAll().then(data => {
        res.send(data);
    });

}
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
}

 
