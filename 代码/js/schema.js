// ============================================================
// FIELDS —— 主字段表
// 所有模板共享一套逻辑字段。同一个 fieldId 在多个模板里被映射
// 到不同的单元格，客户只需要填一次。
// ============================================================

const FIELD_GROUPS = [
  { id: 'company_basic', label: '公司基本信息' },
  { id: 'legal_rep',     label: '法人 / 董事 / UBO / 权签人（默认同一人）' },
  { id: 'business',      label: '业务信息' },
  { id: 'financial',     label: '财务 / 交易信息' },
  { id: 'bank',          label: '银行信息' },
  { id: 'ch_jkopay',     label: '渠道专属 · 台湾 JKOPay' },
  { id: 'ch_dana',       label: '渠道专属 · 印尼 DANA' },
  { id: 'ch_mpay',       label: '渠道专属 · 澳门 MPay' },
  { id: 'ch_korea',      label: '渠道专属 · 韩国 Toss / KKP' },
  { id: 'ch_jcb',        label: '渠道专属 · 信用卡 JCB' },
  { id: 'ch_ddq',        label: '渠道专属 · Credit Risk DDQ 风险问卷' }
];

const FIELDS = [
  // --- 公司基本信息 ---
  { id: 'merchant_logo',      labelZh: '商户 Logo',              labelEn: 'Merchant Logo',             type: 'image',    group: 'company_basic',
    hint: '建议 256×256，PNG / JPG 格式，最大 5MB。自动写入需要 logo 的模板（如 JKOPay、2C2P 印尼等）。' },
  { id: 'company_name_legal', labelZh: '公司法定名称（英文）',   labelEn: 'Company Legal Name',       type: 'text',     group: 'company_basic', placeholder: 'e.g. ACME International Limited' },
  { id: 'company_dba_en',     labelZh: '经营名称 DBA（英文）',   labelEn: 'Doing Business As (DBA)',   type: 'text',     group: 'company_basic' },
  { id: 'business_reg_number',labelZh: '公司注册号',             labelEn: 'Business Registration No.', type: 'text',     group: 'company_basic' },
  { id: 'incorporation_date', labelZh: '公司成立日期',           labelEn: 'Date of Incorporation',     type: 'date',     group: 'company_basic' },
  { id: 'company_type',       labelZh: '企业注册类型',           labelEn: 'Company Type',              type: 'select',   group: 'company_basic',
    options: ['Sole Proprietorship', 'Partnership', 'Corporation', 'Public Sector', 'Trust / Charity / Foundation / Club'] },
  { id: 'mcc',                labelZh: 'MCC（行业）+ 业务描述',  labelEn: 'Merchant Category Code',    type: 'textarea', group: 'company_basic', default: '5816 游戏充值' },
  { id: 'operation_address',  labelZh: '公司经营地址',           labelEn: 'Operation Address',         type: 'textarea', group: 'company_basic' },
  { id: 'business_url',       labelZh: '业务网址 / App 下载链接', labelEn: 'Business Website URL',     type: 'url',      group: 'company_basic', placeholder: 'https://' },
  { id: 'test_account',       labelZh: '测试账号（如果需要）',      labelEn: 'Test Account (if any)',    type: 'textarea', group: 'company_basic', placeholder: '用户名 / 密码 / 备注', always: true },
  { id: 'mobile_app_name',    labelZh: 'App 名称（如有）',        labelEn: 'Mobile App Name',           type: 'text',     group: 'company_basic' },
  { id: 'business_phone',     labelZh: '公司电话',               labelEn: 'Business Phone Number',     type: 'tel',      group: 'company_basic' },
  { id: 'business_email',     labelZh: '公司邮箱',               labelEn: 'Business Email',            type: 'email',    group: 'company_basic' },
  { id: 'registration_country',labelZh: '公司注册国家 / 地区',    labelEn: 'Country of Registration',   type: 'select',   group: 'company_basic', options: ['Hongkong', 'Singapore'] },
  { id: 'branch_name',        labelZh: '分支 / 总部名称',         labelEn: 'Headquarter / Branch Name', type: 'text',     group: 'company_basic', default: 'Headquarter', hidden: true },
  { id: 'stock_exchange_code',labelZh: '上市公司股票代码（如有）', labelEn: 'Listed Stock Exchange Code', type: 'text',   group: 'company_basic' },

  // --- 法人 / 董事 / UBO / 权签人（实际场景同一人）---
  { id: 'signer_first_name',     labelZh: 'First Name',          labelEn: "First Name",                      type: 'text',     group: 'legal_rep' },
  { id: 'signer_last_name',      labelZh: 'Last Name',           labelEn: "Last Name",                       type: 'text',     group: 'legal_rep' },
  { id: 'director_dob',          labelZh: '出生日期',            labelEn: 'Date of Birth',                   type: 'date',     group: 'legal_rep' },
  { id: 'director_phone',        labelZh: '电话',                labelEn: 'Phone',                           type: 'tel',      group: 'legal_rep' },
  { id: 'director_email',        labelZh: '邮箱',                labelEn: 'Email',                           type: 'email',    group: 'legal_rep' },
  { id: 'director_country_city', labelZh: '所在国家 / 城市',     labelEn: 'Country & City',                  type: 'text',     group: 'legal_rep' },
  { id: 'director_address',      labelZh: '详细地址',            labelEn: 'Address',                         type: 'textarea', group: 'legal_rep' },

  // --- 业务 ---
  { id: 'top5_receiving_countries',labelZh: '主要收款国家 / 地区',                  labelEn: 'Top Receiving Regions',  type: 'multiselect', group: 'business',
    options: ['欧美', '日韩', '东南亚'] },
  { id: 'top5_sending_countries', labelZh: '主要付款去向国家 / 地区',               labelEn: 'Top Sending Regions',    type: 'multiselect', group: 'business',
    options: ['欧美', '日韩', '东南亚'] },
  { id: 'rebilling_required',     labelZh: '是否涉及定期扣款（Rebilling）',          labelEn: 'Rebilling Required',         type: 'select',   group: 'business',
    options: ['Y', 'N'], default: 'N' },
  { id: 'is_payment_service_provider', labelZh: '是否为支付服务提供商（PSP/收单机构）', labelEn: 'Is Payment Service Provider', type: 'select', group: 'business',
    options: ['Yes', 'No'], default: 'No', hidden: true },
  { id: 'expected_launch_date',   labelZh: '预计上线日期',                          labelEn: 'Expected Launch Date',       type: 'date',     group: 'business' },

  // --- 财务 ---
  { id: 'annual_processing_volume_usd', labelZh: '预估年处理量（USD）',             labelEn: 'Annual Processing Volume', type: 'number', group: 'financial', default: 1000000 },
  { id: 'avg_transaction_value',        labelZh: '笔均单价（ATV, USD）',           labelEn: 'Average Transaction Value', type: 'number', group: 'financial', default: 50 },
  { id: 'monthly_volume_usd',           labelZh: '月交易金额（USD）',              labelEn: 'Monthly Volume (USD)',      type: 'number', group: 'financial', default: 100000 },
  { id: 'monthly_transaction_count',    labelZh: '月交易笔数',                     labelEn: 'Monthly Transaction Count', type: 'number', group: 'financial', default: 200 },
  { id: 'chargeback_ratio',             labelZh: '拒付金额比例（%）',              labelEn: 'Chargeback Amount Ratio',   type: 'text',   group: 'financial', placeholder: 'e.g. 0.5%', default: '0.1%' },
  { id: 'refund_ratio',                 labelZh: '退款金额比例（%）',              labelEn: 'Refund Amount Ratio',       type: 'text',   group: 'financial', default: '0.1%' },
  { id: 'fraud_ratio',                  labelZh: '欺诈金额比例（%）',              labelEn: 'Fraud Amount Ratio',        type: 'text',   group: 'financial', default: '0.1%' },

  // --- 渠道专属 ---
  { id: 'jkopay_funding_source', labelZh: 'JKOPay 资金来源', labelEn: 'JKOPay Funding Source', type: 'select', group: 'ch_jkopay',
    options: ['wallet balance/bank account payments', 'wallet balance/bank account & card payments'], default: 'wallet balance/bank account payments', hidden: true },

  // --- 印尼 DANA 专属 ---
  { id: 'dana_has_legal_entity',   labelZh: 'DANA · 是否有印尼境内 (NIB/SIUP) 或境外 (PTE LTD) 法律实体', labelEn: 'Has Legal Entity',          type: 'select', group: 'ch_dana', options: ['Yes', 'No'], default: 'Yes' },
  { id: 'dana_regulated_by',       labelZh: 'DANA · 是否受 Bank Indonesia / OJK / 监管机构监管',           labelEn: 'Regulated by BI/OJK',       type: 'select', group: 'ch_dana', options: ['Yes', 'No'], default: 'Yes' },
  { id: 'dana_subscription_based', labelZh: 'DANA · 是否提供订阅制服务',                                  labelEn: 'Subscription-based',        type: 'select', group: 'ch_dana', options: ['Yes', 'No'], default: 'No' },
  { id: 'dana_recurring_nature',   labelZh: 'DANA · 业务性质是否需要定期扣款（保险 / 会员 / 流媒体等）',   labelEn: 'Recurring Payment Nature',  type: 'select', group: 'ch_dana', options: ['Yes', 'No'], default: 'No' },
  { id: 'dana_resellable_item',    labelZh: 'DANA · 商品 / 服务是否容易被转售',                          labelEn: 'Easily Resellable',         type: 'select', group: 'ch_dana', options: ['Yes', 'No'], default: 'No' },
  { id: 'dana_mau_tier',           labelZh: 'DANA · 月活跃用户数 (MAU) 区间',                            labelEn: 'Monthly Active Users',      type: 'select', group: 'ch_dana',
    options: ['Under 1000 users', '1000 - 10000 users', 'Above 10000 users'], default: '1000 - 10000 users' },
  { id: 'dana_fraud_history',      labelZh: 'DANA · 是否曾在新闻 / 网络 / 文章中被报道过欺诈或滥用',       labelEn: 'Prior Fraud Cases',         type: 'select', group: 'ch_dana', options: ['Yes', 'No'], default: 'No' },
  { id: 'dana_unsubscribe_btn',    labelZh: 'DANA · 应用或网站是否有明显的退订按钮',                       labelEn: 'Clear Unsubscribe Button',  type: 'select', group: 'ch_dana', options: ['Yes', 'No'], default: 'No' },
  { id: 'dana_fraud_detection',    labelZh: 'DANA · 是否有内部反欺诈检测机制',                             labelEn: 'Internal Fraud Detection',  type: 'select', group: 'ch_dana', options: ['Yes', 'No'], default: 'No' },
  { id: 'dana_consent_suspend',    labelZh: 'DANA · 是否同意 DANA 有权酌情暂停 / 限制 / 终止 Auto-Debit',   labelEn: 'Consent: suspend/terminate', type: 'select', group: 'ch_dana', options: ['Yes', 'No'], default: 'Yes' },
  { id: 'dana_consent_addendum',   labelZh: 'DANA · 是否同意 DANA 可追加附录明确商户责任',                  labelEn: 'Consent: addendum',         type: 'select', group: 'ch_dana', options: ['Yes', 'No'], default: 'Yes' },
  { id: 'dana_abs',                labelZh: 'DANA · 平均客单价 (ABS, 精确金额)',                           labelEn: 'Average Basket Size',       type: 'text',     group: 'ch_dana', default: '20' },
  { id: 'dana_mau_exact',          labelZh: 'DANA · 月活跃用户数精确值（USD 折算）',                        labelEn: 'MAU (USD)',                 type: 'text',     group: 'ch_dana', default: '3000' },
  { id: 'dana_solution_requested', labelZh: 'DANA · 申请的支付方案',                                       labelEn: 'Payment Solution Requested', type: 'select', group: 'ch_dana',
    options: ['cashier', 'autodebit'], default: 'cashier' },
  { id: 'dana_solution_current',   labelZh: 'DANA · 当前使用的支付方案 / 成功率 / 方案变更原因',             labelEn: 'Current Solution & Rationale', type: 'textarea', group: 'ch_dana', default: 'cashier' },

  // --- JCB 渠道专属 ---
  { id: 'postal_code',       labelZh: 'JCB · 邮政编码',         labelEn: 'Postal Code',                type: 'text', group: 'ch_jcb' },

  // --- 澳门 MPay 专属 ---
  { id: 'mpay_regulator',        labelZh: 'MPay · 商户监管方名称',                labelEn: 'Regulator Name',    type: 'select',   group: 'ch_mpay', options: ['HongKong：Registrar of Companies Hong Kong Special Administrative Region', 'Singapore：Accounting and Corporate Regulatory Authority'] },
  { id: 'mpay_display_currency', labelZh: 'MPay · 商户展示币种（商品详情页）',    labelEn: 'Display Currency',  type: 'text',     group: 'ch_mpay', default: 'mop' },
  { id: 'mpay_order_currency',   labelZh: 'MPay · 用户下单币种（确认支付页）',    labelEn: 'Order Currency',    type: 'text',     group: 'ch_mpay', default: 'mop' },
  { id: 'mpay_payment_currency', labelZh: 'MPay · 用户实际支付币种（完成页）',    labelEn: 'Payment Currency',  type: 'text',     group: 'ch_mpay', default: 'mop' },

  // --- 韩国 Toss / KKP 共用 ---
  { id: 'kr_has_korean_entity',   labelZh: '韩国 · 是否存在韩国主体',           labelEn: 'Has Korean Entity',    type: 'select',   group: 'ch_korea', options: ['Yes', 'No'], default: 'No' },
  { id: 'kr_has_app',             labelZh: '韩国 · 是否含 App（iOS/Android）',  labelEn: 'Has Mobile App',       type: 'select',   group: 'ch_korea', options: ['Yes', 'No'], default: 'Yes' },
  { id: 'kr_service_region',      labelZh: '韩国 · 服务提供区域',               labelEn: 'Service Region',       type: 'select',   group: 'ch_korea', options: ['Korea', 'Overseas', 'Both'], default: 'Overseas' },
  { id: 'kr_service_time',        labelZh: '韩国 · 服务提供时间 / 配送时间',    labelEn: 'Service Time',         type: 'text',     group: 'ch_korea', placeholder: 'Immediate / 3-5 days', default: '即时' },
  { id: 'kr_cashable_product',    labelZh: '韩国 · 是否涉及 Cashable Product', labelEn: 'Cashable Product',     type: 'select',   group: 'ch_korea', options: ['Yes', 'No'], default: 'Yes' },
  { id: 'kr_payment_method',      labelZh: '韩国本地银行卡 · 支付方式',          labelEn: 'Payment Method',       type: 'select',   group: 'ch_korea', options: ['Issuer-authentication payment', 'Non authentication payment', 'Express bank transfer'], default: 'Issuer-authentication payment' },
  { id: 'kr_settlement_scenario', labelZh: '韩国本地银行卡 · 结算模式',          labelEn: 'Settlement Scenario',  type: 'select',   group: 'ch_korea', options: ['Domestic', 'Crossborder'] },
  
  // --- Credit Risk DDQ 专属 ---
  { id: 'product_description',   labelZh: '销售的商品 / 服务类型',                labelEn: 'Types of Goods / Services', type: 'textarea', group: 'business', placeholder: 'e.g. Apparel and accessories, groceries', default: '5816 游戏充值' },
  { id: 'business_model',        labelZh: '商业模式',                             labelEn: 'Business Model',        type: 'select',   group: 'business',
    options: ['独立站', '站群', '代购 / Drop-shipping', '电话 / 邮件直销', 'SaaS', '游戏开发者', '充值平台', '其他'], default: '充值平台' },
  { id: 'fraud_mgmt',            labelZh: '欺诈管理（可多选）',                   labelEn: 'Fraud Management',      type: 'multiselect', group: 'business',
    options: ['自建风控', '采购第三方服务', '全量3D校验', '无'],
    default: ['自建风控', '采购第三方服务', '全量3D校验'] },
  { id: 'order_amount_min_usd',  labelZh: '订单金额最小值（USD）',                labelEn: 'Order Amount Min',      type: 'number',   group: 'financial', default: 10 },
  { id: 'order_amount_max_usd',  labelZh: '订单金额最大值（USD）',                labelEn: 'Order Amount Max',      type: 'number',   group: 'financial', default: 1000 },
  { id: 'ddq_recurring',         labelZh: 'DDQ · 是否周期性扣款',                 labelEn: 'Recurring Payment',     type: 'select',   group: 'ch_ddq', options: ['Yes', 'No'], default: 'No' },
  { id: 'ddq_bnpl',              labelZh: 'DDQ · 是否 Buy Now Pay Later',        labelEn: 'BNPL',                  type: 'select',   group: 'ch_ddq', options: ['Yes', 'No'], default: 'No' },
  { id: 'ddq_layaway',           labelZh: 'DDQ · 是否 Layaway 付款',             labelEn: 'Layaway',               type: 'select',   group: 'ch_ddq', options: ['Yes', 'No'], default: 'No' },
  { id: 'ddq_stock_days',        labelZh: 'DDQ · 平均备货时长（天）',             labelEn: 'Stock Days',            type: 'number',   group: 'ch_ddq', default: 0 },
  { id: 'ddq_refund_days',       labelZh: 'DDQ · 退款发起时长（天）',             labelEn: 'Refund Days',           type: 'number',   group: 'ch_ddq', default: 0 },
  { id: 'ddq_card_history',      labelZh: 'DDQ · 卡收单历史',                     labelEn: 'Card Processing History', type: 'select', group: 'ch_ddq',
    options: ['Never', 'Currently have', 'Had but stopped'], default: 'Never' },
  { id: 'ddq_card_history_psp',  labelZh: 'DDQ · 目前 / 曾用卡收单 PSP 名称',      labelEn: 'PSP Name',              type: 'text',     group: 'ch_ddq', default: '无' },
  { id: 'ddq_overseas_warehouse',labelZh: 'DDQ · 是否有海外仓',                   labelEn: 'Overseas Warehouse',    type: 'select',   group: 'ch_ddq', options: ['Yes', 'No'], default: 'No' },
  { id: 'ddq_shipping_days',     labelZh: 'DDQ · 平均物流运输时长（天）',         labelEn: 'Shipping Days',         type: 'number',   group: 'ch_ddq', default: 0 },
  { id: 'ddq_medicine',          labelZh: 'DDQ · 是否涉及医药 / 医疗器械',        labelEn: 'Medicine/Medical',      type: 'select',   group: 'ch_ddq', options: ['Yes', 'No'], default: 'No' },
  { id: 'ddq_cloud_storage',     labelZh: 'DDQ · 是否提供云储存服务',             labelEn: 'Cloud Storage',         type: 'select',   group: 'ch_ddq', options: ['Yes', 'No'], default: 'No' },
  { id: 'ddq_subscription',      labelZh: 'DDQ · 是否提供订阅服务',               labelEn: 'Subscription',          type: 'select',   group: 'ch_ddq', options: ['Yes', 'No'], default: 'No' },
  { id: 'ddq_crypto',            labelZh: 'DDQ · 是否涉及加密货币',               labelEn: 'Crypto Involved',       type: 'select',   group: 'ch_ddq', options: ['Yes', 'No'], default: 'No' }
];

// Lookup helper
const FIELD_BY_ID = Object.fromEntries(FIELDS.map(f => [f.id, f]));

// ============================================================
// TEMPLATES —— 模板注册表
// 每个 mapping: { fieldId, sheet, cell, transform? }
// 每个 template 可额外声明 required: [fieldId, ...]
// ============================================================

const CHANNELS = [
  { id: 'credit_card', name: '信用卡' },
  { id: 'sea',         name: '东南亚（2C2P / DANA / TrueMoney）' },
  { id: 'taiwan',      name: '台湾' },
  { id: 'korea',       name: '韩国（KKP / Tosspay / Naverpay + 本地银行卡）' },
  { id: 'macau',       name: '澳门（MPay）' }
  // Phase 之后会加入: japan
];

// 用于 DDQ 的 Yes/No checkbox 组合辅助
function _ddqYN(v) {
  if (v === 'Yes') return '☑ Yes  ☐ No';
  if (v === 'No')  return '☐ Yes  ☑ No';
  return '';
}

const TEMPLATES = [
  // --- 信用卡 Visa / Master ---
  {
    id: 'vm_card',
    channel: 'credit_card',
    displayName: 'Visa / Master 卡 (Checkout & Nuvei & VM 直连)',
    filename: 'VM卡（Checkout & Nuvei &VM直连卡) (1).xlsx',
    path: 'templates/VM卡（Checkout & Nuvei &VM直连卡) (1).xlsx',
    mappings: [
      { fieldId: 'company_dba_en',             sheet: 'Sheet1', cell: 'B2' },
      { fieldId: 'business_url',               sheet: 'Sheet1', cell: 'B3' },
      { sheet: 'Sheet1', cell: 'B4', composeFields: ['signer_first_name','signer_last_name'], compose: v => [v.signer_first_name, v.signer_last_name].filter(Boolean).join(' ') },
      { fieldId: 'director_phone',             sheet: 'Sheet1', cell: 'B5' },
      { fieldId: 'director_email',             sheet: 'Sheet1', cell: 'B6' },
      { fieldId: 'director_country_city',      sheet: 'Sheet1', cell: 'B7' },
      { fieldId: 'business_phone',             sheet: 'Sheet1', cell: 'B8' },
      { fieldId: 'business_email',             sheet: 'Sheet1', cell: 'B9' },
      { fieldId: 'director_address',           sheet: 'Sheet1', cell: 'B10' },
      { fieldId: 'annual_processing_volume_usd', sheet: 'Sheet1', cell: 'B11', transform: 'number' },
      { fieldId: 'avg_transaction_value',      sheet: 'Sheet1', cell: 'B12', transform: 'number' },
      { sheet: 'Sheet1', cell: 'B15', composeFields: ['signer_first_name','signer_last_name'], compose: v => [v.signer_first_name, v.signer_last_name].filter(Boolean).join(' ') },
      { fieldId: 'director_address',           sheet: 'Sheet1', cell: 'B16' },
      { fieldId: 'monthly_volume_usd',         sheet: 'Sheet1', cell: 'B17', transform: 'number' },
      { fieldId: 'monthly_volume_usd',         sheet: 'Sheet1', cell: 'B18', transform: 'number' },
      { fieldId: 'chargeback_ratio',           sheet: 'Sheet1', cell: 'B19', transform: 'percent' },
      { fieldId: 'refund_ratio',               sheet: 'Sheet1', cell: 'B20', transform: 'percent' },
      { fieldId: 'fraud_ratio',                sheet: 'Sheet1', cell: 'B21', transform: 'percent' },
      { fieldId: 'rebilling_required',         sheet: 'Sheet1', cell: 'B22', transform: 'yesno' }
    ],
    required: ['company_dba_en', 'business_url', 'signer_last_name', 'director_email',
               'annual_processing_volume_usd', 'avg_transaction_value']
  },

  // --- 东南亚 2C2P 通用 ---
  {
    id: 'sea_2c2p_generic',
    channel: 'sea',
    displayName: '2C2P APM 通用（除越南 ZaloPay / Momo）',
    filename: '2C2P APM-0817-Updated.xlsx',
    path: 'templates/2C2P APM-0817-Updated.xlsx',
    mappings: [
      { fieldId: 'company_name_legal',        sheet: 'sheet', cell: 'D5' },
      { fieldId: 'company_dba_en',            sheet: 'sheet', cell: 'D6' },
      { fieldId: 'incorporation_date',        sheet: 'sheet', cell: 'D7', transform: 'date_sea' },
      { fieldId: 'mcc',                       sheet: 'sheet', cell: 'D8' },
      { fieldId: 'operation_address',         sheet: 'sheet', cell: 'D9' },
      { fieldId: 'business_reg_number',       sheet: 'sheet', cell: 'D10' },
      { fieldId: 'stock_exchange_code',       sheet: 'sheet', cell: 'D11' },
      { fieldId: 'business_url',              sheet: 'sheet', cell: 'D12' },
      { fieldId: 'company_type',              sheet: 'sheet', cell: 'D13' },
      { sheet: 'sheet', cell: 'D16',
        composeFields: ['monthly_transaction_count', 'monthly_volume_usd', 'avg_transaction_value'],
        compose: v => `a. Transaction count: ${v.monthly_transaction_count || ''}\nb. Volume (USD): ${v.monthly_volume_usd || ''}\nc. Average ticket size: ${v.avg_transaction_value || ''}` },
      { fieldId: 'top5_receiving_countries',  sheet: 'sheet', cell: 'D17' },
      { fieldId: 'top5_sending_countries',    sheet: 'sheet', cell: 'D18' },
      { fieldId: 'director_phone',            sheet: 'sheet', cell: 'D31' },
      { fieldId: 'director_email',            sheet: 'sheet', cell: 'D32' }
    ],
    required: ['company_name_legal', 'company_dba_en', 'business_reg_number',
               'business_url', 'operation_address', 'incorporation_date', 'mcc']
  },

  // --- 印尼 DANA 风险表 ---
  {
    id: 'sea_dana_risk',
    channel: 'sea',
    displayName: '印尼 DANA Risk Form / Merchant Payment Solution Checklist',
    filename: '【NEW】Dana- Risk Form - Merchant Payment Solution Checklist.xlsx',
    path: 'templates/【NEW】Dana- Risk Form - Merchant Payment Solution Checklist.xlsx',
    mappings: [
      { fieldId: 'dana_has_legal_entity',   sheet: 'Checklist', cell: 'D4'  },
      { fieldId: 'dana_regulated_by',       sheet: 'Checklist', cell: 'D5'  },
      { fieldId: 'dana_subscription_based', sheet: 'Checklist', cell: 'D6'  },
      { fieldId: 'dana_recurring_nature',   sheet: 'Checklist', cell: 'D7'  },
      { fieldId: 'dana_resellable_item',    sheet: 'Checklist', cell: 'D8'  },
      { fieldId: 'dana_mau_tier',           sheet: 'Checklist', cell: 'D9'  },
      { fieldId: 'dana_fraud_history',      sheet: 'Checklist', cell: 'D10' },
      { fieldId: 'dana_unsubscribe_btn',    sheet: 'Checklist', cell: 'D11' },
      { fieldId: 'dana_fraud_detection',    sheet: 'Checklist', cell: 'D12' },
      { fieldId: 'dana_consent_suspend',    sheet: 'Checklist', cell: 'D13' },
      { fieldId: 'dana_consent_addendum',   sheet: 'Checklist', cell: 'D14' },
      // 商户信息区 (C19-C27, 与 D 合并)
      { fieldId: 'company_dba_en',          sheet: 'Checklist', cell: 'C19' },
      { fieldId: 'company_name_legal',      sheet: 'Checklist', cell: 'C20' },
      { fieldId: 'business_url',            sheet: 'Checklist', cell: 'C21' },
      { sheet: 'Checklist', cell: 'C22',
        composeFields: ['mobile_app_name', 'business_url'],
        compose: v => `${v.mobile_app_name || ''}${v.business_url ? ' - ' + v.business_url : ''}` },
      { fieldId: 'mcc',                     sheet: 'Checklist', cell: 'C23' },
      { fieldId: 'dana_abs',                sheet: 'Checklist', cell: 'C24' },
      { fieldId: 'dana_mau_exact',          sheet: 'Checklist', cell: 'C25' },
      { fieldId: 'dana_solution_requested', sheet: 'Checklist', cell: 'C26' },
      { fieldId: 'dana_solution_current',   sheet: 'Checklist', cell: 'C27' }
    ],
    required: ['company_name_legal', 'business_url', 'mcc',
               'dana_has_legal_entity', 'dana_mau_tier', 'dana_solution_requested']
  },

  // --- 泰国 TrueMoney ---
  {
    id: 'sea_truemoney',
    channel: 'sea',
    displayName: '泰国 TrueMoney Onboarding Form',
    filename: 'TMN Merchant Onboarding form.xlsx',
    path: 'templates/TMN Merchant Onboarding form.xlsx',
    mappings: [
      { fieldId: 'company_dba_en',             sheet: 'Sheet1', cell: 'D2'  },
      { fieldId: 'is_payment_service_provider',sheet: 'Sheet1', cell: 'D3'  },
      { fieldId: 'business_url',               sheet: 'Sheet1', cell: 'D4'  },
      { fieldId: 'mobile_app_name',            sheet: 'Sheet1', cell: 'D5'  },
      { fieldId: 'mcc',                        sheet: 'Sheet1', cell: 'D6'  },
      { fieldId: 'mcc',                        sheet: 'Sheet1', cell: 'D7'  },
      { fieldId: 'avg_transaction_value',      sheet: 'Sheet1', cell: 'D8', transform: 'number' },
      { fieldId: 'company_name_legal',         sheet: 'Sheet1', cell: 'D9'  },
      { fieldId: 'registration_country',       sheet: 'Sheet1', cell: 'D10' },
      { fieldId: 'branch_name',                sheet: 'Sheet1', cell: 'D11' },
      { fieldId: 'company_type',               sheet: 'Sheet1', cell: 'D12', transform: 'tmn_biz_type' },
      { fieldId: 'business_reg_number',        sheet: 'Sheet1', cell: 'D13' },
      { fieldId: 'operation_address',          sheet: 'Sheet1', cell: 'D14' },
      { fieldId: 'business_phone',             sheet: 'Sheet1', cell: 'D15' },
      { fieldId: 'business_url',               sheet: 'Sheet1', cell: 'D16' },
      { sheet: 'Sheet1', cell: 'D17', composeFields: ['signer_first_name','signer_last_name'], compose: v => [v.signer_first_name, v.signer_last_name].filter(Boolean).join(' ') },
      { fieldId: 'director_phone',             sheet: 'Sheet1', cell: 'D18' },
      { fieldId: 'director_email',             sheet: 'Sheet1', cell: 'D19' },
      { fieldId: 'merchant_logo',              sheet: 'Sheet1', cell: 'D20', image: true, size: { width: 80, height: 80 } },
      { fieldId: 'expected_launch_date',       sheet: 'Sheet1', cell: 'D21', transform: 'date_dmy' }
    ],
    required: ['company_dba_en', 'business_url', 'mcc',
               'company_name_legal', 'registration_country', 'business_reg_number',
               'operation_address', 'business_phone', 'signer_last_name',
               'director_phone', 'director_email', 'expected_launch_date']
  },

  // --- 台湾 JKOPay ---
  {
    id: 'jkopay',
    channel: 'taiwan',
    displayName: '台湾 JKOPay',
    filename: 'JKOPay.xlsx',
    path: 'templates/JKOPay.xlsx',
    mappings: [
      { fieldId: 'jkopay_funding_source', sheet: 'Sheet1', cell: 'B3' },
      { fieldId: 'merchant_logo', sheet: 'Sheet1', cell: 'B2', image: true, size: { width: 80, height: 80 } }
    ],
    required: ['jkopay_funding_source']
  },

  // --- 信用卡 JCB ---
  {
    id: 'jcb',
    channel: 'credit_card',
    displayName: '信用卡 JCB',
    filename: 'JCB.xlsx',
    path: 'templates/JCB.xlsx',
    mappings: [
      { fieldId: 'company_dba_en',       sheet: 'Sheet1', cell: 'B3' },
      { fieldId: 'company_name_legal',   sheet: 'Sheet1', cell: 'B4' },
      { fieldId: 'registration_country', sheet: 'Sheet1', cell: 'B5' },
      { fieldId: 'operation_address',    sheet: 'Sheet1', cell: 'B6' },
      { sheet: 'Sheet1', cell: 'B7', composeFields: ['registration_country'], compose: v => v.registration_country || '' },
      { fieldId: 'postal_code',          sheet: 'Sheet1', cell: 'B8' },
      { fieldId: 'director_phone',       sheet: 'Sheet1', cell: 'B9' },
      { fieldId: 'director_email',       sheet: 'Sheet1', cell: 'B10' },
      { fieldId: 'business_reg_number',  sheet: 'Sheet1', cell: 'B11' },
      { fieldId: 'mcc',                  sheet: 'Sheet1', cell: 'B12' },
      { fieldId: 'business_url',         sheet: 'Sheet1', cell: 'B13' },
      { sheet: 'Sheet1', cell: 'B14', compose: () => 'Mr' },
      { fieldId: 'signer_first_name',sheet: 'Sheet1', cell: 'B15' },
      { fieldId: 'signer_last_name', sheet: 'Sheet1', cell: 'B16' },
      { fieldId: 'director_dob',         sheet: 'Sheet1', cell: 'B17', transform: 'date_iso' },
      { fieldId: 'director_country_city', sheet: 'Sheet1', cell: 'B18' },
      { sheet: 'Sheet1', cell: 'B19', compose: () => 'JCB' }
    ],
    required: ['company_dba_en', 'company_name_legal', 'business_reg_number',
               'signer_first_name', 'signer_last_name']
  },

  // --- 信用卡 AMEX / Discover / Diners / UnionPay ---
  {
    id: 'amex_discover',
    channel: 'credit_card',
    displayName: 'AMEX / Discover / Diners / UnionPay',
    filename: 'B15（SG）-AMEX,Discover_Diners&UnionPay.xlsx',
    path: 'templates/B15（SG）-AMEX,Discover_Diners&UnionPay.xlsx',
    mappings: [
      { fieldId: 'company_name_legal',   sheet: 'B15', cell: 'C4' },
      { fieldId: 'company_dba_en',       sheet: 'B15', cell: 'C5' },
      { fieldId: 'incorporation_date',   sheet: 'B15', cell: 'C6', transform: 'date_sea' },
      { fieldId: 'mcc',                  sheet: 'B15', cell: 'C7' },
      { fieldId: 'operation_address',    sheet: 'B15', cell: 'C8' },
      { fieldId: 'business_reg_number',  sheet: 'B15', cell: 'C9' },
      { fieldId: 'stock_exchange_code',  sheet: 'B15', cell: 'C10' },
      { fieldId: 'business_url',         sheet: 'B15', cell: 'C11' },
      { fieldId: 'company_type',         sheet: 'B15', cell: 'C12' },
      { sheet: 'B15', cell: 'C15',
        composeFields: ['annual_processing_volume_usd', 'avg_transaction_value'],
        compose: v => `a. Volume (USD): ${v.annual_processing_volume_usd || ''}\nb. Average ticket size (USD): ${v.avg_transaction_value || ''}` },
      { fieldId: 'top5_receiving_countries', sheet: 'B15', cell: 'C16' },
      { fieldId: 'top5_sending_countries',   sheet: 'B15', cell: 'C17' },
      { fieldId: 'director_phone',       sheet: 'B15', cell: 'C26' },
      { fieldId: 'director_email',       sheet: 'B15', cell: 'C27' }
    ],
    required: ['company_name_legal', 'company_dba_en', 'business_reg_number',
               'business_url', 'mcc', 'operation_address']
  },

  // --- 信用卡 Credit Risk DDQ ---
  {
    id: 'credit_risk_ddq',
    channel: 'credit_card',
    displayName: '信用卡 Credit Risk DDQ 风险问卷',
    filename: 'Credit Risk DDQ revised.xlsx',
    path: 'templates/Credit Risk DDQ revised.xlsx',
    forceFontSize: 11,
    mirrorSheets: { ENG: 'CN' },
    mappings: [
      { fieldId: 'product_description',  sheet: 'ENG', cell: 'C2' },
      { fieldId: 'top5_receiving_countries', sheet: 'ENG', cell: 'C3' },
      { fieldId: 'business_url',         sheet: 'ENG', cell: 'C4' },
      { fieldId: 'business_url',         sheet: 'ENG', cell: 'C5' },
      { sheet: 'ENG', cell: 'C6',  composeFields: ['ddq_recurring'], compose: v => _ddqYN(v.ddq_recurring) },
      { sheet: 'ENG', cell: 'C7',  composeFields: ['ddq_bnpl'],      compose: v => _ddqYN(v.ddq_bnpl) },
      { sheet: 'ENG', cell: 'C8',  composeFields: ['ddq_layaway'],   compose: v => _ddqYN(v.ddq_layaway) },
      { sheet: 'ENG', cell: 'C9',  composeFields: ['annual_processing_volume_usd'],
        compose: v => v.annual_processing_volume_usd ? `${v.annual_processing_volume_usd} USD` : '' },
      { sheet: 'ENG', cell: 'C10', composeFields: ['order_amount_min_usd', 'order_amount_max_usd'],
        compose: v => (v.order_amount_min_usd != null && v.order_amount_min_usd !== '') || (v.order_amount_max_usd != null && v.order_amount_max_usd !== '')
          ? `${v.order_amount_min_usd ?? ''} to ${v.order_amount_max_usd ?? ''} USD` : '' },
      { sheet: 'ENG', cell: 'C11', composeFields: ['ddq_stock_days'],
        compose: v => (v.ddq_stock_days != null && v.ddq_stock_days !== '') ? `${v.ddq_stock_days} days` : '' },
      { sheet: 'ENG', cell: 'C12', composeFields: ['ddq_refund_days'],
        compose: v => (v.ddq_refund_days != null && v.ddq_refund_days !== '') ? `${v.ddq_refund_days} days` : '' },
      { fieldId: 'business_model',       sheet: 'ENG', cell: 'C13' },
      { sheet: 'ENG', cell: 'C16', composeFields: ['ddq_card_history', 'ddq_card_history_psp'],
        compose: v => {
          if (!v.ddq_card_history) return '';
          const psp = v.ddq_card_history === 'Never' ? '无收单历史' : (v.ddq_card_history_psp || '');
          return psp ? `${v.ddq_card_history}, PSP: ${psp}` : v.ddq_card_history;
        } },
      { sheet: 'ENG', cell: 'C19', composeFields: ['chargeback_ratio'],
        compose: v => v.chargeback_ratio ? `${v.chargeback_ratio} (last 3 months)` : '' },
      { sheet: 'ENG', cell: 'C20', composeFields: ['refund_ratio'],
        compose: v => v.refund_ratio ? `${v.refund_ratio} (last 3 months)` : '' },
      { sheet: 'ENG', cell: 'C21', composeFields: ['fraud_mgmt'],
        compose: v => Array.isArray(v.fraud_mgmt) ? v.fraud_mgmt.map(x => '☑ ' + x).join('  ') : '' },
      { sheet: 'ENG', cell: 'C23', composeFields: ['ddq_overseas_warehouse'], compose: v => _ddqYN(v.ddq_overseas_warehouse) },
      { sheet: 'ENG', cell: 'C24', composeFields: ['ddq_shipping_days'],
        compose: v => v.ddq_shipping_days ? `${v.ddq_shipping_days} days` : '' },
      { sheet: 'ENG', cell: 'C25', composeFields: ['ddq_medicine'],       compose: v => _ddqYN(v.ddq_medicine) },
      { sheet: 'ENG', cell: 'C27', composeFields: ['ddq_cloud_storage'],  compose: v => _ddqYN(v.ddq_cloud_storage) },
      { sheet: 'ENG', cell: 'C28', composeFields: ['ddq_subscription'],   compose: v => _ddqYN(v.ddq_subscription) },
      { sheet: 'ENG', cell: 'C29', composeFields: ['ddq_crypto'],         compose: v => _ddqYN(v.ddq_crypto) }
    ]
  },

  // --- 澳门 MPay ---
  {
    id: 'mpay',
    channel: 'macau',
    displayName: '澳门 MPay',
    filename: 'Mpay.xlsx',
    path: 'templates/Mpay.xlsx',
    mappings: [
      { fieldId: 'mobile_app_name',      sheet: 'Sheet1', cell: 'B2' },
      { fieldId: 'mcc',                  sheet: 'Sheet1', cell: 'B3' },
      { fieldId: 'company_name_legal',   sheet: 'Sheet1', cell: 'B5' },
      { fieldId: 'company_dba_en',       sheet: 'Sheet1', cell: 'B6' },
      { fieldId: 'business_reg_number',  sheet: 'Sheet1', cell: 'B8' },
      { fieldId: 'operation_address',    sheet: 'Sheet1', cell: 'B9' },
      { fieldId: 'mpay_regulator',       sheet: 'Sheet1', cell: 'B10' },
      { fieldId: 'mpay_display_currency',sheet: 'Sheet1', cell: 'B11' },
      { fieldId: 'mpay_order_currency',  sheet: 'Sheet1', cell: 'B12' },
      { fieldId: 'mpay_payment_currency',sheet: 'Sheet1', cell: 'B13' }
    ],
    required: ['company_name_legal', 'mobile_app_name', 'mcc', 'business_reg_number']
  },

  // --- 韩国 KKP / Tosspay / Naverpay（共用一份入驻材料）---
  {
    id: 'kr_kkp',
    channel: 'korea',
    displayName: '韩国 KKP / Tosspay / Naverpay',
    filename: 'KKP-card onboarding info -1114.xlsx',
    path: 'templates/KKP-card onboarding info -1114.xlsx',
    mappings: [
      { fieldId: 'company_dba_en',       sheet: 'Sheet1', cell: 'E3' },
      { fieldId: 'company_dba_en',       sheet: 'Sheet1', cell: 'E4' },
      { fieldId: 'company_name_legal',   sheet: 'Sheet1', cell: 'E5' },
      { fieldId: 'business_url',         sheet: 'Sheet1', cell: 'E7' },
      { fieldId: 'kr_has_app',           sheet: 'Sheet1', cell: 'E8' },
      { fieldId: 'monthly_volume_usd',   sheet: 'Sheet1', cell: 'E9', transform: 'number' },
      { fieldId: 'mcc',                  sheet: 'Sheet1', cell: 'E10' },
      { fieldId: 'expected_launch_date', sheet: 'Sheet1', cell: 'E11', transform: 'date_iso' },
      { fieldId: 'kr_has_korean_entity', sheet: 'Sheet1', cell: 'E12' },
      { fieldId: 'kr_service_region',    sheet: 'Sheet1', cell: 'E13' },
      { fieldId: 'kr_service_time',      sheet: 'Sheet1', cell: 'E14' },
      { fieldId: 'kr_cashable_product',  sheet: 'Sheet1', cell: 'E15' }
    ],
    required: ['company_dba_en', 'company_name_legal', 'business_url',
               'kr_service_region', 'kr_cashable_product']
  },

  // --- 韩国本地银行卡（Korea Card & Express Bank Transfer）---
  {
    id: 'kr_local_bank_card',
    channel: 'korea',
    displayName: '韩国本地银行卡（Korea Card & Express Bank Transfer）',
    filename: 'Korea Card&Express Bank Transfer.xlsx',
    path: 'templates/Korea Card&Express Bank Transfer.xlsx',
    mappings: [
      { fieldId: 'company_dba_en',        sheet: 'Korea Card&Bank Transfer', cell: 'B2' },
      { fieldId: 'kr_payment_method',     sheet: 'Korea Card&Bank Transfer', cell: 'B3' },
      { fieldId: 'kr_settlement_scenario',sheet: 'Korea Card&Bank Transfer', cell: 'B4' },
      { fieldId: 'monthly_volume_usd',    sheet: 'Korea Card&Bank Transfer', cell: 'B5', transform: 'number' },
      { sheet: 'Korea Card&Bank Transfer', cell: 'B6',
        composeFields: ['business_url', 'test_account'],
        compose: v => [v.business_url, v.test_account].filter(Boolean).join('\n') },
      { sheet: 'Korea Card&Bank Transfer', cell: 'B7', composeFields: ['signer_first_name','signer_last_name'], compose: v => [v.signer_first_name, v.signer_last_name].filter(Boolean).join(' ') },
      { fieldId: 'director_dob',          sheet: 'Korea Card&Bank Transfer', cell: 'B8', transform: 'date_iso' }
    ],
    required: ['company_dba_en', 'kr_settlement_scenario', 'signer_last_name']
  }
];

const TEMPLATE_BY_ID = Object.fromEntries(TEMPLATES.map(t => [t.id, t]));
