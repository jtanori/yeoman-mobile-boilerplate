define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'id':(id), "class": ('loading-indicator-wrapper') }, {"id":true}));
buf.push('><div class="loading-indicator"><span class="loading-indicator-spinner"></span>');
 if(label)
{
buf.push('<span class="loading-indicator-label">' + escape((interp = label) == null ? '' : interp) + '</span>');
}
buf.push('</div></div>');
}
return buf.join("");
};
});