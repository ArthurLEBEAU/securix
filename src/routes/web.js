import { Route } from './Route.js';

await Route.get("/", 'PageController', 'home')
await Route.get("/faq", 'PageController', 'faq')
await Route.get("/services", 'PageController', 'service')
await Route.get("/contact", 'PageController', 'contact')
await Route.get("/blog", 'PageController', 'blog')
await Route.get("/a-propos", 'PageController', 'about')
await Route.get("/blog/:id", 'PageController', 'single')
await Route.get("*", 'PageController', 'NotFound')


export default Route.routes