define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="al-left"><div class="ctrl-holder"><input');
buf.push(attrs({ 'type':('email'), 'id':('username'), 'name':('username'), 'placeholder':(i18n.Username), 'tabindex':(1) }, {"type":true,"id":true,"name":true,"placeholder":true,"tabindex":true}));
buf.push('/><div class="input-helper"><small>' + escape((interp = i18n['Must be a valid email address']) == null ? '' : interp) + '</small></div></div><div class="ctrl-holder"><input');
buf.push(attrs({ 'type':('password'), 'id':('password'), 'name':('password'), 'placeholder':(i18n.Password), 'tabindex':(1) }, {"type":true,"id":true,"name":true,"placeholder":true,"tabindex":true}));
buf.push('/></div><div class="error-container hide"><div class="alert alert-error"></div></div><!-- input(type=\'checkbox\')--></div>');
}
return buf.join("");
};
});