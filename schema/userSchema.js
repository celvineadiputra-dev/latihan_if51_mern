import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type : String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type : String,
        required : true
    },
    role: String
}, {
    timestamps: true
})

const UserModel = model('users', userSchema)

export default UserModel