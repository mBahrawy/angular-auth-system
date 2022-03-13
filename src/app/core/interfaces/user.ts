export interface User {
    name: string;
    id: string;
    email?:string
    auth? : {
        role: string;
        token: string;
        expiresIn: number
    }
}
