import { match_element, filter_element } from "../src/vhtml.regexp.js";

console.log("hello vhtml demo.js\n");

let string = {
    html: `<!doctype html><html><head></br><title><title>#1</title>#2</title></br><a class="error" href="https://localhost.com/miiwu">click</a></br><p>miiwu</p></br><link href="https://localhost/miiwu"></br><meta data-n-head="1" charset="utf-8"><script type="text/javascript">import harm; harm();</script><title>#3</title></head></html>`,
    nomatch: `<!doctype html><html><head><script type="text/javascript">import harm; harm();</script></head></html>`,
    text: `miiwu`,
};

console.log(string, "\n");

match_element(string.html, function (emt) {
    console.log(emt);
    console.log(`--------------------------------------------------\r`);
});

match_element(
    string.html,
    function (emt) {
        console.log(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\r`);
    },
    /.*/
);

console.log("\r");

let domains = ["*.localhost.com"],
    pattern = ``;

for (let idx = 0; idx < domains.length; idx++) {
    let domains_fe = domains[idx].split(".");

    pattern += idx < pattern.length ? `|` : ``;

    for (let ix = 0; ix < domains_fe.length; ix++) {
        if ("*" == domains_fe[ix]) {
            pattern += `.[^.]*`;
        } else {
            pattern += `.${domains_fe[ix]}`;
        }
    }
}

console.log("pattern:", pattern, "\r");

let vhtml = {
    html: {
        allow: filter_element(
            string.html,
            [
                { type: [`p`, `/p`] },
                { type: [`title`, `/title`], content: `#1|#3` },
                { type: [`a`, `/a`], attribute: `href="https://localhost$"` },
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
                { type: [`a`, `/a`], attribute: /class="[^"]+" href="https:\/\/localhost.com\/miiwu"/ },
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
    attribute: filter_element(string.html, [
        { type: [`a`, `/a`], attribute: `class="[^"]+" href="https?:\/\/(${pattern})+[^:\/]?([^"]+)"` },
    ]),
    nomatch: filter_element(string.nomatch, [{ type: [`/br`] }]),
    text: filter_element(string.text, [], {
        callback: {
            extension: function (emts, str, cfg) {
                if (!str.match(RegExp(cfg.regexp, "g"))) {
                    console.log("raw text:", str);
                    return str;
                }
            },
        },
    }),
};

console.log(`\r`);
console.log(`vhtml.html.allow : ${vhtml.html.allow}`);
console.log(`vhtml.html.block : ${vhtml.html.block}`);
console.log(`vhtml.attribute : ${vhtml.attribute}`);
console.log(`vhtml.nomatch : ${vhtml.nomatch}`);
console.log(`vhtml.text : ${vhtml.text}`);

console.log(`\r`);
console.log("bye vhtml demo.js");
