;(function(){
    $.fn.extend({
        profile:function(){
            var profileR = this.children('.profile_right'),profileL = this.children('.profile_left'),pR=profileR.find('.profile_right_cnt>p');
            profileL.find('.a-anchors').each(function(i,d){
                $(this).attr({'id':function(){return 'a'+i;}});
            })
            profileR.find('.a-anchors').each(function(i,d){
                $(this).attr({'id':function(){return 'a'+i+i;},'href':function(){return '#a'+i;}});
            })
            profileR.find('.profile_right_cnt>p').on('click',function(){
                $(this).addClass("floatnav_a_cur").siblings().removeClass('floatnav_a_cur');
            })

            $(window).scroll(function(){
                //为页面添加页面滚动监听事件
                var wst =  $(window).scrollTop(); //滚动条距离顶端值
                for (i=0; i<pR.length; i++){             //加循环
                    if($("#a"+i).offset().top<=wst){ //判断滚动条位置
                        pR.removeClass('floatnav_a_cur'); //清除c类
                        $("#a"+i+i).parent().addClass('floatnav_a_cur');    //给当前导航加c类
                    }
                }
            })

        }
    })
})()

