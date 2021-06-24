export const  requiredField = value => {
    if(value) return undefined;

    return "Field is required";
}

export const maxLength = length => {
    return value => {
        if(value && value.length > length) return `Maximum length of post is ${length} symbols`;

        return undefined;
    }
}
