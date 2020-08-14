# Changelog

## 1.0.1 (2020/08/14)

#### feat：

- `match_element()`: avoid some `endless-loop`, caused by `arguments.regexp`
- `filter_element()`: support `callback.extension()`, called when filter complete
- `filter_element()`: remove support for `plain-text `, but may extend by `callback.extension()`
- `demo.js`: add `nomach` & `attribute`

#### fix: 

- `filter_element()`: mix up `plain-text` with `no-match`

#### docs:

- `readme.md`: update
- `package.json`: update

## 1.0.0 (2020/08/12)

#### feat：

- `filter_element()`: tidy `optional configurations` to `arguments.config`
- `filter_element()`: support `allow / block mode`, config by `arguments.config.allow`
- `filter_element()`: rename `list[].tag` to `list[].type`
- `demo.html`: update `/npm/package@version`

#### docs:

- `readme.md`: update
- `package.json`: update

## 0.1.1 (2020/08/12)

#### feat:

- support `npm`
- change `directory structure`
- add `demo.console`, store expected result of `demo`

#### fix:

- `vhtml.regexp.js`: loss content when without regulation

#### docs:

- add `package.json`
- `readme.md`: update

## 0.1.0 (2020/08/11)

#### feat:

- `match_element()`: support match elements of `html`
- `filter_element()`: support filter `element` & `it's content / attribute` you want
- support modularity, by `ES6 import / export`
- support localhost CORS, by IIS, for local debug
- add `jsdelivr cdn`, for demo run

#### docs:

- add `.gitignore` & `readme.md`