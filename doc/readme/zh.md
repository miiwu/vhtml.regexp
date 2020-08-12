<div align="center">
    <h1>vhtml.regexp</h1>
    <p>通过正则表达式过滤你想要的 HTML 元素</p>
</div>

## 缘起

我想用 `<v-html>` 来展现一些有格式的文本，但是这可能会带来威胁，`XSS`。

所以我想我能不能从大串字符串中过滤出我想要的呢？

## 特性

- 匹配 `html 元素及其属性、内容`

- 过滤 `html 元素及其属性、内容`


## 安装

`node.js` 可以通过以下方法安装

```javascript
npm install vhtml.regexp
```

## 接口

### match_element()

1. 概览

   ```javascript
   match_element(string, callback = function (element) {}, regexp = /([^<>]*)(<([^ >]*) ?([^>]*)>)/);
   ```

2. 参数

   - `string`<sup>*string*</sup>：输入字符串

   - `callback = function (element) {}`<sup>*function*</sup>：回调函数

   - `regexp = /([^<>]*)(<([^ >]*) ?([^>]*)>)/`<sup>*regexp*</sup>：匹配时的 `正则表达式`
     
     你的 `正则表达式` 必须遵守：
     
     1. `element.content = .match(regexp)[1]`
     2. `element.tag = .match(regexp)[2]`
     3. `element.type = .match(regexp)[3]`
     4. `element.attribute = .match(regexp)[4]`

3. 返回值

   无

### filter_element()

1. 概览

   ```javascript
   filter_element(string, list = [], config = {});
   ```
   
2. 参数

   - `string`<sup>*string*</sup>：输入字符串

   - `list = []`<sup>*object[]*</sup>：匹配列表

     1. `type`<sup>*string[]*</sup>：元素类型，例如 `html`
     2. `content`<sup>*string -> regexp*</sup>：元素内容，例如 /miiwu/
     3. `attribute`<sup>*string -> regexp*</sup>：元素属性，例如 /href="https:\/\/localhost"/

   - `config = {}`<sup>*object*</sup>：可选参数

     1. `allow = true`<sup>*boolean*</sup>：匹配模式
        - `allow mode`<sup>*allow = true*</sup>：将会 `保留` 匹配 `list` 的元素
        - `block mode`<sup>*allow = false*</sup>：将会 `剔除` 匹配  `list` 的元素
     2. `callback`<sup>*object*</sup>：回调函数
        - `match = function(element){}`<sup>*function*</sup>：匹配

        - `miss = function(element){}`<sup>*function*</sup>：不匹配

     3. `regexp = /([^<>]*)(<([^ >]*) ?([^>]*)>)/`<sup>*regexp*</sup>：对应 `match_element()` 中的 `regexp`

3. 返回值

   过滤后的字符串

## 愿景

- [x] `match_element()` 分离出 `content, tag, type, attribute`

## 细节

- [变更日志](../changelog/zh.md)

## 鸣谢

- [soulsign-chrome](https://github.com/inu1255/soulsign-chrome)：缘起之处
- [sspanel.sousign](https://github.com/miiwu/sspanel.soulsign)：着眼之地

## 许可

[Apache License 2.0](./license)

## 语言

- [English](./en.md)