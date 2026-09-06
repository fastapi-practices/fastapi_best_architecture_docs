import{$n as e,Bn as t,En as n,Pn as r,Sn as i,Tt as a,Un as o,ar as s,br as c,dr as l,gr as u,ii as d,li as f,vr as p,yn as m,yr as h}from"./common-3PrtwWuN.js";var g=o.packet,_=class{constructor(){this.packet=[],this.setAccTitle=c,this.getAccTitle=l,this.setDiagramTitle=s,this.getDiagramTitle=h,this.getAccDescription=u,this.setAccDescription=p}static{f(this,`PacketDB`)}getConfig(){let e=a({...g,...r().packet});return e.showBits&&(e.paddingY+=10),e}getPacket(){return this.packet}pushWord(e){e.length>0&&this.packet.push(e)}clear(){t(),this.packet=[]}},v=1e4,y=f((e,t)=>{i(e,t);let n=-1,r=[],a=1,{bitsPerRow:o}=t.getConfig();for(let{start:i,end:s,bits:c,label:l}of e.blocks){if(i!==void 0&&s!==void 0&&s<i)throw Error(`Packet block ${i} - ${s} is invalid. End must be greater than start.`);if(i??=n+1,i!==n+1)throw Error(`Packet block ${i} - ${s??i} is not contiguous. It should start from ${n+1}.`);if(c===0)throw Error(`Packet block ${i} is invalid. Cannot have a zero bit field.`);for(s??=i+(c??1)-1,c??=s-i+1,n=s,d.debug(`Packet block ${i} - ${n} with label ${l}`);r.length<=o+1&&t.getPacket().length<v;){let[e,n]=b({start:i,end:s,bits:c,label:l},a,o);if(r.push(e),e.end+1===a*o&&(t.pushWord(r),r=[],a++),!n)break;({start:i,end:s,bits:c,label:l}=n)}}t.pushWord(r)},`populate`),b=f((e,t,n)=>{if(e.start===void 0)throw Error(`start should have been set during first phase`);if(e.end===void 0)throw Error(`end should have been set during first phase`);if(e.start>e.end)throw Error(`Block start ${e.start} is greater than block end ${e.end}.`);if(e.end+1<=t*n)return[e,void 0];let r=t*n-1,i=t*n;return[{start:e.start,end:r,label:e.label,bits:r-e.start},{start:i,end:e.end,label:e.label,bits:e.end-i}]},`getNextFittingBlock`),x={parser:{yy:void 0},parse:f(async e=>{let t=await m(`packet`,e),n=x.parser?.yy;if(!(n instanceof _))throw Error(`parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.`);d.debug(t),y(t,n)},`parse`)},S=f((t,r,i,a)=>{let o=a.db,s=o.getConfig(),{rowHeight:c,paddingY:l,bitWidth:u,bitsPerRow:d}=s,f=o.getPacket(),p=o.getDiagramTitle(),m=c+l,h=m*(f.length+1)-(p?0:c),g=u*d+2,_=n(r);_.attr(`viewBox`,`0 0 ${g} ${h}`),e(_,h,g,s.useMaxWidth);for(let[e,t]of f.entries())C(_,t,e,s);_.append(`text`).text(p).attr(`x`,g/2).attr(`y`,h-m/2).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).attr(`class`,`packetTitle`)},`draw`),C=f((e,t,n,{rowHeight:r,paddingX:i,paddingY:a,bitWidth:o,bitsPerRow:s,showBits:c})=>{let l=e.append(`g`),u=n*(r+a)+a;for(let e of t){let t=e.start%s*o+1,n=(e.end-e.start+1)*o-i;if(l.append(`rect`).attr(`x`,t).attr(`y`,u).attr(`width`,n).attr(`height`,r).attr(`class`,`packetBlock`),l.append(`text`).attr(`x`,t+n/2).attr(`y`,u+r/2).attr(`class`,`packetLabel`).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).text(e.label),!c)continue;let a=e.end===e.start,d=u-2;l.append(`text`).attr(`x`,t+(a?n/2:0)).attr(`y`,d).attr(`class`,`packetByte start`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,a?`middle`:`start`).text(e.start),a||l.append(`text`).attr(`x`,t+n).attr(`y`,d).attr(`class`,`packetByte end`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,`end`).text(e.end)}},`drawWord`),w={draw:S},T={byteFontSize:`10px`,startByteColor:`black`,endByteColor:`black`,labelColor:`black`,labelFontSize:`12px`,titleColor:`black`,titleFontSize:`14px`,blockStrokeColor:`black`,blockStrokeWidth:`1`,blockFillColor:`#efefef`},E={parser:x,get db(){return new _},renderer:w,styles:f(({packet:e}={})=>{let t=a(T,e);return`
	.packetByte {
		font-size: ${t.byteFontSize};
	}
	.packetByte.start {
		fill: ${t.startByteColor};
	}
	.packetByte.end {
		fill: ${t.endByteColor};
	}
	.packetLabel {
		fill: ${t.labelColor};
		font-size: ${t.labelFontSize};
	}
	.packetTitle {
		fill: ${t.titleColor};
		font-size: ${t.titleFontSize};
	}
	.packetBlock {
		stroke: ${t.blockStrokeColor};
		stroke-width: ${t.blockStrokeWidth};
		fill: ${t.blockFillColor};
	}
	`},`styles`)};export{E as diagram};