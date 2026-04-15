// 字段值的渠道相关格式化
// 在 TEMPLATES.mappings 中用 transform 字段指定

const TRANSFORMS = {
  // 原样传递
  identity: v => v,

  // 转为数字（用于金额、比例），字符串清掉逗号和%
  number: v => {
    if (v === null || v === undefined || v === '') return '';
    const n = Number(String(v).replace(/[,，%\s]/g, ''));
    return Number.isFinite(n) ? n : v;
  },

  // 百分比字符串 e.g. "0.5%"
  percent: v => {
    if (v === null || v === undefined || v === '') return '';
    const n = Number(String(v).replace(/[,，%\s]/g, ''));
    return Number.isFinite(n) ? `${n}%` : v;
  },

  // 日期格式
  date_iso: v => v ? String(v).slice(0, 10) : '',           // YYYY-MM-DD
  date_slash: v => v ? String(v).slice(0, 10).replace(/-/g, '/') : '', // YYYY/MM/DD
  date_jp: v => v ? String(v).slice(0, 10).replace(/-/g, '/') : '',   // 日本常用 YYYY/MM/DD
  date_kr: v => v ? String(v).slice(0, 10) : '',
  date_sea: v => {
    if (!v) return '';
    const [y, m, d] = String(v).slice(0, 10).split('-');
    return `${d}/${m}/${y}`;
  },
  // DD-MM-YYYY (TrueMoney 要求)
  date_dmy: v => {
    if (!v) return '';
    const [y, m, d] = String(v).slice(0, 10).split('-');
    return `${d}-${m}-${y}`;
  },
  // TrueMoney 业务类型简化：company_type → Corporate/Individual
  tmn_biz_type: v => {
    if (!v) return '';
    return String(v).toLowerCase().includes('sole') || String(v).toLowerCase() === 'individual' ? 'Individual' : 'Corporate';
  },

  // 日期拆分：取年/月/日，去掉前导零
  date_year:  v => v ? String(v).slice(0, 4) : '',
  date_month: v => v ? String(v).slice(5, 7).replace(/^0/, '') : '',
  date_day:   v => v ? String(v).slice(8, 10).replace(/^0/, '') : '',

  // USD → JPY（固定汇率 150，四舍五入为整数）
  jpy: v => {
    if (v === null || v === undefined || v === '') return '';
    const n = Number(String(v).replace(/[,，%\s]/g, ''));
    return Number.isFinite(n) ? Math.round(n * 150) : '';
  },

  // Y/N
  yesno: v => {
    if (v === true || v === 'Y' || v === 'y' || v === 'yes' || v === '是') return 'Y';
    if (v === false || v === 'N' || v === 'n' || v === 'no' || v === '否') return 'N';
    return v || '';
  }
};

function applyTransform(name, value) {
  const fn = (name && TRANSFORMS[name]) || TRANSFORMS.identity;
  return fn(value);
}
