import { Route } from './Route.js';

const route = new Route()


// auth routes
await route.get("/login", 'AuthController', 'loginView')
await route.get("/register", 'AuthController', 'registerView')
await route.get("/contact", 'AdminController', 'contactView', true)
await route.get("/service", 'AdminController', 'serviceView', true)
await route.get("/articles", 'AdminController', 'articleView', true)
await route.get("/categorie", 'AdminController', 'categoryView', true)
await route.get("/account", 'AdminController', 'accountView', true)
await route.get("/faq", 'AdminController', 'faqView', true)
await route.get("/logout", 'AuthController', 'logout', true)
await route.get("/", 'AdminController', 'home', true)
await route.post("/login", 'AuthController', 'login')
await route.post("/register", 'AuthController', 'register')


export default route.routes