import * as log4js from 'log4js';
import { Logger } from 'log4js';

export class StepLogger {
    logger: Logger;
    stepIdVar = '';
    testCaseId: number;
    logMessages = '';

    set caseId(theCaseId: number) {
        this.testCaseId = theCaseId;
        this.logger = log4js.getLogger(`TC${theCaseId}`);
        this.logger.debug(this.logMessages);
        this.logMessages = '';
    }

    step(stepName: string) {
        let operation = 'Pre-Condition';
        if (this.testCaseId) {
            // this.stepId();
            operation = 'Step';
        }
        this.commonLogger(operation, stepName);
    }

    commonLogger(operation: string, step: string) {
        const message = `${this.stepIdVar}- *${operation}* - ${step}`;
        console.log(`${this.testCaseId || ''}${message}`);
    }

}
