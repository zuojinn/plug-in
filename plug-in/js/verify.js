;(function(){
    $.fn.extend({
        "verify":function(options){
            this.each(function(){
                var _this = $(this);
                var verifyBox = _this.find('.verify-box');
                var verifyBtn = _this.find('.verify-btn');
                var verifySpan= _this.find('span');
                var opts=$.extend({},defaults,options);
                verifyBtn.on('mousedown',function(e){
                    var os = verifyBtn.offset();
                    var dx;
                    var differ = _this.width() - verifyBtn.width();
                    $(document).on('mousemove',function(e){
                        dx=e.pageX - os.left;
                        if(dx<0){
                            dx=0;
                        }else if(dx>differ){
                            dx = differ;
                        }
                        verifyBox.css('width',dx);
                        verifyBtn.css('left',dx)
                    })
                    $(document).on('mouseup',function(e){
                        $(document).off('mousemove');
                        $(document).off('mouseup');
                        dx = e.pageX - os.left;
                        if(dx<differ){
                            dx = 0;
                            verifySpan.html('按住滑块，拖动到最右边')
                        }else if(dx>=differ){
                            dx = differ;
                            verifySpan.css({'z-index':2,"color":"#fff"});
                            verifySpan.html('验证通过');
                            
                            verifyBtn.css({'cursor':'default',"color":'#0f0'});
                            verifyBtn.html('&radic;');
                            verifyBtn.off('mousedown');
                        }
                        verifyBox.css('width',dx);
                        verifyBtn.css('left',dx);
                    })
                })

                var init = function(){
                    _this.css({'width':opts.width,'height':opts.height})
                    verifyBtn.css({'width':opts.height,'height':opts.height,'line-height':opts.height})
                    verifySpan.css({'height':opts.height,'line-height':opts.height})
                }
                init();
            })
            var defaults={
                'width':'400px',
                'height':'60px'
            }
        }
    })
})()
