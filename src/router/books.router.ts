import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { bookSchema } from "../bookValidator";
import { createBook, deleteBook, getBookById, listBooks, updateBook } from "../controller/books.controller";

const bookRouter = new Hono().basePath("/books");


bookRouter.get("/",listBooks);

bookRouter.get("/:id",getBookById);

bookRouter.post("/create", zValidator('json',bookSchema,(result,c)=>{
    if(!result.success){
        return c.json({error:result.error},400)
    }
}),createBook);

bookRouter.put("/update/:id",updateBook);

bookRouter.delete("/delete/:id", deleteBook);

export default bookRouter;