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
        let overlappingStart = this.startMoment.isAfter(budget.firstDay())
            ? this.startMoment
            : budget.firstDay();
        return overlappingEnd.diff(overlappingStart, 'days') + 1;
    }
}