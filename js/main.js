/* =========================
   main.js — DRT Portfolio
   ========================= */
   (function () {
    // تأكد من وجود jQuery
    if (typeof jQuery === "undefined") {
      console.error("jQuery is missing. Load js/jquery.js before main.js");
      return;
    }
  
    var $ = jQuery;
  
    /* = WOW (Animations) = */
    try { new WOW().init(); } catch (e) { /* wow optional */ }
  
    /* = Helper: get strings = */
    function getTypedStrings() {
      // جرّب تقرأ من عناصر .sub-element لو موجودة في الصفحة
      var subs = document.querySelectorAll(".sub-element");
      if (subs && subs.length) {
        return Array.from(subs).map(function (el) { return el.textContent.trim(); }).filter(Boolean);
      }
      // الافتراضي المناسب ليك
      return [
        "Network & Security Professional",
        "SOC Lead & Incident Response",
        "FortiGate • Cisco ISE • Kaspersky",
        "Problem Solver & Team Leader"
      ];
    }
  
    /* = Typed.js = */
    $(function () {
      var target = document.querySelector(".typed-target");
      if (target && typeof Typed !== "undefined") {
        new Typed(target, {
          strings: getTypedStrings(),
          typeSpeed: 50,
          backSpeed: 25,
          backDelay: 1500,
          loop: true,
          smartBackspace: true,
          cursorChar: "|"
        });
      }
    });
  
    /* = Single Page Nav + Smooth Scroll = */
    $(function () {
      var $nav = $(".templatemo-nav");
      var $links = $nav.find(".navbar-nav a[href^='#']");
      var offset = $nav.outerHeight() || 0;
  
      // لو البلجن موجود، استخدمه
      if (typeof $links.singlePageNav === "function") {
        $links.singlePageNav({
          offset: offset,
          updateHash: true,
          threshold: 120,
          speed: 500
        });
      } else {
        // بديل بسيط للسكرول الناعم
        $links.on("click", function (e) {
          var href = $(this).attr("href");
          if (href && href.startsWith("#")) {
            var $sec = $(href);
            if ($sec.length) {
              e.preventDefault();
              $("html, body").animate({ scrollTop: $sec.offset().top - offset }, 500);
            }
          }
        });
      }
  
      // فعل لينك نشِط حسب موضع السكرول
      var sections = $links.map(function () { return $(this).attr("href"); }).get();
  
      function setActiveLink() {
        var scrollPos = $(window).scrollTop() + offset + 5;
        var currentId = sections[0];
        sections.forEach(function (id) {
          var $s = $(id);
          if ($s.length && scrollPos >= $s.offset().top) currentId = id;
        });
        $links.removeClass("current");
        $links.filter("[href='" + currentId + "']").addClass("current");
      }
  
      $(window).on("scroll", setActiveLink);
      setActiveLink();
  
      // اغلق منيو الموبايل بعد الضغط
      $links.on("click", function () {
        $(".navbar-collapse").collapse("hide");
      });
    });
  
    /* = Sticky Navbar = */
    $(function () {
      var $nav = $(".templatemo-nav");
      var stickyAfter = 50; // متى يلزق
  
      function applySticky() {
        if ($(window).scrollTop() > stickyAfter) {
          $nav.addClass("sticky");
        } else {
          $nav.removeClass("sticky");
        }
      }
      $(window).on("scroll resize", applySticky);
      applySticky();
    });
  
    /* = Preloader = */
    $(window).on("load", function () {
      $("#preloader,.preloader").fadeOut(350);
    });
  
    /* = Log failed script loads (تشخيص سريع) = */
    window.addEventListener("error", function (e) {
      if (e && e.target && e.target.tagName === "SCRIPT") {
        console.error("Failed to load script:", e.target.src || e.target);
      }
    }, true);
  })();
  /* === Simple Portfolio Filter === */
(function(){
  var buttons = document.querySelectorAll('.pf-btn');
  var cards = document.querySelectorAll('#portfolio .project-card');

  function applyFilter(cat){
    cards.forEach(function(card){
      var c = card.getAttribute('data-cat');
      var show = (cat === '*') || (c === cat);
      card.parentElement.style.display = show ? '' : 'none'; // parent is the column
    });
  }

  buttons.forEach(function(btn){
    btn.addEventListener('click', function(){
      buttons.forEach(function(b){ b.classList.remove('active'); });
      this.classList.add('active');
      applyFilter(this.getAttribute('data-filter'));
    });
  });

  // default
  applyFilter('*');
})();
// Navbar scroll effect
$(window).scroll(function() {
  if ($(this).scrollTop() > 50) {
    $('.navbar').addClass('scrolled');
  } else {
    $('.navbar').removeClass('scrolled');
  }
});
// Smooth scroll
$('a[href*="#"]').on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: $($(this).attr('href')).offset().top - 50
  }, 700);
});
// Navbar scroll effect
$(window).scroll(function() {
  if ($(this).scrollTop() > 50) {
    $('.navbar').addClass('scrolled');
  } else {
    $('.navbar').removeClass('scrolled');
  }
});
