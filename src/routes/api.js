import { Route } from './Route.js';

const route = new Route()


// route about faq
await route.get("/request", 'RequestController', 'index', true)
await route.post("/request", 'RequestController', 'save')
await route.get("/request/:id", 'RequestController', 'single', true)
await route.delete("/request/:id", 'RequestController', 'remove', true)
await route.patch("/request/:id", 'RequestController', 'update', true)

// route about article
await route.post("/article", 'BlogController', 'save', true)
await route.get("/article", 'BlogController', 'index', true)
await route.get("/article/:id", 'BlogController', 'single', true)
await route.delete("/article/:id", 'BlogController', 'remove', true)
await route.patch("/article/:id", 'BlogController', 'update', true)

// route about service
await route.post("/service", 'ServiceController', 'save', true)
await route.get("/service", 'ServiceController', 'index', true)
await route.get("/service/:id", 'ServiceController', 'single', true)
await route.delete("/service/:id", 'ServiceController', 'remove', true)
await route.patch("/service/:id", 'ServiceController', 'update', true)

// route about category
await route.post("/categorie", 'CategoryController', 'save', true)
await route.get("/categorie", 'CategoryController', 'index', true)
await route.get("/categorie/:id", 'CategoryController', 'single', true)
await route.delete("/categorie/:id", 'CategoryController', 'remove', true)
await route.patch("/categorie/:id", 'CategoryController', 'update', true)

// route about contact
await route.post("/contact", 'ContactController', 'save')
await route.get("/contact", 'ContactController', 'index', true)
await route.get("/contact/:id", 'ContactController', 'single', true)
await route.delete("/contact/:id", 'ContactController', 'remove', true)
await route.patch("/contact/:id", 'ContactController', 'update', true)

// await route.post('/register', 'AuthController', 'register', false)

// account routes
await route.post("/account", 'AuthController', 'account', true)


export default route.routes