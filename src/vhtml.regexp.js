/**
 * [vhtml.regexp]{@link https://github.com/miiwu/vhtml.regexp}
 *
 * @namespace vhtml.regexp
 * @version 0.1.1
 * @author miiwu [i.miiwu@outlook.com]
 * @copyright miiwu
 * @license Apache License 2.0
 */

function match_element(string, callback = function (tag, content, type, match) {}, regexp = /([^<>]*)(<([^>]+)>)/) {
    let match_me;

    while (true) {
        if (!(match_me = string.match(regexp))) break; // 如果 `正则匹配` 失败，退出

        callback(match_me[2], match_me[1], match_me[3], match_me);

        string = string.slice(match_me[1].length + match_me[2].length); // 推进字符串前移
    }
}

function filter_regexp(string, regexp = ".*") {
    let match_fr = string.match(RegExp(regexp));

    if (!match_fr) return "";
    else return match_fr[0];
}

function filter_element(
    string,
    allow = [],
    callback = function (tag, content, attribute, allow) {},
    regexp = /([^<>]*)(<([^>]+)>)/
) {
    let elements = { pattern: "", table: [] };
    let string_fe = "";

    for (let idx = 0; idx < allow.length; idx++) {
        for (let ix = 0, element = allow[idx].tag; ix < element.length; ix++) {
            elements.pattern = elements.pattern + `${elements.pattern.length ? "|" : ""}(${element[ix]})`;
            elements.table.push(idx); // `table.index` <-> `allow.index`
        }
    } // 合成 `正则表达式`

    match_element(
        string,
        function (tag, content, type) {
            let match_fe = tag.match(RegExp(elements.pattern));

            if (!!match_fe) {
                let allow_fe = {},
                    pkg_fe = { tag: "", ctt: content, aie: "" };

                for (let idx = 1; idx < match_fe.length; idx++) {
                    if (!!match_fe[idx]) {
                        allow_fe = allow[elements.table[idx - 1]];
                        break;
                    }
                } // 求出 `匹配元素` 的索引

                match_fe = type.match(/([^ ]+)(.*)/);

                pkg_fe.tag = match_fe[1];
                if (!!allow_fe.content) pkg_fe.ctt = filter_regexp(content, allow_fe.content);
                if (!!allow_fe.attribute) pkg_fe.aie = filter_regexp(match_fe[2], ` ${allow_fe.attribute}`);

                string_fe = string_fe.concat(`${pkg_fe.ctt}<${pkg_fe.tag}${pkg_fe.aie}>`);

                callback(pkg_fe.tag, pkg_fe.ctt, pkg_fe.aie, allow_fe);
            } // 是否匹配到 `允许的元素`
        },
        regexp
    ); // 匹配 `元素`

    return string_fe.length ? string_fe : string;
}

export { match_element, filter_element, filter_regexp };
