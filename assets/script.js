$(document).ready(function () {

    var _this = {

        $dom: {
            burgerMenu: $('.burger-menu'),
            hiddenNav: $('.hidden-nav'),
            closeBtn: $('.close'),
            navInner: $('.navbar__inner'),
            featuresSlider: $('.features-slider'),
            appSlider: $('.app-slider'),
            testimonialsSlider: $('.testimonials-slider'),
            scrollDownLink: $('.scroll-down-link'),
            firstName: $('#first-name'),
            lastName: $('#last-name'),
            email: $('#email'),
            phoneNumber: $('#phone-number'),
            submit: $('.btn--contact'),
            checkbox: $('.agree-artificial'),
            checkboxWrap: $('.checkbox-wrapp'),

            submitSubscribe: $('.btn__subscribe'),
            checkboxSubscribe: $('.agree-artificial--subscribe'),
            checkboxWrapSubscribe: $('.checkbox-wrapp--subscribe'),
            emailSubscribe: $('#email-subscribe'),


            lightBoxVideo: $('#js-video'),
            light: $('.light'),
            fade: $('.fade'),
            playIconWrapp: $('.play-icon-wrapp'),
            boxClose: $('.boxclose'),
            topMenu: $('#top-menu'),
            footerMenu: $('.nav--footer'),
            header: $('.header'),
            logoWrapp: $('.logo-wrapp--header'),
            navbarHeader: $('.navbar-list--header'),
            sections: $('section'),
        },
        init: function () {
            _this.events();
            _this.slide();
            _this.scroll();
            _this.onKeyDown();
            // _this.equalHeight();
        },
        events: function () {
            _this.modalToggle();
            _this.clickMouseBtn();
            _this.onKeyDown();
        },
        /**
         * Methods
         */
        onKeyDown: function() {
            window.document.onkeydown = function(e) {
                if (!e) {
                    e = event;
                }
                if (e.keyCode == 27) {
                    lightboxClose();
                }
            }
        },
        // Events on scroll
        scroll: function() {
            $(window).on("scroll", _this.headerChange);
            $(document).on("scroll", _this.onScroll);
        },
        // Events on mouse click
        clickMouseBtn: function () {
            $(_this.$dom.scrollDownLink).on('click', _this.animate);
            $(_this.$dom.submit).on('click', _this.validateForm);
            $(_this.$dom.submitSubscribe).on('click', _this.validateSubscribeForm);
            $(_this.$dom.playIconWrapp).on('click', _this.lightboxOpen);
            $(_this.$dom.fade).on('click', _this.lightboxClose);
            $(_this.$dom.boxClose).on('click', _this.lightboxClose);
            var menuItems = _this.$dom.topMenu.find("a");
            menuItems.on('click', _this.addActiveClass);
            var footerMenuItems = _this.$dom.footerMenu.find("a");
            footerMenuItems.on('click', _this.animate);
        },
        // Modal toggle functions - hidden navigation 
        modalToggle: function () {
            _this.$dom.burgerMenu.on('click', _this.showNav);
            _this.$dom.burgerMenu.one('click', _this.generateNav);
            _this.$dom.closeBtn.on('click', _this.hideNav);
        },
        showNav: function () { 
            _this.$dom.hiddenNav.addClass('navbar-active');
            $('body').css({"overflow":"hidden"});
        },
        generateNav: function () {
            var innerUl = $('.navbar-list--footer').html();
            _this.$dom.navInner.append(innerUl);
            var linkItem = $('.hidden-nav').find('a');
            linkItem.on('click', _this.hideNav);
        },
        hideNav: function () {
            _this.$dom.hiddenNav.removeClass('navbar-active');
            $("body").css({"overflow":"visible"});
        },
        // Video in lightbox functions
        lightboxOpen: function() {
            _this.$dom.light.css({"display":"block"});
            _this.$dom.fade.css({"display":"block"});
            _this.$dom.lightBoxVideo.get(0).play();
        },
        lightboxClose: function() {
            _this.$dom.light.css({"display":"none"});
            _this.$dom.fade.css({"display":"none"});
            _this.$dom.lightBoxVideo.get(0).pause();
        },
        // Animate click 
        animate: function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: $($(this).attr("href")).offset().top
            }, 'slow');
        },
        // Change header on scroll
        headerChange: function() {
            if($(document).scrollTop() > 50) {
                _this.$dom.header.css({"background-color": "#28292C"});
                _this.$dom.logoWrapp.css({"max-width": "100px"});
                _this.$dom.navbarHeader.css({"margin": "5px"});
            } else {
                _this.$dom.header.css({"background-color": "transparent"});
                _this.$dom.logoWrapp.css({"max-width": "129px"});
                _this.$dom.navbarHeader.css({"margin": "1em 0 1em 1em"});
            }
        },
        // Add active class on menu item
        addActiveClass: function(e) {
            e.preventDefault();
            $(document).off("scroll");
        
            $('.link-item').removeClass('active');
        
            let this_id = $(this).attr('href');
        
            $("[href='" + this_id + "']").addClass('active');
        
            let refElementOffsetTop = $(this_id).offset().top;
        
            $("body, html").animate({
                scrollTop: refElementOffsetTop,
            }, 400, function () {
                window.location.hash = this_id;
                $(document).on("scroll", _this.onScroll);
            });
        },
        // Add active class on menu item on scroll
        onScroll: function(event){
            var scrollPos = $(document).scrollTop();
            $('#top-menu a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                    $('#top-menu li a').removeClass("active");
                    currLink.addClass("active");
                }
                else {
                    currLink.removeClass("active");
                }
            });
        },
        // Form validation
        validateForm: function(e) {
            e.preventDefault();
            $(".error").remove();
            var bcrClr = $('.agree--contact:checked + .agree-artificial').css('background-color');

            if (_this.$dom.firstName.val() == "") {
                _this.$dom.firstName.after('<span class="error">* This field is required</span>');
              }
              if (_this.$dom.lastName.val() == "") {
                _this.$dom.lastName.after('<span class="error">* This field is required</span>');
              }
              if (_this.$dom.email.val() == "") {
                _this.$dom.email.after('<span class="error">* This field is required</span>');
              }
              if (_this.$dom.phoneNumber.val() == "") {
                _this.$dom.phoneNumber.after('<span class="error">* This field is required</span>');
              } 
              if (!bcrClr) {
                _this.$dom.checkboxWrap.after('<span class="error">* You need to agree to our privacy policy.</span>');
              }
            //   else {
            //     var regEx = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
            //     var validEmail = regEx.test(email);
            //     if (!validEmail) {
            //       $('#email').after('<span class="error">* Enter a valid email</span>');
            //     }
            //   }
        },
        validateSubscribeForm: function(e) {
            e.preventDefault();
            $(".error").remove();

            var bcrClrSubscribe = $('.agree--subscribe:checked + .agree-artificial--subscribe').css('background-color');

            if (!bcrClrSubscribe) {
                _this.$dom.checkboxWrapSubscribe.after('<span class="error">* You need to agree to our privacy policy.</span>');
              }
              if (_this.$dom.emailSubscribe.val() == "") {
                _this.$dom.checkboxWrapSubscribe.after('<span class="error">* This field is required</span>');
              }
        },
        // equalHeight: function() {
        //     $('.testimonials-slider').each(function(){  
        //         var highestBox = 0;

        //         $(this).find('.testimonial-card').each(function(){
        //             if($(this).height() > highestBox){  
        //                 highestBox = $(this).height();  
        //             }
        //         })
        //         $(this).find('.testimonial-card').height(highestBox);
        //     });    
        // },

        // Slick sliders
        slide: function () {
            $(_this.$dom.featuresSlider).slick({
                dots: false,
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                speed: 500,
                arrows: true,
                cssEase: 'linear',
                variableWidth: true,
                prevArrow:
                    `<button type='button' class='slick-arrow slick-prev slick-prev--features pull-left'>
                        <i class="fas fa-arrow-left"></i>
                    </button>`,
                nextArrow:
                    `<button type='button' class='slick-arrow slick-next slick-next--features pull-right'>
                        <i class="fas fa-arrow-right"></i>
                    </button>`,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            variableWidth: false,
                            centerMode: false
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            variableWidth: false,
                            centerMode: false,
                            speed: 500,
                            cssEase: 'linear',
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            variableWidth: false,
                            centerMode: false, 
                            speed: 500,
                            cssEase: 'linear',
                        }
                    },
                ]

            });
            $(_this.$dom.appSlider).slick({
                dots: false,
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                speed: 500,
                arrows: true,
                cssEase: 'linear',
                variableWidth: true,
                centerMode: true,
                prevArrow:
                    `<button type='button' class='slick-arrow slick-prev slick-prev--app pull-left'>
                    <i class="fas fa-arrow-left"></i>
                </button>`,
                nextArrow:
                    `<button type='button' class='slick-arrow slick-next slick-next--app pull-right'>
                    <i class="fas fa-arrow-right"></i>
                </button>`,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            variableWidth: false,
                            centerMode: false,
                            speed: 500,
                            cssEase: 'linear',
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            variableWidth: false,
                            centerMode: false,
                            speed: 500,
                            cssEase: 'linear'
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            variableWidth: false,
                            centerMode: false,
                            speed: 500,
                            cssEase: 'linear'
                        }
                    }

                ]
            });
            $(_this.$dom.testimonialsSlider).slick({
                dots: true,
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                speed: 500,
                cssEase: 'linear',
                arrows: false,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            fade: true
                        }
                    },

                ]
            });
        },
    };

    _this.init();

});
