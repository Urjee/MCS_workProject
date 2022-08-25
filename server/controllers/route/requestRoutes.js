const { Request } = require("../../models");

const requestRouter=express.Router();

//ALL REQUEST
requestRouter.get(
    "/request",
    asycHandler(async(req, res)=>{
        const { name }=req.body;
        const request=await Request.findOne({ name });

        if(request ){
            res.json({
                requestID:request.requestID,
                name:request.name,
                create_user:request.create_user,
                planTime:request.planTime,
                stateID:request.stateID,
                realTime:request.realTime,
               
            });
        } else {
            res.status(401);
            throw new Error("invalid request data");
        }
    })
);
