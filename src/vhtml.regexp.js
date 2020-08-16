/**
 * [vhtml.regexp]{@link https://github.com/miiwu/vhtml.regexp}
 *
 * @namespace vhtml.regexp
 * @version 1.0.2
 * @author miiwu [i.miiwu@outlook.com]
 * @copyright miiwu
 * @license Apache License 2.0
 */

"use strict";

function match_element(string, callback = function (element, tool) {}, regexp = /([^<>]*)(<([^ >]*) ?([^>]*)>)/) {
    let match_me = {},
        index_me = 0;

    if ("string" == typeof string) {
        while (true) {
            if (!(match_me = string.match(regexp)) || !match_me[0].length) return index_me; // 如果 `正则匹配` 失败 || 没匹配到东西，退出

            if (5 <= match_me.length) {
                callback(
                    {
                        content: match_me[1],
                        tag: match_me[2],
                        type: match_me[3],
                        attribute: match_me[4],
                    },
                    { index: index_me + match_me[1].length, match: match_me }
                );
            }

            string = string.slice(match_me[0].length); // 字符串前移，`正则表达式` 匹配到的长度
            index_me += match_me[0].length; // 记录下次开始匹配的位置
        }
    }
}

function filter_regexp(string, regexp = /.*/) {
    let match_fr = string.match(RegExp(regexp));

    if (!match_fr) return "";
    else return match_fr[0];
}

function filter_element(string, list = [], config = {}) {
    function concat_element(emt) {
        elements.string = elements.string.concat(
            `${emt.content}<${emt.type}${!!emt.attribute ? " " + emt.attribute : emt.attribute}>`
        );
    } // 合并 `元素` 字符串

    function callback(type) {
        if (!!config.callback && !!config.callback[type])
            return config.callback[type](arguments[1], arguments[2], arguments[3]);
    } // 处理 `回调函数`

    config = Object.assign({ allow: true, regexp: /([^<>]*)(<([^ >]*) ?([^>]*)>)/ }, config); // 合并 `配置`

    let elements = { pattern: "", table: [], string: "", index: 0 },
        handler_fe = [
            {
                match: function (emt, item) {
                    if (!item.content && !item.attribute) return; // 未指定 `内容` 或 `属性`，退出

                    if (!!item.content && filter_regexp(emt.content, item.content).length) emt.content = ""; // 过滤 `内容`
                    if (!!item.attribute && filter_regexp(emt.attribute, item.attribute).length) emt.attribute = ""; // 过滤 `属性`

                    concat_element(emt);
                },
                miss: function (emt) {
                    concat_element(emt);
                },
            },
            {
                match: function (emt, item) {
                    if (!!item.content) emt.content = filter_regexp(emt.content, item.content); // 过滤 `内容`
                    if (!!item.attribute) emt.attribute = filter_regexp(emt.attribute, item.attribute); // 过滤 `属性`

                    concat_element(emt);
                },
                miss: function (emt) {},
            },
        ][Number(Boolean(config.allow))]; // 处理模式

    for (let idx = 0; idx < list.length; idx++) {
        for (let ix = 0, element = list[idx].type; ix < element.length; ix++) {
            elements.pattern = elements.pattern + `${elements.pattern.length ? "|" : ""}(<${element[ix]}[^>]*>)`;
            elements.table.push(idx); // `table.index` <-> `list.index`
        }
    } // 合成 `正则表达式`

    elements.pattern = RegExp(elements.pattern);
    elements.index = match_element(
        string,
        function (element, tool) {
            let match_fe = element.tag.match(elements.pattern);

            if (!match_fe) {
                handler_fe.miss(element);
                callback("miss", element);
            } else {
                for (let idx = 1; idx < match_fe.length; idx++) {
                    if (!!match_fe[idx]) {
                        handler_fe.match(element, list[elements.table[idx - 1]]);
                        callback("match", element);
                        break;
                    }
                } // 求出 `匹配元素` 的索引
            } // 是否匹配到 `列表中的元素`

            callback("extension", element, tool);
        },
        config.regexp
    ); // 匹配 `元素`

    return (elements.string += string.slice(elements.index)); // 补全剩余 `非元素字符串`
}

export { match_element, filter_element, filter_regexp };
