/*
Theme Name: Lunar
Description: Responsive Coming Soon Site Template
Author: Erilisdesign
Theme URI: http://erilisdesign.com/preview/themeforest/html/lunar/
Author URI: http://themeforest.net/user/erilisdesign
Version: 1.3
License: https://themeforest.net/licenses/standard
*/

(function($) {
	"use strict";

	// Vars
	var body = $('body'),
		headerNav = $('nav.header-nav'),
		headerNavElem = $('nav.header-nav li'),
		headerNavElemHome = $('nav.header-nav li a[href="#home"]'),
		navToggle = $('.nav-toggle'),
		sectionOnMenu = $('div.right-side section.on-menu'),
		rightSide = $('div.right-side'),
		preloader = $('#preloader'),
		preloaderDelay = 350,
		preloaderFadeOutTime = 800,
		btnLoadContent = $('a.load-content'),
		countdown = $('.countdown[data-countdown]');
	
	
	// Mobile
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		body.addClass('mobile');
	}

	function detectIE() {
		if (navigator.userAgent.indexOf('MSIE') != -1)
			var detectIEregexp = /MSIE (\d+\.\d+);/ // test for MSIE x.x
		else // if no "MSIE" string in userAgent
			var detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/ // test for rv:x.x or rv x.x where Trident string exists

		if (detectIEregexp.test(navigator.userAgent)){ // if some form of IE
			var ieversion=new Number(RegExp.$1) // capture x.x portion and store as a number
			if (ieversion >= 9) {
				return true;
			}
		}
		return false;
	}

	function getWindowWidth() {
		return Math.max( $(window).width(), window.innerWidth);
	}
	

	// Preloader
	function init_ED_Preloader() {
		
		// Hide Preloader
		preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
		
	}


	// Refresh Waypoints
	var refreshWaypoints_timeout;
	function refreshWaypoints() {
		clearTimeout(refreshWaypoints_timeout);
		refreshWaypoints_timeout = setTimeout(function() {
			Waypoint.refreshAll();
		}, 1000);
	}


	// Animations
	function init_ED_Animations() {
		if( !body.hasClass('mobile') ) {
			if( detectIE() ) {
				$('.animated').css({
					'display':'block',
					'visibility':'visible'
				});
			} else {
				/* Starting Animation on Load */
				$(window).on('load', function() {
					$('.onstart').each( function() {
						var elem = $(this);
						if ( !elem.hasClass('visible') ) {
							var animationDelay = elem.data('animation-delay'),
								animation = elem.data('animation');
							if ( animationDelay ) {
								setTimeout(function(){
									elem.addClass( animation + " visible" );
								}, animationDelay);
							} else {
								elem.addClass( animation + " visible" );
							}
						}
					});
				});
			}
		}
	}
	
	
	// Parallax - Working only for the sections in right side
	function init_ED_Parallax() {
		var windowHeight = window.innerHeight || document.documentElement.clientHeight,
			scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop),
			bottomWindow = scrollTop + windowHeight,
			speedDivider = 0.25;
		
		$('.parallax-background').each(function() {
			var parallaxElement = $(this),
				parallaxHeight = parallaxElement.outerHeight(),
				parallaxTop = parallaxElement.offset().top,
				parallaxBottom = parallaxTop + parallaxHeight,
				parallaxWrapper = parallaxElement.parents('.parallax-wrapper'),		
				section = parallaxElement.parents('section'),
				sectionHeight = parallaxElement.parents('section').outerHeight(),
				offSetTop = scrollTop + section[0].getBoundingClientRect().top,
				offSetPosition = windowHeight + scrollTop - offSetTop;
				
			if (offSetPosition > 0 && offSetPosition < (sectionHeight + windowHeight)) {
				var value = ((offSetPosition - windowHeight) * speedDivider);

				if (Math.abs(value) < (parallaxHeight - sectionHeight)) {
					parallaxElement.css({
						"transform" : "translate3d(0px, " + value + "px, 0px)",
						"-webkit-transform" : "translate3d(0px, " + value + "px, 0px)"
					});
				} else {
					parallaxElement.css({
						"transform" : "translate3d(0px, " + parallaxHeight - sectionHeight + "px, 0px)",
						"-webkit-transform" : "translate3d(0px, " + parallaxHeight - sectionHeight + "px, 0px)"
					});
				}
			}
		});
	};
	

	//	Backgrounds
	function init_ED_PageBackground() {
		
		// Parallax Background - only right side
		rightSide.on('scroll resize', function() {
			if(!body.hasClass('mobile')){
				init_ED_Parallax();
			}
		});
		
		// Slideshow Background
		if (body.hasClass('slideshow-background')) {
			body.vegas({
				preload: true,
				timer: false,
				delay: 5000,
				transition: 'fade',
				transitionDuration: 1000,
				slides: [
					{ src: 'demo/images/image-7.jpg' },
					{ src: 'demo/images/image-28.jpg' },
					{ src: 'demo/images/image-13.jpg' },
					{ src: 'demo/images/image-31.jpg' }
				]
			});
		}

		// Slideshow & Video Background
		if (body.hasClass('slideshow-video-background')) {
			body.vegas({
				preload: true,
				timer: false,
				delay: 5000,
				transition: 'fade',
				transitionDuration: 1000,
				slides: [
					{ src: 'demo/images/image-7.jpg' },
					{ src: 'demo/video/marine.jpg',
						video: {
							src: [
								'demo/video/marine.mp4',
								'demo/video/marine.webm',
								'demo/video/marine.ogv'
							],
							loop: false,
							mute: true
						}
					},
					{ src: 'demo/images/image-28.jpg' },
					{ src: 'demo/images/image-13.jpg' },
					{ src: 'demo/images/image-31.jpg' }
				]
			});
		}

		// Kenburns Background
		if (body.hasClass('kenburns-background')) {

			var kenburnsDisplayBackdrops = false;
			var kenburnsBackgrounds = [
				{ src: 'demo/images/image-7.jpg', valign: 'top' },
				{ src: 'demo/images/image-28.jpg', valign: 'top' },
				{ src: 'demo/images/image-13.jpg', valign: 'top' },
				{ src: 'demo/images/image-31.jpg', valign: 'top' }
			];

			body.vegas({
				preload: true,
				transition: 'swirlLeft2',
				transitionDuration: 4000,
				timer: false,
				delay: 10000,
				slides: kenburnsBackgrounds,
				walk: function (nb) {
					if (kenburnsDisplayBackdrops === true) {
						var backdrop;

						backdrop = backdrops[nb];
						backdrop.animation  = 'kenburns';
						backdrop.animationDuration = 20000;
						backdrop.transition = 'fade';
						backdrop.transitionDuration = 1000;

						body
							.vegas('options', 'slides', [ backdrop ])
							.vegas('next');
					}
				}
			});
		}

		// Youtube Video Background
		if ($('#youtube-background').length > 0) {
			var videos = [
				{videoURL: "0pXYp72dwl0", showControls:false, containment:'.overlay-video',autoPlay:true, mute:false, startAt:0,opacity:1, loop:false, showYTLogo:false, realfullscreen: true, addRaster:true}
			];

			$('.player').YTPlaylist(videos, true);
		}
		
		// Youtube Multiple Video Background
		if ($('#youtube-multiple-background').length > 0) {
			
			var videos = [
				{videoURL: "0pXYp72dwl0", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, showYTLogo:false, realfullscreen: true, addRaster:true},
				{videoURL: "9d8wWcJLnFI", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:20,opacity:1, loop:false, showYTLogo:false, realfullscreen: true, addRaster:false},
				{videoURL: "nam90gorcPs", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:20,opacity:1, loop:false, showYTLogo:false, realfullscreen: true, addRaster:true}
			];

			$('.player').YTPlaylist(videos, true);
			
		}
		
		if(body.hasClass('mobile')) {
			$('.video-wrapper, .player').css('display', 'none');	
		}
		
		// GMap Background
		if($('#gmap-background').length){
			
			var map = new GMaps({
				div: '#gmap-background',
				lat: 37.752797,
				lng: -122.409132,
				zoom: 14
			});
			
			map.addMarker({
				lat: 37.752797,
				lng: -122.409132,
				title: 'Lunar',
				infoWindow: {
					content: '<p>Lunar Agency</p>'
				}
			});
			
		}
		
		// Animated Gradient Background
		if($('#animated-gradient').length){
			animatedGradient();	
		}
		
		// Constellation Background
		if($('#constellation-background').length){
			/*
			 * requestAnimationFrame pollyfill
			 */
			if (!window.requestAnimationFrame) {
				window.requestAnimationFrame = (window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
					return window.setTimeout(callback, 1000 / 60);
				});
			}

			// Init Stats
			var stats = new Stats();
			stats.setMode(0);
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.left = '0px';
			stats.domElement.style.top = '0px';
			document.body.appendChild(stats.domElement);


			/*!
			 * Mantis.js / jQuery / Zepto.js plugin for Constellation
			 * @version 1.2.2
			 * @author Acauã Montiel <contato@acauamontiel.com.br>
			 * @license http://acaua.mit-license.org/
			 */
			(function ($, window) {
				/**
				 * Makes a nice constellation on canvas
				 * @constructor Constellation
				 */
				function Constellation (canvas, options) {
					var $canvas = $(canvas),
						context = canvas.getContext('2d'),
						defaults = {
							star: {
								color: 'rgba(255, 255, 255, .5)',
								width: 1,
								randomWidth: true
							},
							line: {
								color: 'rgba(255, 255, 255, .5)',
								width: 0.2
							},
							position: {
								x: 0, // This value will be overwritten at startup
								y: 0 // This value will be overwritten at startup
							},
							width: window.innerWidth,
							height: window.innerHeight,
							velocity: 0.1,
							length: 100,
							distance: 120,
							radius: 150,
							stars: []
						},
						config = $.extend(true, {}, defaults, options);

					function Star () {
						this.x = Math.random() * canvas.width;
						this.y = Math.random() * canvas.height;

						this.vx = (config.velocity - (Math.random() * 0.5));
						this.vy = (config.velocity - (Math.random() * 0.5));

						this.radius = config.star.randomWidth ? (Math.random() * config.star.width) : config.star.width;
					}

					Star.prototype = {
						create: function(){
							context.beginPath();
							context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
							context.fill();
						},

						animate: function(){
							var i;
							for (i = 0; i < config.length; i++) {

								var star = config.stars[i];

								if (star.y < 0 || star.y > canvas.height) {
									star.vx = star.vx;
									star.vy = - star.vy;
								} else if (star.x < 0 || star.x > canvas.width) {
									star.vx = - star.vx;
									star.vy = star.vy;
								}

								star.x += star.vx;
								star.y += star.vy;
							}
						},

						line: function(){
							var length = config.length,
								iStar,
								jStar,
								i,
								j;

							for (i = 0; i < length; i++) {
								for (j = 0; j < length; j++) {
									iStar = config.stars[i];
									jStar = config.stars[j];

									if (
										(iStar.x - jStar.x) < config.distance &&
										(iStar.y - jStar.y) < config.distance &&
										(iStar.x - jStar.x) > - config.distance &&
										(iStar.y - jStar.y) > - config.distance
									) {
										if (
											(iStar.x - config.position.x) < config.radius &&
											(iStar.y - config.position.y) < config.radius &&
											(iStar.x - config.position.x) > - config.radius &&
											(iStar.y - config.position.y) > - config.radius
										) {
											context.beginPath();
											context.moveTo(iStar.x, iStar.y);
											context.lineTo(jStar.x, jStar.y);
											context.stroke();
											context.closePath();
										}
									}
								}
							}
						}
					};

					this.createStars = function () {
						var length = config.length,
							star,
							i;

						context.clearRect(0, 0, canvas.width, canvas.height);

						for (i = 0; i < length; i++) {
							config.stars.push(new Star());
							star = config.stars[i];

							star.create();
						}

						star.line();
						star.animate();
					};

					this.setCanvas = function () {
						canvas.width = config.width;
						canvas.height = config.height;
					};

					this.setContext = function () {
						context.fillStyle = config.star.color;
						context.strokeStyle = config.line.color;
						context.lineWidth = config.line.width;
					};

					this.setInitialPosition = function () {
						if (!options || !options.hasOwnProperty('position')) {
							config.position = {
								x: canvas.width * 0.5,
								y: canvas.height * 0.5
							};
						}
					};

					this.loop = function (callback) {
						callback();

						window.requestAnimationFrame(function () {
							stats.begin(); // Only for Stats
							this.loop(callback);
							stats.end(); // Only for Stats
						}.bind(this));
					};

					this.bind = function () {
						$canvas.on('mousemove', function(e){
							config.position.x = e.pageX - $canvas.offset().left;
							config.position.y = e.pageY - $canvas.offset().top;
						});
					};

					this.init = function () {
						this.setCanvas();
						this.setContext();
						this.setInitialPosition();
						this.loop(this.createStars);
						this.bind();
					};
				}

				$.fn.constellation = function (options) {
					return this.each(function () {
						var c = new Constellation(this, options);
						c.init();
					});
				};
			})($, window);

			// Init plugin
			$('canvas').constellation({
				star: {
					color: 'rgba(255, 255, 255, .7)',
					width: 3
				},
				line: {
					color: 'rgba(255, 255, 255, .3)',
					width: 0.25
				},
				length: 210,
				distance: 120,
				radius: 700
			});
		}
		
	}
	
	// Animated Gradient
	function animatedGradient() {
		var colors = new Array(
			[62,35,255],
			[60,255,60],
			[255,35,98],
			[45,175,230],
			[255,0,255],
			[255,128,0]);

		var step = 0;
		//color table indices for: 
		// current color left
		// next color left
		// current color right
		// next color right
		var colorIndices = [0,1,2,3];

		//transition speed
		var gradientSpeed = 0.002;

		function updateGradient() {
		  
			if ( $===undefined ) return;
		  
			var c0_0 = colors[colorIndices[0]];
			var c0_1 = colors[colorIndices[1]];
			var c1_0 = colors[colorIndices[2]];
			var c1_1 = colors[colorIndices[3]];

			var istep = 1 - step;
			var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
			var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
			var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
			var color1 = "rgb("+r1+","+g1+","+b1+")";

			var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
			var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
			var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
			var color2 = "rgb("+r2+","+g2+","+b2+")";

			$('#animated-gradient')
				.css({background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"})
				.css({background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
			  
			step += gradientSpeed;
			if ( step >= 1 ) {
				step %= 1;
				colorIndices[0] = colorIndices[1];
				colorIndices[2] = colorIndices[3];
				
				//pick two new target color indices
				//do not pick the same as the current one
				colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
				colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
			}
		}
		setInterval(updateGradient,10);
	}
	

	// Navigation	
	function init_ED_WaypointsNav() {
		sectionOnMenu.each(function(){
			var section = $(this);

			var waypoints = section.waypoint(function(direction) {
				var activeSection = section.attr('id');
				
				if (direction === 'down') {
					init_ED_UpdateWaypointsNav(activeSection);
				}
				
			},{
				offset: '30%',
				context: rightSide,
			});
			
			var waypoints = section.waypoint(function(direction) {
				var activeSection = section.attr('id');
				
				if (direction === 'up') {
					init_ED_UpdateWaypointsNav(activeSection);
				}

			},{
				offset: '-30%',
				context: rightSide,
			});
							
		});
	}
	
	function init_ED_UpdateWaypointsNav(activeSection) {
		if(headerNavElemHome.parents('li').hasClass('active')){
			return true;
		}
		if(!headerNav.find('a[href="#'+ activeSection +'"]').parents('li').hasClass('active')){
			headerNavElem.removeClass('active');
			headerNav.find('a[href="#'+ activeSection +'"]').parents('li').addClass('active');
		}
	};
	
	function init_ED_Navigation() {
		btnLoadContent.off('click');
		navToggle.off('click');

		if(!(1024 >= getWindowWidth() || body.hasClass('mobile'))) {

			if(headerNav.css('display', 'none')){
				headerNav.css('display', 'table');
			}
			
			if(navToggle.hasClass('open')){
				navToggle.removeClass('open');
			}

			if(!body.hasClass('ov-active')){
				headerNavElem.removeClass('active');
				if(headerNavElemHome){
					headerNavElemHome.parents('li').addClass('active');					
				}
			}
			
			init_ED_WaypointsNav();

			btnLoadContent.on('click', function(e) {
				e.preventDefault();

				var target = $(this).attr('href');
				
				if(target == '#home'){
					if(body.hasClass('ov-active')){
						body.removeClass('ov-active');
						headerNavElem.removeClass('active');
						headerNavElemHome.parents('li').addClass('active');
					}
				} else {
					if(!body.hasClass('ov-active')){
						body.addClass('ov-active');
					}
				}
				
				if( headerNav.find('a[href="'+ target +'"]') ){
					headerNavElem.removeClass('active');
					headerNav.find('a[href="'+ target +'"]').parents('li').addClass('active');
				}
				
				// Smooth Scroll
				var sScroll = $(this),
					sScroll_target = sScroll.attr('href');				
				if(sScroll_target == null){ sScroll_target = '#'; }
				
				$.smoothScroll({
					offset: 0,
					easing: 'swing',
					speed: 800,
					scrollTarget: sScroll_target,
					scrollElement: rightSide
				});
				
				return false;
			});

		} else {
		
			if(headerNav.css('display', 'table')){
				headerNav.css('display', 'none');
			}
			
			if(navToggle.hasClass('open')){
				headerNav.css('display', 'block');
			}
		
			navToggle.on('click', function(e) {
				e.preventDefault();
				if(!$(this).hasClass('open')){
					$(this).addClass('open');
					headerNav.slideDown(500);
				} else {
					headerNav.slideUp(500);
					$(this).removeClass('open');
				}
			});
		
			// Smooth Scroll
			btnLoadContent.on('click', function(e) {
				e.preventDefault();
				
				var sScroll = $(this),
					sScroll_target = sScroll.attr('href');					
				if(sScroll_target == null){ sScroll_target = '#'; }
				
				$.smoothScroll({
					offset: 0,
					easing: 'swing',
					speed: 800,
					scrollTarget: sScroll_target
				});
				
				return false;
			});
			
		}
	}
	

	// Back button trigers animation
	function init_ED_LocationHashChanged() {
		if(!(1024 >= getWindowWidth() || body.hasClass('mobile'))){
			if (location.hash === '#home' || location.hash === '') {
				if(body.hasClass('ov-active')){
					body.removeClass('ov-active');
				}
				headerNav.find(' li').removeClass('active');
				if(headerNavElemHome){
					headerNavElemHome.parents('li').addClass('active');
				}
			} else {
				if(!body.hasClass('ov-active')){
					body.addClass('ov-active');
				}
				
				if(headerNav.find('a[href="'+ location.hash +'"]')){
					headerNavElem.removeClass('active');
					headerNav.find('a[href="'+ location.hash +'"]').parents('li').addClass('active');
				}
				
				$.smoothScroll({
					offset: 0,
					easing: 'swing',
					speed: 800,
					scrollTarget: location.hash,
					scrollElement: rightSide
				});
			}
		} else {
			$.smoothScroll({
				offset: 0,
				easing: 'swing',
				speed: 800,
				scrollTarget: location.hash
			});
		}
	}
	window.onhashchange = init_ED_LocationHashChanged;
	
	
	// Portfolio
	function init_ED_MasonryLayout() {
		if ($('.isotope-container').length > 0) {
			var $isotopeContainer = $('.isotope-container');
			var $columnWidth = $isotopeContainer.data('column-width');
			
			if($columnWidth == null){
				var $columnWidth = '.isotope-item';
			}
			
			$isotopeContainer.isotope({
				filter: '*',
				animationEngine: 'best-available',
				resizable: false,
				itemSelector : '.isotope-item',
				masonry: {
					columnWidth: $columnWidth
				},
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			}, refreshWaypoints());
		}

		$('nav.isotope-filter ul a').on('click', function() {
			var selector = $(this).attr('data-filter');
			$isotopeContainer.isotope({ filter: selector }, refreshWaypoints());
			$('nav.isotope-filter ul a').removeClass('active');
			$(this).addClass('active');
			return false;
		});

	}


	// magnificPopup
	function init_ED_MagnificPopup() {
		$('.mfp-image').magnificPopup({
			type:'image',
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});
		
		$('.mfp-gallery').each(function() {
			$(this).magnificPopup({
				delegate: 'a',
				type: 'image',
				gallery: {
					enabled: true
				},
				closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
				removalDelay: 300,
				mainClass: 'mfp-fade'
			});
		});
		
		$('.mfp-iframe').magnificPopup({
			type: 'iframe',
			iframe: {
				patterns: {
					youtube: {
						index: 'youtube.com/',
						id: 'v=',
						src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
					},
					vimeo: {
						index: 'vimeo.com/',
						id: '/',
						src: '//player.vimeo.com/video/%id%?autoplay=1'
					},
					gmaps: {
						index: '//maps.google.',
						src: '%id%&output=embed'
					}
				},
				srcAction: 'iframe_src'
			},
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});
		
		$('.mfp-ajax').magnificPopup({
			type: 'ajax',
			ajax: {
				settings: null,
				cursor: 'mfp-ajax-cur',
				tError: '<a href="%url%">The content</a> could not be loaded.'
			},
			midClick: true,
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
			removalDelay: 300,
			mainClass: 'mfp-fade',
			callbacks: {
				ajaxContentAdded: function(mfpResponse) {
					initFlexslider();
				}
			}
		});
		
		$('.open-popup-link').magnificPopup({
			type: 'inline',
			midClick: true,
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});
	}
	
	// Flexslider
	function init_ED_Flexslider() {
		
		if ($('.bt-flexslider').length > 0) {			
			$('.bt-flexslider').each(function() {
				var $flexsSlider = $(this),
					fs_effect = $flexsSlider.data('effect'),
					fs_easing = $flexsSlider.data('easing'),
					fs_direction = $flexsSlider.data('direction'),
					fs_loop = $flexsSlider.data('loop'),
					fs_smoothHeight = $flexsSlider.data('smooth-height'),
					fs_startAt = $flexsSlider.data('startat'),
					fs_slideshowSpeed = $flexsSlider.data('slideshow-speed'),
					fs_animationSpeed = $flexsSlider.data('animation-speed'),
					fs_randomize = $flexsSlider.data('randomize'),
					fs_video = $flexsSlider.data('video'),
					fs_pagination = $flexsSlider.data('pagination'),
					fs_directionNav = $flexsSlider.data('directionnav'),
					fs_keyboard = $flexsSlider.data('keyboard'),
					fs_pausePlay = $flexsSlider.data('pause-play');
				
				if(fs_effect == null){ fs_effect = 'slide'; }
				if(fs_easing == null){ fs_easing = 'swing'; }
				if(fs_direction == null){ fs_direction = 'horizontal'; }
				if(fs_loop == null){ fs_loop = true; }
				if(fs_smoothHeight == null){ fs_smoothHeight = false; }
				if(fs_startAt == null){ fs_startAt = 0; }
				if(fs_slideshowSpeed == null){ fs_slideshowSpeed = 7000; }
				if(fs_animationSpeed == null){ fs_animationSpeed = 700; }
				if(fs_randomize == null){ fs_randomize = false; }	
				if(fs_video == null){ fs_video = false; }
				if(fs_pagination == null){ fs_pagination = true; }
				if(fs_directionNav == null){ fs_directionNav = true; }
				if(fs_keyboard == null){ fs_keyboard = false; }
				if(fs_pausePlay == null){ fs_pausePlay = false; }
				
				$flexsSlider.flexslider({
					selector: ".slides > div.flex-slide",
					animation: ''+ fs_effect +'',
					easing: ''+ fs_easing +'',
					direction: ''+ fs_direction +'',
					animationLoop: fs_loop,
					smoothHeight: fs_smoothHeight,
					startAt: fs_startAt,
					slideshow: true,
					slideshowSpeed: fs_slideshowSpeed,
					animationSpeed: fs_animationSpeed,
					randomize: fs_randomize,
					pauseOnAction: true,
					pauseOnHover: false,
					video: fs_video,
					controlNav: fs_pagination,
					directionNav: fs_directionNav,
					prevText: "<i class='fa fa-angle-left'></i>",
					nextText: "<i class='fa fa-angle-right'></i>",
					keyboard: fs_keyboard,
					pausePlay: fs_pausePlay,
					pauseText: 'Pause',
					playText: 'Play'
				});
			});
		}
		
	}
	
	function init_ED_Plugins() {
	
		// Responsive Video - FitVids
		$('.video-container').fitVids();
		
		// Countdown
		if (countdown.length > 0) {			
			countdown.each(function() {
				var $countdown = $(this),
					finalDate = $countdown.data('countdown');
				$countdown.countdown(finalDate, function(event) {
					$countdown.html(event.strftime(
						'<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div><div class="counter-box"><div class="number">%H</div><span>Hours</span></div><div class="counter-box"><div class="number">%M</div><span>Minutes</span></div><div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'
					));
				});
			});
		}

		// Placeholder
		$('input, textarea').placeholder();
		
		// Tooltip
		$('[data-toggle="tooltip"]').tooltip();
		
		// Popover
		$('[data-toggle="popover"]').popover();
		
		// Morphext
		$('.text-rotate').Morphext({
			animation: 'fadeIn',
			separator: '|',
			speed: 3000
		});
	
	}
	
	
	// Photoswipe
	function init_ED_PhotoSwipe() {
		
		var initPhotoSwipeFromDOM = function(gallerySelector) {

			var parseThumbnailElements = function(el) {
			    var thumbElements = el.childNodes,
			        numNodes = thumbElements.length,
			        items = [],
			        articleEl,
			        childElements,
			        linkEl,
			        size,
			        item;

			    for(var i = 0; i < numNodes; i++) {
					
			        articleEl = thumbElements[i];

			        // include only element nodes 
			        if(articleEl.nodeType !== 1) {
						continue;
			        }

			        linkEl = articleEl.children[0].children[0];
			        size = linkEl.getAttribute('data-size').split('x');

			        // create slide object
			        item = {
						src: linkEl.getAttribute('href'),
						w: parseInt(size[0], 10),
						h: parseInt(size[1], 10)
			        };

					item.title = true;			
			        item.el = articleEl; // save link to element for getThumbBoundsFn

					if(articleEl.children[0].children.length > 1) {
						item.details = articleEl.children[0].children[1].outerHTML; // caption (contents of figure)
					}
					
			        if(linkEl.children.length > 0) {
						item.msrc = linkEl.children[0].getAttribute('src'); // thumbnail url
			        }

		          	// original image
		          	item.o = {
		          		src: item.src,
		          		w: item.w,
		          		h: item.h
		          	};

			        items.push(item);
			    }

			    return items;
			};

			// find nearest parent element
			var closest = function closest(el, fn) {
			    return el && ( fn(el) ? el : closest(el.parentNode, fn) );
			};

			var onThumbnailsClick = function(e) {
			    e = e || window.event;
			    e.preventDefault ? e.preventDefault() : e.returnValue = false;

			    var eTarget = e.target || e.srcElement;

			    var clickedListItem = closest(eTarget, function(el) {
			        return el.tagName === 'ARTICLE';
			    });

			    if(!clickedListItem) {
			        return;
			    }

			    var clickedGallery = clickedListItem.parentNode,
					childNodes = clickedListItem.parentNode.childNodes,
			        numChildNodes = childNodes.length,
			        nodeIndex = 0,
			        index;

			    for (var i = 0; i < numChildNodes; i++) {
			        if(childNodes[i].nodeType !== 1) { 
			            continue; 
			        }

			        if(childNodes[i] === clickedListItem) {
			            index = nodeIndex;
			            break;
			        }
			        nodeIndex++;
			    }

			    if(index >= 0) {
			        openPhotoSwipe( index, clickedGallery );
			    }
			    return false;
			};

			var photoswipeParseHash = function() {
				var hash = window.location.hash.substring(1),
			    params = {};

			    if(hash.length < 5) { // pid=1
			        return params;
			    }

			    var vars = hash.split('&');
			    for (var i = 0; i < vars.length; i++) {
			        if(!vars[i]) {
			            continue;
			        }
			        var pair = vars[i].split('=');  
			        if(pair.length < 2) {
			            continue;
			        }           
			        params[pair[0]] = pair[1];
			    }

			    if(params.gid) {
			    	params.gid = parseInt(params.gid, 10);
			    }

			    return params;
			};

			var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
			    var pswpElement = document.querySelectorAll('.pswp')[0],
			        gallery,
			        options,
			        items;

				items = parseThumbnailElements(galleryElement);

			    // Define options
			    options = {
					
					// Core
					index: index,
					getThumbBoundsFn: function(index) {
			            // See Options->getThumbBoundsFn section of docs for more info
			            var thumbnail = items[index].el.children[0],
			                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
			                rect = thumbnail.getBoundingClientRect(); 

			            return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
			        },
					bgOpacity: 0.97,
					loop: true,
					closeOnScroll: false,
					history: false,
			        galleryUID: galleryElement.getAttribute('data-pswp-uid'),
			        focus: false,
					modal: false,
					
					// UI
			        addCaptionHTMLFn: function(item, captionEl, isFake) {
						if(!item.details) {
							captionEl.children[0].innerText = '';
							return false;
						}
						captionEl.children[0].innerHTML = item.details;
						return true;
			        },
					
					// Buttons/elements
					closeEl: true,
					captionEl: true,
					fullscreenEl: true,
					zoomEl: true,
					shareEl: true,
					counterEl: true,
					arrowEl: true,
					preloaderEl: true
			    };

			    // Exit if index not found
			    if( isNaN(options.index) ) {
			    	return;
			    }

			    if(disableAnimation) {
			        options.showAnimationDuration = 0;
			    }

			    // Pass data to PhotoSwipe and initialize it
			    gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

			    // see: http://photoswipe.com/documentation/responsive-images.html
				var realViewportWidth,
				    useLargeImages = false,
				    firstResize = true,
				    imageSrcWillChange;

				gallery.listen('beforeResize', function() {

					var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
					dpiRatio = Math.min(dpiRatio, 2.5);
				    realViewportWidth = gallery.viewportSize.x * dpiRatio;


				    if(realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200 ) {
				    	if(!useLargeImages) {
				    		useLargeImages = true;
				        	imageSrcWillChange = true;
				    	}			        
				    } else {
				    	if(useLargeImages) {
				    		useLargeImages = false;
				        	imageSrcWillChange = true;
				    	}
				    }

				    if(imageSrcWillChange && !firstResize) {
				        gallery.invalidateCurrItems();
				    }

				    if(firstResize) {
				        firstResize = false;
				    }

				    imageSrcWillChange = false;

				});

				gallery.listen('gettingData', function(index, item) {
				    if( useLargeImages ) {
				        item.src = item.o.src;
				        item.w = item.o.w;
				        item.h = item.o.h;
				    } else {
				        item.src = item.o.src;
				        item.w = item.o.w;
				        item.h = item.o.h;
				    }
				});

			    gallery.init();
			};

			// select all gallery elements
			var galleryElements = document.querySelectorAll( gallerySelector );
			for(var i = 0, l = galleryElements.length; i < l; i++) {
				galleryElements[i].setAttribute('data-pswp-uid', i+1);
				galleryElements[i].onclick = onThumbnailsClick;
			}

			// Parse URL and open gallery if it contains #&pid=3&gid=1
			var hashData = photoswipeParseHash();
			if(hashData.pid && hashData.gid) {
				openPhotoSwipe( hashData.pid,  galleryElements[ hashData.gid - 1 ], true, true );
			}
		};

		initPhotoSwipeFromDOM('.portfolio-gallery');
		
	}
		
	function init_ED_Mailchimp() {
		$('.mailchimp-form').ajaxChimp({
			callback: mailchimpCallback,
			url: "mailchimp-post-url" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
		});

		function mailchimpCallback(resp) {
			 if (resp.result === 'success') {
				$('.success-message').html(resp.msg).fadeIn(1000);
				$('.error-message').fadeOut(500);		
			} else if(resp.result === 'error') {
				$('.error-message').html(resp.msg).fadeIn(1000);
			}  
		}

		$('#email').focus(function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});

		$('#email').on('keydown', function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});

		$("#email").on('click', function() {
			$("#email").val('');
		});
	}


	// Contact Form
	function init_ED_ContactForm() {
		var $contactForm = $('.contact-forn');
		if( $contactForm.length < 1 ){ return true; }

		$contactForm.each( function(){
			var element = $(this),
				elementAlert = element.attr('data-alert-type'),
				elementResult = element.find('.contact-form-result');

			element.find('form').validate({
				submitHandler: function(form) {
					elementResult.hide();

					$(form).ajaxSubmit({
						target: elementResult,
						dataType: 'json',
						success: function( data ) {
							elementResult.html( data.message ).fadeIn( 400 );
							if( data.alert != 'error' ) { $(form).clearForm(); }
						}
					});
				}
			});

		});
	}
	
	
	// Google Maps
	function init_ED_GMaps() {
		
		$('.gmap').each(function() {
			var el = $(this),
				height = el.data('height');
				
			el.css({
				'height': ''+ height +'px'
			});
		});
		
		if($('#gmap-contact').length){
			
			var map = new GMaps({
				div: '#gmap-contact',
				lat: 37.752797,
				lng: -122.409132,
				zoom: 14
			});
			
			map.addMarker({
				lat: 37.752797,
				lng: -122.409132,
				title: 'Lunar',
				infoWindow: {
					content: '<p>Lunar Agency</p>'
				}
			});
			
		}
	}

	
	// WINDOW LOAD FUNCTION
	$(window).on('load', function() {
		init_ED_LocationHashChanged();
		init_ED_Preloader();
		init_ED_MasonryLayout();
		
		// For parallax background
		var resizeTimer;
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			rightSide.trigger('resize');
		}, 100);
	});
	
	// DOCUMENT.READY FUNCTION
	jQuery(document).ready(function($) {
		init_ED_Animations();
		init_ED_PageBackground();
		init_ED_Navigation();
		init_ED_MagnificPopup();
		init_ED_Flexslider();
		init_ED_Plugins();
		init_ED_PhotoSwipe();
		init_ED_Mailchimp();
		init_ED_ContactForm();
		init_ED_GMaps();
	});
	
	// WINDOW.RESIZE FUNCTION
	$(window).on('resize', function () {
		init_ED_Navigation();
		init_ED_MasonryLayout();
	});

})(jQuery);

//Google Tracking Code
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-84802319-1', 'auto');
ga('send', 'pageview');