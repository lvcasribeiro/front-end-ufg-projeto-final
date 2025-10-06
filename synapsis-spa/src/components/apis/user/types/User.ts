export interface User {
    id: number;
    name: string;
    apelido?: string;
    data_nascimento?: Date;
    email: string;
    password: string;
}