import React from 'react';

const Contact = ({contactTitle, contactValue}) => {
    return <div className="ml-2"><strong>{contactTitle}:</strong> <a href={contactValue}>{contactValue ? contactValue : '-'}</a></div>
}

export default Contact;