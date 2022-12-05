let socket = io();

socket.on("connect", () => {
    console.log(`Connected to server. Socket id : ${socket.id}`);
});

let connectBtn = document.querySelector("#connect");
let server = document.querySelector("#server");
let sendBtn = document.querySelector("#send");
let msg;
let user;
let chatRoom = document.querySelector("#messages");

connectBtn.addEventListener("click", function(){
    socket.on("disconnect",()=>{
        console.log("Disconnected.");
    })
    socket.disconnect();
    socket = io(server.value);
    socket.on("connect", () => {
        console.log(`(Re)Connected to server. Socket id : ${socket.id}`);
    });

    socket.on("message", function(arg){
        chatRoom.textContent += arg[1] + ": " + arg[0] + "\n";
    })
});

sendBtn.addEventListener("click", function (){
    msg=document.querySelector("#message");
    user = document.querySelector("#pseudo").value;
    socket.emit("message", [msg.value, user]);
    console.log(`Message sent : ${msg.value}`);
});