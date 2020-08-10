<div align="center">
    <h1>vhtml.regexp</h1>
    <p>Filter Elements You Want of HTML By RegExp</p>
</div>

## 介绍

- 匹配 `html 元素及其内容`

- 过滤 `html 元素及其属性、内容`

- 采用 `放行模式`，将会 `保留` 匹配的元素

## 使用

```javascript
import { match_element, filter_element } from "./vregexp.js";

match_element(string, callback = function (tag, content, type, match) {}, regexp = /([^<>]*)(<([^>]+)>)/); // 匹配元素

filter_element(
    string,
    allow = [],
    callback = function (tag, content, attribute, allow) {},
    regexp = /([^<>]*)(<([^>]+)>)/
); // 过滤元素
```

## 愿景

- [ ] `match_element()` 分离出 `content, tag, type, attribute`

## 更新

- 0.0.1
  1. `match_element()`：支持匹配 `html 元素` ，可以通过 `regexp` 参数调优
  2. `filter_element()`：支持过滤 `html 元素及其属性、内容`
  4. 采用 `ES6 import / export` 模块化
  5. 支持 `localhost CORS`，通过 `IIS`，本地调试相关
  6. 使用 `jsdeliver CDN`，发布运行相关

## 鸣谢

- [soulsign-chrome](https://github.com/inu1255/soulsign-chrome)

## 许可

[Apache License 2.0](./license)