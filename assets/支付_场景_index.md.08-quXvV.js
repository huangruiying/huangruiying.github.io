import{_ as i,C as e,c as l,o as s,a1 as t,b as h,w as n,a as c,G as r,a2 as d}from"./chunks/framework.CPsxJxQM.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"支付/场景/index.md","filePath":"支付/场景/index.md"}'),o={name:"支付/场景/index.md"};function E(k,a,y,g,m,b){const p=e("Mermaid");return s(),l("div",null,[a[1]||(a[1]=t(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>会介绍直连间连区别，应用场景，使用方式及区别</span></span>
<span class="line"><span></span></span>
<span class="line"><span>会讲述对接不同的业务渠道支付玩法</span></span></code></pre></div><h2 id="支付表核心字段" tabindex="-1">支付表核心字段 <a class="header-anchor" href="#支付表核心字段" aria-label="Permalink to &quot;支付表核心字段&quot;">​</a></h2><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">支付核心单号：支付内部生成</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">业务方单号：接入我方支付能力的业务方的核心单号，与支付单1:n</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">支付通道单号：使用的支付通道的单号。</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">实付金额：用户应该在支付通道支付的实际金额。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">商户号：支付通道的商户号</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">支付状态：待支付、支付成功、超时关单、主动关单...</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请求参数：Request 请求支付服务下单时的参数</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">支付结果：Result 通道/渠道回告结果、超时主动查询结果等</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">支付产品(TradeType)：App支付、H5支付、小程序支付、扫码支付(主扫)、付款码支付(被扫)、信用付、商户代扣、周期支付、(详细对比见：各通道都有哪些支付产品?)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">收单通道(ReceiptChannel)：易宝、汇付、微信、支付宝。指的代码里请求的哪个支付公司。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    请求通道api下单时，维护到单据上；</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    回告时，根据此字段，路由处理回告请求的类；</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    \`\`\`用易宝间连微信，易宝为收单通道、微信为支付通道；直连微信，微信即是收单通道，又是支付通道。\`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">支付通道类型(PayType)：微信、支付宝。指的实际走的哪个支付网络。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    处理支付回告时维护到单据上；指与清算机构直接交互的通道。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">清算机构：网联。（进行最终的资金清算和结算）</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">业务线标识：区分不同请求方</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">业务标识：区分请求方的不同业务</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">业务结果通知：NotifyUrl http://xxxxxws</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">签约结果通知：SignNotifyUrl http://xxxxxws，一般用于支付即签约的场景。</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">内部用户ID：</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">支付通道用户身份：third_identity_id 标识支付通道的用户标识。</span></span></code></pre></div><h2 id="支付与业务方的对接模式有哪些" tabindex="-1">支付与业务方的对接模式有哪些 <a class="header-anchor" href="#支付与业务方的对接模式有哪些" aria-label="Permalink to &quot;支付与业务方的对接模式有哪些&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>对接渠道的模式</span></span>
<span class="line"><span>渠道收款 - 外借商户号/渠道预付费</span></span>
<span class="line"><span>    支付结果由渠道通知，也可主动查询</span></span>
<span class="line"><span>    退款由渠道/客服系统发起</span></span>
<span class="line"><span>    退款驳回</span></span>
<span class="line"><span></span></span>
<span class="line"><span>自收款，渠道微信小程序</span></span>
<span class="line"><span>    收单类 ChWechatMiniPayService，返回appid + mini跳转参数(path,callback=channelPayParam)，前端跳转微信小程序。 (pages/webview/thirdpay/index?paySn=支付单号&amp;path=payAggregation/channelPayParam&amp;pft=10066001&amp;orderNo=订单号)</span></span>
<span class="line"><span>    收银台 无，默认微信小程序</span></span>
<span class="line"><span>    通道下单 /channelPayParam，直连间连均返回TradeNo这种参数。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>自收款，渠道App+H5收银台(无登录状态) 骑士卡api、快电、中移上研流程</span></span>
<span class="line"><span>    收单类 QishikaApiPayService；返回跳转收银台的连接</span></span>
<span class="line"><span>    收银台 h5PayInfoForBizChannel；依赖渠道号，查开放平台支付方式，根据映射关系找到我方PayTypeInfoConfig实际支付方式</span></span>
<span class="line"><span>    通道下单 h5ObtainPayInfoForBizChannel；二代路由。</span></span>
<span class="line"><span>        直连：返回标准参数</span></span>
<span class="line"><span>        间连：</span></span>
<span class="line"><span>            App 微信返回跳转小程序参数(pages/webview/payapp/index?paySn=支付单号&amp;path=payAggregation/obtainWeChatMiniPayInfo&amp;pft=10066001&amp;orderNo=订单号) appWeChatMiniPaymentService</span></span>
<span class="line"><span>                支付宝返回scheme zfbIndirectPaymentService</span></span>
<span class="line"><span>            H5  微信返回scheme，包装obtainWeChatMiniPayInfo接口 h5WeChatMiniPaymentService </span></span>
<span class="line"><span>                支付宝返回scheme，包装obtainZfbMiniPayParams接口 zfbIndirectPaymentService</span></span>
<span class="line"><span>            Mini/MP</span></span>
<span class="line"><span>                支付宝/微信都返回appid、paySign，前端分别在微信/支付宝里打开对应的小程序。 AdaPaymentService YeePaymentService</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        返回scheme的还需再一次请求通道下单 obtainWeChatMiniPayInfo / obtainZfbMiniPayParams</span></span>
<span class="line"><span></span></span>
<span class="line"><span>渠道App+独立支付参数</span></span>
<span class="line"><span>    下空单 </span></span>
<span class="line"><span>    支付参数获取 PayParamApi</span></span></code></pre></div><h2 id="支付收单服务全流程" tabindex="-1">支付收单服务全流程 <a class="header-anchor" href="#支付收单服务全流程" aria-label="Permalink to &quot;支付收单服务全流程&quot;">​</a></h2><p><a href="./支付收单服务全流程.html">支付收单服务全流程</a></p><h2 id="各通道都有哪些支付产品" tabindex="-1">各通道都有哪些支付产品? <a class="header-anchor" href="#各通道都有哪些支付产品" aria-label="Permalink to &quot;各通道都有哪些支付产品?&quot;">​</a></h2><p><a href="./支付产品与各支付通道的类型映射.html">支付产品与各支付通道的类型映射</a></p>`,9)),(s(),h(d,null,{default:n(()=>[r(p,{id:"mermaid-21",class:"mermaid",graph:"graph%20TD%3B%0A%20%20A--%3EB%3B%0A%20%20A--%3EC%3B%0A%20%20B--%3ED%3B%0A%20%20C--%3ED%3B%0A"})]),fallback:n(()=>a[0]||(a[0]=[c(" Loading... ")])),_:1}))])}const f=i(o,[["render",E]]);export{u as __pageData,f as default};
