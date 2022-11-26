import { Book } from 'src/app/models/book';

export interface Borrow{
    id?: string,
    leitor: string
    email: string
    telefone: string
    status: string
    livro: Book
    data: any
}