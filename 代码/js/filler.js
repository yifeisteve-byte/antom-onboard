// ============================================================
// Filler —— 用 ExcelJS 加载模板、写入字段值、打包下载
// 核心原则：只写 cell.value，不碰 cell.style，避免破坏原格式
// ============================================================

const Filler = {
  // "B2" -> { col: 2, row: 2 }
  _parseCell(ref) {
    const m = /^([A-Z]+)(\d+)$/.exec(ref);
    if (!m) return { col: 1, row: 1 };
    let col = 0;
    for (const ch of m[1]) col = col * 26 + (ch.charCodeAt(0) - 64);
    return { col, row: parseInt(m[2], 10) };
  },

  async fillOne(template, values) {
    const res = await fetch(encodeURI(template.path), { cache: 'no-cache' });
    if (!res.ok) throw new Error(`无法加载模板 ${template.path}: ${res.status}`);
    const buf = await res.arrayBuffer();

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buf);

    let _wrote = 0, _skipped = 0;
    for (const m of template.mappings) {
      const ws = workbook.getWorksheet(m.sheet);
      if (!ws) {
        console.warn(`[${template.id}] 未找到 sheet "${m.sheet}"`);
        continue;
      }
      // 图片映射
      if (m.image) {
        const dataUrl = values[m.fieldId];
        if (!dataUrl) continue;
        try {
          const match = /^data:image\/(\w+);base64,(.+)$/.exec(dataUrl);
          if (!match) { console.warn('logo 格式错误'); continue; }
          const ext = match[1] === 'jpg' ? 'jpeg' : match[1];
          const imageId = workbook.addImage({ base64: match[2], extension: ext });
          const { col, row } = this._parseCell(m.cell);
          const w = (m.size && m.size.width) || 80;
          const h = (m.size && m.size.height) || 80;
          ws.addImage(imageId, {
            tl: { col: col - 1, row: row - 1 },
            ext: { width: w, height: h },
            editAs: 'oneCell'
          });
        } catch (e) {
          console.warn(`[${template.id}] 写入图片 ${m.sheet}!${m.cell} 失败`, e);
        }
        continue;
      }
      let val;
      try {
        if (typeof m.compose === 'function') {
          val = m.compose(values);
        } else {
          let raw = values[m.fieldId];
          if (raw === undefined || raw === '') { _skipped++; continue; }
          if (Array.isArray(raw)) {
            if (raw.length === 0) { _skipped++; continue; }
            raw = raw.join('、');
          }
          val = applyTransform(m.transform, raw);
        }
      } catch (e) {
        console.warn(`[${template.id}] compose 失败 ${m.sheet}!${m.cell}`, e);
        continue;
      }
      if (val === undefined || val === '') { _skipped++; continue; }
      const targets = [ws];
      if (template.mirrorSheets && template.mirrorSheets[m.sheet]) {
        const mw = workbook.getWorksheet(template.mirrorSheets[m.sheet]);
        if (mw) targets.push(mw);
      }
      for (const tws of targets) {
        try {
          const cell = tws.getCell(m.cell);
          cell.value = val;
          if (template.forceFontSize && cell.font && cell.font.size && cell.font.size < template.forceFontSize) {
            cell.font = { ...cell.font, size: template.forceFontSize };
          }
          _wrote++;
        } catch (e) {
          console.warn(`[${template.id}] 写入 ${tws.name}!${m.cell} 失败`, e);
        }
      }
    }
    console.log(`[${template.id}] 写入 ${_wrote} / 跳过 ${_skipped} / 共 ${template.mappings.length} 个映射`);

    // 静态单元格（例如今天日期）
    if (template.staticCells) {
      for (const s of template.staticCells) {
        const ws = workbook.getWorksheet(s.sheet);
        if (ws) ws.getCell(s.cell).value = s.value;
      }
    }

    const outBuf = await workbook.xlsx.writeBuffer();
    return new Blob([outBuf], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
  },

  // 返回 [{ template, status, blob?, error? }]
  async fillMany(templates, values, onProgress) {
    const results = [];
    for (const t of templates) {
      try {
        const blob = await this.fillOne(t, values);
        results.push({ template: t, status: 'ok', blob });
      } catch (e) {
        console.error(e);
        results.push({ template: t, status: 'error', error: e.message || String(e) });
      }
      if (onProgress) onProgress(results.length, templates.length);
    }
    return results;
  },

  // 把 fillMany 的结果打包成 zip 并下载
  async downloadZip(results) {
    const zip = new JSZip();
    let count = 0;
    for (const r of results) {
      if (r.status === 'ok' && r.blob) {
        zip.file(r.template.filename, r.blob);
        count++;
      }
    }
    if (count === 0) throw new Error('没有可下载的文件');
    const content = await zip.generateAsync({ type: 'blob' });
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    saveAs(content, `merchant_onboarding_${date}.zip`);
  }
};
