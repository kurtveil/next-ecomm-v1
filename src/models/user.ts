import { model, models, Schema } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email is invalid",
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: true
    },
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
        minLength: [3, "Fullname must be at least 3 characters"],
        maxLength: [50, "Fullname must be at most 50 characters"],
    }
});

const User = models.User || model("User", userSchema);
export default User;