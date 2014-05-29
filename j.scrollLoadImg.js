/*
 * name : j.scrollLoadImg.js
 * 对所有含有xSrc属性的图片进行滚动条加载
 * author : zk
 * date : 2013/05/21
 */

(function($) {
	
	var imgs = $('img[xSrc]');
	var errorLoadTxt = 'image load error';
	
	var scrollLoad = function() {
		
		imgs.each(function() {
			var $this = $(this);
			if (!$this.attr('xSrc')) {//如果没有xSrc这个属性，则跳出
				return false;
			}
			var xSrc = $this.attr('xSrc');
			var browserHeight = document.compatMode == 'BackCompat' ? document.body.clientHeight : document.documentElement.clientHeight;
			var wScrollTop = $(window).scrollTop();
			var thisTop = $this.offset().top;
			if (browserHeight + wScrollTop > thisTop) {
				console.log('loading img with xSrc:' + xSrc);
				$this.attr('src', xSrc).error(function() {
					console.log('error loading img with xSrc:' + xSrc);
					$this.attr('alt', errorLoadTxt);
				});
				$this.removeAttr('xSrc');
				if ($('img[xSrc]').length == 0) {
					$(window).unbind('scroll', scrollLoad);
					console.log('scrollLoad unbinded');
				}
			}
		});
	};
	
	//在页面添加个标志位，来决定是否允许滚动加载图片
	if (typeof scrollLoadFlag !== 'undefined' && !scrollLoadFlag) {
		return false;
	} else {
		$(window).bind('scroll', scrollLoad);
	}
	
})(jQuery);
