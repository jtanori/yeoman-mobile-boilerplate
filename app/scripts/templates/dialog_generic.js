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
 var wbuttons = buttons ? 'w-buttons' : ''
buf.push('<div class="dialog-overlay js-dialog-overlay"></div><div');
buf.push(attrs({ "class": ('dialog-container') + ' ' + (wbuttons) }, {"class":true}));
buf.push('><div class="dialog-wrapper">');
if ((header))
{
buf.push('<header>');
 var icon = {name: "close js-dialog-close"}
icon_mixin(icon);
if ((title))
{
buf.push('<h3 class="title">' + ((interp = title) == null ? '' : interp) + '</h3>');
}
buf.push('</header>');
}
buf.push('<div class="dialog-scroller">');
 var contentTag = form ? 'form' : 'div'
buf.push('<' + (contentTag) + '');
buf.push(attrs({ 'id':(name), "class": ('dialog-content') }, {"id":true}));
buf.push('>' + ((interp = content) == null ? '' : interp) + '</' + (contentTag) + '></div>');
 if(buttons)
{
buf.push('<div class="dialog-buttons">');
// iterate buttons
;(function(){
  if ('number' == typeof buttons.length) {

    for (var $index = 0, $$l = buttons.length; $index < $$l; $index++) {
      var button = buttons[$index];

button_mixin(button);
    }

  } else {
    var $$l = 0;
    for (var $index in buttons) {
      $$l++;      var button = buttons[$index];

button_mixin(button);
    }

  }
}).call(this);

buf.push('</div>');
}
buf.push('</div></div>');
}
return buf.join("");
};
});