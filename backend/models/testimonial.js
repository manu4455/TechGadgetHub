import mongoose from "mongoose";


const TestimonialSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    comment: {
        type: String,
        required: [true, "Please enter your comment"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



// Prevent Mongoose from creating the model if it already exists
export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
