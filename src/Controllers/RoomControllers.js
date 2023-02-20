const Rooms = require('../Models/RoomModel');


exports.getAllRooms = async (req,res) => {
    try {
      let room = await Rooms.find();
      if(room.length === 0)
      return res.status(404).json({
        success: false,
        message: 'No rooms found'
      })
      res.status(200).json({
        message: 'room found',
        room
      })
    } catch (error) {
        res.status(500).send(error.message)
    }
};

exports.getRoom = async (req, res) => {
    try {
        let id = {_id: req.params.id};
        let room = await Rooms.findOne(id);
        if(!room) return res.status(404).send('room not found')
        res.status(200).json({
            Message: "room found",
            room
        })

    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.createRoom = async (req, res) => {
    try {
        let room = await req.body;
        let created = await Rooms.create(room);
        if (!created)
          return res.status(400).json({
            message: " room no gree book"
          })
        return res.status(201).json({
            success: true,
            message: 'room booked',
            room: created
        })

    } catch (error) {
        res.status(500).send(error.message)
    }
}
exports.updateRoom = async (req, res)=> {
    try {
        let id = { _id: req.params.id};
        let room = await req.body;
        let update = await Rooms.findOneAndUpdate(id, room, {new: true});
        if(!update) return res.status(400).json({
            message: 'room not found'
        })
        return res.status(200).json({
            message: " Room updated",
            room: update
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.deleteRoom = async (req, res) => {
    try {
        let id = { _id: req.params.id};
        let deleted = await Rooms.findOneAndDelete(id);
        if(!deleted) 
        return res.status(400).send('room not deleted');
        return res.status(200).json({
            message: " room deleted succesfully"
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}