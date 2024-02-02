import Cookie from "universal-cookie";

export function saveCookies(field: string, value: string) {
    const cookies = new Cookie();
    cookies.set(field, value, { path: "/", sameSite: true });
}

export function readFromCookies(field: string) {
    const cookies = new Cookie();
    return cookies.get(field);
}

export function removeCookies(field: string) {
    const cookies = new Cookie();
    return cookies.remove(field);
}
