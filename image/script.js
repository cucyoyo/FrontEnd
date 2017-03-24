$(document).ready(function(){

	var i = 0;
	//克隆第一张图片放在最后一张图片后面
	clone = $(".image li").first().clone();
	$(".image").append(clone);

	size = $(".image li").size();
	$(".num").first().addClass('on');

	$(".gt").click(function(){
		i++;
		//当到达最后一张图片时，用css的方法使得.image在后台快速的移动回原位置
		if(i == size){
			$(".image").css({left:0});
			i = 1;
		}
		$(".image").animate({left:-600*i});
		//为了解决最后一张克隆图片圆点的问题
		if (i == size-1) {
			$(".num").eq(0).addClass('on').siblings().removeClass("on");
		}
		else{
			$(".num").eq(i).addClass('on').siblings().removeClass("on");
		}
		
	});
	
	$(".lt").click(function(){
		i--;
		if(i == -1){
			$(".image").css({left:-600*(size-1)});
			i = size-2;
		}
		$(".image").animate({left:-600*i})
		$(".num").eq(i).addClass("on").siblings().removeClass("on");
	})
});