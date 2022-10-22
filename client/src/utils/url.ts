import { environment } from "src/environments/environment"

export const s = (path: string): string => {
    return `${environment.serverUrl}/${path.startsWith('/') ? path.substring(1) : path}`;
}