const { Work } = require("../../models");

const workRouter=express.Router();

//ALL WORK
workRouter.post(
    "/works",
    asycHandler(async(req, res)=>{
        const { name }=req.body;
        const work=await Work.findOne({ name });

        if(work ){
            res.json({
                work_id:work.work_id,
                code: work.code,
                name:work.name,
                organizationID:work.organizationID,
                create_user:work.create_user,
                date: work.date,
                performedTime:work.performedTime,
                importance_id:work.importance_id,
                stateID:work.stateID,
                planTime:work.planTime,
                realTime:work.realTime,
                execution_worker:work.execution_worker,
            });
        } else {
            res.status(401);
            throw new Error("invalid user data");
        }
    })
);
