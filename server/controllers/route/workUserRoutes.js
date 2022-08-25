const { WorkUser } = require("../../models");

const workRouter=express.Router();

//ALL WORK
workRouter.get(
    "/workUsers",
    asycHandler(async(req, res)=>{
        const { workUser_id, name, organizationID, subWorkID, importance_id, planTime, file}= req.body;
        const workUser=await WorkUser.findAll({ workUser_id, name, organizationID, subWorkID, importance_id, planTime, file });

        if(workUser ){
            res.json({
                workUser_id:workUser.workUser_id,
                name:workUser.name,
                organizationID:workUser.organizationID,
                importance_id:workUser.importance_id,
                planTime:workUser.planTime,
                file:workUser.file_id,
            });
        } else {
            res.status(401);
            throw new Error("invalid workUser data");
        }
    })
);
