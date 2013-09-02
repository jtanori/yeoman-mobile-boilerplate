define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div data-role="content" id="iscroll"><div data-role="scroller"><div class="content">');
 if(content)
{
 console.log('content found')
buf.push('' + ((interp = content) == null ? '' : interp) + '');
}
buf.push('</div></div></div>');
}
return buf.join("");
};
});