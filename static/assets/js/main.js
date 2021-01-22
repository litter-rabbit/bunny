var pageName = $('body').attr('name')

switch(pageName) {
	case 'index' : index(); break;
	case 'about' : about(); break;
	case 'service' : service(); break;
	case 'project' : project(); break;
	case 'projectShow' : projectShow(); break;
	case 'news' : news(); break;
	case 'newsShow' : newsShow(); break;
	case 'contact' : contact(); break;
	default : funDefault(); break;
}

function index() {

	// 首页顶部轮播
	var swiper1 = new Swiper('.i-banner-top .swiper-container', {
		speed: 1000,
		autoplay : {
			delay: 2000
		},
	  	pagination: {
	        el: '.i-banner-top .swiper-pagination',
	        clickable: true
	    },
	    loop: true
	});
	// 首页服务体系
	$(function() {
		$(".i-service .card-item").hover(function() {
			$(this).siblings('.card-item').children('.card-layer').addClass('card-layer-static')
		}, function() {
			$(this).siblings('.card-item').children('.card-layer').removeClass('card-layer-static')
		});
	})
}

function about() {
	console.log('in about')
}

function service() {
	// console.log('in service')
	// // 监听页面滚动
	// $(document).scroll(function(){
	// 	var scrollLength = $(document).scrollTop();
	// 	var indexSec = $('.service-parallax').offset().top;
	// 	var indexSee = window.innerHeight;
	// 	var result = indexSec - indexSee;
 //        if(scrollLength >= result){
 //        	var speed = -(scrollLength - indexSec)/3;
 //        	$('.service-parallax').css({'backgroundPosition': 'center '+ speed +'px'});	
 //        }
 //    });
}

function project() {
	console.log('in project')
}

function projectShow() {
	console.log('in projectShow')
	$.each($('.p-show-frame'),function(i,elem){
        var if_img = $(elem).children().find('img').attr('src');
        console.log(if_img);
        if(if_img == ''){
        	console.log(1);
        	$(elem).children('.p-show-img').addClass('width-0');
        	$(elem).children('.p-show-content').addClass('width-100');
        	$(elem).children('.p-show-img').css({'display':'none'});
        	$(elem).children('.p-show-img').children('img').css({'display':'none'});
        }
	});
}

function news() {
	console.log('in news')
}

function newsShow() {
	console.log('in newsShow')
}

function contact() {
	console.log('in contact')
	//表单验证
	$('.c-form-submit').click(function(){
		var num = 0;
		$.each($('.input-txt'),function(i,elem){
			var msg =  "不能为空";
			var before = $(elem).attr('data-name');
			var must = $(elem).attr('data-must');
			if($(elem).val().trim() =='' && must ==1){
				$(elem).siblings('.c-form-error').text(before+msg).addClass('error-move');
				num++;
			}
		});

		var mail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ig;
		if($(".input-email").val().trim() !== "") {
			var result = mail.test($(".input-email").val());
			if(!result) {
				num++;
				$(".input-email").val("");
				$(".input-email").siblings('.c-form-error').text('邮箱格式错误').addClass('error-move');
			}
		};

		var phone = /^\d{11,}$/;
		if($(".input-phone").val().trim() !== "") {
			var result = phone.test($(".input-phone").val());
			if(!result) {
				num++;
				$(".input-phone").val("");
				$(".input-phone").siblings('.c-form-error').text('手机格式错误').addClass('error-move');
			}
		};

		//表单提交 ajax
		if( num == 0){
			var formValue = $('.contact-form').serialize();

			$.ajax({
				url:"form.php",
				type:"POST",
				data:formValue,
				success:function(msg){
					if(msg=='succ'){					
						$(".form-succ").fadeIn();
						$("body").addClass('o-hidden');
						$(".form-succ").click(function(event){
							event.stopPropagation();
						});
						$('.form-succ-close').click(function(){
							$(".form-succ").fadeOut();
							$("body").removeClass('o-hidden');
						});
						$(document).click(function(){
							$(".form-succ").fadeOut();
							$("body").removeClass('o-hidden');
						});

						// setTimeout(function(){
						// 	$(".form-succ").fadeOut()
						// $("body").removeClass('o-hidden');
						// },3000);

						var time = setInterval(function(){
							var time_no = $('.form-succ-num').attr('data-time');
							time_no--;
							$('.form-succ-num').attr({'data-time':time_no});
							$('.form-succ-num').text(time_no);
							if( time_no == 0 ){
								clearInterval(time);
								$(".form-succ").fadeOut(function(){
									time_no = 3;
									$('.form-succ-num').attr({'data-time':time_no});
									$('.form-succ-num').text(time_no);
								});
								$("body").removeClass('o-hidden');
							}
						},1000);

						$(".input-txt").val("");
					}
				}
			});
		}
	});

	$.each($('.input-txt'),function(i,elem){
		$(elem).focus(function(){
			$(elem).siblings('.c-form-error').removeClass('error-move');
		});
	});

	// $.each($('.input-txt'),function(i,elem){
	// 	var placeholder = $(elem).attr('placeholder');
	// 	$(elem).blur(function(){
	// 		$(elem).attr({placeholder:placeholder});
	// 	});
	// })

	//下拉菜单
	$('.c-form-select').on('click', '.input-select', function(event) {
		event.stopPropagation();
		$('.input-option').slideToggle();
	});

	$(document).click(function(){
		$('.input-option').slideUp();
	});

	$.each($('.input-option div'),function(i,elem){
		var name = $(elem).text();
		$(elem).hover(function(){
			$(elem).addClass('hover-active').siblings().removeClass('hover-active');
		});
		$(elem).click(function(){
			$('.input-select span').text(name).addClass('color-change');
		});
	});
}

funDefault();

function funDefault() {

	// 监听页面滚动
	var scrollLength;
	var winWidth = window.innerWidth;;
	$(window).resize(function(event) {
		winWidth = window.innerWidth;
		if (winWidth < 768) {
        	$('.header').removeClass('fixed-top');
        	$('.section-top').removeClass('change-marTop');
		}
	});
	$(document).scroll(function(){
		scrollLength = $(document).scrollTop();
		if (winWidth > 767) {
	        if(scrollLength >= 90 && !$('.header').hasClass('fixed-top')) {
	        	$('.header').addClass('fixed-top')
	        	$('.section-top').addClass('change-marTop');
	        } else if (scrollLength < 90 && $('.header').hasClass('fixed-top')) {
	        	$('.header').removeClass('fixed-top');
	        	$('.section-top').removeClass('change-marTop');
	        }
		}
    });

    // 手机导航按钮
	var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};
	var hamburgers = document.querySelectorAll(".hamburger");
	if (hamburgers.length > 0) {
		forEach(hamburgers, function(hamburger) {
			hamburger.addEventListener("click", function() {
			this.classList.toggle("is-active");
			}, false);
		});
	}

	// 手机导航
	$('.phone-icon').click(function() {
		if($(window).width()<=767){
			$('.phone-nav').slideToggle(500);
		}
	});

	// 粒子星空


	//返回顶部
	$('#toTop').click(function(){
	  $('html,body').animate(       //执行动画，让scrollTop变为０
	        {scrollTop:0},
	        300
	    );  
	});

	// 分享
	window._bd_share_config = {
		common : {
			bdText : '慕枫建站',
			bdDesc : '慕枫建站平台专业提供高端网站建设,网站设计,企业网站制作,为广大公司客户建立高端品牌网站。',	
			bdUrl : 'http://pay.mfdemo.cn/',
			bdPic : ''
		},
		share : [{
			"bdSize" : 32
		}],
		selectShare : [{
			"bdselectMiniList" : ['sqq','tsina','weixin']
		}]
	}
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
}

