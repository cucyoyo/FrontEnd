$(document).ready(function(){

	var i = 0;
	size = $(".image li").size();
	$(".num").first().addClass('on');

	$(".gt").click(function(){
		i++;
		if(i == size){
			i = 0;
		}
		$(".image").animate({left:-600*i});
		$(".num").eq(i).addClass('on').siblings().removeClass("on");
	});
	
	$(".lt").click(function(){
		i--;
		if(i == -1){
			i = size-1;
		}
		$(".image").animate({left:-600*i})
		$(".num").eq(i).addClass("on").siblings().removeClass("on");
	})
});