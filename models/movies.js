import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
    moviename: {
        type: String,
        required: true,
    },
    movieimg: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    releasedate: {
        type: String,
        required: true,
    },
    rating: {
        type: Array,
        default: [], 
      },

});

const Movies =  mongoose.model("movies", moviesSchema);
export { Movies };