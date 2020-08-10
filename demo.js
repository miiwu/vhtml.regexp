import { match_element, filter_element } from "./vregexp.js";

console.log("hello vhtml.regexp demo.js\n");

let string = {
    html: `<!doctype html><html><head></br><title><title>#1</title>#2</title></br><a href="https://localhost/miiwu"></br><p>miiwu</p></br><link href="https://localhost/miiwu"></br><meta data-n-head="1" charset="utf-8"><script>import harm;</script><title>#3</title></head></html>`,
    text: `miiwu`,
};

match_element(string.html, function (tag, ctt, type) {
    console.log({ tag, ctt, type });
    console.log(`--------------------------------------------------\r`);
});

let vhtml = {
    html: filter_element(
        string.html,
        [
            { tag: [`<p>`, `</p>`] },
            { tag: [`<title>`, `</title>`], content: `#1|#3` },
            { tag: [`<a[^>]+>`], attribute: `href="https://localhost$"` },
            { tag: [`<link[^>]+>`], attribute: `href="https://localhost/miiwu"` },
            { tag: [`</br>`] },
        ],
        function (tag, ctt, aie) {
            console.log(">>", { tag, ctt, aie });
        }
    ),
    text: filter_element(string.text),
};

console.log(`\nvhtml.html : ${vhtml.html}`);
console.log(`vhtml.text : ${vhtml.text}`);

console.log("\nbye vhtml.regexp demo.js");
