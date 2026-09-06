import{$n as e,Bn as t,En as n,Pn as r,Sn as i,Tt as a,Un as o,ar as s,br as c,dr as l,gr as u,ii as d,li as f,nr as p,vr as m,yn as h,yr as g}from"./common-3PrtwWuN.js";var _={showLegend:!0,ticks:5,max:null,min:0,graticule:`circle`},v=32,y={axes:[],curves:[],options:_},b=structuredClone(y),x=o.radar,S=f(()=>a({...x,...r().radar}),`getConfig`),C=f(()=>b.axes,`getAxes`),w=f(()=>b.curves,`getCurves`),T=f(()=>b.options,`getOptions`),E=f(e=>{b.axes=e.map(e=>({name:e.name,label:e.label??e.name}))},`setAxes`),D=f(e=>{b.curves=e.map(e=>({name:e.name,label:e.label??e.name,entries:O(e.entries)}))},`setCurves`),O=f(e=>{if(e[0].axis==null)return e.map(e=>e.value);let t=C();if(t.length===0)throw Error(`Axes must be populated before curves for reference entries`);return t.map(t=>{let n=e.find(e=>e.axis?.$refText===t.name);if(n===void 0)throw Error(`Missing entry for axis `+t.label);return n.value})},`computeCurveEntries`),k={getAxes:C,getCurves:w,getOptions:T,setAxes:E,setCurves:D,setOptions:f(e=>{let t=e.reduce((e,t)=>(e[t.name]=t,e),{});b.options={showLegend:t.showLegend?.value??_.showLegend,ticks:t.ticks?.value??_.ticks,max:t.max?.value??_.max,min:t.min?.value??_.min,graticule:t.graticule?.value??_.graticule},b.options.ticks>v&&(d.warn(`Radar diagram ticks (${b.options.ticks}) exceeds maximum allowed (${v}). Using ${v} instead.`),b.options.ticks=v)},`setOptions`),getConfig:S,clear:f(()=>{t(),b=structuredClone(y)},`clear`),setAccTitle:c,getAccTitle:l,setDiagramTitle:s,getDiagramTitle:g,getAccDescription:u,setAccDescription:m},A=f(e=>{i(e,k);let{axes:t,curves:n,options:r}=e;k.setAxes(t),k.setCurves(n),k.setOptions(r)},`populate`),j={parse:f(async e=>{let t=await h(`radar`,e);d.debug(t),A(t)},`parse`)},M=f((e,t,r,i)=>{let a=i.db,o=a.getAxes(),s=a.getCurves(),c=a.getOptions(),l=a.getConfig(),u=a.getDiagramTitle(),d=N(n(t),l),f=c.max??Math.max(...s.map(e=>Math.max(...e.entries))),p=c.min,m=Math.min(l.width,l.height)/2;P(d,o,m,c.ticks,c.graticule),F(d,o,m,l),I(d,o,s,p,f,c.graticule,l),z(d,s,c.showLegend,l),d.append(`text`).attr(`class`,`radarTitle`).text(u).attr(`x`,0).attr(`y`,-l.height/2-l.marginTop)},`draw`),N=f((t,n)=>{let r=n.width+n.marginLeft+n.marginRight,i=n.height+n.marginTop+n.marginBottom,a={x:n.marginLeft+n.width/2,y:n.marginTop+n.height/2};return e(t,i,r,n.useMaxWidth??!0),t.attr(`viewBox`,`0 0 ${r} ${i}`).attr(`overflow`,`visible`),t.append(`g`).attr(`transform`,`translate(${a.x}, ${a.y})`)},`drawFrame`),P=f((e,t,n,r,i)=>{if(i===`circle`)for(let t=0;t<r;t++){let i=n*(t+1)/r;e.append(`circle`).attr(`r`,i).attr(`class`,`radarGraticule`)}else if(i===`polygon`){let i=t.length;for(let a=0;a<r;a++){let o=n*(a+1)/r,s=t.map((e,t)=>{let n=2*t*Math.PI/i-Math.PI/2;return`${o*Math.cos(n)},${o*Math.sin(n)}`}).join(` `);e.append(`polygon`).attr(`points`,s).attr(`class`,`radarGraticule`)}}},`drawGraticule`),F=f((e,t,n,r)=>{let i=t.length;for(let a=0;a<i;a++){let o=t[a].label,s=2*a*Math.PI/i-Math.PI/2,c=Math.cos(s),l=Math.sin(s);e.append(`line`).attr(`x1`,0).attr(`y1`,0).attr(`x2`,n*r.axisScaleFactor*c).attr(`y2`,n*r.axisScaleFactor*l).attr(`class`,`radarAxisLine`);let u=c>.01?`start`:c<-.01?`end`:`middle`,d=l>.01?`hanging`:l<-.01?`auto`:`central`;e.append(`text`).text(o).attr(`x`,n*r.axisLabelFactor*c+4*c).attr(`y`,n*r.axisLabelFactor*l+4*l).attr(`text-anchor`,u).attr(`dominant-baseline`,d).attr(`class`,`radarAxisLabel`)}},`drawAxes`);function I(e,t,n,r,i,a,o){let s=t.length,c=Math.min(o.width,o.height)/2;n.forEach((t,n)=>{if(t.entries.length!==s)return;let l=t.entries.map((e,t)=>{let n=2*Math.PI*t/s-Math.PI/2,a=L(e,r,i,c);return{x:a*Math.cos(n),y:a*Math.sin(n)}});a===`circle`?e.append(`path`).attr(`d`,R(l,o.curveTension)).attr(`class`,`radarCurve-${n}`):a===`polygon`&&e.append(`polygon`).attr(`points`,l.map(e=>`${e.x},${e.y}`).join(` `)).attr(`class`,`radarCurve-${n}`)})}f(I,`drawCurves`);function L(e,t,n,r){return r*(Math.min(Math.max(e,t),n)-t)/(n-t)}f(L,`relativeRadius`);function R(e,t){let n=e.length,r=`M${e[0].x},${e[0].y}`;for(let i=0;i<n;i++){let a=e[(i-1+n)%n],o=e[i],s=e[(i+1)%n],c=e[(i+2)%n],l={x:o.x+(s.x-a.x)*t,y:o.y+(s.y-a.y)*t},u={x:s.x-(c.x-o.x)*t,y:s.y-(c.y-o.y)*t};r+=` C${l.x},${l.y} ${u.x},${u.y} ${s.x},${s.y}`}return`${r} Z`}f(R,`closedRoundCurve`);function z(e,t,n,r){if(!n)return;let i=(r.width/2+r.marginRight)*3/4,a=-(r.height/2+r.marginTop)*3/4;t.forEach((t,n)=>{let r=e.append(`g`).attr(`transform`,`translate(${i}, ${a+n*20})`);r.append(`rect`).attr(`width`,12).attr(`height`,12).attr(`class`,`radarLegendBox-${n}`),r.append(`text`).attr(`x`,16).attr(`y`,0).attr(`class`,`radarLegendText`).text(t.label)})}f(z,`drawLegend`);var B={draw:M},V=f((e,t)=>{let n=``;for(let r=0;r<e.THEME_COLOR_LIMIT;r++){let i=e[`cScale${r}`];n+=`
		.radarCurve-${r} {
			color: ${i};
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
		}
		`}return n},`genIndexStyles`),H=f(e=>{let t=a(p(),r().themeVariables);return{themeVariables:t,radarOptions:a(t.radar,e)}},`buildRadarStyleOptions`),U={parser:j,db:k,renderer:B,styles:f(({radar:e}={})=>{let{themeVariables:t,radarOptions:n}=H(e);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${n.axisColor};
		stroke-width: ${n.axisStrokeWidth};
	}
	.radarAxisLabel {
		font-size: ${n.axisLabelFontSize}px;
		color: ${n.axisColor};
	}
	.radarGraticule {
		fill: ${n.graticuleColor};
		fill-opacity: ${n.graticuleOpacity};
		stroke: ${n.graticuleColor};
		stroke-width: ${n.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${n.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${V(t,n)}
	`},`styles`)};export{U as diagram};