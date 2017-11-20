var socket_io = require("socket.io");
var io = socket_io();

io.on("connection", function (socket) {
    socket.on("action", action => {
        // These two action types signify a user joining a todolist 'room'
        if (action.type === "server/create_todo_list" || action.type === "server/get_todo_items") {
            //leave all other rooms minus socket.id room
            let leaveOtherRooms = new Promise((resolve, reject) => {
                for (let room in socket.rooms) {
                    if (room !== socket.id) {
                        socket.leave(room);
                    }
                }
                resolve();
            });

            leaveOtherRooms.then(() => {
                //join new todoListID room
                socket.join(action.todoListID);
            });
        } else {
            // these events are broadcasted to all other users on the same todoList
            let newActionType = action.type.replace("server/", "");
            socket.broadcast.to(action.todoListID).emit("action", { ...action, type: newActionType });
        }
    });
});

module.exports = io;
