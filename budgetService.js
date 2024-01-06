import moment from "moment/moment";
import {Budget} from "./budget";

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

        return targetBudgets.reduce((sum, budget, i) => {
            let overlappingDays;
            if (i === 0) {
                let overlappingEnd = budget.lastDay();
                let overlappingStart = startMoment;
                overlappingDays = overlappingEnd.diff(overlappingStart, 'days') + 1;
            } else if (i === targetBudgets.length - 1) {
                let overlappingStart = budget.firstDay();
                let overlappingEnd = endMoment;
                overlappingDays = overlappingEnd.diff(overlappingStart, 'days') + 1;
            } else {
                let overlappingEnd = budget.lastDay();
                let overlappingStart = budget.firstDay();
                overlappingDays = overlappingEnd.diff(overlappingStart, 'days') + 1;
            }
            return sum + (budget.dailyAmount() * overlappingDays);

        }, 0);

    }

    /**
     *
     * @returns {Budget[]}
     */
    getAll() {
        return [new Budget('202401', 310)];
    }
}