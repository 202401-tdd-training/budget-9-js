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
            if (i === 0) {
                const daysDiff = budget.lastDay().diff(startMoment, 'days') + 1;
                return sum + (budget.dailyAmount() * daysDiff);
            }

            if (i === targetBudgets.length - 1) {
                const daysDiff = endMoment.diff(moment(budget.yearMonth).startOf('month'), 'days') + 1;
                return sum + (budget.dailyAmount() * daysDiff);
            }

            return sum + budget.amount;
        }, 0);

    }

    lastDay(budget) {
        return moment(budget.yearMonth).endOf('month');
    }

    /**
     *
     * @returns {Budget[]}
     */
    getAll() {
        return [new Budget('202401', 310)];
    }
}