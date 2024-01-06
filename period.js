export class Period {
    startMoment;
    endMoment;

    constructor(startMoment, endMoment) {
        this.startMoment = startMoment;
        this.endMoment = endMoment;

    }

    overlappingDays(budget) {
        let overlappingEnd = this.endMoment.isBefore(budget.lastDay())
            ? this.endMoment
            : budget.lastDay();
        let overlappingStart;
        if (this.startMoment.format('yyyyMM') === budget.yearMonth) {
            // overlappingEnd = budget.lastDay();
            overlappingStart = this.startMoment;
        } else if (this.endMoment.format('yyyyMM') === budget.yearMonth) {
            overlappingStart = budget.firstDay();
            // overlappingEnd = this.endMoment;
        } else {
            // overlappingEnd = budget.lastDay();
            overlappingStart = budget.firstDay();
        }
        return overlappingEnd.diff(overlappingStart, 'days') + 1;
    }
}