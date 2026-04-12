// ============================================================
// App —— 路由、渲染、事件处理
// ============================================================

const state = Storage.load();
// state = { values: {fieldId: val}, selectedTemplates: [tplId] }

// ---------- 工具 ----------
function h(html) {
  const d = document.createElement('div');
  d.innerHTML = html.trim();
  return d.firstElementChild;
}
function escape(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
function persist() { Storage.save(state); }

// 防抖
function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}
const persistDebounced = debounce(persist, 400);

// ---------- 路由 ----------
const routes = { select: renderSelect, fill: renderFill, generate: renderGenerate };
function currentStep() {
  const m = location.hash.match(/#\/(\w+)/);
  return (m && routes[m[1]]) ? m[1] : 'select';
}
function navigate(step) { location.hash = `#/${step}`; }
window.addEventListener('hashchange', render);

function render() {
  const step = currentStep();
  document.querySelectorAll('header nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.step === step);
  });
  const root = document.getElementById('app');
  root.innerHTML = '';
  routes[step](root);
}

// ---------- Step 1: 选择渠道 ----------
function renderSelect(root) {
  const desc = h(`<p style="color:#6b7280;margin-bottom:16px">请勾选客户需要报备的渠道 / 模板。勾选后下一步只会显示相关字段。</p>`);
  root.appendChild(desc);

  for (const ch of CHANNELS) {
    const templates = TEMPLATES.filter(t => t.channel === ch.id);
    if (!templates.length) continue;
    const group = h(`
      <section class="channel-group">
        <header>
          <span class="chan-name">${escape(ch.name)}</span>
          <span style="color:#9ca3af;font-size:12px">${templates.length} 个模板</span>
          <button class="sel-all" style="margin-left:auto">${templates.some(t => state.selectedTemplates.includes(t.id)) ? '取消全选' : '全选'}</button>
        </header>
        <ul></ul>
      </section>
    `);
    const ul = group.querySelector('ul');
    for (const t of templates) {
      const checked = state.selectedTemplates.includes(t.id);
      const li = h(`<li><label><input type="checkbox" value="${t.id}" ${checked ? 'checked' : ''}> ${escape(t.displayName)}</label></li>`);
      li.querySelector('input').addEventListener('change', e => {
        toggleTemplate(t.id, e.target.checked);
      });
      ul.appendChild(li);
    }
    group.querySelector('.sel-all').addEventListener('click', (ev) => {
      ev.preventDefault();
      const ids = templates.map(t => t.id);
      const anyOn = ids.some(id => state.selectedTemplates.includes(id));
      const set = new Set(state.selectedTemplates);
      if (anyOn) ids.forEach(id => set.delete(id));
      else ids.forEach(id => set.add(id));
      state.selectedTemplates = [...set];
      persist();
      render();
    });
    root.appendChild(group);
  }

  const bar = h(`<div style="margin-top:20px;display:flex;justify-content:flex-end;gap:10px">
    <button class="primary" id="btn-next">下一步：填写资料 →</button>
  </div>`);
  bar.querySelector('#btn-next').addEventListener('click', () => {
    if (!state.selectedTemplates.length) { alert('请至少选择一个模板'); return; }
    navigate('fill');
  });
  root.appendChild(bar);
}

function toggleTemplate(id, on) {
  const set = new Set(state.selectedTemplates);
  if (on) set.add(id); else set.delete(id);
  state.selectedTemplates = [...set];
  persist();
}

// ---------- Step 2: 填写资料 ----------
function renderFill(root) {
  if (!state.selectedTemplates.length) {
    root.appendChild(h(`<div class="empty">还没有选择任何模板。<br><br><button class="primary" onclick="location.hash='#/select'">去选择模板</button></div>`));
    return;
  }

  // 计算字段并集
  const neededFieldIds = new Set();
  const requiredSet = new Set();
  for (const tid of state.selectedTemplates) {
    const t = TEMPLATE_BY_ID[tid];
    if (!t) continue;
    for (const m of t.mappings) {
      if (m.fieldId) neededFieldIds.add(m.fieldId);
      if (m.composeFields) m.composeFields.forEach(f => neededFieldIds.add(f));
    }
    for (const r of (t.required || [])) requiredSet.add(r);
  }
  for (const f of FIELDS) if (f.always) neededFieldIds.add(f.id);

  // 工具栏
  const filled = FIELDS.filter(f => neededFieldIds.has(f.id) && state.values[f.id]).length;
  const tb = h(`<div class="toolbar">
    <div class="count">共 ${neededFieldIds.size} 个字段需要填写，已填 ${filled} 个</div>
    <div>
      <button id="back">← 返回选择</button>
      <button class="primary" id="next">下一步：生成文档 →</button>
    </div>
  </div>`);
  tb.querySelector('#back').onclick = () => navigate('select');
  tb.querySelector('#next').onclick = () => {
    // 校验必填
    const missing = [...requiredSet].filter(fid => !state.values[fid]);
    if (missing.length) {
      const labels = missing.map(fid => FIELD_BY_ID[fid]?.labelZh || fid).join('、');
      if (!confirm(`以下必填项尚未填写：\n${labels}\n\n仍然继续？`)) return;
    }
    navigate('generate');
  };
  root.appendChild(tb);

  // 按 group 分区渲染
  let fieldNo = 0;
  for (const group of FIELD_GROUPS) {
    const fields = FIELDS.filter(f => f.group === group.id && neededFieldIds.has(f.id) && !f.hidden);
    if (!fields.length) continue;
    const section = h(`<section class="form-section"><h2>${escape(group.label)}</h2></section>`);
    for (const f of fields) {
      fieldNo++;
      section.appendChild(renderField(f, requiredSet.has(f.id), fieldNo));
    }
    root.appendChild(section);
  }
}

function renderField(f, required, no) {
  // 首次渲染时应用默认值
  if ((state.values[f.id] === undefined || state.values[f.id] === '') && f.default !== undefined) {
    state.values[f.id] = Array.isArray(f.default) ? [...f.default] : f.default;
    persistDebounced();
  }
  const val = state.values[f.id] ?? '';
  const reqMark = required ? '<span class="req">*</span>' : '';
  const labelEn = f.labelEn ? `<span class="label-en">${escape(f.labelEn)}</span>` : '';
  const prefix = no ? `${no}. ` : '';
  const wrap = h(`<div class="field" data-fid="${f.id}">
    <label>${prefix}${escape(f.labelZh)}${reqMark}${labelEn}</label>
  </div>`);

  let input;
  if (f.type === 'image') {
    const box = h(`<div>
      <input type="file" accept="image/png,image/jpeg">
      <div class="img-preview" style="margin-top:8px">${
        val ? `<img src="${escape(val)}" style="max-width:120px;max-height:120px;border:1px solid #e5e7eb;border-radius:4px"> <button class="img-clear" style="vertical-align:top;margin-left:8px">移除</button>` : '<span style="color:#9ca3af;font-size:12px">未上传</span>'
      }</div>
      ${f.hint ? `<div class="hint">${escape(f.hint)}</div>` : ''}
    </div>`);
    const fileInput = box.querySelector('input[type=file]');
    fileInput.addEventListener('change', async e => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { alert('图片过大（>5MB），请压缩后重试'); return; }
      const reader = new FileReader();
      reader.onload = () => {
        state.values[f.id] = reader.result;
        persist();
        render();
      };
      reader.readAsDataURL(file);
    });
    const clearBtn = box.querySelector('.img-clear');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      delete state.values[f.id];
      persist();
      render();
    });
    wrap.appendChild(box);
    return wrap;
  }
  if (f.type === 'multiselect') {
    const selected = Array.isArray(val) ? val : [];
    const box = h(`<div class="multiselect">${
      f.options.map(o => `<label style="display:inline-flex;align-items:center;margin-right:14px;font-weight:400">
        <input type="checkbox" value="${escape(o)}" ${selected.includes(o) ? 'checked' : ''}> ${escape(o)}
      </label>`).join('')
    }</div>`);
    box.querySelectorAll('input[type=checkbox]').forEach(cb => {
      cb.addEventListener('change', () => {
        const cur = box.querySelectorAll('input[type=checkbox]:checked');
        state.values[f.id] = [...cur].map(x => x.value);
        persistDebounced();
      });
    });
    wrap.appendChild(box);
    return wrap;
  }
  if (f.type === 'textarea') {
    input = h(`<textarea placeholder="${escape(f.placeholder || '')}">${escape(val)}</textarea>`);
  } else if (f.type === 'select') {
    input = h(`<select><option value="">-- 请选择 --</option>${
      f.options.map(o => `<option value="${escape(o)}" ${o === val ? 'selected' : ''}>${escape(o)}</option>`).join('')
    }</select>`);
  } else {
    const typ = { number: 'number', date: 'date', email: 'email', tel: 'tel', url: 'url' }[f.type] || 'text';
    input = h(`<input type="${typ}" value="${escape(val)}" placeholder="${escape(f.placeholder || '')}">`);
  }
  input.addEventListener('input', e => {
    state.values[f.id] = e.target.value;
    persistDebounced();
  });
  wrap.appendChild(input);
  return wrap;
}

// ---------- Step 3: 生成文档 ----------
function renderGenerate(root) {
  if (!state.selectedTemplates.length) {
    root.appendChild(h(`<div class="empty">未选择任何模板</div>`));
    return;
  }

  const templates = state.selectedTemplates.map(id => TEMPLATE_BY_ID[id]).filter(Boolean);
  root.appendChild(h(`<div class="toolbar">
    <div class="count">准备生成 ${templates.length} 个文件</div>
    <div>
      <button id="back">← 返回填写</button>
      <button class="primary" id="go">开始生成并下载 ZIP</button>
    </div>
  </div>`));
  root.querySelector('#back').onclick = () => navigate('fill');

  const list = h(`<ul class="generate-list">${
    templates.map(t => `<li data-tid="${t.id}"><strong>${escape(t.displayName)}</strong> <span class="gen-status">待生成</span></li>`).join('')
  }</ul>`);
  root.appendChild(list);

  root.querySelector('#go').onclick = async () => {
    root.querySelector('#go').disabled = true;
    const results = await Filler.fillMany(templates, state.values, (done, total) => {
      const li = list.children[done - 1];
      if (li) li.querySelector('.gen-status').textContent = `(${done}/${total}) 处理中...`;
    });
    results.forEach((r, i) => {
      const span = list.children[i].querySelector('.gen-status');
      if (r.status === 'ok') { span.textContent = '✓ 完成'; span.className = 'gen-status gen-status-ok'; }
      else { span.textContent = '✗ 失败: ' + r.error; span.className = 'gen-status gen-status-err'; }
    });
    try {
      await Filler.downloadZip(results);
    } catch (e) {
      alert('打包下载失败: ' + e.message);
    }
    root.querySelector('#go').disabled = false;
  };
}

// ---------- 顶部工具栏按钮 ----------
document.getElementById('btn-export').onclick = () => Storage.exportJSON();
document.getElementById('btn-import').onclick = () => document.getElementById('file-import').click();
document.getElementById('file-import').onchange = async e => {
  const f = e.target.files[0];
  if (!f) return;
  try {
    await Storage.importJSON(f);
    Object.assign(state, Storage.load());
    render();
    alert('导入成功');
  } catch (err) {
    alert('导入失败：' + err.message);
  }
};
document.getElementById('btn-clear').onclick = () => {
  if (!confirm('确认清空所有已填数据？此操作不可恢复。')) return;
  Storage.clear();
  state.values = {};
  state.selectedTemplates = [];
  render();
};

// ---------- 启动 ----------
// 旧 fieldId → 新 fieldId 的一次性迁移
const MIGRATIONS = {
  ddq_goods_type: 'product_description',
  ddq_business_model: 'business_model',
  ddq_order_min: 'order_amount_min_usd',
  ddq_order_max: 'order_amount_max_usd',
  ddq_fraud_mgmt: 'fraud_mgmt',
};
for (const [oldId, newId] of Object.entries(MIGRATIONS)) {
  if (state.values[oldId] !== undefined && (state.values[newId] === undefined || state.values[newId] === '')) {
    state.values[newId] = state.values[oldId];
  }
  delete state.values[oldId];
}

// 为隐藏字段预置默认值
for (const f of FIELDS) {
  if (f.default !== undefined && (state.values[f.id] === undefined || state.values[f.id] === '')) {
    state.values[f.id] = Array.isArray(f.default) ? [...f.default] : f.default;
  }
}
persist();
render();
