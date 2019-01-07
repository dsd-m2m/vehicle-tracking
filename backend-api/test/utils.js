const jwt = require('../src/auth/jwt');

function withLoginVehicleOwner(
    req,
    user = {
        id: 1
    },
) {
    const authToken = jwt.generateToken(user);
    return req.set('Authorization', `Bearer ${authToken}`);
}

function withLoginOEM(
    req,
    user = {
        id: 2
    },
) {
    const authToken = jwt.generateToken(user);
    return req.set('Authorization', `Bearer ${authToken}`);
}

module.exports = { withLoginVehicleOwner, withLoginOEM };