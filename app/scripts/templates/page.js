define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'data-role':("page"), 'id':(id), "class": (className) }, {"data-role":true,"class":true,"id":true}));
buf.push('>');
 if(header)
{
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
var button_mixin = function(button){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
 var className = button.className ? button.className : ""
 var id = button.id ? button.id : ""
 var text = button.text ? button.text : ""
 var html = button.html ? button.html : ""
 var href = button.href ? button.href : ""
 console.log(button, 'button')
buf.push('<div');
buf.push(attrs({ 'id':(id), "class": ("btn " + (className) + "") }, {"class":true,"id":true}));
buf.push('>');
 if(button.icon)
{
icon_mixin(button.icon);
buf.push(' ');
}
 if(text)
{
buf.push('<span>' + escape((interp = text) == null ? '' : interp) + '</span>');
}
 if(html)
{
buf.push('' + ((interp = html) == null ? '' : interp) + '');
}
buf.push('</div>');
};
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
var button_mixin = function(button){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
 var className = button.className ? button.className : ""
 var id = button.id ? button.id : ""
 var text = button.text ? button.text : ""
 var html = button.html ? button.html : ""
 var href = button.href ? button.href : ""
 console.log(button, 'button')
buf.push('<div');
buf.push(attrs({ 'id':(id), "class": ("btn " + (className) + "") }, {"class":true,"id":true}));
buf.push('>');
 if(button.icon)
{
icon_mixin(button.icon);
buf.push(' ');
}
 if(text)
{
buf.push('<span>' + escape((interp = text) == null ? '' : interp) + '</span>');
}
 if(html)
{
buf.push('' + ((interp = html) == null ? '' : interp) + '');
}
buf.push('</div>');
};
var buttonsCheckbox_mixin = function(g){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push('<div');
buf.push(attrs({ 'data-toggle':('buttons-checkbox'), "class": ('btn-group') + ' ' + (g.className) }, {"class":true,"data-toggle":true}));
buf.push('>');
// iterate g.items
;(function(){
  if ('number' == typeof g.items.length) {

    for (var $index = 0, $$l = g.items.length; $index < $$l; $index++) {
      var b = g.items[$index];

button_mixin(b);
    }

  } else {
    var $$l = 0;
    for (var $index in g.items) {
      $$l++;      var b = g.items[$index];

button_mixin(b);
    }

  }
}).call(this);

buf.push('</div>');
};
buf.push('<div class="ui-header-wrapper"><div class="ui-header">');
 if (header && header.primary)
{
buf.push('<div id="primary">');
 var p = header.primary
 p.className = p.className ? 'left ' + p.className : 'btn-primary';
button_mixin(p);
buf.push('</div>');
}
 if(header && header.center)
{
 console.log('header center', header.center)
 var className = header.center.className ? header.center.className : 'center'
buf.push('<div');
buf.push(attrs({ 'id':('center'), "class": (className) }, {"class":true}));
buf.push('><h1 id="title">' + ((interp = header.center.content) == null ? '' : interp) + '</h1></div>');
}
if (header && header.secondary)
{
buf.push('<div id="secondary">');
 var s = header.secondary
 s.className = s.className ? 'right ' + s.className : 'btn-primary';
switch (header.secondary.toggle){
case 'buttons-checkbox':
buttonsCheckbox_mixin(s);
  break;
default:
button_mixin(s);
  break;
}
buf.push('</div>');
}
buf.push('</div>');
 if(header && header.subheader)
{
 var subheader = header.subheader
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
buf.push('</div>');
}
buf.push('<div data-role="content" id="iscroll"><div data-role="scroller"><div class="content">');
 if(content)
{
 console.log('content found')
buf.push('' + ((interp = content) == null ? '' : interp) + '');
}
buf.push('</div></div></div>');
 if(footer)
{
buf.push('' + ((interp = footer) == null ? '' : interp) + '');
}
buf.push('</div>');
}
return buf.join("");
};
});