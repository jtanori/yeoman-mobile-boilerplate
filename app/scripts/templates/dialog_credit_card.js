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
buf.push('<div class="al-left"><div class="ctrl-holder"><select name="type" class="credit-card-type ui-block">');
 var selectedVisa = false, selectedMasterCard = false, selectedAmex = false;
 if(type === i18n['Visa']) selectedVisa = true;
 if(type === i18n['Master Card']) selectedMasterCard = true;
 if(type === i18n['American Express']) selectedAmex = true;
buf.push('<option>' + escape((interp = i18n['Select your credit card']) == null ? '' : interp) + '</option><option');
buf.push(attrs({ 'selected':(selectedVisa) }, {"selected":true}));
buf.push('>' + escape((interp = i18n['Visa']) == null ? '' : interp) + '</option><option');
buf.push(attrs({ 'selected':(selectedMasterCard) }, {"selected":true}));
buf.push('>' + escape((interp = i18n['Master Card']) == null ? '' : interp) + '</option><option');
buf.push(attrs({ 'selected':(selectedAmex) }, {"selected":true}));
buf.push('>' + escape((interp = i18n['American Express']) == null ? '' : interp) + '</option></select></div><div class="ctrl-holder"><input');
buf.push(attrs({ 'type':("text"), 'name':("number"), 'placeholder':(i18n['Credit card number']), 'tabindex':(1), 'value':(number) }, {"type":true,"name":true,"placeholder":true,"tabindex":true,"value":true}));
buf.push('/></div><div class="ctrl-holder"><input');
buf.push(attrs({ 'type':("text"), 'name':("cvv"), 'placeholder':(i18n['Verification code']), 'tabindex':(1), 'value':(cvv) }, {"type":true,"name":true,"placeholder":true,"tabindex":true,"value":true}));
buf.push('/>');
button_mixin({id:'cvv-help', className: 'btn-link', icon: {name: 'info'}});
buf.push('</div><div class="ctrl-holder"><label>' + escape((interp = i18n['Expiration Date']) == null ? '' : interp) + '</label><select name="expirationDateMonth" class="month">');
 for(var x = 1; x <= 12; x++)
{
 if( x == expirationDateMonth)
{
buf.push('<option selected="selected">' + escape((interp = x) == null ? '' : interp) + '</option>');
}
 else 
buf.push('<option>' + escape((interp = x) == null ? '' : interp) + ' </option>');
}
buf.push('</select><select name="expirationDateYear" class="year">');
 for(var y = 13; y <= 20; y++)
{
 if(y == expirationDateYear)
{
buf.push('<option selected="selected">' + escape((interp = y) == null ? '' : interp) + '</option>');
}
 else
buf.push('<option>' + escape((interp = y) == null ? '' : interp) + '</option>');
}
buf.push('</select></div><div class="ctrl-holder"><input');
buf.push(attrs({ 'type':("text"), 'name':("name"), 'placeholder':(i18n['Name on Card']), 'tabindex':(1), 'value':(name) }, {"type":true,"name":true,"placeholder":true,"tabindex":true,"value":true}));
buf.push('/></div><div class="error-container hide"><div class="alert alert-error"></div></div></div>');
}
return buf.join("");
};
});