document.addEventListener('DOMContentLoaded', () => {

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect', () => {
        document.querySelector("[name='submit']").onclick = () => {
            let message = document.querySelector("#f1").message.value;
            socket.emit('submit message', { 'message': message });
            };
        });

    socket.on('messages', data => {
        let i = 0;
        document.querySelectorAll('div').forEach(section => {
            section.innerHTML = data[i];
            i = i + 1;
        });
    });
});

