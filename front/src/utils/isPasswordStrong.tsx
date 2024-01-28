import { passwordStrength } from "check-password-strength";

type isPasswordStrongType = {
    strength: string,
    color: "default" | "danger" | "warning",
}

export const isPasswordStrong = (password: string): isPasswordStrongType => {
    if (password === "") {
        return {
            strength: "",
            color: "default",
        }
    }
    switch (passwordStrength(password).id) {
        case 0:
            return {
                strength: "weak",
                color: "danger",
            };
        case 1:
            return {
                strength: "weak",
                color: "danger",
            }
        case 2:
            return {
                strength: "medium",
                color: "warning",
            }
        case 3:
            return {
                strength: "strong",
                color: "default",
            };
        default:
            return {
                strength: "",
                color: "default",
            }
    }
}