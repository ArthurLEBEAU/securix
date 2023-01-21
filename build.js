import fs from "fs"
import { build } from "esbuild";
// to et the file name

// to et the directory path name
const global_js = fs.readdirSync("./src/views/static/js")
    .filter(src => src.endsWith(".js"))
    .map((src) => "./src/views/static/js/" + src)
const api_js = fs.readdirSync("./src/views/static/js/api").filter(src => src.endsWith(".js"))
    .map((src) => "./src/views/static/js/api/" + src)
const css = fs.readdirSync("./src/views/static/css").filter(src => src.endsWith(".css"))
    .map((src) => "./src/views/static/css/" + src)


const itemToBuild = {
    js: {
        file: global_js,
        optput: 'public/assets/js/'
    },
    api_js: {
        file: api_js,
        optput: 'public/assets/js/api'
    },
    css: {
        file: css,
        optput: 'public/assets/css/'
    }
}
Object.keys(itemToBuild).forEach(key => {
    build({
            entryPoints: itemToBuild[key].file,
            bundle: true,
            minify: true,
            keepNames: true,
            outdir: itemToBuild[key].optput,
            treeShaking: true,
            metafile: true,
            write: true,
            format: 'iife',
            loader: {
                ".js": "js",
                ".css": "css",
                '.jpg': 'file',
            }
        })
        .then(() => console.log("⚡ Done"))
        .catch(() => process.exit(1));
});