import{_ as n,c as s,o as t,a1 as p}from"./chunks/framework.CPsxJxQM.js";const u=JSON.parse('{"title":"Mapstruct介绍","description":"Mapstruct介绍","frontmatter":{"title":"Mapstruct介绍","author":"黄瑞瀛","date":"2023-07-10T09:46:40.000Z","description":"Mapstruct介绍","categories":["框架学习"],"tags":["Mapstruct","Java生态圈","Java三方框架介绍"],"draft":true},"headers":[],"relativePath":"研发基础/Mapstruct/index.md","filePath":"研发基础/Mapstruct/index.md"}'),l={name:"研发基础/Mapstruct/index.md"};function e(r,a,c,i,o,g){return t(),s("div",null,a[0]||(a[0]=[p(`<h1 id="mapstruct-定义不同实体的字段映射关系" tabindex="-1">Mapstruct: 定义不同实体的字段映射关系 <a class="header-anchor" href="#mapstruct-定义不同实体的字段映射关系" aria-label="Permalink to &quot;Mapstruct: 定义不同实体的字段映射关系&quot;">​</a></h1><h2 id="官网解释" tabindex="-1">官网解释 <a class="header-anchor" href="#官网解释" aria-label="Permalink to &quot;官网解释&quot;">​</a></h2><p>what? 这是什么</p><pre><code>代码生成器，基于配置方法的约定，简化不同 Java Bean 间映射与转换。
映射关系以普通代码维护，因此快速、类型安全且易于理解。
</code></pre><p>why? 出现的原因</p><pre><code>多层应用程序通常需要在不同的对象模型（例如实体和 DTO）之间进行映射。编写这样的映射代码是一项繁琐且容易出错的任务。MapStruct旨在通过尽可能自动化来简化这项工作。
与其他映射框架相比，MapStruct在编译时生成bean映射，这确保了高性能，允许快速的开发人员反馈和彻底的错误检查。
</code></pre><p>How?</p><pre><code>MapStruct是一个注释处理器，它插入Java编译器，可以在命令行构建（Maven，Gradle等）以及您首选的IDE中使用。
MapStruct使用合理的默认值，但在配置或实现特殊行为时会让你不碍事。
</code></pre><h2 id="maven引入" tabindex="-1">Maven引入 <a class="header-anchor" href="#maven引入" aria-label="Permalink to &quot;Maven引入&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;lombok.version&gt;1.18.30&lt;/lombok.version&gt;</span></span>
<span class="line"><span>&lt;mapstruct.version&gt;1.5.5.Final&lt;/mapstruct.version&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.mapstruct&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;mapstruct&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;\${mapstruct.version}&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.projectlombok&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;lombok&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;\${lombok.version}&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;plugin&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;maven-compiler-plugin&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;3.8.1&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;configuration&gt;</span></span>
<span class="line"><span>        &lt;source&gt;1.8&lt;/source&gt;</span></span>
<span class="line"><span>        &lt;target&gt;1.8&lt;/target&gt;</span></span>
<span class="line"><span>        &lt;annotationProcessorPaths&gt;</span></span>
<span class="line"><span>            &lt;!-- lombok 顺序要在 mapstruct 前面--&gt;</span></span>
<span class="line"><span>            &lt;path&gt;</span></span>
<span class="line"><span>                &lt;groupId&gt;org.projectlombok&lt;/groupId&gt;</span></span>
<span class="line"><span>                &lt;artifactId&gt;lombok&lt;/artifactId&gt;</span></span>
<span class="line"><span>                &lt;version&gt;\${lombok.version}&lt;/version&gt;</span></span>
<span class="line"><span>            &lt;/path&gt;</span></span>
<span class="line"><span>            &lt;path&gt;</span></span>
<span class="line"><span>                &lt;groupId&gt;org.mapstruct&lt;/groupId&gt;</span></span>
<span class="line"><span>                &lt;artifactId&gt;mapstruct-processor&lt;/artifactId&gt;</span></span>
<span class="line"><span>                &lt;version&gt;\${mapstruct.version}&lt;/version&gt;</span></span>
<span class="line"><span>            &lt;/path&gt;</span></span>
<span class="line"><span>        &lt;/annotationProcessorPaths&gt;</span></span>
<span class="line"><span>    &lt;/configuration&gt;</span></span>
<span class="line"><span>&lt;/plugin&gt;</span></span></code></pre></div>`,10)]))}const m=n(l,[["render",e]]);export{u as __pageData,m as default};
