/* eslint-disable arrow-body-style */
const getAll = async (req, res) => {
  // const { vin } = req.params.vin;
  // const { startTime } = req.params.startTime;
  // const { endTime } = req.params.endTime;
  return res.status(200).json({ success: true });
};

module.exports.getAll = getAll;
