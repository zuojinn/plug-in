;(function(){
    $.fn.extend({
        carousels:function(options){    
            var opts = $.extend({},defaults,options);
            var wrapper = $(this),carouselInner = wrapper.children('.carousel-inner'),carouselIndicators = wrapper.children('.carousel-indicators'), items = carouselInner.find('.item'),firstPic =items.first().find('img');
            var carouselCL = wrapper.children(".carousel-control.left"),carouselCR = wrapper.children(".carousel-control.right");
            var itemSize = items.size(),itemHeight = 0 ,itemWidth = 0;
            var timeId='';

            //动画
            var animate=function(direction){
                var newLeft = carouselInner.position().left;
                if(direction=='left'){
                    if(newLeft==-items.first().width()*itemSize){
                        carouselInner.css({left:0});
                        carouselInner.stop().animate({left:-items.first().width()},opts.speed*1000,function(){setTimeFlag=true;});
                        return false;
                    }
                    carouselInner.animate({left:-items.first().width()+newLeft},opts.speed*1000,function(){setTimeFlag=true;});
                }else if(direction=='right'){
                    if(newLeft == 0){
                        carouselInner.css({left:-items.first().width()*itemSize});
                        carouselInner.stop().animate({left:-items.first().width()*itemSize+items.first().width()},opts.speed*1000,function(){setTimeFlag=true;});
                        return false;
                    }
                    carouselInner.animate({left:items.first().width()+newLeft},opts.speed*1000,function(){setTimeFlag=true;});
                }
            }

            //开始动画
            var play = function(){
                timeId = setInterval(function(){
                    carouselCL.trigger('click');
                },opts.delay)
            }

            //停止动画
            var stop =function(){
                clearInterval(timeId);
            }

            //防止多次点击
            var setTimeFlag=true;

            //右移动
            carouselCR.on('click',function(){
                
                if(setTimeFlag){
                    setTimeFlag = false;
                    var newLeft = carouselInner.position().left;
                    if(newLeft==0){
                        carouselInner.find('.item').removeClass('active').end().find('.item').eq(-2).addClass('active');
                    }else{
                        carouselInner.find('.item.active').removeClass('active').prev().addClass('active'); 
                    }
                    buttonShow('right');
                    animate('right');  
                }
            })

            //左移动
            carouselCL.on('click',function(){
                if(setTimeFlag){
                    var newLeft = carouselInner.position().left;
                    if(newLeft==-items.first().width()*itemSize){
                        carouselInner.find('.item').removeClass('active').end().find('.item').eq(1).addClass('active');
                    }else{
                       carouselInner.find('.item.active').removeClass('active').next().addClass('active'); 
                    }
                    buttonShow('left');
                    setTimeFlag = false;
                    animate('left');
                }
            })


            //按钮显示
            var buttonShow=function(direction) {
                var itemActIndex = carouselInner.find('.item.active').index();
                if(itemActIndex==carouselInner.find('.item').length-1){
                    itemActIndex = 0;
                }
                carouselIndicators.find('li').eq(itemActIndex).addClass('active').siblings().removeClass('active');
            }

            //指定移动至位置
            carouselIndicators.find('>li').each(function(i,e){
                var _this = $(this);
                _this.on('mouseenter',function(){
                    $(this).addClass('active').siblings().removeClass('active');
                    carouselInner.animate({left:-items.first().width()*i},function(){setTimeFlag=true;});
                })
            })
            
            //移动至滚动区域
            wrapper.hover(function(){
                stop();
            }, function(){
                play();
            });

            //初始化
            var init = function(){
                if(!wrapper.size() && opts.startNum > items.size()-1) return false;
                itemHeight = opts.height ? opts.height : items.first().height();
                itemWidth  = opts.width  ? opts.width  : items.first().width();

                wrapper.css({height:itemHeight,width:itemWidth});
                carouselInner.css({height:itemHeight,width:itemWidth*itemSize});
                items.css({height:itemHeight,width:itemWidth});
                carouselInner.animate({'left':-itemWidth*opts.startNum},0)
                carouselIndicators.find('>li').eq(opts.startNum).addClass('active');
                carouselInner.find('.item').eq(opts.startNum).addClass('active');

                // 获取第一个图片 节点对象
                var firstImg = items.first().clone();
                carouselInner.append(firstImg).width(carouselInner.find('.item').size()*firstPic.width());
                itemSize>1 && play();
            }
            init();

        }
    })
    var defaults={
       width:"",
       height:"",
       startNum :0,
       delay:1,
       speed:2
    }
})()