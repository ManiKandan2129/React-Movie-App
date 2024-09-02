import { Movies } from "../models/movies.js";


export function getAllMovies(){
    return Movies.find();
}

export function postNewMovie(req){
    return new Movies ({
        ...req.body
    }).save();
}

export function updatedMovie(req){
    return Movies.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    )
}

export function deletedMovie(req){
    return Movies.findByIdAndDelete(
        {_id: req.params.id},
    )
}

export function rateMovie(req){
    return Movies.findOneAndUpdate(
        { _id:req.params.id },
        { $push: req.body },
        { new: true }
        
    )
}