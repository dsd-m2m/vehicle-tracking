const getAll = async (req, res) => {
    vin = req.params.vin;
    startTime = req.body.startTime;
    endTime = req.body.endTime;
    return res.status(200).json({ success: true });
};

module.exports.getAll = getAll;
