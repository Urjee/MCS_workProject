const { UserReq } = require("../../models");

const requestRouter=express.Router();

//ALL REQUEST
requestRouter.get(
    "/userReq",
    asycHandler(async(req, res)=>{
        const { name }=req.body;
        const request=await UserReq.findOne({ name });

        if(request ){
            res.json({
                userReqID:request.userReqID,
                name:request.name,
                organizationID:request.organizationID,
                importanceID:request.importanceID,
                planTime:request.planTime,
                file_id: request.file_id,
                description: request.description,
               
            });
        } else {
            res.status(401);
            throw new Error("invalid request data");
        }
    })
);
