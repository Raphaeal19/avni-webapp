import React from "react";
import { LineBreak } from "../../common/components/utils";
import TextFormElement from "./TextFormElement";
import NotesFormElement from "./NotesFormElement";
import SingleSelectFormElement from "./SingleSelectFormElement";
import MultiSelectFormElement from "./MultiSelectFormElement";
import NumericFormElement from "./NumericFormElement";
import { DateFormElement, DateTimeFormElement } from "./DateFormElement";
import TimeFormElement from "./TimeFormElement";
import DurationFormElement from "./DurationFormElement";
import SubjectFormElement from "./SubjectFormElement";
// import LocationFormElement from "./LocationFormElement";

const div = () => <div />;

const elements = {
  Date: DateFormElement,
  DateTime: DateTimeFormElement,
  Time: TimeFormElement,
  Duration: DurationFormElement,
  SingleSelect: SingleSelectFormElement,
  MultiSelect: MultiSelectFormElement,
  Numeric: NumericFormElement,
  Boolean: div,
  Text: TextFormElement,
  Notes: NotesFormElement,
  NA: div,
  Image: div,
  Video: div,
  Id: div,
  Subject: SubjectFormElement
  // Location: LocationFormElement
};

export const FormElement = ({
  children: formElement,
  value,
  update,
  obsHolder,
  validationResults,
  uuid
}) => {
  const type = formElement.getType();
  const props = { formElement, value, update, obsHolder, validationResults, uuid };
  const Element = elements[type];
  return (
    <div>
      <LineBreak num={1} />
      {/*this check can be removed later when DEA supports all the data types (Location is not supported yet)*/}
      {Element && <Element {...props} />}
      {/* <LineBreak num={1} /> */}
    </div>
  );
};
