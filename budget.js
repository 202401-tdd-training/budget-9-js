import moment from "moment";

export class Budget {
    yearMonth;
    amount;

    constructor(yearMonth, amount) {
        this.yearMonth = yearMonth;
        this.amount = amount;
    }

    /**
     *
     * @returns {moment.Moment}
     */
    lastDay() {
        return moment(this.yearMonth).endOf('month');
    }

    dailyAmount() {
        return this.amount / this.totalDays();
    }

    totalDays() {
        return moment(this.yearMonth).daysInMonth();
    }
}