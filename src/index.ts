import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import { logger } from 'hono/logger'
import { trimTrailingSlash } from 'hono/trailing-slash'
import bookRouter from './router/books.router'
import { csrf } from 'hono/csrf'
import { cors } from 'hono/cors'


const app = new Hono({ strict: true})
app.use(cors())
app.use(csrf())
app.use(logger()) 
app.use(trimTrailingSlash())
app.notFound((c) => {
  return c.text('Not Found', 404)
})

app.get('/', (c) => {
  return c.redirect('/api');
});

app.get('/', (c) => {
  return c.text('Hello from BookRepo.inc!')
})
app.route('/api', bookRouter)
serve({
  fetch: app.fetch,
  port: Number(process.env.PORT )
})


console.log(`Server is running on port ${process.env.PORT}`)