import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { BookTable, TIBook, TSBook} from "../drizzle/schema";

export const bookService= async(limit?: number):Promise<TSBook[]| null> => {
    if(limit){
        return await db.query.BookTable.findMany({
            limit: limit,
        });
    }
    return await db.query.BookTable.findMany();
}

export const bookServiceById = async(id: number): Promise<TSBook | undefined> => {
    return await db.query.BookTable.findFirst({
        where: eq(BookTable.id, id)
    })
}

export const createBookService = async(book: TIBook) => {
    await db.insert(BookTable).values(book)
    return "Books created";
}

export const updateBookService = async(id: number, book: TIBook) => {
    await db.update(BookTable).set(book).where(eq(BookTable.id, id))
    return "Books updated";
}

export const deleteBookService = async(id: number) => {
    await db.delete(BookTable).where(eq(BookTable.id, id))
    return "Books deleted";
}