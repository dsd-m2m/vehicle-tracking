const getAll = async (req, res) => {
    vin = req.params.vin;
    startTime = req.params.startTime;
    endTime = req.params.endTime;
    return res.status(200).json({ success: true });
};

module.exports.getAll = getAll;
