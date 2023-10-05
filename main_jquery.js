$(document).ready(function () {
  //Cuộn trang section box
  const sections = $(".box");
  const navHeight = $(".header__menu").height();
  let isScrolling = false;

  $(window).on("wheel", function (e) {
    if (!isScrolling) {
      isScrolling = true;

      const delta = e.originalEvent.deltaY || e.originalEvent.detail * -40;
      let currentIndex = getCurrentIndex();

      if (delta > 0 && currentIndex < sections.length - 1) {
        currentIndex++;
      } else if (delta < 0 && currentIndex > 0) {
        currentIndex--;
      }

      const nextSectionTop = sections.eq(currentIndex).offset().top;

      $("html, body").animate(
        {
          scrollTop: nextSectionTop - navHeight,
        },
        600,
        function () {
          isScrolling = false;
        }
      );
    }
  });

  function getCurrentIndex() {
    let currentIndex = -1;

    sections.each(function (index) {
      const sectionTop = $(this).offset().top;
      const windowHeight = $(window).height();
      const scrollTop = $(window).scrollTop();

      if (scrollTop >= sectionTop - windowHeight / 2) {
        currentIndex = index;
      }
    });

    return currentIndex;
  }

  const navItems = $(".header__nav--menu li a");

  $(window).on("scroll", function () {
    const scrollPosition = $(window).scrollTop() + $(window).height() / 2;

    sections.each(function () {
      const currentSection = $(this);
      const sectionTop = currentSection.offset().top;
      const sectionBottom = sectionTop + currentSection.outerHeight();

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        sections.removeClass("active");
        currentSection.addClass("active");

        navItems.removeClass("active");
        const targetNavLink = navItems.filter(
          `[href="#${currentSection.attr("id")}"]`
        );
        targetNavLink.addClass("active");
      }
    });
  });

  //Mượt mà arrow
  $("#scroll-arrow").click(function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $("#section1").offset().top,
      },
      600
    ); // Điều chỉnh thời gian để thích hợp với tốc độ di chuyển
  });

  // chuyển trang email
  $("#email-link").click(function (e) {
    window.location.href = "mailto:longnhat.it.dev@gmail.com";
  });

  // click avt cuộn lên
  $(".header__avt").click(function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  // click link nav
  $("ul.header__nav--menu li a").on("click", function (event) {
    event.preventDefault();
    var targetSection = $(this).attr("href");
    var navHeight = $(".header__menu").height(); // Lấy chiều cao của thanh menu
    $("html, body").animate(
      {
        scrollTop: $(targetSection).offset().top - navHeight, // Trừ đi chiều cao của thanh menu
      },
      600
    );
  });

  //  open__send--mess active
  $(".btn__open--email").click(function () {
    $(".form__email").toggleClass("active");
    $(".modal__email .bg-modal").addClass("active");
  });

  $(".btn__close--modal").click(function () {
    $(".form__email").removeClass("active");
    $(".modal__email .bg-modal").removeClass("active");
  });
  $(".modal__email .bg-modal").click(function () {
    $(this).removeClass("active");
    $(".form__email").removeClass("active");
  });
  // fix lỗi chuyển tab lời vảm ơn
  $("#emailForm").submit(function (event) {
    // Ẩn form và hiện thông báo cảm ơn
    $("#emailForm").hide();
    $("#thankYouMessage").show();
  });

  // Xử lý sự kiện change cho dark mode toggle
  $("#dark__mode--toggle").change(function (e) {
    e.preventDefault();
    const isDarkMode = $(this).is(":checked");
    if (isDarkMode) {
      $("#dark__mode--box").addClass("night");
    } else {
      $("#dark__mode--box").removeClass("night");
    }

    // Toggle class dark-mode cho body
    $("#body__home").toggleClass("dark-mode", isDarkMode);
  });

  // Background animation
  $(document).ready(function () {
    const emojis = ["📚", "🧠", "🎓", "📊", "📐", "✏️", "🖋️", "📈"];
    const emojis_setBlue = ["🔵", "🔵", "🔵", "🔵", "🔵", "🔵", "🔵"];
    const emojis_setTech = ["💻", "🖥️", "📱", "⌨️", "💾", "🖱️", "🕹️", "🔌"];
    const emojis_setNature = ["🌳", "🌻", "🌦️", "🌈", "🍁", "🌿", "🌊", "🏞️"];
    const emojis_setArt = ["🎨", "🖌️", "🖼️", "🎭", "🎵", "🎬", "🎤", "🎧"];
    const emojis_setSpace = ["🌕", "🌠", "🚀", "💫", "🛰️", "🪐", "🌌", "🌟"];
    const emojis_setFitness = ["💪", "🏋️", "🧘", "🚴", "🥗", "🏃", "🏊", "⛹️"];

    function randomEmoji() {
      return emojis[Math.floor(Math.random() * emojis.length)];
    }

    function createGrid() {
      const container = $(".bg__animation");

      for (let i = 0; i < 100; i++) {
        const emojiDiv = $("<div>").addClass("emoji");
        emojiDiv.text(randomEmoji());
        const delay = Math.random() * 2;

        if (Math.random() > 0.5) {
          emojiDiv.addClass("show-emoji");
        }

        emojiDiv.css("animation-delay", `${delay}s`);
        container.append(emojiDiv);
      }
    }

    function updateGrid() {
      const emojisDivs = $(".bg__animation .emoji.show-emoji");
      emojisDivs.each(function () {
        $(this).text(randomEmoji());
      });
    }

    function start() {
      alert("Starting the journey of education!");
    }

    createGrid();
    setInterval(updateGrid, 10000);
  });
});

// bg animation 2
let particleCount = 0;
const maxParticles = 50; // Số lượng hạt tối đa

function getRandomSpawnLocation($parentElement) {
  const spawnLocationX = Math.round(
    Math.random() * $parentElement.width() - 80
  );
  const spawnLocationY = Math.round(
    Math.random() * $parentElement.height() - 80
  );
  return [spawnLocationX + "px", spawnLocationY + "px"];
}

function animate() {
  if (particleCount < maxParticles) {
    const $particle = $("<div>").addClass("sparkle");
    const [left, top] = getRandomSpawnLocation($(".bg__animation2"));
    $particle.css({ left, top });
    $(".bg__animation2").append($particle);

    $particle.on("animationend", function () {
      $(this).remove();
      particleCount--;
    });

    particleCount++;
  }
}

function animateLoop() {
  animate();
  window.requestAnimationFrame(animateLoop);
}

$(document).ready(function () {
  animateLoop();
});

$(document).ready(function () {
  // Education & Skills
  $(".education__contol").click(function () {
    $(".education__content").addClass("active");
    $(".skills__content").removeClass("active");
    $(".education__contol").addClass("active");
    $(".skills__contol").removeClass("active");
  });

  $(".skills__contol").click(function () {
    $(".skills__content").addClass("active");
    $(".education__content").removeClass("active");
    $(".skills__contol").addClass("active");
    $(".education__contol").removeClass("active");
  });

  // slick slider
  $(".slider__work").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    prevArrow:
      '<button class="slide-arrow prev-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg></button>',
    nextArrow:
      '<button class="slide-arrow next-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  });
});

$(".slider").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  dots: true,
  centerMode: true,
  variableWidth: true,
  infinite: true,
  focusOnSelect: true,
  cssEase: "linear",
  touchMove: true,
  prevArrow: '<button class="slick-prev"> < </button>',
  nextArrow: '<button class="slick-next"> > </button>',

  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        slidesToShow: 3,
      },
    },
  ],
});

var imgs = $(".slider img");
imgs.each(function () {
  var item = $(this).closest(".item");
  item.css({
    "background-image": "url(" + $(this).attr("src") + ")",
    "background-position": "center",
    "-webkit-background-size": "cover",
    "background-size": "cover",
  });
  $(this).hide();
});

// cuộn cuối tran active
$(window).scroll(function () {
  const scrollTopHtml = $("html").scrollTop();
  const windowHeight = $(window).height();
  const documentHeight = $(document).height();

  // Kiểm tra khi người dùng cuộn đến cuối trang (trừ đi 20px)
  if (scrollTopHtml + windowHeight >= documentHeight - 20) {
    // Đã cuộn đến cuối trang, thêm class "active" cho footer
    $("footer").addClass("active");
  } else {
    // Chưa cuộn đến cuối trang, loại bỏ class "active" cho footer
    $("footer").removeClass("active");
  }
});

// anomation 6
const maxWidth = window.screen.width;
const maxHeight = window.screen.height;

function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function Shadows(amount) {
  let shadow = "";
  for (let i = 0; i < amount; i++) {
    shadow +=
      Random(0, maxWidth) +
      "px " +
      Random(0, maxHeight) +
      "px " +
      "rgb(255," +
      Random(0, 256) +
      "," +
      Random(0, 256) +
      "), ";
  }
  shadow +=
    Random(0, maxWidth) +
    "px " +
    Random(0, maxHeight) +
    "px " +
    "rgb(255," +
    Random(0, 256) +
    "," +
    Random(0, 256) +
    ")";
  return shadow;
}

for (let i = 1; i <= 3; i++) {
  document.documentElement.style.setProperty("--shadows" + i, Shadows(100));
}

// menu mobile
$(document).on("click", ".menu__mobile .toggle", function () {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
  } else {
    $(this).addClass("active");
  }
});
$(".menu__mobile .toggle").click(function (e) {
  e.preventDefault();
  $(".header__nav").toggleClass("show");
  $(".header__menu").toggleClass("active");
});
$(".header__menu .header__nav::after").click(function (e) {
  e.preventDefault();
  $(".header__menu").removeClass("active");
  $(".header__nav").removeClass("show");
});

$(".header__menu .header__nav--menu li a").click(function (e) {
  e.preventDefault();
  $(".header__menu").removeClass("active");
  $(".header__nav").removeClass("show");
  $(".menu__mobile svg").removeClass("active");
});
$(".menu__mobile h1 a").click(function (e) {
  e.preventDefault();
  $(".header__menu").removeClass("active");
  $(".header__nav").removeClass("show");
  $(".menu__mobile svg").removeClass("active");
});

//text animation hiệu ứng viết chữ
const textArray = [
  "Hello esteemed employers, welcome to my introductory website.",
  "My future aspiration is to become a Front-End Developer.",
  "All my information is below.",
];
let index = 0;

function typeText() {
  const typingContainer = $("#typing-text");
  typingContainer.text("");
  let currentText = textArray[index];

  let i = 0;
  const typingInterval = setInterval(() => {
    typingContainer.text(typingContainer.text() + currentText[i]);
    i++;

    if (i === currentText.length) {
      clearInterval(typingInterval);
      setTimeout(eraseText, 1000);
    }
  }, 100);
}

function eraseText() {
  const typingContainer = $("#typing-text");
  let currentText = typingContainer.text();

  let i = currentText.length - 1;
  const erasingInterval = setInterval(() => {
    typingContainer.text(currentText.substring(0, i));
    i--;

    if (i < 0) {
      clearInterval(erasingInterval);
      index = (index + 1) % textArray.length;
      setTimeout(typeText, 500);
    }
  }, 100);
}

$(document).ready(() => {
  typeText();
});
