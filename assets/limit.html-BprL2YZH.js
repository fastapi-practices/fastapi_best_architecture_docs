import{_ as s,c as a,h as t,o as n}from"./app-DEy0w3Dn.js";const h={};function l(e,i){return n(),a("div",null,i[0]||(i[0]=[t(`<p>fba 内部使用 <a href="https://github.com/fastapi-practices/fastapi_best_architecture/discussions/70" target="_blank" rel="noopener noreferrer">fastapi-limit</a> 实现后端接口节流</p><p>使用方法如下：</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-dark:#abb2bf;--shiki-light:#383A42;--shiki-dark-bg:#282c34;--shiki-light-bg:#FAFAFA;"><pre class="shiki shiki-themes one-dark-pro one-light vp-code"><code><span class="line highlighted"><span style="--shiki-dark:#61AFEF;--shiki-light:#4078F2;">@app</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4078F2;">.</span><span style="--shiki-dark:#61AFEF;--shiki-light:#4078F2;">get</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span><span style="--shiki-dark:#98C379;--shiki-light:#50A14F;">&quot;/&quot;</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">,</span><span style="--shiki-dark:#E06C75;--shiki-dark-font-style:italic;--shiki-light:#986801;--shiki-light-font-style:inherit;"> dependencies</span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">[</span><span style="--shiki-dark:#61AFEF;--shiki-light:#383A42;">Depends</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span><span style="--shiki-dark:#61AFEF;--shiki-light:#383A42;">RateLimiter</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span><span style="--shiki-dark:#E06C75;--shiki-dark-font-style:italic;--shiki-light:#986801;--shiki-light-font-style:inherit;">times</span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#D19A66;--shiki-light:#986801;">2</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">,</span><span style="--shiki-dark:#E06C75;--shiki-dark-font-style:italic;--shiki-light:#986801;--shiki-light-font-style:inherit;"> seconds</span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#D19A66;--shiki-light:#986801;">5</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">))])</span></span>
<span class="line"><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;">async</span><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;"> def</span><span style="--shiki-dark:#61AFEF;--shiki-light:#4078F2;"> index_get</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">():</span></span>
<span class="line"><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;">    return</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;"> {</span><span style="--shiki-dark:#98C379;--shiki-light:#50A14F;">&quot;msg&quot;</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">: </span><span style="--shiki-dark:#98C379;--shiki-light:#50A14F;">&quot;Hello World&quot;</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line highlighted"><span style="--shiki-dark:#61AFEF;--shiki-light:#4078F2;">@app</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4078F2;">.</span><span style="--shiki-dark:#61AFEF;--shiki-light:#4078F2;">post</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span><span style="--shiki-dark:#98C379;--shiki-light:#50A14F;">&quot;/&quot;</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">,</span><span style="--shiki-dark:#E06C75;--shiki-dark-font-style:italic;--shiki-light:#986801;--shiki-light-font-style:inherit;"> dependencies</span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">[</span><span style="--shiki-dark:#61AFEF;--shiki-light:#383A42;">Depends</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span><span style="--shiki-dark:#61AFEF;--shiki-light:#383A42;">RateLimiter</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span><span style="--shiki-dark:#E06C75;--shiki-dark-font-style:italic;--shiki-light:#986801;--shiki-light-font-style:inherit;">times</span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#D19A66;--shiki-light:#986801;">1</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">,</span><span style="--shiki-dark:#E06C75;--shiki-dark-font-style:italic;--shiki-light:#986801;--shiki-light-font-style:inherit;"> seconds</span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#D19A66;--shiki-light:#986801;">5</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">))])</span></span>
<span class="line"><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;">async</span><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;"> def</span><span style="--shiki-dark:#61AFEF;--shiki-light:#4078F2;"> index_post</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">():</span></span>
<span class="line"><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;">    return</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;"> {</span><span style="--shiki-dark:#98C379;--shiki-light:#50A14F;">&quot;msg&quot;</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">: </span><span style="--shiki-dark:#98C379;--shiki-light:#50A14F;">&quot;Hello World&quot;</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line highlighted"><span style="--shiki-dark:#61AFEF;--shiki-light:#4078F2;">@app</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4078F2;">.</span><span style="--shiki-dark:#61AFEF;--shiki-light:#4078F2;">get</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span></span>
<span class="line highlighted"><span style="--shiki-dark:#98C379;--shiki-light:#50A14F;">    &quot;/multiple&quot;</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">,</span></span>
<span class="line highlighted"><span style="--shiki-dark:#E06C75;--shiki-dark-font-style:italic;--shiki-light:#986801;--shiki-light-font-style:inherit;">    dependencies</span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">[</span></span>
<span class="line highlighted"><span style="--shiki-dark:#61AFEF;--shiki-light:#383A42;">        Depends</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span><span style="--shiki-dark:#61AFEF;--shiki-light:#383A42;">RateLimiter</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span><span style="--shiki-dark:#E06C75;--shiki-dark-font-style:italic;--shiki-light:#986801;--shiki-light-font-style:inherit;">times</span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#D19A66;--shiki-light:#986801;">1</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">,</span><span style="--shiki-dark:#E06C75;--shiki-dark-font-style:italic;--shiki-light:#986801;--shiki-light-font-style:inherit;"> seconds</span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#D19A66;--shiki-light:#986801;">5</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">)),</span></span>
<span class="line highlighted"><span style="--shiki-dark:#61AFEF;--shiki-light:#383A42;">        Depends</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span><span style="--shiki-dark:#61AFEF;--shiki-light:#383A42;">RateLimiter</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span><span style="--shiki-dark:#E06C75;--shiki-dark-font-style:italic;--shiki-light:#986801;--shiki-light-font-style:inherit;">times</span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#D19A66;--shiki-light:#986801;">2</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">,</span><span style="--shiki-dark:#E06C75;--shiki-dark-font-style:italic;--shiki-light:#986801;--shiki-light-font-style:inherit;"> seconds</span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#D19A66;--shiki-light:#986801;">15</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">)),</span></span>
<span class="line highlighted"><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">    ],</span></span>
<span class="line highlighted"><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">)</span></span>
<span class="line"><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;">async</span><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;"> def</span><span style="--shiki-dark:#61AFEF;--shiki-light:#4078F2;"> multiple</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">():</span></span>
<span class="line"><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;">    return</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;"> {</span><span style="--shiki-dark:#98C379;--shiki-light:#50A14F;">&quot;msg&quot;</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">: </span><span style="--shiki-dark:#98C379;--shiki-light:#50A14F;">&quot;Hello World&quot;</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#61AFEF;--shiki-light:#4078F2;">@app</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#4078F2;">.</span><span style="--shiki-dark:#61AFEF;--shiki-light:#4078F2;">websocket</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span><span style="--shiki-dark:#98C379;--shiki-light:#50A14F;">&quot;/ws&quot;</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">)</span></span>
<span class="line"><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;">async</span><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;"> def</span><span style="--shiki-dark:#61AFEF;--shiki-light:#4078F2;"> websocket_endpoint</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span><span style="--shiki-dark:#D19A66;--shiki-dark-font-style:italic;--shiki-light:#986801;--shiki-light-font-style:inherit;">websocket</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">:</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#986801;"> WebSocket</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">):</span></span>
<span class="line"><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;">    await</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;"> websocket.</span><span style="--shiki-dark:#61AFEF;--shiki-light:#383A42;">accept</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">()</span></span>
<span class="line highlighted"><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">    ratelimit </span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#61AFEF;--shiki-light:#383A42;"> WebSocketRateLimiter</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span><span style="--shiki-dark:#E06C75;--shiki-dark-font-style:italic;--shiki-light:#986801;--shiki-light-font-style:inherit;">times</span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#D19A66;--shiki-light:#986801;">1</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">, </span><span style="--shiki-dark:#E06C75;--shiki-dark-font-style:italic;--shiki-light:#986801;--shiki-light-font-style:inherit;">seconds</span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#D19A66;--shiki-light:#986801;">5</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">)</span></span>
<span class="line"><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;">    while</span><span style="--shiki-dark:#D19A66;--shiki-light:#986801;"> True</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">:</span></span>
<span class="line"><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;">        try</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">:</span></span>
<span class="line"><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">            data </span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;"> await</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;"> websocket.</span><span style="--shiki-dark:#61AFEF;--shiki-light:#383A42;">receive_text</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">()</span></span>
<span class="line highlighted"><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;">            await</span><span style="--shiki-dark:#61AFEF;--shiki-light:#383A42;"> ratelimit</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(websocket, </span><span style="--shiki-dark:#E06C75;--shiki-dark-font-style:italic;--shiki-light:#986801;--shiki-light-font-style:inherit;">context_key</span><span style="--shiki-dark:#56B6C2;--shiki-light:#383A42;">=</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">data)</span></span>
<span class="line"><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;">            await</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;"> websocket.</span><span style="--shiki-dark:#61AFEF;--shiki-light:#383A42;">send_text</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span><span style="--shiki-dark:#98C379;--shiki-light:#50A14F;">&quot;Hello, world&quot;</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">)</span></span>
<span class="line"><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;">        except</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;"> HTTPException:</span></span>
<span class="line"><span style="--shiki-dark:#C678DD;--shiki-light:#A626A4;">            await</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;"> websocket.</span><span style="--shiki-dark:#61AFEF;--shiki-light:#383A42;">send_text</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">(</span><span style="--shiki-dark:#98C379;--shiki-light:#50A14F;">&quot;Hello again&quot;</span><span style="--shiki-dark:#ABB2BF;--shiki-light:#383A42;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更多使用方法请查看官方仓库 <a href="https://github.com/long2ice/fastapi-limiter/blob/master/examples/main.py" target="_blank" rel="noopener noreferrer">示例</a> 或 <a href="https://github.com/long2ice/fastapi-limiter/blob/master/fastapi_limiter/depends.py" target="_blank" rel="noopener noreferrer">源码</a></p>`,4)]))}const p=s(h,[["render",l]]),r=JSON.parse('{"path":"/backend/reference/limit.html","title":"节流","lang":"zh-CN","frontmatter":{"title":"节流","description":"fba 内部使用 fastapi-limit 实现后端接口节流 使用方法如下： 更多使用方法请查看官方仓库 示例 或 源码","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"节流\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://fastapi-practices.github.io/fastapi_best_architecture_docs/fastapi_best_architecture_docs/backend/reference/limit.html"}],["meta",{"property":"og:site_name","content":"FastAPI Best Architecture"}],["meta",{"property":"og:title","content":"节流"}],["meta",{"property":"og:description","content":"fba 内部使用 fastapi-limit 实现后端接口节流 使用方法如下： 更多使用方法请查看官方仓库 示例 或 源码"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}]]},"readingTime":{"minutes":0.49,"words":148},"git":{},"autoDesc":true,"filePathRelative":"backend/reference/limit.md","headers":[],"categoryList":[{"id":"b43fdd","sort":10002,"name":"backend"},{"id":"4b6340","sort":10004,"name":"reference"}],"bulletin":true}');export{p as comp,r as data};
