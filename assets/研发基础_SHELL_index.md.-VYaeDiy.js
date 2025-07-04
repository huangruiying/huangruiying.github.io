import{_ as e,c as a,o,a1 as r}from"./chunks/framework.CPsxJxQM.js";const h=JSON.parse('{"title":"SHELL日常使用 100 式","description":"","frontmatter":{},"headers":[],"relativePath":"研发基础/SHELL/index.md","filePath":"研发基础/SHELL/index.md"}'),n={name:"研发基础/SHELL/index.md"};function s(c,t,i,l,d,u){return o(),a("div",null,t[0]||(t[0]=[r(`<h1 id="shell日常使用-100-式" tabindex="-1">SHELL日常使用 100 式 <a class="header-anchor" href="#shell日常使用-100-式" aria-label="Permalink to &quot;SHELL日常使用 100 式&quot;">​</a></h1><h2 id="找出耗时大于100的数据" tabindex="-1">找出耗时大于100的数据 <a class="header-anchor" href="#找出耗时大于100的数据" aria-label="Permalink to &quot;找出耗时大于100的数据&quot;">​</a></h2><pre>原文本
text: &quot;trace_id&quot;:&quot;f69fc6e74e554dc997ba622fc9af0202.99868.17501400057311893&quot;,&quot;waste&quot;:27,&quot;localIp&quot;:&quot;10.10.116.73&quot;

第一步，使用正则表达式，匹配出waste部分
cat text | grep -o &#39;&quot;waste&quot;:[0-9]\\+&#39;
第二步，基于匹配到的waste，进行awk分割与判断
cat text | grep -o &#39;&quot;waste&quot;:[0-9]\\+&#39; | awk -F: &#39;$2 &gt; 100&#39;
第三步，通过第二部拿到的耗时进行定位具体数据
cat text | grep &#39;&quot;waste&quot;:835&#39; 
</pre><h2 id="找出json中-waste字段大于100的值" tabindex="-1">找出JSON中，waste字段大于100的值 <a class="header-anchor" href="#找出json中-waste字段大于100的值" aria-label="Permalink to &quot;找出JSON中，waste字段大于100的值&quot;">​</a></h2><p><code>cat text | jq &#39;select(.waste &gt; 100)&#39;</code></p><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h2>`,6)]))}const _=e(n,[["render",s]]);export{h as __pageData,_ as default};
