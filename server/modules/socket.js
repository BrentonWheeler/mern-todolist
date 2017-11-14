var socket_io = require("socket.io");
var io = socket_io();

io.on("connection", function (socket) {
    console.log(socket.id);
    socket.on("action", action => {
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

            let newActionType = action.type.replace("server/", "");
            //just emits the action back to the sender
            io.sockets.to(socket.id).emit("action", { ...action, type: newActionType });
        } else {
            // these events are broadcasted to all other users on the same todoList
            let newActionType = action.type.replace("server/", "");
            io.sockets.in(action.todoListID).emit("action", { ...action, type: newActionType });
        }
    });
});

module.exports = io;
