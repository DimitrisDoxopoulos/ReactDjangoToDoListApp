import moment from "moment";

export const formatDate = (date) => {
    return moment(date).format('dddd, D MMMM yyyy h:mm A');
}