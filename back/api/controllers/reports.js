const ReportsService = require("../services/reports");
const { format } = require("../../../front/node_modules/date-fns");

class ReportsController {
  // CREATE EVENT
  static async reportsByType(req, res) {
    const { id, type } = req.params;
    let { startDate, endDate } = req.params;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const start = format(
      startDate.setDate(startDate.getDate() + 1),
      "yyyy/MM/dd"
    );
    const end = format(endDate.setDate(endDate.getDate() + 1), "yyyy/MM/dd");

    const { error, data } = await ReportsService.reportsByType(
      id,
      type,
      start,
      end
    );

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(201).send(data);
  }
}

module.exports = ReportsController;
