
exports.pingPublic = async (req, res) => {
    res.status(200).json({ success: true, data: 'Pong from server (Public)' }).end();
};
exports.pingSecure = async (req, res) => {
    res.status(200).json({ success: true, data: 'Pong from server (Secure)' }).end();
};