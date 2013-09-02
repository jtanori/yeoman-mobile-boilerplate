define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
 console.log('subheader', subheader)
buf.push('<div');
buf.push(attrs({ 'id':(subheader.id), "class": (subheader.className) }, {"class":true,"id":true}));
buf.push('>');
 if (subheader.form)
{
buf.push('<form');
buf.push(attrs({ 'id':(subheader.form.id) }, {"id":true}));
buf.push('>');
 if(subheader.form.input)
{
 var i = subheader.form.input
buf.push('<input');
buf.push(attrs({ 'id':(i.id), 'type':(i.type), 'placeholder':(i.placeholder), 'value':(i.value), 'data-inline':("true"), "class": (i.className) }, {"class":true,"id":true,"type":true,"placeholder":true,"value":true,"data-inline":true}));
buf.push('/>');
}
 if(subheader.form.button)
{
 var b = subheader.form.button
buf.push('<button');
buf.push(attrs({ 'id':(b.id), 'type':(b.type), 'data-inline':(true), "class": (b.className) }, {"id":true,"class":true,"type":true,"data-inline":true}));
buf.push('>' + escape((interp = b.text) == null ? '' : interp) + '</button>');
}
buf.push('</form>');
}
 else
{
buf.push('' + ((interp = subheader.content || '') == null ? '' : interp) + '');
}
buf.push('</div>');
}
return buf.join("");
};
});