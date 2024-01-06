export class Period {
    startMoment;
    endMoment;

    constructor(startMoment, endMoment) {
        this.startMoment = startMoment;
        this.endMoment = endMoment;

    }

    overlappingDays(budget) {
        const another = new Period(budget.firstDay(), budget.lastDay());
        let firstDay = another.startMoment;
        let lastDay = another.endMoment;
        let overlappingEnd = this.endMoment.isBefore(lastDay)
            ? this.endMoment
            : lastDay;
        let overlappingStart = this.startMoment.isAfter(firstDay)
            ? this.startMoment
            : firstDay;
        return overlappingEnd.diff(overlappingStart, 'days') + 1;
    }
}