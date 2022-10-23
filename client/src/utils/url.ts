import { environment } from "src/environments/environment"

export const s = (path: string): string => {
    return `${process.env["NG_APP_SERVER_URL"] ?? environment.serverUrl}/${path.startsWith('/') ? path.substring(1) : path}`;
}