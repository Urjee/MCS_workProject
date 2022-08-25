// const { User } = require("../../models");

// const userRouter=express.Router();

// //LOGIN
// userRouter.post(
//     "/login",
//     asycHandler(async(req, res)=>{
//         const { email, password }=req.body;
//         const user=await User.findOne({ email });

//         if(user && (await user.matchPassword(password))){
//             res.json({
//                 _id: user._ID,
//                 usercode: user.usercode,
//                 name:user.username,
//                 email:user.email,
//                 firstname:user.firstname,
//                 lastname: user.lastname,
//                 phone:user.phone,
//                 address:user.address,
//                 job:user.job,
//                 organizationID:user.organizationName,
//             });
//         } else {
//             res.status(401);
//             throw new Error("invalid user data");
//         }
//     })
// );
