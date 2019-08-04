var data1 = new Data(0, 0, 0, 0, 0);
var data2 = new Data(0, 0, 0, 0, 0);
var chatSocket;

function main() {


    var roomName = document.getElementById("data1").value;
    chatSocket = new WebSocket(
        'ws://' + window.location.host +
        '/ws/tanks_game/' + roomName + '/');


    chatSocket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        let message = data['message'];
        data2.setCords(message[0], message[1], message[2], message[3], message[4]);

        // console.log("Data received: " + data2.x + " " + data2.y + " " + data2.angle);
        // console.log("Bullet data: " + data2.bullet);
    };

    chatSocket.onclose = function (e) {
        console.error('Chat socket closed unexpectedly');
    };

    // document.onmousemove = function (e) {
    //     chatSocket.send(JSON.stringify({
    //         'message': [data1.x, data1.y]
    //     }));
    // };




}

window.onload = main;