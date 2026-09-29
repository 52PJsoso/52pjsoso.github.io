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

test('shows after-sales protection between version and order notices', () => {
  const versionIndex = html.indexOf('我们已经升级至 V8.0.77 版本，请放心购买。');
  const serviceIndex = html.indexOf('class="service-notice"');
  const orderIndex = html.indexOf('下单前先咨询客服核实再下单。');

  assert.match(html, /<aside class="service-notice" aria-labelledby="service-notice-title">/);
  assert.match(html, /<h2 id="service-notice-title" class="service-notice-title">售后保障<\/h2>/);
  assert.match(html, /购买系统即享永久更新与持续售后服务。购买时绑定的本机如遇系统或软件故障，可联系客服免费重装。/);
  assert.ok(versionIndex < serviceIndex && serviceIndex < orderIndex);
  assert.match(css, /\.service-notice\s*\{[^}]*background:\s*#eef5ff\s*;[^}]*border-left:\s*4px solid var\(--primary-color\)\s*;[^}]*text-align:\s*left\s*;/s);
  assert.match(css, /\.service-notice-title\s*\{[^}]*color:\s*#1967d2\s*;/s);
});

test('hides tabs and initializes the Tenglingxiu view', () => {
  assert.match(css, /\.tabs\s*\{[^}]*display:\s*none\s*;/s);
  assert.match(script, /body\.classList\.add\(['"]tab-tlx['"]\)/);
  assert.doesNotMatch(script, /默认显示无界/);
  assert.match(html, /class="tab-button" data-target="wujie">无界<\/button>/);
  assert.match(html, /class="tab-button active" data-target="tlx">腾领袖<\/button>/);
});

test('keeps Wujie content and video resources in source', () => {
  assert.match(html, /id="full-list"/);
  assert.equal((html.match(/class="feature-section wujie-section"/g) || []).length, 9);
  assert.equal((html.match(/\/wujie\//g) || []).length, 141);
  assert.match(css, /body\.tab-tlx #full-list\s*\{[^}]*display:\s*none\s*;/s);
  assert.match(css, /body\.tab-tlx \.wujie-section\s*\{[^}]*display:\s*none\s*;/s);
});
