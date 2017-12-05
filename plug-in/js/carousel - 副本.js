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
                        carouselInner.stop().animate({left:-items.first().width()},500,function(){setTimeFlag=true;});
                        return false;
                    }
                    carouselInner.animate({left:-items.first().width()+newLeft},500,function(){setTimeFlag=true;});
                }else if(direction=='right'){
                    if(newLeft == 0){
                        carouselInner.css({left:-items.first().width()*itemSize});
                        carouselInner.stop().animate({left:-items.first().width()*itemSize+items.first().width()},500,function(){setTimeFlag=true;});
                        return false;
                    }
                    carouselInner.animate({left:items.first().width()+newLeft},500,function(){setTimeFlag=true;});
                }
            }

            //开始动画
            var play = function(){
                timeId = setInterval(function(){
                    carouselCL.trigger('click');
                },3000)
            }

            //停止动画
            var stop =function(){
                clearInterval(timeId);
            }

            //防止多次点击
            var setTimeFlag=true;

            //右移动
            carouselCR.on('click',function(){
                buttonShow('right');
                if(setTimeFlag){
                    setTimeFlag = false;
                    animate('right');  
                }
            })

            //左移动
            carouselCL.on('click',function(){
                buttonShow('left');
                if(setTimeFlag){
                    setTimeFlag = false;
                    animate('left');
                }
            })

            //按钮显示
            var buttonShow=function(direction) {
                var cLeft = parseInt(carouselInner.position().left);
                cLeft = cLeft < 0 ? -cLeft:cLeft;
                var index= cLeft/items.first().width();
                if(carouselInner.position().left == (-items.first().width()*itemSize) || index==itemSize){
                    index=0;
                }
                carouselIndicators.find('li').eq(index+1).addClass('active').siblings().removeClass('active');
            }

            //指定移动至位置
            carouselIndicators.find('>li').each(function(i,e){
                var _this = $(this);
                _this.on('mouseenter',function(){
                    $(this).addClass('active').siblings().removeClass('active');
                    carouselInner.animate({left:-items.first().width()*i},function(){setTimeFlag=true;});
                })
            })
            
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


                // 获取第一个图片 节点对象
                var firstImg = items.first().clone();
                carouselInner.append(firstImg).width(carouselInner.find('.item').size()*firstPic.width());
                itemSize>1 && play();
            }
            init();

            //移动至滚动区域
            wrapper.hover(function(){
                stop();
            }, function(){
                play();
            });
            //定义滚动顺序
            // var order_by = 'DESC';
            // var init = function(){
            //     if(!wrapper.size()) return false;
            //     itemHeight = opts.height ? opts.height : items.first().height();
            //     itemWidth  = opts.width  ? opts.width  : items.first().width();

            //     wrapper.css({height:itemHeight,width:itemWidth});
            //     carouselInner.css({height:itemHeight,width:itemWidth*itemSize});
            //     items.css({height:itemHeight,width:itemWidth});
            //     carouselInner.animate({'left':-itemWidth*opts.startNum},0)
            //     carouselIndicators.find('>li').eq(opts.startNum).addClass('active');
            //     itemSize>1 && start();
            // }

            //开始轮播
            // var start = function(){
            //     var  liAct = carouselIndicators.find('li.active'),liIndex = liAct.index();
            //     carouselInner.stop().animate({'left':-itemWidth*liIndex},opts.delay*1000,function(){
            //         liAct.removeClass('active');
            //         if(order_by=='ASC'){
            //             if (liAct.next().size()){
            //                 liAct.next().addClass('active');
            //             }else{
            //                 order_by = 'DESC';
            //                 liAct.prev().addClass('active');
            //             }
            //         }else if(order_by=='DESC'){
            //             if (liAct.prev().size()){
            //                 liAct.prev().addClass('active');
            //             }else{liAct
            //                 order_by = 'ASC';
            //                 liAct.next().addClass('active');
            //             }
            //         }
            //         timeId = setTimeout(start, opts.delay*1000);
            //     })  
            // }
            // var stop=function(){
            //     clearTimeout(timeId);
            // }

            //鼠标经过事件
            // wrapper.hover(function(){
            //     stop();
            // }, function(){
            //     timeId = setTimeout(start, opts.delay*1000);
            // });

            //序号选择
            // carouselIndicators.find('>li').each(function(i,e){
            //     var _this = $(this);
            //     _this.on('mouseenter',function(){
            //         $(this).addClass('active').siblings().removeClass('active');
            //         stop();
            //         start();
            //     })
            // })

            //首张图片加载完毕后执行初始化
    //         var imgLoader = new Image();
    //         imgLoader.onload = function(){
    //             imgLoader.onload = null;
    //             init();
    //         }
    //         imgLoader.src = firstPic.attr('src');
        }
    })
    var defaults={
       width:"",
       height:"",
       startNum :0,
       delay:1
    }
})()