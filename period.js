export class Period {
    startMoment;
    endMoment;

    constructor(startMoment, endMoment) {
        this.startMoment = startMoment;
        this.endMoment = endMoment;

    }

    overlappingDays(budget) {
        const another = new Period(budget.firstDay(), budget.lastDay());
        let overlappingEnd = this.endMoment.isBefore(another.endMoment)
            ? this.endMoment
            : another.endMoment;
        let overlappingStart = this.startMoment.isAfter(another.startMoment)
            ? this.startMoment
            : another.startMoment;
        return overlappingEnd.diff(overlappingStart, 'days') + 1;
    }
}