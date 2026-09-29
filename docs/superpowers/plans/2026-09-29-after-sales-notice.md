# 售后保障提示实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 在顶部版本信息之后增加独立的售后保障提示区，并保持桌面和手机端清晰、无溢出。

**架构：** 在现有 `.contact-info` 中插入语义化售后说明节点，使用独立 CSS 类控制浅蓝背景、左侧强调边框和文字层级。沿用 Node 内置测试运行器检查文案、DOM 顺序和关键样式，不增加 JavaScript 或运行时依赖。

**技术栈：** 静态 HTML、CSS、Node.js 内置测试运行器

---

## 文件结构

- 修改 `tests/ui-contract.test.js`：增加售后文案、位置和样式契约。
- 修改 `index.html`：在版本信息和下单提示之间插入售后保障区。
- 修改 `styles.css`：增加售后保障区的桌面与移动端通用样式。

### 任务 1：增加售后保障提示

**文件：**
- 修改：`tests/ui-contract.test.js`
- 修改：`index.html:23`
- 修改：`styles.css:88`

- [ ] **步骤 1：编写失败的契约测试**

```javascript
test('shows after-sales protection between version and order notices', () => {
  const versionIndex = html.indexOf('我们已经升级至 V8.0.77 版本，请放心购买。');
  const serviceIndex = html.indexOf('class="service-notice"');
  const orderIndex = html.indexOf('下单前先咨询客服核实再下单。');

  assert.match(html, /<strong class="service-notice-title">售后保障<\/strong>/);
  assert.match(html, /购买系统即享永久更新与持续售后服务。购买时绑定的本机如遇系统或软件故障，可联系客服免费重装。/);
  assert.ok(versionIndex < serviceIndex && serviceIndex < orderIndex);
  assert.match(css, /\.service-notice\s*\{[^}]*background:\s*#eef5ff\s*;[^}]*border-left:\s*4px solid var\(--primary-color\)\s*;[^}]*text-align:\s*left\s*;/s);
});
```

- [ ] **步骤 2：运行测试并确认失败**

运行：`node --test tests/ui-contract.test.js`

预期：新增测试因 `.service-notice` 尚不存在而失败，原有 3 项测试继续通过。

- [ ] **步骤 3：添加最小 HTML 实现**

```html
<div class="service-notice">
    <strong class="service-notice-title">售后保障</strong>
    <p>购买系统即享永久更新与持续售后服务。购买时绑定的本机如遇系统或软件故障，可联系客服免费重装。</p>
</div>
```

- [ ] **步骤 4：添加最小 CSS 实现**

```css
.service-notice {
    margin: 0.8rem 0 0.5rem;
    padding: 0.8rem 1rem;
    background: #eef5ff;
    border-left: 4px solid var(--primary-color);
    border-radius: 6px;
    text-align: left;
    color: var(--text-color);
    font-size: 0.9rem;
}

.service-notice-title {
    display: block;
    margin-bottom: 0.2rem;
    color: var(--primary-color);
    font-size: 0.95rem;
}

.service-notice p {
    margin: 0;
}
```

- [ ] **步骤 5：运行测试验证通过**

运行：`node --test tests/ui-contract.test.js`

预期：4 项测试全部通过。

- [ ] **步骤 6：浏览器回归验证**

在 `1440x900` 和 `390x844` 视口验证售后提示位于版本信息与下单提示之间、无水平溢出；点击腾领袖卡片并按 Escape，确认视频弹窗仍可打开和关闭。

- [ ] **步骤 7：提交实现**

```bash
git add index.html styles.css tests/ui-contract.test.js docs/superpowers/plans/2026-09-29-after-sales-notice.md
git commit -m "feat: 增加售后保障说明"
```
