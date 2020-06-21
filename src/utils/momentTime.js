import moment from "moment";
function formatExactMin(time) {
  if (!time) {
    return null;
  }
  return moment(time.format("YYYY-MM-DD HH:mm"));
}

function formatTime(time) {
  if (time instanceof Object) {
    return time.format("YYYY-MM-DD 00:00:00");
  }
}

function dateCompare(before, end) {
  const formatStr = "YYYY-MM-DD";
  return moment(before.format(formatStr)).isBefore(moment(end.format(formatStr)));
}

export { formatExactMin, dateCompare, formatTime };
