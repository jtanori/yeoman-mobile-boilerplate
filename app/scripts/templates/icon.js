define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
var icon_mixin = function(icon){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
 var className = icon.name ? icon.name : ""
 var color = icon.color ? "_" + icon.color : ""
 var text = icon.text ? icon.text : ""
 var html = icon.html ? icon.html : ""
buf.push('<i');
buf.push(attrs({ "class": ("icon-" + (className) + "" + (color) + "") }, {"class":true}));
buf.push('>');
 if(text) 
{
buf.push('<span>' + escape((interp = text) == null ? '' : interp) + '</span>');
}
 if(html)
{
buf.push('' + ((interp = html) == null ? '' : interp) + '');
}
buf.push('</i>');
};
}
return buf.join("");
};
});