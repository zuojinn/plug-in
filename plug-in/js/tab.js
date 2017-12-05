;(function(){
    $.fn.extend({
        tabs:function(options){     
            //var opts = $.extend({},defaults,options);
            this.each(function(){
                var $this = $(this);
                $this.find('.tab-content').each(function(i,d){
                    if($(this).hasClass('actived')){
                        $(this).css({'display':'block'})
                    }
                })
                $this.find('.tab-title').children('li').on('click',function(){
                    $(this).addClass('actived').siblings().removeClass('actived');
                    $this.find('.tab-content').hide().end().find('.tab-content').eq($(this).index('li')).show();
                })
            })
        }
    })
    // var defaults={
    //     activedNum:"1"
    // }
})()