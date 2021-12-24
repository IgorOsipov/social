import React from "react";
import { Form } from "react-bootstrap";
import { WrappedFieldProps } from "redux-form";

type PropsType = {
  options: any;
  label: string;
};

export const Select: React.FC<PropsType & WrappedFieldProps> = ({
  options,
  label,
  meta,
  input,
}) => {
  return (
    <Form.Group>
      <Form.Label htmlFor={input.name}>
        <strong>{label}</strong>
      </Form.Label>
      <Form.Control
        as="select"
        //@ts-ignore
        className={!meta.valid && meta.touched && "is-invalid"}
        {...input}
        id={input.name}
      >
        {options.map((o: any) => (
          <option key={"opt" + o.value} value={o.value}>
            {o.option}
          </option>
        ))}
      </Form.Control>
      <Form.Control.Feedback type="invalid">
        {" "}
        {meta.error}{" "}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
