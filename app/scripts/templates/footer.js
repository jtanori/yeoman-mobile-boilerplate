define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
 if(footer && footer.items)
{
buf.push('<div');
buf.push(attrs({ 'id':(footer.id), 'data-theme':(footer.theme), 'data-role':("footer"), "class": (footer.className) }, {"id":true,"class":true,"data-theme":true,"data-role":true}));
buf.push('><ul class="items clearfix">');
// iterate footer.items
;(function(){
  if ('number' == typeof footer.items.length) {

    for (var $index = 0, $$l = footer.items.length; $index < $$l; $index++) {
      var item = footer.items[$index];

buf.push('<li><div');
buf.push(attrs({ 'href':(item.href), 'id':(item.id), 'data-page-id':(item.pageId), "class": (item.className) }, {"href":true,"id":true,"class":true,"data-page-id":true}));
buf.push('>');
 if(item.HTMLContent)
{
buf.push('' + ((interp = item.HTMLContent) == null ? '' : interp) + '');
}
 else
{
buf.push('text');
}
buf.push('</div></li>');
    }

  } else {
    var $$l = 0;
    for (var $index in footer.items) {
      $$l++;      var item = footer.items[$index];

buf.push('<li><div');
buf.push(attrs({ 'href':(item.href), 'id':(item.id), 'data-page-id':(item.pageId), "class": (item.className) }, {"href":true,"id":true,"class":true,"data-page-id":true}));
buf.push('>');
 if(item.HTMLContent)
{
buf.push('' + ((interp = item.HTMLContent) == null ? '' : interp) + '');
}
 else
{
buf.push('text');
}
buf.push('</div></li>');
    }

  }
}).call(this);

buf.push('</ul></div>');
}
}
return buf.join("");
};
});