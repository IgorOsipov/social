import React from "react";

type ContactPropsType = {
  contactTitle: string;
  contactValue: string;
};

const Contact: React.FC<ContactPropsType> = ({
  contactTitle,
  contactValue,
}) => {
  return (
    <div className="ml-2">
      <strong>{contactTitle}:</strong>{" "}
      <a href={contactValue}>{contactValue ? contactValue : "-"}</a>
    </div>
  );
};

export default Contact;
