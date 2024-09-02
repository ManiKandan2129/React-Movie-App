import express from "express";
import { deletedMovie, getAllMovies, postNewMovie, rateMovie, updatedMovie } from "../controllers/movies.js";

const router = express.Router();

//get all movies
router.get("/allmovies",async(req, res)=>{
    try {
        const movies = await getAllMovies();
        if(!movies || movies.length <= 0){
        return res.status(404).json({error:"no contents available"});
    }
    res.status(200).json({
        data:movies
    });
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"})
    }
});

//add movies
router.post("/admin/addmovies", async(req, res)=>{
    try {
        const newmovie = await postNewMovie(req);
        if(!newmovie){
            res.status(400).json({error:"error occured while posting"})
        }
        res.status(201).json({
            message:"sucessfully posted",
            data:newmovie
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"})
    }
});

//edit movies
router.put("/admin/edit/:id", async(req, res)=>{
    try {
        const editedmovies = await updatedMovie(req);
        if(!editedmovies){
            res.status(400).json({error:"error occured while updating"})
        }
        res.status(200).json({
            message:"sucessfully updated",
            data: editedmovies
        })  
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"})
    }
});

//delete movies
router.delete("/admin/delete/:id", async(req, res)=>{
    try {
        const deletemovies = await deletedMovie(req);
        if(!deletemovies){
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

router.put("/users/rating/:id", async(req, res)=>{
    try {
        const ratedmovies = await rateMovie(req);
        if(!ratedmovies){
            res.status(400).json({error:"error occured while rating"})
        }
        res.status(200).json({
            message:"sucessfully rated",
        })  
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"})
    }
});

export const movieRouter = router