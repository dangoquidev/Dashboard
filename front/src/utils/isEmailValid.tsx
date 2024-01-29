import { verifyEmail } from '@devmehq/email-validator-js';

export const isEmailValid = async (email: string) => {
    if (email === "") return false;
    const { validFormat} = await verifyEmail({ emailAddress: email, timeout: 3000 });
    if (!validFormat) return false;
    return true;
}