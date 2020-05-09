const BaseBuilder = require('../base/base_builder');
const data = require('../../data/new_salary.json').headers;

class CreateNewSalaryHeaderBuilder extends BaseBuilder {
    constructor() {
        super(data);
        return this;
    }

    withPerformanceRating(performanceRating) {
        this.data.performanceRating = performanceRating
        return this;
    }
}

module.exports = CreateNewSalaryHeaderBuilder;