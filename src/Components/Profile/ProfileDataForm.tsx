import React from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { profileType } from "../../Types/types";
import { Input } from "../App/FormFields/Input";
import { Select } from "../App/FormFields/Select";
import { TextArea } from "../App/FormFields/TextArea";
import { requiredField, maxLength } from "../App/Helpers/Validators";

const maxLenght100 = maxLength(100);

type PostFormOwnPropsType = {
  profile: profileType;
  setEditProfileDataMode: (editMode: boolean) => void;
};

const ProfileDataForm: React.FC<
  InjectedFormProps<profileType, PostFormOwnPropsType> & PostFormOwnPropsType
> = ({ profile, setEditProfileDataMode, handleSubmit, error }) => {
  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Field
        component={Input}
        validate={[requiredField]}
        name="fullName"
        label="Full name"
        placeholder="Enter new name"
        type="text"
      />
      <Field
        component={Select}
        validate={[requiredField]}
        name="lookingForAJob"
        label="Looking for a job"
        options={[
          { value: true, option: "yes" },
          { value: false, option: "no" },
        ]}
      />
      <Field
        validate={[requiredField, maxLenght100]}
        className="form-control"
        name="lookingForAJobDescription"
        label="Job description"
        component={TextArea}
      />
      <Field
        validate={[requiredField, maxLenght100]}
        className="form-control"
        name="aboutMe"
        label="About Me"
        component={TextArea}
      />
      {Object.keys(profile.contacts).map((key) => {
        return (
          <Field
            component={Input}
            key={`contacts.${key}`}
            name={`contacts.${key}`}
            label={key}
            placeholder=""
            type="text"
          />
        );
      })}
      <Button variant="primary" type="submit">
        Save
      </Button>
      <Button
        className="ml-1"
        variant="danger"
        type="button"
        onClick={() => setEditProfileDataMode(false)}
      >
        Cancel
      </Button>
    </Form>
  );
};

export default reduxForm<profileType, PostFormOwnPropsType>({
  form: "updateProfile",
})(ProfileDataForm);
