const moment = require('moment');

module.exports = {
  backDate: (date, format) => {
    return moment(date).format(format);
  },
};
