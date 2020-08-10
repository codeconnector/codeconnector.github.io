(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict

// This is used by the "Start a Meetup" navigation link.
// The purpose of this code is to avoid loading an iframe with all of the google website code (lots of requests)
// until it is absolutely needed. This improves our page load times and has the added benefit of avoiding
// google's trackers unless they are absolutely needed.
window.isMeetupIframeInserted = false;
function insertMeetupIframe() {
  if (!window.isMeetupIframeInserted) {
    var meetupIframe = document.createElement('iframe');
    meetupIframe.setAttribute('src', 'https://docs.google.com/forms/d/e/1FAIpQLSdAhGDdmwoTbGKywbp881duzGgjDFxceVdk9UTdq9SxBPp6tg/viewform?embedded=true');
    meetupIframe.setAttribute('width', '640');
    meetupIframe.setAttribute('height', '715');
    meetupIframe.setAttribute('frameborder', '0');
    meetupIframe.setAttribute('marginheight', '0');
    meetupIframe.setAttribute('marginwidth', '0');
    meetupIframe.innerHTML = 'Loading...';
    document.getElementById('meetupIframeContainer').appendChild(meetupIframe);

    window.isMeetupIframeInserted = true;
  }
}
