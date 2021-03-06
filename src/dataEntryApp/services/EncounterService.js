import { ModelGeneral as General, ValidationResult } from "avni-models";
import moment from "moment";
import { isNil } from "lodash";

export default {
  validateVisitDate(encounter) {
    const ENCOUNTER_DATE_TIME = "ENCOUNTER_DATE_TIME";
    const failure = new ValidationResult(false, ENCOUNTER_DATE_TIME);
    if (isNil(encounter.encounterDateTime)) {
      failure.messageKey = "emptyValidationMessage";
    } else if (
      General.dateAIsBeforeB(encounter.encounterDateTime, encounter.individual.registrationDate)
    ) {
      failure.messageKey = "encounterDateBeforeRegistrationDate";
    } else if (General.dateIsAfterToday(encounter.encounterDateTime)) {
      failure.messageKey = "encounterDateInFuture";
    } else if (!moment(encounter.encounterDateTime).isValid()) {
      failure.messageKey = "invalidDateFormat";
    } else {
      return new ValidationResult(true, ENCOUNTER_DATE_TIME, null);
    }
    return failure;
  },
  validateCancelDate(encounter) {
    const CANCEL_DATE_TIME = "CANCEL_DATE_TIME";
    const failure = new ValidationResult(false, CANCEL_DATE_TIME);
    if (isNil(encounter.cancelDateTime)) {
      failure.messageKey = "emptyValidationMessage";
    } else if (
      General.dateAIsBeforeB(encounter.cancelDateTime, encounter.individual.registrationDate)
    ) {
      failure.messageKey = "cancelDateBeforeRegistrationDate";
    } else if (General.dateIsAfterToday(encounter.cancelDateTime)) {
      failure.messageKey = "cancelDateInFuture";
    } else if (!moment(encounter.cancelDateTime).isValid()) {
      failure.messageKey = "invalidDateFormat";
    } else {
      return new ValidationResult(true, CANCEL_DATE_TIME, null);
    }
    return failure;
  }
};
