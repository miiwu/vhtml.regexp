# 变更日志

## 1.0.2 (2020/08/16)

#### 特性：

- `vhtml.regexp.js`：`严格模式`
- `vhtml.regexp.js`：`match_element()`，为 `.callback()` 增加 `.tool` 参数
- `vhtml.regexp.js`：重新支持 `纯文本`
- `vhtml.regexp.js`：`filter_element()`，让 `.callback.extension()` 作为  `match_element().callback()` 的延续
- `demo.js`：增加 `object.no_element` & `object.half_element`，移除 `text`，重命名 `nomatch` 为 `no_match`

#### 修复: 

- `demo.js`：修复匹配 `attribute` 的 `pattern`
- `vhtml.regexp.js`：异常情况，当 `arguments.string` 的类型不是 `string` 时
- `vhtml.regexp.js`：丢失最后一个元素之后的字符

#### 文档:

- `readme.md`：更新
- `changelog.md`：更新
- `package.json`：更新

## 1.0.1 (2020/08/14)

#### 特性：

- `match_element()`：避免一些由 `arguments.regexp` 引起的 `无限循环`
- `filter_element()`：增加  `callback.extension()`，当过滤完成时调用
- `filter_element()`：移除对 `纯文本` 的支持，但是可以通过 `callback.extension()` 扩展实现
- `demo.js`：增加 `nomach` & `attribute`

#### 修复：

- `filter_element()`：混淆 `纯文本` 和 `无匹配`

#### 文档：

- `readme.md`：更新
- `package.json`：更新

## 1.0.0 (2020/08/12)

#### 特性：

- `filter_element()`：整理 `可选配置` 到 `arguments.config`
- `filter_element()`：支持 `allow / block mode`，需配置 `arguments.config.allow`
- `filter_element()`：重命名 `list[].tag` 为 `list[].type`
- `demo.html`：更新 `/npm/package@version`

#### 文档：

- `readme.md`：更新
- `package.json`：更新

## 0.1.1 (2020/08/12)

#### 特性：

- 支持 `npm`
- 变更 `目录结构`
- 增加 `demo.console`，存放 `demo` 的预期的执行结果

#### 修复：

- `vhtml.regexp.js`：未指定过滤元素的内容时会丢失内容

#### 文档：

- 增加 `package.json`
- `readme.md`: 更新

## 0.1.0 (2020/08/11)

#### 特性：

- `match_element()`：支持匹配 `html 元素` ，可以通过 `regexp` 参数调优
- `filter_element()`：支持过滤 `html 元素及其属性、内容`
- 采用 `ES6 import / export` 模块化
- 支持 `localhost CORS`，通过 `IIS`，本地调试相关
- 使用 `jsdeliver CDN`，发布运行相关

#### 文档：

- 增加 `.gitignore` & `readme.md`