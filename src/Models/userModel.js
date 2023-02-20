const mongoose = require('mongoose');

const userSchema = mongoose.Schema (
    {
        Username: {
            type: String,
            required: true
        },
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
       }
    }, {timestamps: true}
);


module.exports = mongoose.model("User", userSchema);