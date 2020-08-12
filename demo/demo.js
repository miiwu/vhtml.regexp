import { match_element, filter_element } from "../src/vhtml.regexp.js";

console.log("hello vhtml demo.js\n");

let string = {
    html: `<!doctype html><html><head></br><title><title>#1</title>#2</title></br><a href="https://localhost/miiwu"></br><p>miiwu</p></br><link href="https://localhost/miiwu"></br><meta data-n-head="1" charset="utf-8"><script type="text/javascript">import harm; harm();</script><title>#3</title></head></html>`,
    text: `miiwu`,
};

console.log(string, "\n");

match_element(string.html, function (emt) {
    console.log(emt);
    console.log(`--------------------------------------------------\r`);
});

console.log("\r");

let vhtml = {
    html: {
        allow: filter_element(
            string.html,
            [
                { type: [`p`, `/p`] },
                { type: [`title`, `/title`], content: `#1|#3` },
                { type: [`a`], attribute: `href="https://localhost$"` },
                { type: [`link`], attribute: `href="https://localhost/miiwu"` },
                { type: [`/br`] },
            ],
            {
                callback: {
                    match: function (emt) {
                        console.log("allow.xx", emt);
                        console.log(`--------------------------------------------------\r`);
                    },
                    miss: function (emt) {
                        console.log("allow.>>", emt);
                        console.log(`--------------------------------------------------\r`);
                    },
                },
            }
        ),
        block: filter_element(
            string.html,
            [
                { type: [`!doctype`] },
                { type: [`head`, `/head`] },
                { type: [`html`, `/html`] },
                { type: [`title`, `/title`], content: /#2/ },
                { type: [`script`, `/script`] },
                { type: [`meta`] },
                { type: [`a`], attribute: /href="https:\/\/localhost\/miiwu"/ },
                { type: [`link`], attribute: /href="https:\/\/localhost$"/ },
            ],
            {
                allow: false,
                callback: {
                    match: function (emt) {
                        console.log("block.>>", emt);
                        console.log(`--------------------------------------------------\r`);
                    },
                    miss: function (emt) {
                        console.log("block.xx", emt);
                        console.log(`--------------------------------------------------\r`);
                    },
                },
            }
        ),
    },
    text: filter_element(string.text),
};

console.log(`\r`);
console.log(`vhtml.html.allow : ${vhtml.html.allow}`);
console.log(`vhtml.html.block : ${vhtml.html.block}`);
console.log(`vhtml.text : ${vhtml.text}`);

console.log(`\r`);
console.log("bye vhtml demo.js");
