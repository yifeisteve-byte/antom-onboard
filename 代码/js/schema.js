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
  { id: 'ch_ddq',        label: '渠道专属 · Credit Risk DDQ 风险问卷' },
  { id: 'ch_japan',      label: '渠道专属 · 日本 APM（merpay / auPAY / FamiPay / Konbini / Pay-easy）' },
  { id: 'ch_paypay',     label: '渠道专属 · 日本 PayPay' },
  { id: 'ch_hk_octopus', label: '渠道专属 · 香港八达通' },
  { id: 'ch_turkey',     label: '渠道专属 · 土耳其 Iyzico' },
  { id: 'ch_tamara',     label: '渠道专属 · 中东 Tamara' },
  { id: 'ch_brazil',     label: '渠道专属 · 南美（Dlocal / STONE / Mercado Pago / PicPay）' },
  { id: 'ch_europe',     label: '渠道专属 · 欧洲（PPRO / Pay by Bank）' }
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
  { id: 'ddq_crypto',            labelZh: 'DDQ · 是否涉及加密货币',               labelEn: 'Crypto Involved',       type: 'select',   group: 'ch_ddq', options: ['Yes', 'No'], default: 'No' },

  // --- 日本 APM 专属 ---
  { id: 'japan_payment_methods',    labelZh: '日本 APM · 申请的支付方式',     labelEn: 'Japan Payment Methods',       type: 'multiselect', group: 'ch_japan',
    options: ['merpay', 'auPAY', 'FamiPay', 'Konbini', 'Pay-easy', 'PayPay'], default: ['merpay', 'auPAY'],
    optionNotes: { FamiPay: '仅支持日本主体报备' } },
  { id: 'merchant_name_ja',         labelZh: '日本 APM · 商户日本营业名称（日文）',   labelEn: 'Merchant Name (JP)',  type: 'text',     group: 'ch_japan',
    hint: 'Konbini & Pay-easy 限 12 字以内' },
  { id: 'jp_business_type',         labelZh: '日本 APM · 业务类型（从以下内容中选择：电商类 / 数娱类 / 服务业）', labelEn: 'Business Type', type: 'select', group: 'ch_japan',
    options: ['General ECOM Merchandise', 'Digital Contents', 'Continuous Services'], default: 'Digital Contents' },
  { id: 'jp_license_required',      labelZh: '日本 APM · 是否涉及以下业务内容：介绍工作和劳务派遣 / 房地产中介 / 二手商品、回收商品和古董 / 旅行社', labelEn: 'Required License', type: 'select', group: 'ch_japan',
    options: ['Yes', 'No'], default: 'No' },
  { id: 'jp_corporate_postal_code', labelZh: '日本 APM · 公司所在地邮政编码',  labelEn: 'Corporate Post(Zip) Code',    type: 'text',     group: 'ch_japan', placeholder: '000-0000' },
  { id: 'jp_director_gender',       labelZh: '日本 APM · 代表人的性别',        labelEn: "Director's Gender",           type: 'select',   group: 'ch_japan',
    options: ['male', 'female'], default: 'male' },
  { id: 'jp_capital_jpy',           labelZh: '日本 APM · 公司注册资本金（金额单位：日元）', labelEn: 'Capital (JPY)', type: 'number', group: 'ch_japan', default: 10000000 },
  { id: 'jp_sca_page_url',          labelZh: '日本 APM · 特商法页面 URL',      labelEn: 'URL of SCTA Page',            type: 'url',      group: 'ch_japan', placeholder: 'https://' },
  { id: 'jp_famipay_prepaid',       labelZh: 'FamiPay · 是否已登记資金決済法（回答 0 或 1）', labelEn: 'Prepaid Payment (0/1)', type: 'select', group: 'ch_japan',
    options: ['0', '1'], default: '0', showIfMethod: ['FamiPay'] },
  { id: 'jp_konbini_payment_limit_days', labelZh: 'Konbini/Pay-easy · 支付期限：网上下单后实际去 Konbini 店铺进行支付的有效日期（日数 0-99）', labelEn: 'Payment Limit Day', type: 'number', group: 'ch_japan',
    default: 7, showIfMethod: ['Konbini', 'Pay-easy'] },
  { id: 'jp_konbini_cash_refund',   labelZh: 'Konbini/Pay-easy · 是否支持 Cash Refund（Refund via Store Credit / PayPal 禁止）', labelEn: 'Cash Refund Availability', type: 'select', group: 'ch_japan',
    options: ['Yes', 'No'], default: 'Yes', showIfMethod: ['Konbini', 'Pay-easy'] },
  { id: 'jp_cs_hours_from',         labelZh: '日本 APM · Customer Service 电话对应开始时间', labelEn: 'Customer Service Hour From',  type: 'text',     group: 'ch_japan', default: '09:00', showIfMethod: ['Konbini', 'Pay-easy'] },
  { id: 'jp_cs_hours_until',        labelZh: '日本 APM · Customer Service 电话对应结束时间', labelEn: 'Customer Service Hour Until', type: 'text',     group: 'ch_japan', default: '18:00', showIfMethod: ['Konbini', 'Pay-easy'] },

  // --- PayPay 专属（由 jp_paypay 模板驱动显示，不用 showIfMethod）---
  { id: 'paypay_is_overseas', labelZh: 'PayPay · 报备主体是否在日本境外（Yes 时跳过 Sheet1 本土段，改填 Sheet3）', labelEn: 'Head office outside Japan?', type: 'select',
    group: 'ch_paypay', options: ['Yes', 'No'], default: 'Yes' },
  { id: 'paypay_contact_person', labelZh: 'PayPay · 填写人姓名', labelEn: 'Person who completed this', type: 'text',
    group: 'ch_paypay', hidden: true },
  { id: 'paypay_rep_name_native', labelZh: 'PayPay · 董事/UBO 姓名（母语）', labelEn: 'Director/UBO name (native)', type: 'text',
    group: 'ch_paypay' },
  { id: 'paypay_rep_name_roman', labelZh: 'PayPay · 董事/UBO 姓名（罗马字 / 英文）', labelEn: 'Director/UBO name (Roman)', type: 'text',
    group: 'ch_paypay' },
  { id: 'paypay_capital', labelZh: 'PayPay · 注册资本（格式 xxxx JPY / xxxx USD/ xxxx HKD）', labelEn: 'Capital', type: 'text',
    group: 'ch_paypay' },
  { id: 'paypay_ubo_name_native', labelZh: 'PayPay · UBO 姓名（母语）', labelEn: 'UBO name (native)', type: 'text',
    group: 'ch_paypay', hidden: true },
  { id: 'paypay_ubo_name_en', labelZh: 'PayPay · UBO 姓名（罗马字 / 英文）', labelEn: 'UBO name (Roman)', type: 'text',
    group: 'ch_paypay', hidden: true },
  { id: 'paypay_ubo_address', labelZh: 'PayPay · UBO 当前居住地址', labelEn: 'UBO address', type: 'text',
    group: 'ch_paypay', hidden: true },
  { id: 'paypay_ubo_dob', labelZh: 'PayPay · UBO 出生日期', labelEn: 'UBO DOB', type: 'date',
    group: 'ch_paypay', hidden: true },
  { id: 'paypay_business_reg_no', labelZh: 'PayPay · 企业注册号 / Corporate Number', labelEn: 'Corporate / Registration Number', type: 'text',
    group: 'ch_paypay', hidden: true },
  { id: 'paypay_jp_legal_rep', labelZh: 'PayPay · 是否在日本设有法定代表人或委托律师事务所（仅海外主体）', labelEn: 'Legal rep / law firm in Japan', type: 'select',
    group: 'ch_paypay', options: ['Yes', 'No'], default: 'No' },
  { id: 'paypay_jp_support', labelZh: 'PayPay · 发生纠纷时用户能否获得日语支持', labelEn: 'Japanese user support', type: 'select',
    group: 'ch_paypay', options: ['Yes', 'No'], default: 'Yes' },
  { id: 'paypay_support_channels', labelZh: 'PayPay · 日语支持渠道说明（邮件 / 电话 / 时段等）', labelEn: 'Support channels', type: 'textarea',
    group: 'ch_paypay' },
  { id: 'paypay_psp_name', labelZh: 'PayPay · PSP（支付服务提供商）名称', labelEn: 'PSP name', type: 'text',
    group: 'ch_paypay', default: 'Antom' },
  { id: 'paypay_is_platform', labelZh: 'PayPay · 预期业务模式是否为平台型业务', labelEn: 'Platform business?', type: 'select',
    group: 'ch_paypay', options: ['Yes', 'No'], default: 'No' },
  { id: 'paypay_trade_name', labelZh: 'PayPay · 商号（PayPay 用户消费明细中显示的服务名称）', labelEn: 'Trade Name', type: 'text',
    group: 'ch_paypay', hidden: true },
  { id: 'paypay_payment_method_type', labelZh: 'PayPay · 期望的支付方式', labelEn: 'Payment method type', type: 'select',
    group: 'ch_paypay', options: ['Online/オンライン', 'Offline/オフライン'], default: 'Online/オンライン' },
  { id: 'paypay_use_case', labelZh: 'PayPay · 使用场景详细说明', labelEn: 'Use case details', type: 'textarea',
    group: 'ch_paypay', default: '使用paypay让用户充值' },
  { id: 'paypay_implementation_url', labelZh: 'PayPay · 接入 PayPay 支付的网站 URL（页面必须含日语）', labelEn: 'Implementation URL', type: 'url',
    group: 'ch_paypay', placeholder: 'https://', hidden: true },
  { id: 'paypay_site_in_japanese', labelZh: 'PayPay · 商品购买页是否可供 PayPay 审核（页面须含日语）', labelEn: 'Site reviewable in Japanese', type: 'select',
    group: 'ch_paypay', options: ['Yes/はい', 'No/いいえ'], default: 'Yes/はい' },
  { id: 'paypay_prices_in_jpy', labelZh: 'PayPay · 商品展示价格是否包含日元', labelEn: 'Prices displayed in JPY', type: 'select',
    group: 'ch_paypay', options: ['Yes/はい', 'No/いいえ'], default: 'Yes/はい' },
  { id: 'paypay_tos_url', labelZh: 'PayPay · 服务条款页面 URL', labelEn: 'Terms of Service URL', type: 'url',
    group: 'ch_paypay', placeholder: 'https://' },
  { id: 'paypay_tos_refund_clause', labelZh: 'PayPay · 服务条款中"退款 / 取消"条款原文摘录', labelEn: 'ToS refund clause', type: 'textarea',
    group: 'ch_paypay' },
  { id: 'paypay_legal_notice_url', labelZh: 'PayPay · 特商法标示页面 URL', labelEn: 'Legal Notice URL', type: 'url',
    group: 'ch_paypay', placeholder: 'https://' },
  { id: 'paypay_privacy_url', labelZh: 'PayPay · 隐私条款页面 URL', labelEn: 'Privacy Policy URL', type: 'url',
    group: 'ch_paypay', placeholder: 'https://' },
  { id: 'paypay_prepaid_instrument', labelZh: 'PayPay · 是否属于网络道具点卡充值', labelEn: 'Prepaid payment instrument', type: 'select',
    group: 'ch_paypay', options: ['Yes/はい', 'No/いいえ'], default: 'No/いいえ' },
  { id: 'paypay_fsa_registration_required', labelZh: 'PayPay · 是否需向金融厅（FSA）申报登记', labelEn: 'FSA registration required', type: 'select',
    group: 'ch_paypay', options: ['Yes/はい', 'No/いいえ'], default: 'No/いいえ' },
  { id: 'paypay_fsa_notified', labelZh: 'PayPay · 是否已向金融厅 / 财务局申报', labelEn: 'FSA already notified', type: 'select',
    group: 'ch_paypay', options: ['Yes/はい', 'No/いいえ'], default: 'No/いいえ' },
  { id: 'paypay_fsa_url', labelZh: 'PayPay · 资金決済法披露页面 URL', labelEn: 'FSA disclosure URL', type: 'url',
    group: 'ch_paypay', placeholder: 'https://' },
  { id: 'paypay_connection_type', labelZh: 'PayPay · 线上接入方式', labelEn: 'Connection method', type: 'select',
    group: 'ch_paypay',
    options: ['Online merchant (Web Payment)', 'Online merchant (Native Payment (Server-to-Server API Payment))', 'Online merchant (continuous billing (Server-to-Server API Payment))', 'Online merchant (Smart Payment)'],
    default: 'Online merchant (Web Payment)' },
  { id: 'paypay_data_server_in_jp', labelZh: 'PayPay · 存放 PayPay 相关用户及交易数据的服务器是否位于日本境内', labelEn: 'Data server in Japan', type: 'select',
    group: 'ch_paypay', options: ['Yes/はい', 'No/いいえ'], default: 'No/いいえ', hideIfWebPay: true },
  { id: 'paypay_data_server_location', labelZh: 'PayPay · 数据服务器所在国家 / 地区', labelEn: 'Data server location', type: 'text',
    group: 'ch_paypay', hideIfWebPay: true },
  { id: 'paypay_data_access_from_abroad', labelZh: 'PayPay · 是否可从日本以外国家访问 PayPay 相关数据', labelEn: 'Access from abroad', type: 'select',
    group: 'ch_paypay', options: ['Yes/はい', 'No/いいえ'], default: 'Yes/はい', hideIfWebPay: true },
  { id: 'paypay_data_access_countries', labelZh: 'PayPay · 可访问 PayPay 相关数据的所有国家 / 地区', labelEn: 'Access countries', type: 'textarea',
    group: 'ch_paypay', hideIfWebPay: true },

  // --- 香港八达通 专属 ---
  // company_name_zh / company_dba_zh 自动取英文字段值，不在表单中显示
  { id: 'company_name_zh',    labelZh: '公司法定名称（繁体中文，选填）', labelEn: 'Company Legal Name (Chinese)', type: 'text', group: 'ch_hk_octopus', hidden: true },
  { id: 'company_dba_zh',     labelZh: '经营名称 DBA（繁体中文，选填）', labelEn: 'Trading Name (Chinese)',       type: 'text', group: 'ch_hk_octopus', hidden: true },
  { id: 'hk_entity_location', labelZh: '香港八达通 · 公司所在地（非港主体填写）', labelEn: 'Entity Location (non-HK)', type: 'text', group: 'ch_hk_octopus' },

  // --- 中东 Tamara 专属 ---
  { id: 'tamara_annual_sales', labelZh: 'Tamara · 年销售额区间', labelEn: 'Reported Annual Sales', type: 'select', group: 'ch_tamara',
    options: ['Large Enterprise (More than $200 million)', 'Enterprise ($15 million to $200 million)',
              'Large Business ($5 million to $15 million)', 'Medium Business ($1 million to $5 million)',
              'Small Business ($250 thousand to $1 million)', 'Micro Business (Less than $250 thousand)'],
    default: 'Small Business ($250 thousand to $1 million)' },
  { id: 'tamara_country_reg', labelZh: 'Tamara · 注册国家', labelEn: 'Country of Registration', type: 'text', group: 'ch_tamara', placeholder: 'e.g. Saudi Arabia' },
  { id: 'tamara_country_ops', labelZh: 'Tamara · 运营国家（沙特 / 阿联酋）', labelEn: 'Country of Operations', type: 'select', group: 'ch_tamara',
    options: ['Saudi Arabia', 'United Arab Emirates', 'Saudi Arabia, United Arab Emirates'],
    default: 'Saudi Arabia' },
  { id: 'tamara_product',     labelZh: 'Tamara · 申请产品（BNPL / PIF）', labelEn: 'Product Requested', type: 'select', group: 'ch_tamara',
    options: ['BNPL', 'PIF', 'BNPL / PIF'], default: 'BNPL' },

  // --- 南美巴西 专属（Dlocal / STONE / Mercado Pago / PicPay）---
  { id: 'brazil_cnpj',             labelZh: '巴西税务号 CNPJ',                         labelEn: 'Tax ID (CNPJ)',                     type: 'text',     group: 'ch_brazil' },
  { id: 'brazil_country_incorp',   labelZh: '注册国家',                                 labelEn: 'Country of Incorporation',          type: 'text',     group: 'ch_brazil', placeholder: 'e.g. Brazil' },
  { id: 'brazil_subsellers',       labelZh: '子商户分配说明',                           labelEn: 'Allocation of Sub-sellers',         type: 'textarea', group: 'ch_brazil' },
  { id: 'brazil_settlement_time',  labelZh: '结算时间（如 T+30）',                      labelEn: 'Settlement Time',                   type: 'text',     group: 'ch_brazil', placeholder: 'e.g. T+30' },
  { id: 'brazil_contact_email',    labelZh: '联系人邮箱（巴西联系人）',                 labelEn: 'Responsible Contact Email',         type: 'email',    group: 'ch_brazil' },
  { id: 'brazil_cpf',              labelZh: 'CPF 个人税号',                             labelEn: 'CPF (Brazilian Taxpayer ID)',        type: 'text',     group: 'ch_brazil' },
  { id: 'brazil_mother_name',      labelZh: '联系人母亲姓名',                           labelEn: "Contact Mother's Name",             type: 'text',     group: 'ch_brazil' },
  { id: 'brazil_dob',              labelZh: '联系人出生日期',                           labelEn: 'Contact Date of Birth',             type: 'text',     group: 'ch_brazil', placeholder: 'e.g. 1990-01-15' },
  { id: 'brazil_position',         labelZh: '联系人职位',                               labelEn: 'Position / Title',                  type: 'text',     group: 'ch_brazil' },
  { id: 'brazil_monthly_income',   labelZh: '联系人月收入',                             labelEn: 'Monthly Income',                    type: 'text',     group: 'ch_brazil', placeholder: 'e.g. BRL 10,000' },
  { id: 'brazil_expected_tpv',     labelZh: '预期月 / 年交易量 TPV',                    labelEn: 'Expected TPV',                      type: 'text',     group: 'ch_brazil' },
  { id: 'brazil_installment_share',labelZh: '分期交易占比',                             labelEn: 'Share by Installment',              type: 'text',     group: 'ch_brazil', placeholder: 'e.g. 30%' },
  { id: 'brazil_card_network_share',labelZh: '各卡组织份额',                            labelEn: 'Share by Card Network',             type: 'text',     group: 'ch_brazil', placeholder: 'e.g. Visa 50% / Master 50%' },
  { id: 'brazil_platinization',    labelZh: '预期 Platinization 率',                    labelEn: 'Expected Platinization',            type: 'text',     group: 'ch_brazil' },
  { id: 'mp_product',              labelZh: 'Mercado Pago · 申请产品',                  labelEn: 'Mercado Pago Product',              type: 'select',   group: 'ch_brazil',
    options: ['Checkout PRO', 'Checkout API', 'PISP'], default: 'Checkout PRO' },
  { id: 'picpay_dedicated_mid',    labelZh: 'PicPay · 是否需要专属 MID',               labelEn: 'Dedicated MID Required',            type: 'select',   group: 'ch_brazil',
    options: ['Yes', 'No'], default: 'No' },
  { id: 'brazil_aov',              labelZh: '平均订单金额 AOV',                         labelEn: 'Average Order Value (AOV)',         type: 'text',     group: 'ch_brazil', placeholder: 'e.g. BRL 150' },
  { id: 'picpay_products',         labelZh: 'PicPay · 使用产品（Wallet / One-Click）', labelEn: 'PicPay Products',                   type: 'text',     group: 'ch_brazil', placeholder: 'Wallet / One-Click' },

  // --- 欧洲 专属（PPRO / Pay by Bank Token）---
  // PPRO：UBO 与 Director 默认同一人，地址信息两段共用
  { id: 'ppro_native_name', labelZh: 'PPRO · 母语姓名（证件上的名字）',   labelEn: 'Native Name (on ID)',           type: 'text',   group: 'ch_europe' },
  { id: 'ppro_country',     labelZh: 'PPRO · 所在国家',                   labelEn: 'Country',                       type: 'text',   group: 'ch_europe', placeholder: 'e.g. Germany' },
  { id: 'ppro_province',    labelZh: 'PPRO · 省 / 州 / 地区',             labelEn: 'Province / Region / State',     type: 'text',   group: 'ch_europe' },
  { id: 'ppro_city',        labelZh: 'PPRO · 城市',                       labelEn: 'City or Town',                  type: 'text',   group: 'ch_europe' },
  { id: 'ppro_postal',      labelZh: 'PPRO · 邮政编码',                   labelEn: 'Postal / ZIP Code',             type: 'text',   group: 'ch_europe' },
  { id: 'ppro_street',      labelZh: 'PPRO · 街道地址',                   labelEn: 'Street Address',                type: 'text',   group: 'ch_europe' },
  // Pay by Bank Token
  { id: 'eu_sole_trader',     labelZh: 'Pay by Bank · 是否个体商户',      labelEn: 'Sole Trader',                   type: 'select', group: 'ch_europe', options: ['Yes', 'No'], default: 'No' },
  { id: 'eu_publicly_listed', labelZh: 'Pay by Bank · 是否上市公司',      labelEn: 'Publicly Listed',               type: 'select', group: 'ch_europe', options: ['Yes', 'No'], default: 'No' },
  { id: 'eu_uk_only',         labelZh: 'Pay by Bank · 是否仅服务英国用户', labelEn: 'Serve UK Users Only',           type: 'select', group: 'ch_europe', options: ['Yes', 'No'], default: 'No' },
  { id: 'eu_jurisdiction',    labelZh: 'Pay by Bank · 注册国家 / 地区',   labelEn: 'Jurisdiction',                  type: 'text',   group: 'ch_europe', placeholder: 'e.g. United Kingdom' },
  { id: 'eu_ubo_count',       labelZh: 'Pay by Bank · UBO 数量',          labelEn: 'Number of UBOs',                type: 'number', group: 'ch_europe', default: 1 },
  { id: 'eu_director_count',  labelZh: 'Pay by Bank · 董事数量',          labelEn: 'Number of Directors',           type: 'number', group: 'ch_europe', default: 1 },

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
  { id: 'sea',         name: '东南亚（2C2P / DANA / TrueMoney / 菲律宾 QRPH）' },
  { id: 'taiwan',      name: '台湾' },
  { id: 'korea',       name: '韩国（KKP / Tosspay / Naverpay + 本地银行卡）' },
  { id: 'macau',       name: '澳门（MPay）' },
  { id: 'japan',       name: '日本 APM（merpay / auPAY / FamiPay / Konbini / Pay-easy）' },
  { id: 'hk',          name: '香港（八达通）' },
  { id: 'turkey',      name: '土耳其（Iyzico）' },
  { id: 'middle_east',   name: '中东（Tamara）' },
  { id: 'south_america', name: '南美（Dlocal / STONE / Mercado Pago / PicPay）' },
  { id: 'europe',        name: '欧洲（PPRO / Pay by Bank）' }
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
    displayName: 'Visa / Master 卡',
    filename: 'Visa ／ Master 卡.xlsx',
    path: 'templates/Visa ／ Master 卡.xlsx',
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
    displayName: '东南亚 电子钱包（除越南 ZaloPay / Momo）',
    filename: '东南亚 电子钱包（除越南 ZaloPay ／ Momo）.xlsx',
    path: 'templates/东南亚 电子钱包（除越南 ZaloPay ／ Momo）.xlsx',
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

  // --- 菲律宾 QRPH ---
  {
    id: 'ph_qrph',
    channel: 'sea',
    displayName: '菲律宾 QRPH',
    filename: '菲律宾QRPH.xlsx',
    path: 'templates/菲律宾QRPH.xlsx',
    mappings: [
      { fieldId: 'company_name_legal',  sheet: 'Sheet1', cell: 'B2' },
      { fieldId: 'business_reg_number', sheet: 'Sheet1', cell: 'B3' },
      { fieldId: 'company_dba_en',      sheet: 'Sheet1', cell: 'B4' },
      { fieldId: 'mcc',                 sheet: 'Sheet1', cell: 'B5' },
      { fieldId: 'operation_address',   sheet: 'Sheet1', cell: 'B6' },
      { fieldId: 'mcc',                 sheet: 'Sheet1', cell: 'B7' },
      { fieldId: 'mcc',                 sheet: 'Sheet1', cell: 'B8' },
      { fieldId: 'business_url',        sheet: 'Sheet1', cell: 'B9' },
      { sheet: 'Sheet1', cell: 'B10', composeFields: ['annual_processing_volume_usd'],
        compose: v => v.annual_processing_volume_usd ? String(Math.round(Number(v.annual_processing_volume_usd) / 10)) : '' },
      { sheet: 'Sheet1', cell: 'B11', composeFields: ['annual_processing_volume_usd'],
        compose: v => v.annual_processing_volume_usd ? String(Math.round(Number(v.annual_processing_volume_usd) / 10)) : '' },
      { fieldId: 'avg_transaction_value', sheet: 'Sheet1', cell: 'B12' },
      // B13 Licenses — attachment, skip
      { fieldId: 'expected_launch_date',sheet: 'Sheet1', cell: 'B14', transform: 'date_slash' }
    ],
    required: ['company_name_legal', 'business_reg_number', 'company_dba_en',
               'operation_address', 'mcc', 'business_url', 'expected_launch_date']
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
  },

  // --- 日本 APM（merpay / auPAY / FamiPay / Konbini / Pay-easy 统一申请表）---
  {
    id: 'jp_apm_all',
    channel: 'japan',
    displayName: 'Japan APM 统一申请表（merpay / auPAY / FamiPay / Konbini / Pay-easy）',
    filename: 'merpay-aupay-famipay-konbini-payeasy-Application Form 2.0.xlsx',
    path: 'templates/merpay-aupay-famipay-konbini-payeasy-Application Form 2.0.xlsx',
    mappings: (() => {
      const S = 'Application Form '; // 注意末尾空格
      const R = 10;                    // 填写行
      const has = (v, m) => Array.isArray(v.japan_payment_methods) && v.japan_payment_methods.includes(m);
      const flag = m => v => has(v, m) ? 1 : 0;
      return [
        // C-G 五种支付方式 0/1 开关
        { sheet: S, cell: `C${R}`, composeFields: ['japan_payment_methods'], compose: flag('merpay') },
        { sheet: S, cell: `D${R}`, composeFields: ['japan_payment_methods'], compose: flag('auPAY') },
        { sheet: S, cell: `E${R}`, composeFields: ['japan_payment_methods'], compose: flag('FamiPay') },
        { sheet: S, cell: `F${R}`, composeFields: ['japan_payment_methods'], compose: flag('Konbini') },
        { sheet: S, cell: `G${R}`, composeFields: ['japan_payment_methods'], compose: flag('Pay-easy') },
        // H-I 业务类型 / 许认可
        { fieldId: 'jp_business_type',         sheet: S, cell: `H${R}` },
        { fieldId: 'jp_license_required',      sheet: S, cell: `I${R}` },
        // J-P 公司信息
        { fieldId: 'company_name_legal',       sheet: S, cell: `J${R}` },
        { fieldId: 'business_reg_number',      sheet: S, cell: `K${R}` },
        { fieldId: 'jp_corporate_postal_code', sheet: S, cell: `L${R}` },
        { fieldId: 'operation_address',        sheet: S, cell: `M${R}` },
        { fieldId: 'business_url',             sheet: S, cell: `N${R}` },
        { fieldId: 'business_phone',           sheet: S, cell: `O${R}` },
        { fieldId: 'incorporation_date',       sheet: S, cell: `P${R}`, transform: 'date_jp' },
        // Q-W 店铺信息
        { fieldId: 'merchant_name_ja',         sheet: S, cell: `Q${R}` },
        { fieldId: 'company_dba_en',           sheet: S, cell: `R${R}` },
        { fieldId: 'business_url',             sheet: S, cell: `S${R}` },
        { fieldId: 'product_description',      sheet: S, cell: `T${R}` },
        // U 登录密码 -> 空
        { fieldId: 'business_phone',           sheet: S, cell: `V${R}` },
        { fieldId: 'business_email',           sheet: S, cell: `W${R}` },
        // X-AB 金额 / 交易量（USD → JPY 汇率 150）
        { fieldId: 'avg_transaction_value',        sheet: S, cell: `X${R}`, transform: 'jpy' },
        { fieldId: 'jp_capital_jpy',               sheet: S, cell: `Y${R}`, transform: 'number' },
        { fieldId: 'annual_processing_volume_usd', sheet: S, cell: `Z${R}`, transform: 'jpy' },
        { fieldId: 'monthly_transaction_count',    sheet: S, cell: `AA${R}`, transform: 'number' },
        { fieldId: 'order_amount_max_usd',         sheet: S, cell: `AB${R}`, transform: 'jpy' },
        // AC-AI 法人 UBO 段 —— 留空
        // AJ-AM 个人 UBO 段 —— 复用 signer_/director_
        { sheet: S, cell: `AJ${R}`, composeFields: ['signer_first_name', 'signer_last_name'],
          compose: v => [v.signer_first_name, v.signer_last_name].filter(Boolean).join(' ') },
        { fieldId: 'jp_director_gender',       sheet: S, cell: `AK${R}` },
        { fieldId: 'director_dob',             sheet: S, cell: `AL${R}`, transform: 'date_jp' },
        { fieldId: 'director_address',         sheet: S, cell: `AM${R}` },
        // AN-AQ Director 信息
        { fieldId: 'signer_last_name',         sheet: S, cell: `AN${R}` },
        { fieldId: 'signer_first_name',        sheet: S, cell: `AO${R}` },
        { fieldId: 'jp_director_gender',       sheet: S, cell: `AP${R}` },
        { fieldId: 'director_dob',             sheet: S, cell: `AQ${R}`, transform: 'date_jp' },
        // AR-AW 特商法 6 项（硬编码）
        { sheet: S, cell: `AR${R}`, compose: () => 'Yes' },
        { sheet: S, cell: `AS${R}`, compose: () => 'No' },
        { sheet: S, cell: `AT${R}`, compose: () => 'No' },
        { sheet: S, cell: `AU${R}`, compose: () => 'No' },
        { sheet: S, cell: `AV${R}`, compose: () => 'No' },
        { sheet: S, cell: `AW${R}`, compose: () => 'No' },
        // AX MerPay 文档说明栏 —— 留空
        // AY FamiPay 专属（仅选 FamiPay 时写）
        { sheet: S, cell: `AY${R}`, composeFields: ['japan_payment_methods', 'jp_famipay_prepaid'],
          compose: v => has(v, 'FamiPay') ? (v.jp_famipay_prepaid ?? '') : '' },
        // AZ Konbini/Pay-easy 支付期限
        { sheet: S, cell: `AZ${R}`, composeFields: ['japan_payment_methods', 'jp_konbini_payment_limit_days'],
          compose: v => (has(v, 'Konbini') || has(v, 'Pay-easy')) ? (v.jp_konbini_payment_limit_days ?? '') : '' },
        // BA 特商法页面 URL
        { fieldId: 'jp_sca_page_url',          sheet: S, cell: `BA${R}` },
        // BB Cash Refund
        { sheet: S, cell: `BB${R}`, composeFields: ['japan_payment_methods', 'jp_konbini_cash_refund'],
          compose: v => (has(v, 'Konbini') || has(v, 'Pay-easy')) ? (v.jp_konbini_cash_refund ?? '') : '' },
        // BC-BD CS 时间
        { fieldId: 'jp_cs_hours_from',         sheet: S, cell: `BC${R}` },
        { fieldId: 'jp_cs_hours_until',        sheet: S, cell: `BD${R}` }
        // BE OTA 专用 —— 留空
      ];
    })(),
    required: ['japan_payment_methods', 'company_name_legal', 'merchant_name_ja',
               'company_dba_en', 'business_url', 'business_phone', 'business_email',
               'signer_first_name', 'signer_last_name', 'director_dob', 'operation_address',
               'avg_transaction_value', 'annual_processing_volume_usd', 'jp_capital_jpy',
               'jp_sca_page_url', 'jp_business_type', 'jp_corporate_postal_code']
  },

  // --- 日本 PayPay（海外商户入驻申请表）---
  {
    id: 'jp_paypay',
    channel: 'japan',
    displayName: 'PayPay 日本（海外商户入驻表）',
    filename: 'PAYPAY-Information Request Sheet for Overseas Merchants_v2.3_20251029.xlsx',
    path: 'templates/PAYPAY-Information Request Sheet for Overseas Merchants_v2.3_20251029.xlsx',
    mappings: (() => {
      const S1 = '(1)Corporate Information';
      const S3 = '(3)Overseas corporation';
      const isOverseas = v => v.paypay_is_overseas === 'Yes';
      // 本土段：仅 is_overseas='No' 时写入
      const dom = (fid, tf) => v => {
        if (isOverseas(v)) return '';
        let raw = v[fid];
        if (raw === undefined || raw === null || raw === '') return '';
        return tf ? applyTransform(tf, raw) : raw;
      };
      // 海外段：仅 is_overseas='Yes' 时写入
      const ovs = (fid, tf) => v => {
        if (!isOverseas(v)) return '';
        let raw = v[fid];
        if (raw === undefined || raw === null || raw === '') return '';
        return tf ? applyTransform(tf, raw) : raw;
      };
      const domLit = val => v => isOverseas(v) ? '' : val;
      // 月均交易额 = 年额 / 12，再 USD→JPY
      const monthlyJpy = v => {
        const n = Number(String(v.annual_processing_volume_usd ?? '').replace(/[,，%\s]/g, ''));
        return Number.isFinite(n) && n > 0 ? Math.round(n / 12 * 150) : '';
      };
      // Sheet 3 连接方式分支
      const isWebPay = v => v.paypay_connection_type === 'Online merchant (Web Payment)';
      const webLit = val => v => (isOverseas(v) && isWebPay(v)) ? val : '';
      const other = (fid, tf) => v => {
        if (!isOverseas(v) || isWebPay(v)) return '';
        let raw = v[fid];
        if (raw === undefined || raw === null || raw === '') return '';
        return tf ? applyTransform(tf, raw) : raw;
      };
      return [
        // ===== Sheet 1 公共段（始终写，行 9-34）=====
        // 填写日期（今天）：O9 年 / Q9 月 / S9 日
        { sheet: S1, cell: 'O9', compose: () => new Date().getFullYear() },
        { sheet: S1, cell: 'Q9', compose: () => new Date().getMonth() + 1 },
        { sheet: S1, cell: 'S9', compose: () => new Date().getDate() },
        { fieldId: 'company_name_legal',   sheet: S1, cell: 'M10' },
        { fieldId: 'company_dba_en',       sheet: S1, cell: 'M11' },
        { fieldId: 'operation_address',    sheet: S1, cell: 'M12' },
        { composeFields: ['paypay_rep_name_roman'], compose: v => v.paypay_rep_name_roman || '', sheet: S1, cell: 'M13' },
        { composeFields: ['paypay_rep_name_roman'], compose: v => v.paypay_rep_name_roman || '', sheet: S1, cell: 'M14' },
        { fieldId: 'business_url',         sheet: S1, cell: 'M15' },
        { fieldId: 'paypay_capital',       sheet: S1, cell: 'M16' },
        { fieldId: 'paypay_rep_name_native', sheet: S1, cell: 'M18' },
        { fieldId: 'paypay_rep_name_roman',  sheet: S1, cell: 'M19' },
        { fieldId: 'director_address',     sheet: S1, cell: 'M21' },
        // 代表人 DOB 拆 Y/M/D
        { fieldId: 'director_dob', sheet: S1, cell: 'O22', transform: 'date_year' },
        { fieldId: 'director_dob', sheet: S1, cell: 'Q22', transform: 'date_month' },
        { fieldId: 'director_dob', sheet: S1, cell: 'S22', transform: 'date_day' },
        { composeFields: ['paypay_rep_name_native'], compose: v => v.paypay_rep_name_native || '', sheet: S1, cell: 'M25' },
        { composeFields: ['paypay_rep_name_roman'],  compose: v => v.paypay_rep_name_roman || '',  sheet: S1, cell: 'M26' },
        { composeFields: ['director_address'], compose: v => v.director_address || '', sheet: S1, cell: 'M28' },
        { fieldId: 'director_dob', sheet: S1, cell: 'O29', transform: 'date_year' },
        { fieldId: 'director_dob', sheet: S1, cell: 'Q29', transform: 'date_month' },
        { fieldId: 'director_dob', sheet: S1, cell: 'S29', transform: 'date_day' },
        // 第 32 行：是否在日本境外
        { sheet: S1, cell: 'M32', composeFields: ['paypay_is_overseas'],
          compose: v => v.paypay_is_overseas === 'Yes' ? 'Yes/はい' : (v.paypay_is_overseas === 'No' ? 'No/いいえ' : '') },
        { composeFields: ['business_reg_number'], compose: v => v.business_reg_number || '', sheet: S1, cell: 'M34' },

        // ===== Sheet 1 仅本土段（is_overseas='No' 时写入，行 36 起）=====
        // 第 36 行：是否是海外法人子公司 —— 用户只填 sheet 1/3，固定 No
        { sheet: S1, cell: 'M36', composeFields: ['paypay_is_overseas'], compose: domLit('No/いいえ') },
        { sheet: S1, cell: 'M41', composeFields: ['paypay_is_overseas', 'paypay_psp_name'], compose: dom('paypay_psp_name') },
        { sheet: S1, cell: 'M46', composeFields: ['paypay_is_overseas', 'paypay_is_platform'],
          compose: v => isOverseas(v) ? '' : (v.paypay_is_platform === 'Yes' ? 'Yes/はい' : 'No/いいえ') },
        { sheet: S1, cell: 'M50', composeFields: ['paypay_is_overseas', 'company_dba_en'], compose: dom('company_dba_en') },
        { sheet: S1, cell: 'M51', composeFields: ['paypay_is_overseas', 'annual_processing_volume_usd'], compose: dom('annual_processing_volume_usd', 'jpy') },
        { sheet: S1, cell: 'M52', composeFields: ['paypay_is_overseas', 'annual_processing_volume_usd'],
          compose: v => isOverseas(v) ? '' : monthlyJpy(v) },
        { sheet: S1, cell: 'M53', composeFields: ['paypay_is_overseas', 'product_description'], compose: dom('product_description') },
        { sheet: S1, cell: 'M57', composeFields: ['paypay_is_overseas', 'paypay_payment_method_type'], compose: dom('paypay_payment_method_type') },
        { sheet: S1, cell: 'M61', composeFields: ['paypay_is_overseas', 'paypay_use_case'], compose: dom('paypay_use_case') },
        { sheet: S1, cell: 'M64', composeFields: ['paypay_is_overseas', 'business_url'], compose: dom('business_url') },
        { sheet: S1, cell: 'M65', composeFields: ['paypay_is_overseas', 'paypay_site_in_japanese'], compose: dom('paypay_site_in_japanese') },
        { sheet: S1, cell: 'M67', composeFields: ['paypay_is_overseas', 'paypay_prices_in_jpy'], compose: dom('paypay_prices_in_jpy') },
        { sheet: S1, cell: 'M70', composeFields: ['paypay_is_overseas', 'paypay_tos_url'], compose: dom('paypay_tos_url') },
        { sheet: S1, cell: 'M71', composeFields: ['paypay_is_overseas', 'paypay_tos_refund_clause'], compose: dom('paypay_tos_refund_clause') },
        { sheet: S1, cell: 'M72', composeFields: ['paypay_is_overseas', 'paypay_legal_notice_url'], compose: dom('paypay_legal_notice_url') },
        { sheet: S1, cell: 'M73', composeFields: ['paypay_is_overseas', 'paypay_privacy_url'], compose: dom('paypay_privacy_url') },
        { sheet: S1, cell: 'M75', composeFields: ['paypay_is_overseas', 'paypay_prepaid_instrument'], compose: dom('paypay_prepaid_instrument') },
        { sheet: S1, cell: 'M76', composeFields: ['paypay_is_overseas', 'paypay_fsa_registration_required'], compose: dom('paypay_fsa_registration_required') },
        { sheet: S1, cell: 'M78', composeFields: ['paypay_is_overseas', 'paypay_fsa_notified'], compose: dom('paypay_fsa_notified') },
        { sheet: S1, cell: 'M80', composeFields: ['paypay_is_overseas', 'paypay_fsa_url'], compose: dom('paypay_fsa_url') },
        { sheet: S1, cell: 'M83', composeFields: ['paypay_is_overseas', 'paypay_connection_type'], compose: dom('paypay_connection_type') },
        { sheet: S1, cell: 'M93', composeFields: ['paypay_is_overseas', 'paypay_data_server_in_jp'], compose: dom('paypay_data_server_in_jp') },
        { sheet: S1, cell: 'M94', composeFields: ['paypay_is_overseas', 'paypay_data_server_location'], compose: dom('paypay_data_server_location') },
        { sheet: S1, cell: 'M95', composeFields: ['paypay_is_overseas', 'paypay_data_access_from_abroad'], compose: dom('paypay_data_access_from_abroad') },
        { sheet: S1, cell: 'M96', composeFields: ['paypay_is_overseas', 'paypay_data_access_countries'], compose: dom('paypay_data_access_countries') },

        // ===== Sheet 3 海外段（is_overseas='Yes' 时写入）=====
        { sheet: S3, cell: 'M5', composeFields: ['paypay_is_overseas', 'paypay_jp_legal_rep'], compose: ovs('paypay_jp_legal_rep') },
        { sheet: S3, cell: 'M6', composeFields: ['paypay_is_overseas', 'paypay_jp_support'], compose: ovs('paypay_jp_support') },
        { sheet: S3, cell: 'M7', composeFields: ['paypay_is_overseas', 'paypay_support_channels'], compose: ovs('paypay_support_channels') },
        { sheet: S3, cell: 'M10', composeFields: ['paypay_is_overseas', 'paypay_psp_name'], compose: ovs('paypay_psp_name') },
        { sheet: S3, cell: 'M15', composeFields: ['paypay_is_overseas', 'paypay_is_platform'],
          compose: v => !isOverseas(v) ? '' : (v.paypay_is_platform === 'Yes' ? 'Yes/はい' : 'No/いいえ') },
        { sheet: S3, cell: 'M19', composeFields: ['paypay_is_overseas', 'company_dba_en'], compose: ovs('company_dba_en') },
        { sheet: S3, cell: 'M20', composeFields: ['paypay_is_overseas', 'annual_processing_volume_usd'], compose: ovs('annual_processing_volume_usd', 'jpy') },
        { sheet: S3, cell: 'M21', composeFields: ['paypay_is_overseas', 'annual_processing_volume_usd'],
          compose: v => !isOverseas(v) ? '' : monthlyJpy(v) },
        { sheet: S3, cell: 'M22', composeFields: ['paypay_is_overseas', 'product_description'], compose: ovs('product_description') },
        { sheet: S3, cell: 'M26', composeFields: ['paypay_is_overseas', 'paypay_payment_method_type'], compose: ovs('paypay_payment_method_type') },
        { sheet: S3, cell: 'M30', composeFields: ['paypay_is_overseas', 'paypay_use_case'], compose: ovs('paypay_use_case') },
        { sheet: S3, cell: 'M33', composeFields: ['paypay_is_overseas', 'business_url'], compose: ovs('business_url') },
        { sheet: S3, cell: 'M34', composeFields: ['paypay_is_overseas', 'paypay_site_in_japanese'], compose: ovs('paypay_site_in_japanese') },
        { sheet: S3, cell: 'M36', composeFields: ['paypay_is_overseas', 'paypay_prices_in_jpy'], compose: ovs('paypay_prices_in_jpy') },
        { sheet: S3, cell: 'M39', composeFields: ['paypay_is_overseas', 'paypay_tos_url'], compose: ovs('paypay_tos_url') },
        { sheet: S3, cell: 'M40', composeFields: ['paypay_is_overseas', 'paypay_tos_refund_clause'], compose: ovs('paypay_tos_refund_clause') },
        { sheet: S3, cell: 'M41', composeFields: ['paypay_is_overseas', 'paypay_legal_notice_url'], compose: ovs('paypay_legal_notice_url') },
        { sheet: S3, cell: 'M42', composeFields: ['paypay_is_overseas', 'paypay_privacy_url'], compose: ovs('paypay_privacy_url') },
        { sheet: S3, cell: 'M44', composeFields: ['paypay_is_overseas', 'paypay_prepaid_instrument'], compose: ovs('paypay_prepaid_instrument') },
        { sheet: S3, cell: 'M45', composeFields: ['paypay_is_overseas', 'paypay_fsa_registration_required'], compose: ovs('paypay_fsa_registration_required') },
        { sheet: S3, cell: 'M47', composeFields: ['paypay_is_overseas', 'paypay_fsa_notified'], compose: ovs('paypay_fsa_notified') },
        { sheet: S3, cell: 'M49', composeFields: ['paypay_is_overseas', 'paypay_fsa_url'], compose: ovs('paypay_fsa_url') },
        { sheet: S3, cell: 'M52', composeFields: ['paypay_is_overseas', 'paypay_connection_type'], compose: ovs('paypay_connection_type') },
        // Web Payment 分支：55/56/58 默认 Yes/はい（57/59 为 If-No 跟进，留空）
        { sheet: S3, cell: 'M55', composeFields: ['paypay_is_overseas', 'paypay_connection_type'], compose: webLit('Yes/はい') },
        { sheet: S3, cell: 'M56', composeFields: ['paypay_is_overseas', 'paypay_connection_type'], compose: webLit('Yes/はい') },
        { sheet: S3, cell: 'M58', composeFields: ['paypay_is_overseas', 'paypay_connection_type'], compose: webLit('Yes/はい') },
        // 非 Web Payment 分支：数据服务器相关
        { sheet: S3, cell: 'M62', composeFields: ['paypay_is_overseas', 'paypay_connection_type', 'paypay_data_server_in_jp'],       compose: other('paypay_data_server_in_jp') },
        { sheet: S3, cell: 'M63', composeFields: ['paypay_is_overseas', 'paypay_connection_type', 'paypay_data_server_location'],    compose: other('paypay_data_server_location') },
        { sheet: S3, cell: 'M64', composeFields: ['paypay_is_overseas', 'paypay_connection_type', 'paypay_data_access_from_abroad'], compose: other('paypay_data_access_from_abroad') },
        { sheet: S3, cell: 'M65', composeFields: ['paypay_is_overseas', 'paypay_connection_type', 'paypay_data_access_countries'],   compose: other('paypay_data_access_countries') }
      ];
    })(),
    required: ['paypay_is_overseas', 'company_name_legal', 'company_dba_en', 'operation_address',
               'business_url', 'paypay_capital', 'paypay_rep_name_native', 'paypay_rep_name_roman',
               'director_address', 'director_dob', 'paypay_psp_name',
               'annual_processing_volume_usd', 'product_description', 'paypay_use_case',
               'paypay_tos_url', 'paypay_legal_notice_url',
               'paypay_privacy_url', 'paypay_connection_type']
  },

  // --- 香港 八达通 ---
  {
    id: 'hk_octopus',
    channel: 'hk',
    displayName: '香港八达通',
    filename: '香港八达通.xlsx',
    path: 'templates/香港八达通.xlsx',
    mappings: [
      { fieldId: 'company_name_legal',  sheet: 'Sheet1', cell: 'C2' },
      { fieldId: 'company_name_legal',  sheet: 'Sheet1', cell: 'C3' },
      { fieldId: 'company_dba_en',      sheet: 'Sheet1', cell: 'C4' },
      { fieldId: 'company_dba_en',      sheet: 'Sheet1', cell: 'C5' },
      { fieldId: 'operation_address',   sheet: 'Sheet1', cell: 'C6' },
      { fieldId: 'business_url',        sheet: 'Sheet1', cell: 'C7' },
      { fieldId: 'expected_launch_date',sheet: 'Sheet1', cell: 'C8', transform: 'date_slash' },
      { fieldId: 'mcc',                 sheet: 'Sheet1', cell: 'C9' },
      { fieldId: 'hk_entity_location',  sheet: 'Sheet1', cell: 'C10' }
    ],
    required: ['company_name_legal', 'company_dba_en', 'business_url', 'operation_address', 'mcc']
  },

  // --- 土耳其 Iyzico ---
  {
    id: 'turkey_iyzico',
    channel: 'turkey',
    displayName: '土耳其卡 Iyzico',
    filename: '土耳其卡Turkish Card-Iyzico.xlsx',
    path: 'templates/土耳其卡Turkish Card-Iyzico.xlsx',
    mappings: [
      // B2/B3/B5/B6 为文件附件，由用户手动提交；仅 B4 可自动填写
      { sheet: 'Sheet1', cell: 'B4',
        composeFields: ['signer_first_name', 'signer_last_name'],
        compose: v => [v.signer_first_name, v.signer_last_name].filter(Boolean).join(' ') }
    ],
    required: ['signer_first_name']
  },

  // --- 中东 Tamara ---
  {
    id: 'me_tamara',
    channel: 'middle_east',
    displayName: '中东 Tamara',
    filename: '中东Tamara.xlsx',
    path: 'templates/中东Tamara.xlsx',
    mappings: [
      { sheet: 'Sheet1', cell: 'B2', compose: () => 'antom_merchant_onboarding@service.alipay.com' },
      { fieldId: 'director_email',      sheet: 'Sheet1', cell: 'B3' },
      { fieldId: 'company_dba_en',      sheet: 'Sheet1', cell: 'B4' },
      { fieldId: 'tamara_annual_sales', sheet: 'Sheet1', cell: 'B5' },
      { fieldId: 'business_url',        sheet: 'Sheet1', cell: 'B6' },
      { fieldId: 'mcc',                 sheet: 'Sheet1', cell: 'B7' },
      { fieldId: 'tamara_country_reg',  sheet: 'Sheet1', cell: 'B8' },
      { fieldId: 'tamara_country_ops',  sheet: 'Sheet1', cell: 'B9' },
      { fieldId: 'company_name_legal',  sheet: 'Sheet1', cell: 'B10' },
      { fieldId: 'business_reg_number', sheet: 'Sheet1', cell: 'B11' },
      // B12 Commercial Registration / B13 MOA / B15 Legal ID / B16 KYB = 附件，手动提交
      { sheet: 'Sheet1', cell: 'B14',
        composeFields: ['signer_first_name', 'signer_last_name'],
        compose: v => [v.signer_first_name, v.signer_last_name].filter(Boolean).join(' ') },
      { fieldId: 'tamara_product',      sheet: 'Sheet1', cell: 'B17' }
    ],
    required: ['company_dba_en', 'company_name_legal', 'director_email', 'business_url',
               'business_reg_number', 'tamara_annual_sales', 'tamara_country_reg',
               'tamara_country_ops', 'tamara_product']
  },

  // --- 南美 Dlocal ---
  {
    id: 'brazil_dlocal',
    channel: 'south_america',
    displayName: '巴西卡 Dlocal',
    filename: '南美报备材料/Brazilian Card-Dlocal.xlsx',
    path: 'templates/南美报备材料/Brazilian Card-Dlocal.xlsx',
    mappings: [
      { fieldId: 'brazil_country_incorp',  sheet: 'Dlocal', cell: 'B2' },
      { fieldId: 'brazil_cnpj',            sheet: 'Dlocal', cell: 'B3' },
      { fieldId: 'brazil_subsellers',      sheet: 'Dlocal', cell: 'B4' },
      // B5 Director's ID / B6 UBO's ID = 附件，手动提交
      { fieldId: 'brazil_settlement_time', sheet: 'Dlocal', cell: 'B7' }
    ],
    required: ['brazil_country_incorp', 'brazil_cnpj', 'brazil_settlement_time']
  },

  // --- 南美 STONE ---
  {
    id: 'brazil_stone',
    channel: 'south_america',
    displayName: '巴西卡 STONE',
    filename: '南美报备材料/Brazilian cards-STONE.xlsx',
    path: 'templates/南美报备材料/Brazilian cards-STONE.xlsx',
    mappings: [
      { fieldId: 'brazil_cnpj',              sheet: 'Brazilian cards-STONE', cell: 'B2' },
      // B3 = "Responsible Contact" 标题行，跳过
      { sheet: 'Brazilian cards-STONE', cell: 'B4',
        composeFields: ['signer_first_name', 'signer_last_name'],
        compose: v => [v.signer_first_name, v.signer_last_name].filter(Boolean).join(' ') },
      { fieldId: 'brazil_contact_email',     sheet: 'Brazilian cards-STONE', cell: 'B5' },
      { fieldId: 'brazil_cpf',               sheet: 'Brazilian cards-STONE', cell: 'B6' },
      { fieldId: 'brazil_mother_name',       sheet: 'Brazilian cards-STONE', cell: 'B7' },
      { fieldId: 'brazil_dob',               sheet: 'Brazilian cards-STONE', cell: 'B8' },
      { fieldId: 'brazil_position',          sheet: 'Brazilian cards-STONE', cell: 'B9' },
      { fieldId: 'brazil_monthly_income',    sheet: 'Brazilian cards-STONE', cell: 'B10' },
      // B11 = "Transactional Data" 标题行，跳过
      { fieldId: 'brazil_expected_tpv',      sheet: 'Brazilian cards-STONE', cell: 'B12' },
      { fieldId: 'brazil_installment_share', sheet: 'Brazilian cards-STONE', cell: 'B13' },
      { fieldId: 'brazil_card_network_share',sheet: 'Brazilian cards-STONE', cell: 'B14' },
      { fieldId: 'brazil_platinization',     sheet: 'Brazilian cards-STONE', cell: 'B15' },
      { fieldId: 'brazil_settlement_time',   sheet: 'Brazilian cards-STONE', cell: 'B16' }
    ],
    required: ['brazil_cnpj', 'signer_first_name', 'brazil_contact_email', 'brazil_expected_tpv', 'brazil_settlement_time']
  },

  // --- 南美 Mercado Pago ---
  {
    id: 'brazil_mercadopago',
    channel: 'south_america',
    displayName: 'Mercado Pago',
    filename: '南美报备材料/Mercado Pago.xlsx',
    path: 'templates/南美报备材料/Mercado Pago.xlsx',
    mappings: [
      { fieldId: 'company_name_legal',    sheet: 'Sheet1', cell: 'B2' },
      { fieldId: 'brazil_country_incorp', sheet: 'Sheet1', cell: 'B3' },
      { fieldId: 'business_url',          sheet: 'Sheet1', cell: 'B4' },
      { fieldId: 'mcc',                   sheet: 'Sheet1', cell: 'B5' },
      { fieldId: 'expected_launch_date',  sheet: 'Sheet1', cell: 'B6', transform: 'date_slash' },
      { fieldId: 'brazil_expected_tpv',   sheet: 'Sheet1', cell: 'B7' },
      { fieldId: 'mp_product',            sheet: 'Sheet1', cell: 'B8' }
      // B9 Credit Risk DDQ = 附件，手动提交
    ],
    required: ['company_name_legal', 'brazil_country_incorp', 'business_url', 'mcc', 'brazil_expected_tpv', 'mp_product']
  },

  // --- 南美 PicPay ---
  {
    id: 'brazil_picpay',
    channel: 'south_america',
    displayName: 'PicPay',
    filename: '南美报备材料/PicPay.xlsx',
    path: 'templates/南美报备材料/PicPay.xlsx',
    mappings: [
      { fieldId: 'picpay_dedicated_mid', sheet: 'Brazilian cards-STONE', cell: 'B2' },
      // B3 = 说明行，跳过
      { fieldId: 'brazil_expected_tpv',  sheet: 'Brazilian cards-STONE', cell: 'B4' },
      { fieldId: 'brazil_aov',           sheet: 'Brazilian cards-STONE', cell: 'B5' },
      { fieldId: 'picpay_products',      sheet: 'Brazilian cards-STONE', cell: 'B6' },
      { fieldId: 'expected_launch_date', sheet: 'Brazilian cards-STONE', cell: 'B7', transform: 'date_slash' }
    ],
    required: ['picpay_dedicated_mid', 'brazil_expected_tpv', 'expected_launch_date']
  },

  // --- 欧洲 PPRO ---
  {
    id: 'eu_ppro',
    channel: 'europe',
    displayName: 'PPRO',
    filename: '欧洲/PPRO .xlsx',
    path: 'templates/欧洲/PPRO .xlsx',
    mappings: [
      // UBO 段（Owner information）
      { fieldId: 'signer_first_name', sheet: 'Sheet1', cell: 'B4' },
      { fieldId: 'signer_last_name',  sheet: 'Sheet1', cell: 'B6' },
      { fieldId: 'ppro_native_name',  sheet: 'Sheet1', cell: 'B7' },
      { fieldId: 'director_dob',      sheet: 'Sheet1', cell: 'B8', transform: 'date_slash' },
      { fieldId: 'ppro_country',      sheet: 'Sheet1', cell: 'B9' },
      { fieldId: 'ppro_province',     sheet: 'Sheet1', cell: 'B10' },
      { fieldId: 'ppro_city',         sheet: 'Sheet1', cell: 'B11' },
      { fieldId: 'ppro_postal',       sheet: 'Sheet1', cell: 'B12' },
      { fieldId: 'ppro_street',       sheet: 'Sheet1', cell: 'B13' },
      // Director 段（默认与 UBO 同一人，镜像写入）
      { fieldId: 'signer_first_name', sheet: 'Sheet1', cell: 'B17' },
      { fieldId: 'signer_last_name',  sheet: 'Sheet1', cell: 'B19' },
      { fieldId: 'ppro_native_name',  sheet: 'Sheet1', cell: 'B20' },
      { fieldId: 'director_dob',      sheet: 'Sheet1', cell: 'B21', transform: 'date_slash' },
      { fieldId: 'ppro_country',      sheet: 'Sheet1', cell: 'B22' },
      { fieldId: 'ppro_province',     sheet: 'Sheet1', cell: 'B23' },
      { fieldId: 'ppro_city',         sheet: 'Sheet1', cell: 'B24' },
      { fieldId: 'ppro_postal',       sheet: 'Sheet1', cell: 'B25' },
      { fieldId: 'ppro_street',       sheet: 'Sheet1', cell: 'B26' }
    ],
    required: ['signer_first_name', 'signer_last_name', 'director_dob', 'ppro_country', 'ppro_city', 'ppro_street']
  },

  // --- 欧洲 Pay by Bank (Token) ---
  {
    id: 'eu_paybybank',
    channel: 'europe',
    displayName: 'Pay by Bank (Token)',
    filename: '欧洲/pay by bank-Token.xlsx',
    path: 'templates/欧洲/pay by bank-Token.xlsx',
    mappings: [
      { fieldId: 'eu_sole_trader',     sheet: 'Sheet1', cell: 'B2' },
      { fieldId: 'eu_publicly_listed', sheet: 'Sheet1', cell: 'B3' },
      { fieldId: 'eu_uk_only',         sheet: 'Sheet1', cell: 'B4' },
      { fieldId: 'company_dba_en',     sheet: 'Sheet1', cell: 'B5' },
      { fieldId: 'company_name_legal', sheet: 'Sheet1', cell: 'B6' },
      { fieldId: 'business_url',       sheet: 'Sheet1', cell: 'B7' },
      { fieldId: 'business_reg_number',sheet: 'Sheet1', cell: 'B8' },
      { sheet: 'Sheet1', cell: 'B9', compose: () => 'PIS: eCommerce merchant payment' },
      { fieldId: 'eu_jurisdiction',    sheet: 'Sheet1', cell: 'B10' },
      { fieldId: 'mcc',                sheet: 'Sheet1', cell: 'B11' },
      { fieldId: 'eu_ubo_count',       sheet: 'Sheet1', cell: 'B12' },
      // UBO1（默认与 Director / Signatory 同一人）
      { sheet: 'Sheet1', cell: 'B13',
        composeFields: ['signer_first_name', 'signer_last_name'],
        compose: v => [v.signer_first_name, v.signer_last_name].filter(Boolean).join(' ') },
      { fieldId: 'director_address',   sheet: 'Sheet1', cell: 'B14' },
      { fieldId: 'director_dob',       sheet: 'Sheet1', cell: 'B15', transform: 'date_slash' },
      { fieldId: 'eu_director_count',  sheet: 'Sheet1', cell: 'B16' },
      // Director1
      { sheet: 'Sheet1', cell: 'B17',
        composeFields: ['signer_first_name', 'signer_last_name'],
        compose: v => [v.signer_first_name, v.signer_last_name].filter(Boolean).join(' ') },
      { fieldId: 'director_address',   sheet: 'Sheet1', cell: 'B18' },
      { fieldId: 'director_dob',       sheet: 'Sheet1', cell: 'B19', transform: 'date_slash' },
      // Signatory
      { sheet: 'Sheet1', cell: 'B20',
        composeFields: ['signer_first_name', 'signer_last_name'],
        compose: v => [v.signer_first_name, v.signer_last_name].filter(Boolean).join(' ') },
      { fieldId: 'director_address',   sheet: 'Sheet1', cell: 'B21' },
      { fieldId: 'director_dob',       sheet: 'Sheet1', cell: 'B22', transform: 'date_slash' }
    ],
    required: ['company_dba_en', 'company_name_legal', 'business_url', 'business_reg_number',
               'eu_jurisdiction', 'mcc', 'signer_first_name', 'signer_last_name',
               'director_address', 'director_dob']
  }
];

const TEMPLATE_BY_ID = Object.fromEntries(TEMPLATES.map(t => [t.id, t]));
