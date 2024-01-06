import moment from "moment";

export class Budget {
    yearMonth;
    amount;

    constructor(yearMonth, amount) {
        this.yearMonth = yearMonth;
        this.amount = amount;
    }

    totalDays() {
        return moment(this.yearMonth).daysInMonth();
    }
}