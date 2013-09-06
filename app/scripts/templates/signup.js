define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div><div class="ctrl-holder"><input');
buf.push(attrs({ 'type':('text'), 'name':('username'), 'placeholder':(i18n.Username), 'tabindex':('1') }, {"type":true,"name":true,"placeholder":true,"tabindex":true}));
buf.push('/></div><div class="ctrl-holder"><input');
buf.push(attrs({ 'type':('password'), 'name':('password'), 'placeholder':(i18n.Password), 'tabindex':('2') }, {"type":true,"name":true,"placeholder":true,"tabindex":true}));
buf.push('/></div><div class="ctrl-holder"><input');
buf.push(attrs({ 'type':('password'), 'name':('password-confirm'), 'placeholder':(i18n['Confirm Password']), 'tabindex':('3') }, {"type":true,"name":true,"placeholder":true,"tabindex":true}));
buf.push('/><div class="input-helper"><small>' + escape((interp = i18n['Must match password field']) == null ? '' : interp) + '</small></div></div><div class="error-container hide"><div class="alert alert-error"></div></div></div>');
}
return buf.join("");
};
});