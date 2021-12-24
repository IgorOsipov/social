export type FieldValidatorType = (value: string) => string | undefined;

export const requiredField: FieldValidatorType = (value) => {
  if (value) return undefined;

  return "Field is required";
};

export const maxLength = (length: number): FieldValidatorType => {
  return (value) => {
    if (value && value.length > length)
      return `Maximum length of post is ${length} symbols`;

    return undefined;
  };
};
