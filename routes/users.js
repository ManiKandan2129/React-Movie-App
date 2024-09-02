import express from "express"
import { generateToken, getUserByEmail, getAllUsers, DeleteUser } from "../controllers/users.js";
import bcrypt from "bcrypt";
import { Users } from "../models/users.js";


const router = express.Router();

//signup
router.post("/signup", async(req, res)=>{
    try {
        //check user already exixts
        let users = await getUserByEmail(req); 
        if(users){
            return res.status(400).json({err:"User already exixts...!"})
        }
        //hashing password
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(req.body.password, salt);

        //saving new user
        users = await new Users({
            ...req.body,  password: hashedPassword
        }).save();

        //generate token and give response
        const token = generateToken(users._id);
        res.status(201).json({
            message: "successfull logged in",
            token,
            data:users
        }) 
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"})
    }
})

//login
router.post("/login", async(req, res)=>{
    try {
        //check user is exixt or not
        let users = await getUserByEmail(req);
        //no user exixts
        if(!users){
           return res.status(404).json({error: "User does not exist...!"});
        }
        //validate password
        const validatepassword = await bcrypt.compare(req.body.password, users.password);
        if(!validatepassword){
            return res.status(404).json({error: "Incorrect Password"});
        }

        //generate token
        const token = generateToken(users._id);
        res.status(200).json({message: "successfully logged in",token,data:users})

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"})
    }
});

//getting user details
router.get('/admin/userdetails', async(req,res)=>{
    try {
        const userdatas = await getAllUsers();
        if(!userdatas || userdatas.length <= 0){
            return res.status(404).json({error:"no contents available"});
        }
        res.status(200).json({
            data:userdatas
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"})
    }
})

router.delete("/admin/userdelete/:id", async(req, res)=>{
    try {
        const deleteuser = await DeleteUser(req);
        if(!deleteuser){
            res.status(400).json({error:"error occured while deleting"})
        }
        res.status(200).json({
            message:"sucessfully deleted",
        })  
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"})
    }
});




export const userRouter = router;