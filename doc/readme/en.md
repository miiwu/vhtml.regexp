<div align="center">
    <h1>vhtml.regexp</h1>
    <p>Filter Elements You Want of HTML By RegExp</p>
</div>

## Background

Want to use `<v-html>` to display something not just text, but it may be dangerous, XSS.

So i want to see if i can filter what i want from massive string.

## Feature

- match `html elements & it's conent & it's attribute`
- filter `html elements & it's conent & it's attribute`

## Installation

`node.js` could install by this command:

```javascript
npm install vhtml.regexp
```

## API

### match_element()

1. Overview

   ```javascript
   function match_element(string, callback = function (element) {}, regexp = /([^<>]*)(<([^ >]*) ?([^>]*)>)/);
   ```
   
2. Arguments

   - `string`<sup>*string*</sup>: input string

   - `callback = function (element) {}`<sup>*funcion*</sup>: callback function

   - `regexp = /([^<>]*)(<([^ >]*) ?([^>]*)>)/`<sup>*regexp*</sup>: `regexp pattern` catches the elements
     
     Your `regexp pattern` must observe these:
     
     1. `element.content = .match(regexp)[1]`
     2. `element.tag = .match(regexp)[2]`
     3. `element.type = .match(regexp)[3]`
     4. `element.attribute = .match(regexp)[4]`


3. Return

   none

### filter_element()

1. Overview

   ```javascript
   function filter_element(string, list = [], config = {});
   ```
   
2. Arguments

   - `string`<sup>*string*</sup>: input string

   - `list = []`<sup>*object[]*</sup>: match list

     1. `type`<sup>*string[]*</sup>: type of element, such as 'html'
     2. `content`<sup>*string -> regexp*</sup>: content of element, such as /miiwu/
     3. `attribute`<sup>*string -> regexp*</sup>: content of attribute, such as /href="https:\/\/localhost"/

   - `config = {}`<sup>*object*</sup>: optional configurations
     1. `allow = true`<sup>*boolean*</sup>: match mode
        - `allow mode`<sup>*allow = true*</sup>: would `retain` elements match `list`
        - `block mode`<sup>*allow = false*</sup>: would `reject` elements match `list`
     2. `callback`<sup>*object*</sup>: callback function
        - `match = function(element){}`<sup>*function*</sup>: called when `match`
        - `miss = function(element){}`<sup>*function*</sup>: called when `miss` or  `mismatch`
        - `extension = function(string, elements){}`<sup>*function*</sup>: called when filter complete
   
     3. `regexp = /([^<>]*)(<([^ >]*) ?([^>]*)>)/`<sup>*regexp*</sup>: correspond the `regexp` of `match_element()`

3. Return

   string filtered through the list

## Idea

- [x] `match_element()` split into `content, tag, type, attribute`

## Resource

- [changelog](../changelog/en.md)

## Gratitude

- [soulsign-chrome](https://github.com/inu1255/soulsign-chrome)：The project let me to start the repo
- [sspanel.sousign](https://github.com/miiwu/sspanel.soulsign)：The project i want to display

## License

[Apache License 2.0](./license)

## Language

- [中文](./zh.md)