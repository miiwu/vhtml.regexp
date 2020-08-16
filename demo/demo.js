import { match_element, filter_element } from "../src/vhtml.regexp.js";

console.log("hello vhtml demo.js");
console.log("\r");

let string = {
        html: `<!doctype html><html><head></br><title><title>#1</title>#2</title></br><a class="error" href="https://localhost.com/miiwu">click</a></br><p>miiwu</p></br><link href="https://localhost/miiwu"></br><meta data-n-head="1" charset="utf-8"><script type="text/javascript">import harm; harm();</script><title>#3</title></head></html>`,
        attribute: `<a href="https://localhost.com">#1</a></br><a href="https://localhost.com/miiwu">#2</a></br><a href="https://a.localhost.com">#3</a></br><a href="https://a.localhost.com/miiwu">#4</a></br><a href="https://b.a.localhost.com">#5</a></br><a href="https://b.a.localhost.com/miiwu">#6</a>`,
        no_match: `<!doctype html><html><head><script type="text/javascript">import harm; harm();</script></head></html>`,
        text: `miiwu`,
    },
    object = {
        no_element: {
            name: `miiwu`,
            addr: `github.com`,
            repo: `vhtml.regexp`,
        },
        half_element: {
            name: `</br><a href="localhost">miiwu</a>`,
            addr: `</br><a href="localhost">github.com</a>`,
            repo: `</br><a href="localhost">vhtml.regexp</a>`,
        },
    };

console.log("string:", string);
console.log("\r");
console.log("object:", object);
console.log("\r");

match_element(
    string.html,
    function (emt) {
        console.log(`??????????????????????????????????????????\r`);
    },
    /.*/
);

let domains = ["*.localhost.com"],
    pattern = ``;

for (let idx = 0; idx < domains.length; idx++) {
    let domains_fe = domains[idx].split(".");

    pattern += idx ? `|` : ``;

    for (let ix = 0; ix < domains_fe.length; ix++) {
        pattern += `${ix ? "." : ""}${"*" == domains_fe[ix] ? "[^.]+" : domains_fe[ix]}`;
    }
}

console.log("pattern:", pattern);
console.log("\r");

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
                        console.log("allow.+ :", emt);
                        console.log(`--------------------------------------------------\r`);
                    },
                    miss: function (emt) {
                        console.log("allow.- :", emt);
                        console.log(`--------------------------------------------------\r`);
                    },
                    extension: function (emt, tool) {
                        console.log(`No.${tool.index} :`, emt);
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
    attribute: filter_element(string.attribute, [
        { type: [`a`, `/a`], attribute: `href="https?:\/\/((${pattern})+([^"]+)?)"` },
    ]),
    no_match: filter_element(string.no_match, [{ type: [`/br`] }]),
    object: {
        no_element: filter_element(JSON.stringify(object.no_element), []),
        half_element: filter_element(JSON.stringify(object.half_element), [
            { type: [`/br`] },
            { type: [`a`, `/a`], attribute: `href=[^"]?"localhost[^"]?"` },
        ]),
    },
};

console.log(`\r`);
console.log(`vhtml.html.allow :`, vhtml.html.allow);
console.log(`vhtml.html.block :`, vhtml.html.block);
console.log(`vhtml.attribute :`, vhtml.attribute);
console.log(`vhtml.no_match : `, vhtml.no_match);
console.log(`vhtml.object.no_element :`, JSON.parse(vhtml.object.no_element));
console.log(`vhtml.object.half_element :`, JSON.parse(vhtml.object.half_element));

console.log(`\r`);
console.log("bye vhtml demo.js");
