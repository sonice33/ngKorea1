$(document).ready(function(){
  
  //aos플러그인 시작구문
  AOS.init();  
  
  //a태그 고정
  $("#container a").click(function(event){
    event.preventDefault();
  });
  
//  $(".aaaa").click(function(){
//    $('.ui.modal').modal('show');
//  
//  });
  
  
  //모바일 메뉴
  $(".ham_menu").click(function(){
    $(".mobile_menu").slideToggle();
  });
  $(".mobile_menu .gnb_m >li").click(function(){
    $(this).children(".sub_m").slideToggle();
  });
  
  
  
  //마우스 휠 이벤트
  var cont_top = new Array();
  var scr_btn = 0;
  
  for( var i=0; i<=4; i++ ){
    cont_top[i] = $("#container > div").eq(i).offset().top;
//			console.log(cont_top[i]);	
  }
  
  $(".scr_top").click(function(){
    $("html,body").stop().animate({"scrollTop":cont_top[0]});
  });
  
  
	$(window).scroll(function(){
			
		var scr_t = $(window).scrollTop();
			
		
		for( var i=0; i<=4; i++ ){
			if( scr_t >= cont_top[i] && scr_t < cont_top[i+1] ){
					scr_btn = i;
			}else if( scr_t >= cont_top[4] ){
					scr_btn = 4;
			}	
		}
		
    //슬라이드 부분에서 감추기
    if( scr_t < cont_top[1] ){
      $(".scr_btn").hide();
			$(".scr_top").stop().animate({"opacity":"0"});
    }else{
      $(".scr_btn").stop().fadeIn();
			$(".scr_top").stop().animate({"opacity":"1"});
    }
    
		$(".scr_btn li").removeClass("on");
    $(".scr_btn li").eq(scr_btn).addClass("on"); 	
			 
		
	});
  
  //스크롤 버튼 눌렀을때
  $(".scr_btn li").click(function(){
    scr_btn = $(this).index();
    $("html,body").stop().animate({"scrollTop":cont_top[scr_btn]});
  });
  
	
	//마우스휠 플러그인 
	$("#container > div").mousewheel(function(event,delta){
			
			if( delta > 0 ){
					var prev = $(this).prev().offset().top;
					
					$("html,body").stop().animate({"scrollTop":prev},1000);
			}else if( delta < 0 ){
					var next = $(this).next().offset().top;
					
					$("html,body").stop().animate({"scrollTop":next});
			}
					
	});	
		
  
  // 헤더 서브메뉴 등장
  $(".gnb > li:nth-child(n+4)").mouseenter(function(){
    $(".sub_bg").stop().slideDown();
    $(this).children(".sub").stop().fadeIn();
  });
  
  $(".gnb > li:nth-child(n+4)").mouseleave(function(){
    $(".sub_bg").stop().slideUp();
    $(this).children(".sub").stop().fadeOut();
  });
  
	
		
	// 슬라이더 영역	
	var list =0;	
	var wid = $(".slider").width();
  var time = 500;
	first_line();
  
	$(window).resize(function(){
               
    wid = $(".slider").width();

  });
	function slider_move(){
    
    //각 슬라이드 효과
    first_line_reset();
    second_reset();
    third_reset();
    
    
		$(".panel").stop().animate({"margin-left":list * -wid},function(){
      
      if(list == 0){
        first_line();
      } 
      else if(list == 1){
        $(".panel li:nth-child(2) .slider_text").stop().animate({"right":"0px"},function(){
          $(".s2_h").stop().fadeIn(time);
          $(".s2_p").stop().fadeIn(time);
        });
      }
      else if(list == 2){
        $(".panel li:nth-child(3) .slider_text").stop().slideDown(time);
      }
      else if(list == 3){
        first_line();
      }
        
    });
    
		$(".btn_g li").removeClass("on");
		$(".btn_g li").eq(list).addClass("on");
	}
  
  //첫번째 슬라이드 인
  function first_line(){
    
    $(".top").animate({"width":"100%"},function(){
      $(".right").animate({"height":"100%"},function(){
        $(".bottom").animate({"width":"100%"},function(){
          $(".left").animate({"height":"50%"},function(){
            $(".s1_h").stop().fadeIn(time);
            $(".s1_p").stop().fadeIn(time);
          });
        });
      });
    });
    
  }
  
  //첫번째 슬라이드 아웃
  function first_line_reset(){
    
    $(".top,.bottom").css({"width":"0%"});
    $(".left,.right").css({"height":"0%"});
    $(".s1_h").hide();
    $(".s1_p").hide();
  }
  
  //두번째 슬라이드 아웃
  function second_reset(){
    $(".panel li:nth-child(2) .slider_text").css({"right":"-40%"});
    $(".s2_h").hide();
    $(".s2_p").hide();
  }
  
  //세번째 슬라이드 아웃
  function third_reset(){
    $(".panel li:nth-child(3) .slider_text").hide();
  }
  
  $(".prev").click(function(){
		
		if(list == 0){
				list = 3;
		}else{
				list--;
		}
		slider_move();
		
	});
	
  $(".next").click(function(){
		
		if(list == 3){
				list = 0;
		}else{
				list++;
		}
		slider_move();
		
	});      
  
  $(".btn_g li").click(function(){
    
    list = $(this).index();
    
    slider_move();
    
  });
  
	var auto = setInterval(function(){

		if(list == 3){
				list = 0;
		}else{
				list++;
		}
		slider_move();								 
												 
	},5000);
    
  $(".more_slider").bxSlider({
    minSlides: 3,
    maxSlides: 6,
    slideWidth: 300,
    slideMargin: 40,
    controls:false

  });
  //슬라이드4 이미지 더보기
  $(".more").click(function(){
    $(".more_pic").addClass("on");
  });
  //이미지 더보기 닫기
  $(".more_close").click(function(){
    $(".more_pic").toggleClass("on");
  });
  

  
//유투브 영상 주소 가지고와서 바뀌게 처리
  
  $(".channel_list li").click(function(){
    
//      $(this).attr("data-video","유투브 연습"); //값을 변경할때
    var video_list = $(this).attr("data-video");  //값을 가지고 올때
    $(".vid").attr("src",video_list);
    
  });
	
  $(".channel_list").bxSlider({
    minSlides: 3,
    maxSlides: 6,
    slideWidth: 400,
    slideMargin: 20
  });
  
//영상이랑 텍스트 맞추기
  var channel_num = 0;
  $(".channel_list li").click(function(){
    
    channel_num = $(this).index() -6;
    $(".text_list li").hide();
    $(".text_list li").eq(channel_num).show();
    
  });
  
  
  
//magazine 영역
  $(".maga_title li").click(function(){
    
    $(".maga_title li").removeClass("on");
    $(this).addClass("on");
    
    var title_num = $(this).index();
    $(".maga_box > li").stop().slideUp();
    $(".maga_box > li").eq(title_num).stop().slideDown();
    
  });
  
  //모달 창
  //팝업 Close 기능
  
  
  $(".close_modal1").click(function(){
    $('#myModal1').hide();    
  });
  $(".close_modal2").click(function(){
    $('#myModal2').hide();
  });
  
  $(".maga_box li:nth-child(1) ul li").click(function(){
    $("#myModal1").show();
  });
  
  $(".maga_box li:nth-child(2) ul li").click(function(){
    $("#myModal2").show();
  });
  

  //모달 텍스트1
  var index = 0;
  $(".next_button").click(function(){
    if(index == 7){
      index = 0; 
    }else{
      index++;
    }
    
    $(".mod_text_list1 li").hide();
    $(".mod_text_list1 li").eq(index).show();
  });
  $(".prev_button").click(function(){
    if(index === 0){
      index = 7; 
    }else{
      index--;
    }
    
    $(".mod_text_list1 li").hide();
    $(".mod_text_list1 li").eq(index).show();
  });
  //모달 텍스트2
  var index2 = 0;
  $(".next_button").click(function(){
    if(index2 == 7){
      index2 = 0; 
    }else{
      index2++;
    }
    
    $(".mod_text_list2 li").hide();
    $(".mod_text_list2 li").eq(index2).show();
  });
  $(".prev_button").click(function(){
    if(index2 === 0){
      index2 = 7; 
    }else{
      index2--;
    }
    
    $(".mod_text_list1 li").hide();
    $(".mod_text_list1 li").eq(index2).show();
  });
  
  //모달 슬라이드
  $(".slider_circle_10").EasySlides({'autoplay': true, 'show': 5});
  
  
  //store 영역
	$(".store_list li:nth-child(1)").mouseenter(function(){
		$(".more2").stop().animate({"right":"300px"});
	});
  
  $(".more2").mouseleave(function(){
    $(".more2").animate({"right":"500px"});
	});
  
  
  $(".store_list li:nth-child(2)").mouseenter(function(){
		$(".more1").stop().animate({"right":"600px"});
	});
  
  $(".more1").mouseleave(function(){
    $(".more1").animate({"right":"400px"});
	});
  
});