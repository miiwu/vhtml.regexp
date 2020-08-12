<div align="center">
    <h1>vhtml.regexp</h1>
    <p>通过正则表达式过滤你想要的 HTML 元素</p>
</div>

## 缘起

我想用 `<v-html>` 来展现一些有格式的文本，但是这可能会带来威胁，`XSS`。

所以我想我能不能从大串字符串中过滤出我想要的呢？

## 特性

- 匹配 `html 元素及其内容`

- 过滤 `html 元素及其属性、内容`

- 采用 `放行模式`，将会 `保留` 匹配的元素

## 安装

`node.js` 可以通过以下方法安装

```javascript
npm install vhtml.regexp
```

## 接口

### match_element()

```javascript
match_element(string, callback = function (tag, content, type, match) {}, regexp = /([^<>]*)(<([^>]+)>)/);
```

### filter_element()

```javascript
filter_element(
    string,
    allow = [],
    callback = function (tag, content, attribute, allow) {},
    regexp = /([^<>]*)(<([^>]+)>)/
);
```

## 愿景

- [ ] `match_element()` 分离出 `content, tag, type, attribute`

## 细节

- [变更日志](../changelog/zh.md)

## 鸣谢

- [soulsign-chrome](https://github.com/inu1255/soulsign-chrome)：缘起之处
- [sspanel.sousign](https://github.com/miiwu/sspanel.soulsign)：着眼之地

## 许可

[Apache License 2.0](./license)

## 语言

- [English](./en.md)