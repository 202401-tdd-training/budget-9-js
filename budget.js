import moment from "moment";
import {Period} from "./period";

export class Budget {
    yearMonth;
    amount;

    constructor(yearMonth, amount) {
        this.yearMonth = yearMonth;
        this.amount = amount;
    }

    createPeriod() {
        return new Period(this.firstDay(), this.lastDay());
    }
    /**
     *
     * @returns {moment.Moment}
     */
    firstDay() {
        return moment(this.yearMonth).startOf('month');
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