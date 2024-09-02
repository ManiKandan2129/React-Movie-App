import  Jwt  from "jsonwebtoken";
import { getUserById } from "../controllers/users.js";

const isAuthorized = async(req, res, next)=>{
    let token;
    if(req.headers){
        try {
            token = await req.headers["authenticate-token"];
            console.log(token)
            if(!token){

                return res.status(404).json({error:"token not found"});
            }
            const decode = Jwt.verify(token, process.env.SECRET_KEY);
            req.user = await getUserById(decode.id);
            next();
        } catch (error) {
            console.log(error)
            res.status(500).json({error: "internal server error"})
        }
    }
}

export { isAuthorized };