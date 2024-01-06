import moment from "moment/moment";
import {Budget} from "./budget";

class Period {
    startMoment;
    endMoment;

    constructor(startMoment, endMoment) {
        this.startMoment = startMoment;
        this.endMoment = endMoment;

    }

}

export class BudgetService {

    query(start, end) {
        const budgets = this.getAll();

        if (start > end || budgets.length === 0) {
            return 0;
        }

        let startMoment = moment(start);
        let endMoment = moment(end);
        if (startMoment.isSame(endMoment)) {
            const targetBudget = budgets.find(item => {
                return moment(item.yearMonth).isSame(start, 'month');
            });
            if (!targetBudget) return 0;
            return targetBudget.dailyAmount();
        }

        if (startMoment.isSame(endMoment, 'month')) {
            const targetBudget = budgets.find(item => {
                return moment(item.yearMonth).isSame(start, 'month');
            });
            if (!targetBudget) return 0;
            const daysDiff = Math.abs(startMoment.diff(endMoment, 'days')) + 1;
            return targetBudget.dailyAmount() * daysDiff;
        }

        const targetBudgets = budgets.filter(item => {
            return moment(item.yearMonth).isSameOrAfter(start, 'month') && moment(item.yearMonth).isSameOrBefore(endMoment, 'month');
        });

        return targetBudgets.reduce((sum, budget) => {
            const period = new Period(startMoment, endMoment);
            let overlappingDays = this.overlappingDays(budget, startMoment, endMoment, period);
            return sum + (budget.dailyAmount() * overlappingDays);

        }, 0);

    }

    overlappingDays(budget, startMoment, endMoment, period) {
        let overlappingEnd;
        let overlappingStart;
        if (period.startMoment.format('yyyyMM') === budget.yearMonth) {
            overlappingEnd = budget.lastDay();
            overlappingStart = period.startMoment;
        } else if (period.endMoment.format('yyyyMM') === budget.yearMonth) {
            overlappingStart = budget.firstDay();
            overlappingEnd = period.endMoment;
        } else {
            overlappingEnd = budget.lastDay();
            overlappingStart = budget.firstDay();
        }
        let overlappingDays = overlappingEnd.diff(overlappingStart, 'days') + 1;
        return overlappingDays;
    }

    /**
     *
     * @returns {Budget[]}
     */
    getAll() {
        return [new Budget('202401', 310)];
    }
}