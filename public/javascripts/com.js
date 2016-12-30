/**
 * Created by hvming on 2016/10/11.
 */
/**
 * Created by hvming on 2016/10/11.
 */
define(function(){
	window.ctls=[];
	var ctl_text=function(id){
				ctls.push(this)
				this.data={},
				this.$element=$('<div><input id='+id+'/></div>')
		}
		ctl_text.prototype={
			constructor:ctl_text,
			getElement:function(){
				return this.$element;
			},
			getVal:function(){
				return this.$element.find('input').val();
			}
		}
		$('body').append(new ctl_text('id1').getElement()+new ctl_text('id2').getElement())
  var gg=function(){

  }
  return {
    gg:gg
  };
})
