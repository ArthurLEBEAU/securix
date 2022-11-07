import { Route } from './Route.js';

await Route.get("/categorie", 'CategoryController', 'index')
await Route.post("/categorie", 'CategoryController', 'save')
await Route.get("/categorie/:id", 'CategoryController', 'single')
await Route.delete("/categorie/:id", 'CategoryController', 'remove')
await Route.patch("/categorie/:id", 'CategoryController', 'update')


export default Route.routes
