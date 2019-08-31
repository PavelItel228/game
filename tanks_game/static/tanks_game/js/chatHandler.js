var data1 = new Data(0, 0, 0,0, 0);
var data2 = new Data(0, 0, 0,0, 0);
var chatSocket;
var player_num;

function main() {

    let roomName = document.getElementById("data1").value;
    chatSocket = new WebSocket(
        'ws://' + window.location.host +
        '/ws/tanks_game/' + roomName + '/');
    // console.log("Chat socket: " + typeof chatSocket);

    chatSocket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        if (typeof data['setup'] !== 'undefined'){
            player_num  = data['setup'];
        }
        console.log(player_num + " Player num");

        if (typeof data['message'] !== 'undefined') {
            let message = data['message'];
            // console.log(message[4]);
            data2.setCords(message[0], message[1], message[2], message[3], message[4]);
        }
        // console.log(data2.x, data2.y, data2.angle, data2.towerAngle)

    };

    chatSocket.onclose = function (e) {
        console.error('Chat socket closed unexpectedly');
    };





}

window.onload = main;