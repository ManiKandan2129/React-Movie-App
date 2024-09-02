import { Users } from "../models/users.js";
import  Jwt  from "jsonwebtoken";


export function getUserByEmail(request){
    return Users.findOne({
        email: request.body.email,
    })
}

export function getUserById(id){
    return Users.findById(id).select("_id username email usertype");
}

export function generateToken(id){
    return Jwt.sign({ id }, process.env.SECRET_KEY)
}

export function getAllUsers(){
    return Users.find({}, '-password')
}

export function DeleteUser(req){
    return Users.findByIdAndDelete(
        {_id: req.params.id}
        )
}