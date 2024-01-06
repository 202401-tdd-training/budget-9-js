import {BudgetService} from "./budgetService";
import {Budget} from "./budget";

describe('BudgetService', function () {
    it('start date is after end date', () => {
        const service = new BudgetService();
        service.getAll = () => {
            return [{
                yearMonth: '202401',
                amount: 100
            }];
        };
        expect(service.query(new Date(2024, 0, 6), new Date(2024, 0, 5))).toBe(0);
    });

    it('start date is same as end date', () => {
        const service = new BudgetService();
        service.getAll = () => {
            return [
                createBudget('202401', 310),
            ];
        };
        expect(service.query(new Date(2024, 0, 1), new Date(2024, 0, 1))).toBe(10);
    });

    it('Full same month, start date is 0101, end date is 0131', () => {
        const service = new BudgetService();
        service.getAll = () => {
            return [
                createBudget('202401', 310),
            ];
        };
        expect(service.query(new Date(2024, 0, 1), new Date(2024, 0, 31))).toBe(310);
    });

    it('Partial same month, start date is 0101, end date is 0115', () => {
        const service = new BudgetService();
        service.getAll = () => {
            return [
                createBudget('202401', 310),
            ];
        };
        expect(service.query(new Date(2024, 0, 1), new Date(2024, 0, 15))).toBe(150);
    });

    function createBudget(yearMonth, amount) {
        return new Budget(yearMonth, amount);
        // return {
        //     yearMonth: '202401',
        //     amount: 310
        // };
    }

    it('Not same month, start date is 0101, end date is 0215', () => {
        const service = new BudgetService();
        service.getAll = () => {
            return [
                createBudget('202401', 310),
                createBudget('202402', 400),
                // {
                //     yearMonth: '202402',
                //     amount: 400
                // },
                createBudget('202403', 3100),
                // {
                //     yearMonth: '202403',
                //     amount: 3100
                // }
            ];
        };
        expect(service.query(new Date(2024, 0, 22), new Date(2024, 2, 1))).toBe(600);
    });

    it('No db data, start date is 0201, end date is 0301', () => {
        const service = new BudgetService();
        service.getAll = () => {
            return [
                createBudget('202401', 310),
                createBudget('202404', 300),
                createBudget('202405', 310),
            ];
        };
        expect(service.query(new Date(2024, 1, 1), new Date(2024, 2, 1))).toBe(0);
    });

    it('No db data in same month, start date is 0201, end date is 0201', () => {
        const service = new BudgetService();
        service.getAll = () => {
            return [
                createBudget('202401', 310),
                createBudget('202404', 300),
                createBudget('202405', 310),
            ];
        };
        expect(service.query(new Date(2024, 1, 1), new Date(2024, 1, 1))).toBe(0);
    });
    it('No db data in same month, start date is 0201, end date is 0201', () => {
        const service = new BudgetService();
        service.getAll = () => {
            return [
                createBudget('202401', 310),
                createBudget('202404', 300),
                createBudget('202405', 310),
            ];
        };
        expect(service.query(new Date(2024, 1, 1), new Date(2024, 1, 15))).toBe(0);
    });
});


