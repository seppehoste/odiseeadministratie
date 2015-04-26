
    //sorry for the mess
var current_index = 0, 
    index, 
    menu, 
    menu_items_count, 
    mouse_down, 
    mouse_start_y, 
    pull_step, 
    total_pull = 150, 
    release = 40,
    pull_release = total_pull + release;

$(document).on('selectstart', false);

$(window).resize(function(){
  $(".pages").height($(window).height()-$("#header").height());

});

$(document).ready(function(){
	$("#menu li").each(function(i,e){
   	$(this).attr("data-index",i) 
	});

  $(window).trigger("resize");

	//
	menu = $("#menu").html();
	menu_items_count = $("#menu li").length;
	pull_step = total_pull/(menu_items_count-1);
	//

  $("#menu").css("transform","translate3d("+getItemX(0)+"px,0,0)");
  $("#menu li").removeClass("show");
  $("#menu li").eq(0).addClass("show");
  $("#examenrooster").show();
});

$('.option--confirm').on('click touchstart', function () {
	window.location.href='index.html';
});

$('.option--deny').on('click touchstart', function () {
	$("#logout").hide();
	$("#examenrooster").show();
});




$("#header").on("touchstart", function(e){
	e.stopPropagation();
	//
	mouse_down = true;
	mouse_start_y = e.originalEvent.targetTouches[0].pageY;
	//

	if(index == menu_items_count-1) {
		index = 0;
	} else {
		var $item = $("#menu li").eq(index);
		$("#menu").html(menu);
		$("#menu li").eq($item.attr("data-index")).remove();
		$item.prependTo($("#menu"));
		$("#menu li").eq(0).addClass("show");
		$("#menu").addClass("notrans");
		$("#menu").css("transform","translate3d("+getItemX(0)+"px,0,0)");
    }
});

$(document).on("touchend", function(e){
	if(mouse_down) {
	//
	mouse_down = false;
	$("#header").animate({height: 60},300);
	$("#menu").removeClass("show");
	$(".pullmenu-icon").removeClass("hide");
	//

	if(index>0) {

		if(index==menu_items_count-1) {

      	$(".reload i").addClass("anim");

      	setTimeout(function(){
				$("#menu li").removeClass("show");
				$("#menu").css("transform","translate3d("+getItemX(0)+"px,0,0)");
				$(".reload i").removeClass("anim");

				setTimeout(function(){

					$("#menu li").eq(0).addClass("show");
				},500);
			},1000);

      } else {

        current_index = index;

        $(".pages").addClass("hide");

        setTimeout(function(){

          $(".pages").removeClass("hide");
          $(".page").hide();

          switch($("#menu li").eq(index).attr("data-index")) {
            case '0': $("#examenrooster").show(); break;
            case '1': $("#logout").show(); break;
            }
        },500);
		}
	}
  }
});
var last_index = -1;
$(document).on("touchmove", function(e){
  e.preventDefault();
  e.stopPropagation();

	$("#menu").removeClass("notrans");

	if(mouse_down) {

		var diff = Math.max(0, e.originalEvent.targetTouches[0].pageY - mouse_start_y);
		if(diff>pull_release) diff = pull_release + (diff-pull_release)/(diff*0.01);

		$("#header").height(60+diff);

		index = Math.max(0,Math.min(menu_items_count-2, Math.floor((diff-release)/pull_step)));
		if(diff>pull_release+pull_step*1.3) index = menu_items_count-1;

		if(diff>release) {
			$("#menu").addClass("show");
			$(".pullmenu-icon").addClass("hide");
		} else {
      	$("#menu").removeClass("show");
			$(".pullmenu-icon").removeClass("hide");
		}

    if(index!=last_index) {last_index = index;

		$("#menu").css("transform","translate3d("+getItemX(index)+"px,0,0)");
		$("#menu li").removeClass("show");
		$("#menu li").eq(index).addClass("show");

      }
		$(".loader-icon").css("transform", "rotate("+(diff*40)+"deg)");
	}
});

var getItemX = function(index){
	var $item = $("#menu li").eq(index);
	var item_offset = $item.offset().left;
	var item_width = $item.outerWidth();
	var menu_offset = $("#menu").offset().left;
	var screen_width = $(window).width();
	return (menu_offset-item_offset)+(screen_width-item_width)/2;
};