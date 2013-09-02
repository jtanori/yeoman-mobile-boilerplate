define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div><div class="logo">Logo</div><div class="ui-grid-a"><div class="ui-block-a"><div class="ui-wrapper-a alpha"><div id="login" href="#" class="btn btn-large btn-block btn-primary"><i class="icon-key"></i>' + escape((interp = i18n.Login) == null ? '' : interp) + '</div></div></div><div class="ui-block-b"><div class="ui-wrapper-a omega"><div id="signup" href="#" class="btn btn-large btn-block btn-primary"><i class="icon-lock"></i>' + escape((interp = i18n.Signup) == null ? '' : interp) + '</div></div></div></div><hr class="hr-a"/><div><div id="facebook" href="#" class="btn btn-block btn-large btn-info disabled"><i class="icon-facebook"></i>' + ((interp = i18n['Signup via Facebook']) == null ? '' : interp) + '</div></div></div>');
}
return buf.join("");
};
});