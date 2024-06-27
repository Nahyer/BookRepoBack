import { Context } from "hono";
import { bookService, bookServiceById, createBookService, deleteBookService, updateBookService } from "../service/books.service";


export const listBooks = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await bookService(limit);
        if (data == null || data.length == 0) {
            return c.text("No books available", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}


export const getBookById = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'))
        const data = await bookServiceById(id);
        if (isNaN(id)) return c.text("Invalid ID", 400);
        if (data == null) {
            return c.text("Book not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const createBook = async (c: Context) => {
    try {
        const book =  await c.req.json();
        const Cbook = await createBookService(book);
        if (!Cbook) return c.text("Book not created", 404);
        return c.json({ msg: Cbook }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateBook = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const book = await c.req.json();
    try {
        const Sbook = await bookServiceById(id);
        if (Sbook == undefined) return c.text("User not found", 404);
        const Ubook = await updateBookService(id, book);
        if (!Ubook) return c.text("Book not updated", 404);
        return c.json({ msg: Ubook }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteBook = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const Dbook = await bookServiceById(id);
        if (Dbook == undefined) return c.text("Book not found", 404);
        const res = await deleteBookService(id);
        if (!res) return c.text("Book not deleted", 404);
        return c.text("Book deleted", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}