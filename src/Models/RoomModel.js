const {Schema, model} = require('mongoose');

const HotelSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    RoomType: {
        type: String,
        enum: ['big', 'small'],
        default: "small",
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ["guest", "admin"],
        default: "guest"
    }
}, {timestamps: true}
);

const RoomModel = model('rooms', HotelSchema);

module.exports = RoomModel;