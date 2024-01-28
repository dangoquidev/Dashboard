const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

export const isEmailValid = (email: string) => {
    if (email === "") return false;
    return validateEmail(email) ? true : false;
}