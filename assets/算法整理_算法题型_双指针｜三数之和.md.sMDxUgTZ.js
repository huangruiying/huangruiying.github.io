import{_ as s,c as n,o as p,a1 as e}from"./chunks/framework.BMsMDqYY.js";const f=JSON.parse('{"title":"问题","description":"","frontmatter":{},"headers":[],"relativePath":"算法整理/算法题型/双指针｜三数之和.md","filePath":"算法整理/算法题型/双指针｜三数之和.md"}'),l={name:"算法整理/算法题型/双指针｜三数之和.md"};function t(i,a,r,c,h,o){return p(),n("div",null,a[0]||(a[0]=[e(`<h1 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-label="Permalink to &quot;问题&quot;">​</a></h1><p>求数组内任意三个数之和为0的组合（子数组）有哪些，不能重复</p><h2 id="思路" tabindex="-1">思路 <a class="header-anchor" href="#思路" aria-label="Permalink to &quot;思路&quot;">​</a></h2><p>对数组排序，对三个数定义为 i left=i+1 right=len-1</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>其中i为数组遍历的下标，范围 [0, len-2)</span></span>
<span class="line"><span>left为左指针</span></span></code></pre></div><p>遍历出每一个i，并在i之后的下标范围内，进行左右指针取第二、三个数，直至 right &gt;= left</p><h2 id="实现" tabindex="-1">实现 <a class="header-anchor" href="#实现" aria-label="Permalink to &quot;实现&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for(i -&gt; len-2){</span></span>
<span class="line"><span>    init left right;</span></span>
<span class="line"><span>    while(left &lt; right){</span></span>
<span class="line"><span>        int sum = arr[i] + arr[left] + arr[right] // 三数之和</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        if(sum == 0){</span></span>
<span class="line"><span>            data.add(Arrays.asList(三个数)) // 记录符合条件的值</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            // 由于数组有序，所以left指针与后一个数一致时，直接右移（去重复）</span></span>
<span class="line"><span>            while(left &lt; right &amp;&amp; left == left +1 ) left ++; // 与后一个重复 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 由于数组有序，所以right指针与前一个数一致时，直接左移（去重复）</span></span>
<span class="line"><span>            while(left &lt; right &amp;&amp; right == right - 1) right --; // 与前一个重复</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            // 移动指针进行下一次处理</span></span>
<span class="line"><span>            left ++ ; right -- ;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        else if(sum &lt; 0) left ++; // 说明少了，让小值变大（left ++）    </span></span>
<span class="line"><span>        else if(sum &gt; 0) right -- ; // 说明多了，让大值变小（right --）</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,8)]))}const g=s(l,[["render",t]]);export{f as __pageData,g as default};
