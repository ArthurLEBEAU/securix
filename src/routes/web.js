import { Route } from './Route.js';

const route = new Route()
    // user routes
await route.get("/", 'PageController', 'home')
await route.get("/faq", 'PageController', 'faq')
await route.get("/services", 'PageController', 'service')
await route.get("/contact", 'PageController', 'contact')
await route.get("/blog", 'PageController', 'blog')
await route.get("/a-propos", 'PageController', 'about')
await route.get("/comparateur", 'PageController', 'comparator')
await route.get("/blog/:id", 'PageController', 'single')

// not found
await route.get("*", 'PageController', 'NotFound')


export default route.routes