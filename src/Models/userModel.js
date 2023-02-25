const mongoose = require('mongoose');

const userSchema = mongoose.Schema (
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
        },
       role: {
        type: String,
        enum: ["guest", "admin"],
        default: "guest"
       },
       accessToken: {
        type: String
       }

    }, {timestamps: true}
);


module.exports = mongoose.model("User", userSchema);