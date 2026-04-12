// ============================================================
// 存储抽象层
// 当前实现: LocalStorage
// 未来可加 CloudStorage (Supabase/Firebase 等) 实现同一接口
// ============================================================

const STORAGE_KEY = 'merchant_onboarding_v1';

const Storage = {
  // 返回完整档案对象 { values: {...}, selectedTemplates: [...] }
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { values: {}, selectedTemplates: [] };
      const parsed = JSON.parse(raw);
      return {
        values: parsed.values || {},
        selectedTemplates: parsed.selectedTemplates || []
      };
    } catch (e) {
      console.warn('load storage failed', e);
      return { values: {}, selectedTemplates: [] };
    }
  },

  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },

  // 导出为 JSON 下载
  exportJSON() {
    const data = this.load();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const name = `merchant_onboarding_${new Date().toISOString().slice(0, 10)}.json`;
    saveAs(blob, name);
  },

  // 从 File 对象导入
  async importJSON(file) {
    const text = await file.text();
    const data = JSON.parse(text);
    if (typeof data !== 'object' || !data.values) {
      throw new Error('JSON 格式不正确');
    }
    this.save({
      values: data.values || {},
      selectedTemplates: data.selectedTemplates || []
    });
  }
};
