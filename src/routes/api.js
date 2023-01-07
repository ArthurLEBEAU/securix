import { Route } from './Route.js';

await Route.get("/request", 'RequestController', 'index')
await Route.post("/request", 'RequestController', 'save')
await Route.get("/request/:id", 'RequestController', 'single')
await Route.delete("/request/:id", 'RequestController', 'remove')
await Route.patch("/request/:id", 'RequestController', 'update')

// route about article
await Route.post("/article", 'BlogController', 'save')
await Route.get("/article", 'BlogController', 'index')
await Route.get("/article/:id", 'BlogController', 'single')
await Route.delete("/article/:id", 'BlogController', 'remove')
await Route.patch("/article/:id", 'BlogController', 'update')

// route about service
await Route.post("/service", 'ServiceController', 'save')
await Route.get("/service", 'ServiceController', 'index')
await Route.get("/service/:id", 'ServiceController', 'single')
await Route.delete("/service/:id", 'ServiceController', 'remove')
await Route.patch("/service/:id", 'ServiceController', 'update')

// route about cataegory
await Route.post("/categorie", 'CategoryController', 'save')
await Route.get("/categorie", 'CategoryController', 'index')
await Route.get("/categorie/:id", 'CategoryController', 'single')
await Route.delete("/categorie/:id", 'CategoryController', 'remove')
await Route.patch("/categorie/:id", 'CategoryController', 'update')

// route about contact
await Route.post("/contact", 'ContactController', 'save')
await Route.get("/contact", 'ContactController', 'index')
await Route.get("/contact/:id", 'ContactController', 'single')
await Route.delete("/contact/:id", 'ContactController', 'remove')
await Route.patch("/contact/:id", 'ContactController', 'update')

export default Route.routes