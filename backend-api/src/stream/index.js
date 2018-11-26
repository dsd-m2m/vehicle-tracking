// eslint-disable-next-line no-multi-assign
module.exports = (io) => {
	io.sockets.on('connection', (socket) => {
		socket.on('join', (vin) => {
			socket.join(vin);
		});
	});
}