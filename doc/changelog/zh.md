# 变更日志

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