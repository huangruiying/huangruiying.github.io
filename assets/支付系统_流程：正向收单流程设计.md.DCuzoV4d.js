import{_ as a,c as n,o as p,a1 as e}from"./chunks/framework.CPsxJxQM.js";const h=JSON.parse('{"title":"流程：正向收单流程设计","description":"","frontmatter":{},"headers":[],"relativePath":"支付系统/流程：正向收单流程设计.md","filePath":"支付系统/流程：正向收单流程设计.md"}'),l={name:"支付系统/流程：正向收单流程设计.md"};function i(c,s,t,o,_,r){return p(),n("div",null,s[0]||(s[0]=[e(`<h1 id="流程-正向收单流程设计" tabindex="-1">流程：正向收单流程设计 <a class="header-anchor" href="#流程-正向收单流程设计" aria-label="Permalink to &quot;流程：正向收单流程设计&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>业务方请求支付下单，锁业务方唯一单号。</span></span>
<span class="line"><span>单据唯一校验，幂等</span></span>
<span class="line"><span></span></span>
<span class="line"><span>确认收单场景：交易路由</span></span>
<span class="line"><span>    收款省市、主体、合作银行、油站商户信息</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>确定收款通道：通道路由</span></span>
<span class="line"><span>    支付产品、支付方式、通道优先级</span></span>
<span class="line"><span>    此步骤返回：通道信息(商户号、实现类、可收款金额)</span></span>
<span class="line"><span>    注意，要是找不到合适的场景，走兜底场景保障收单</span></span>
<span class="line"><span></span></span>
<span class="line"><span>beforePay (支付核心单创建，主要落订单信息、金额、初始化状态、支付方式、支付产品)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>doPay：</span></span>
<span class="line"><span>请求通道获取支付参数/sdk获取h5/scheme组装</span></span>
<span class="line"><span>    此步骤返回：前端依赖的收单参数</span></span>
<span class="line"><span>    注意，要是请求通道失败会打点，目前是通道纬度</span></span>
<span class="line"><span>    优化：根据业务code纬度打点，针对商户号级别进行降级</span></span>
<span class="line"><span></span></span>
<span class="line"><span>afterPay (将请求通道的结果&amp;收款信息，落库更新)</span></span>
<span class="line"><span>    拿到请求通道的响应及通道信息，落库（商户号、通道单号、支付受理状态、扩展信息）</span></span></code></pre></div>`,2)]))}const m=a(l,[["render",i]]);export{h as __pageData,m as default};
