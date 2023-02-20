const {Schema, model} = require('mongoose');

const HotelSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    RoomType: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true}
);

const RoomModel = model('rooms', HotelSchema);

module.exports = RoomModel;