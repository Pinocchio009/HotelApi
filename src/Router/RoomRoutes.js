const router = require('express').Router();
const controller = require('../Controllers/RoomControllers')
router
     .get('/', controller.getAllRooms)
     .get('/:id', controller.getRoom)
     .post('/', controller.createRoom)
     .put('/:id', controller.updateRoom)
     .delete('/:id', controller.deleteRoom)

 module.exports = router