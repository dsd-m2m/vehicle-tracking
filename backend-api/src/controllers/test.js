
exports.pingPublic = async (req, res) => res.status(200).json({ message: 'Pong from server (Public)' });
exports.pingSecure = async (req, res) => res.status(200).json({ message: 'Pong from server (Secure)' });
