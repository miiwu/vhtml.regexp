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
- use `allow mode`, will retain the elements matched

## Installation

`node.js` could install by this command:

```javascript
npm install vhtml.regexp
```

## API

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

## Idea

- [ ] `match_element()` split into `content, tag, type, attribute`

## Resource

- [changelog](../changelog/en.md)

## Gratitude

- [soulsign-chrome](https://github.com/inu1255/soulsign-chrome)：The project let me to start the repo
- [sspanel.sousign](https://github.com/miiwu/sspanel.soulsign)：The project i want to display

## License

[Apache License 2.0](./license)

## Language

- [中文](./zh.md)