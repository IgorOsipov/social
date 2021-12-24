import React from "react";
import { Form } from "react-bootstrap";
import { WrappedFieldProps } from "redux-form";

type PropsType = {
  name: string;
  label: string;
};

export const TextArea: React.FC<PropsType & WrappedFieldProps> = ({
  input,
  meta,
  name,
  label,
}) => {
  return (
    <Form.Group controlId={input.name}>
      <Form.Label>
        <strong>{label}</strong>
      </Form.Label>
      <Form.Control
        as="textarea"
        id={name}
        //@ts-ignore
        className={!meta.valid && meta.touched && "is-invalid"}
        {...input}
        style={{ resize: "none" }}
        rows={3}
      />
      <Form.Control.Feedback type="invalid">
        {" "}
        {meta.error}{" "}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
