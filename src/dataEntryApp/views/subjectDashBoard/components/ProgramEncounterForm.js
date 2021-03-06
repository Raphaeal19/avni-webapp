import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { ObservationsHolder } from "avni-models";
import FormWizard from "dataEntryApp/views/registration/FormWizard";
import {
  updateObs,
  saveProgramEncounter,
  setValidationResults
} from "dataEntryApp/reducers/programEncounterReducer";
import { setFilteredFormElements } from "../../../reducers/RulesReducer";

const mapFormStateToProps = state => ({
  form: state.dataEntry.programEncounterReducer.programEncounterForm,
  subject: state.dataEntry.subjectProfile.subjectProfile,
  observations: state.dataEntry.programEncounterReducer.programEncounter.observations,
  obsHolder: new ObservationsHolder(
    state.dataEntry.programEncounterReducer.programEncounter.observations
  ),
  saved: state.dataEntry.programEncounterReducer.saved,
  onSaveGoto: "/app/subject?uuid=" + state.dataEntry.subjectProfile.subjectProfile.uuid,
  staticValidationResults: state.dataEntry.programEncounterReducer.enconterDateValidation,
  validationResults: state.dataEntry.programEncounterReducer.validationResults,
  message: state.dataEntry.programEncounterReducer.programEncounter.name
    ? `${state.dataEntry.programEncounterReducer.programEncounter.name} Encounter Saved`
    : `Encounter Saved`,
  additionalRows: [
    {
      label: "Visit Date",
      value: moment(
        state.dataEntry.programEncounterReducer.programEncounter.encounterDateTime
      ).format("DD-MMM-YYYY")
    }
  ],
  filteredFormElements: state.dataEntry.rulesReducer.filteredFormElements,
  entity: state.dataEntry.programEncounterReducer.programEncounter
});

const mapFormDispatchToProps = {
  updateObs,
  onSave: () => saveProgramEncounter(false),
  setValidationResults,
  setFilteredFormElements
};

const ProgramEncounterForm = withRouter(
  connect(
    mapFormStateToProps,
    mapFormDispatchToProps
  )(FormWizard)
);

export default ProgramEncounterForm;
