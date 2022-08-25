const { File } = require("../../models");

const file=express.Router();

//ALL WORK
file.get(
    "/files",
    asycHandler(async(req, res)=>{
        const { file_id, file_name, original_name, file_path}= req.body;
        const file=await File.findAll({ file_id, file_name, original_name, file_path });

        if(file ){
            res.json({
                file_id:file.file_id,
                file_name:file.file_name,
                original_name:file.original_name,
                file_path:file.file_path,
            });
        } else {
            res.status(401);
            throw new Error("invalid file data");
        }
    })
);
