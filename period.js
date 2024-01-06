export class Period {
    startMoment;
    endMoment;

    constructor(startMoment, endMoment) {
        this.startMoment = startMoment;
        this.endMoment = endMoment;

    }

    overlappingDays(budget) {
        const another = new Period(budget.firstDay(), budget.lastDay());
        let firstDay = budget.firstDay();
        let lastDay = budget.lastDay();
        let overlappingEnd = this.endMoment.isBefore(lastDay)
            ? this.endMoment
            : lastDay;
        let overlappingStart = this.startMoment.isAfter(firstDay)
            ? this.startMoment
            : firstDay;
        return overlappingEnd.diff(overlappingStart, 'days') + 1;
    }
}