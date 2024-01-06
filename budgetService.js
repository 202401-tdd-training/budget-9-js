import moment from "moment/moment";
import {Budget} from "./budget";
import {Period} from "./period";

export class BudgetService {

    query(start, end) {
        if (start > end) {
            return 0;
        }

        const period = new Period(moment(start), moment(end));
        return this.getAll().reduce((sum, budget) => {
            return sum + budget.overlappingAmount(period);
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