import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String, // cloudinary url or gravatar url
        default: "https://www.gravatar.com/avatar/",
        required: true,
    },
    coverImage: {
        type: String, // cloudinary url
        default: "https://www.gravatar.com/avatar/",
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },
    ],
    password: {
        type: String,
        required: [true,'PAssword is required']
    },
    refreshToken: {
        type: String,
    },
},
{
    timestamps: true,
}
);

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function(Password) {
    return await bcrypt.compare(Password, this.password);
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            id: this._id,
        }, 
        process.env.REFRESH_TOKEN_SECRET, 
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
};

export const User = mongoose.model("User", userSchema);