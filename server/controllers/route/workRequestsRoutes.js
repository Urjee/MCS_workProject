const { WorkUser } = require("../../models");
const workRequest = require("../../routes/workRequest");

const workRequestsRoutes=express.Router();

//ALL WORK
workRequestsRoutes.get(
    "/workRequests",
    asycHandler(async(req, res)=>{
        const { name, organizationID, subWorkID, importanceID, planTime, file, description}= req.body;
        const workRequest=await workRequest.findAll({ name, organizationID, subWorkID, importanceID, planTime, file, description });

        if(workRequest ){
            res.json({
                workRequest_id:workRequest.workRequest_id,
                name:workRequest.name,
                organizationID:workRequest.organizationID,
                importanceID:workRequest.importanceID,
                planTime:workRequest.planTime,
                file_id:workRequest.file_id,
                description: workRequest.description,
            });
        } else {
            res.status(401);
            throw new Error("invalid workRequest data");
        }
    })
);
//ADD WORK
workRequestsRoutes.get(
    "/addWorkRequests",
    asyncHandler(async(req, res)=>{
        const {workRequest_id, name, organizationID, subWorkID , importanceID, planTime, file_id, description}= req.body;
        const workRequest=await workRequest.create({workRequest_id, name, organizationID, subWorkID , importanceID, planTime, file_id, description});
         if(workRequest){
            res.json({
                workRequest_id: workRequest.workRequest_id,
                name: workRequest.name,
                organizationID:workRequest.organizationID,
                subWorkID:workRequest.subWorkID,
                importanceID: workRequest.importanceID,
                planTime:workRequest.planTime,
                file_id:workRequest.file_id,
                description:workRequest.description,
                token: generateToken(workRequest.workRequest_id)
            })
         }
    })
)
//ADDFILE
workRequestsRoutes.get(
    "/addFile",
    asycHandler(async(req, res)=>{
        const { file_name, original_name, file_path}= req.body;
        const file=await file.findAll({ file_name, original_name, file_path });

        if(workRequest ){
            res.json({
                file_name:workRequest.file_name,
                original_name:workRequest.original_name,
                file_path:workRequest.file_path,
            });
        } else {
            res.status(401);
            throw new Error("invalid workRequest data");
        }
    })
);
