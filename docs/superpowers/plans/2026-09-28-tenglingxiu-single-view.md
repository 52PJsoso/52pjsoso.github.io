# 腾领袖单内容展示实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 隐藏产品切换页签并默认只展示腾领袖内容，同时更新兼容性和版本文案，完整保留无界视频资源。

**架构：** 保留现有 HTML 内容和视频 URL，以 CSS 隐藏页签、以现有 `tab-tlx` 状态隐藏无界分区。JavaScript 初始化时直接设置腾领袖状态，静态契约测试读取三份前端文件并验证展示状态、文案和资源保留要求。

**技术栈：** 静态 HTML、CSS、原生 JavaScript、Node.js 内置测试运行器

---

## 文件结构

- 创建 `tests/ui-contract.test.js`：验证页面文案、单内容展示状态以及无界资源未删除。
- 修改 `index.html`：替换顶部兼容性和版本文案，不删除页签或无界内容节点。
- 修改 `styles.css`：隐藏页签容器且不占页面空间。
- 修改 `script.js`：将页面默认状态从 `tab-wujie` 改为 `tab-tlx`。

### 任务 1：建立界面契约测试

**文件：**
- 创建：`tests/ui-contract.test.js`
- 测试：`tests/ui-contract.test.js`

- [ ] **步骤 1：编写失败的测试**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8');

test('shows the selected compatibility and V8.0.77 copy', () => {
  assert.match(html, /营销系统只要手机能够解锁 BL 锁并完成 ROOT，即可刷入。/);
  assert.match(html, /支持摩托罗拉、联想、一加、小米等品牌；不确定是否兼容，可将手机型号提供给客服咨询。/);
  assert.match(html, /我们已经升级至 V8\.0\.77 版本，请放心购买。/);
  assert.doesNotMatch(html, /V8\.0\.60/);
});

test('hides tabs and initializes the Tenglingxiu view', () => {
  assert.match(css, /\.tabs\s*\{[^}]*display:\s*none\s*;/s);
  assert.match(script, /body\.classList\.add\(['"]tab-tlx['"]\)/);
  assert.doesNotMatch(script, /默认显示无界/);
});

test('keeps Wujie content and video resources in source', () => {
  assert.match(html, /id="full-list"/);
  assert.match(html, /class="feature-section wujie-section"/);
  assert.ok((html.match(/\/wujie\//g) || []).length >= 70);
});
```

- [ ] **步骤 2：运行测试并确认因新行为尚未实现而失败**

运行：`node --test tests/ui-contract.test.js`

预期：文案和默认腾领袖状态断言失败，无界资源保留断言通过。

### 任务 2：实现腾领袖单内容展示

**文件：**
- 修改：`index.html:20`
- 修改：`styles.css:217`
- 修改：`script.js:7`
- 测试：`tests/ui-contract.test.js`

- [ ] **步骤 1：替换顶部文案**

将原有两条 `.version-info` 替换为：

```html
<p class="version-info">营销系统只要手机能够解锁 BL 锁并完成 ROOT，即可刷入。</p>
<p class="version-info">支持摩托罗拉、联想、一加、小米等品牌；不确定是否兼容，可将手机型号提供给客服咨询。</p>
<p class="version-info">我们已经升级至 V8.0.77 版本，请放心购买。</p>
```

- [ ] **步骤 2：隐藏页签并设置默认视图**

在 `.tabs` 规则中使用 `display: none`，并将初始化代码改为：

```javascript
// 默认显示腾领袖
body.classList.add('tab-tlx');
```

- [ ] **步骤 3：运行契约测试验证通过**

运行：`node --test tests/ui-contract.test.js`

预期：3 项测试全部通过。

- [ ] **步骤 4：检查差异与空白错误**

运行：`git -c safe.directory=D:/WebProject diff --check -- index.html styles.css script.js tests/ui-contract.test.js`

预期：退出码 0，无输出。

### 任务 3：浏览器回归验证

**文件：**
- 验证：`index.html`
- 验证：`styles.css`
- 验证：`script.js`

- [ ] **步骤 1：启动静态服务器**

运行：`npx --yes serve . -l 4173`

预期：页面可通过 `http://localhost:4173` 访问。

- [ ] **步骤 2：检查桌面和移动端**

在桌面与移动视口确认：页签不可见；第一项内容为“转发功能”；无界功能分区不可见；三条新文案没有溢出或重叠。

- [ ] **步骤 3：检查视频弹窗**

点击腾领袖功能卡片，确认视频弹窗打开；关闭按钮和 Escape 键仍可关闭弹窗。

- [ ] **步骤 4：完成前重新运行完整验证**

运行：`node --test tests/ui-contract.test.js`

预期：3 项测试全部通过，无失败。

