import moment from "moment";

export const formatDate = (date: Date): string => {
  const format = "YYYY-MM-DD HH:mm:ss";
  return moment(date).format(format);
};
