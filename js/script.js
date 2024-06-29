// Toggle class active untuk hamburger menu
const navbarContainer = document.querySelector(".navbar");
const navbarNav = document.querySelector(".navbar-nav");

// Ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = (event) => {
  console.log("Hamburger menu clicked"); // Debugging
  navbarContainer.classList.toggle("active");
  navbarNav.classList.toggle("active");
  event.stopPropagation();
};

// Menambahkan event listener pada setiap item navigasi di navbar
document.querySelectorAll(".navbar-nav a").forEach((item) => {
  item.addEventListener("click", (event) => {
    navbarNav.classList.remove("active");
    event.stopPropagation();
  });
});

// Fade Scroll Navbar
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (!navbarNav.classList.contains("active")) {
    if (scrollTop > lastScrollTop) {
      navbar.style.top = "-120px";
    } else {
      navbar.style.top = "0";
    }
  }

  lastScrollTop = scrollTop;
});

// Odometer Animation
const countOdometer = document.querySelector(".brands-odometer");
const influencersOdometer = document.querySelector(".influencers-odometer");

// Opsi untuk Intersection Observer
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

// Fungsi yang dijalankan ketika elemen masuk ke dalam viewport
const handleIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Inisialisasi Odometer hanya ketika elemen terlihat
      if (entry.target === countOdometer) {
        const odometer1 = new Odometer({
          el: countOdometer,
        });
        countOdometer.innerHTML = 50;
      } else if (entry.target === influencersOdometer) {
        const odometer2 = new Odometer({
          el: influencersOdometer,
        });
        influencersOdometer.innerHTML = 5000;
      }

      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(handleIntersect, observerOptions);

if (countOdometer) {
  observer.observe(countOdometer);
}

if (influencersOdometer) {
  observer.observe(influencersOdometer);
}

// Graph Reveal Animation Observer
document.addEventListener("DOMContentLoaded", function () {
  var oiGraphLottie = document.querySelectorAll('.oi-graph-lottie');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.stop();
      }
    });
  }, { threshold: 0.5 });

  oiGraphLottie.forEach(lottie => {
    observer.observe(lottie);
  });
});

// Horizontally Scroll
if (typeof gsap !== 'undefined' && gsap.registerPlugin && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  const horizontalSectionWidth = document.querySelector(".wrd").scrollWidth;

  gsap.to(".wrd", {
    x: () =>
      -(horizontalSectionWidth - document.documentElement.clientWidth) + "px",
    ease: "none",
    scrollTrigger: {
      trigger: ".wrd",
      pin: true,
      start: "top top",
      end: () =>
        "+=" + (horizontalSectionWidth - document.documentElement.clientWidth),
      scrub: 0.5,
    },
  });
} else {
  console.log("GSAP or ScrollTrigger is not available");
}

// Changing Content
function changeContent(destination) {
  let content = "";
  switch (destination) {
    case "top":
      content = `
      <div class="aec-content-container top">
        <div class="left-display">
          <h5>Know Your<br/><span>Main Objective</span></h5>
          <p>Our strategy and approach will differ based on your needs and objectives.</p>
        </div>
        <div class="middle-display"></div>
        <div class="right-display">
          <p class="thin">Top of the funnel (TOFU)</p>
          <h4>Brand Awareness</h4>
          <p class="obj"><span>Objective:</span> Spreading awareness is all about introducing your brand and expanding your reach to new audiences.</p>
          <p>Key Influencer Metrics:</p>
          <ul>
            <li>Number of active influencers</li>
            <li>Number of influencer campaign & posts</li>
            <li>Influencer reach</li>
            <li>Follower growth on brand pages</li>
            <li>Ongoing user-generated content</li>
          </ul>
        </div>
      </div>
      `;
      break;
    case "middle":
      content = `
      <div class="aec-content-container middle">
        <div class="left-display">
          <h5>Know Your<br/><span>Main Objective</span></h5>
          <p>Our strategy and approach will differ based on your needs and objectives.</p>
        </div>
        <div class="right-display">
          <p class="thin">Middle of the funnel(MOFU)</p>
          <h4>Audience Nurturing</h4>
          <p class="obj"><span>Objective:</span> Engage your audience and keep them informed & educated about your product and service.</p>
          <p>Key Influencer Metrics:</p>
          <ul>
            <li>Number of active engagements</li>
            <li>Quality of influencer engagements</li>
            <li>Top-performing posts & content types</li>
            <li>Number of influencers reviews</li>
            <li>Organic social growth</li>
          </ul>
        </div>
      </div>
      `;
      break;
    case "bottom":
      content = `
      <div class="aec-content-container bottom">
        <div class="left-display">
          <h5>Know Your<br/><span>Main Objective</span></h5>
          <p>Our strategy and approach will differ based on your needs and objectives.</p>
        </div>
        <div class="right-display">
          <p class="thin">Bottom of the funnel (BOFU)</p>
          <h4>Conversion</h4>
          <p class="obj"><span>Objective:</span> Lead your audience and turn them into your customers by using your product or service.</p>
          <p>Key Influencer Metrics:</p>
          <ul>
            <li>Link clicks (Click Through Rate)</li>
            <li>Subscriptions</li>
            <li>Leads</li>
            <li>Discount code redemptions</li>
            <li>Sales</li>
            <li>ROAS on repurposed influencer generated content</li>
          </ul>
        </div>
      </div>
      `;
      break;
    default:
  }

  const contentDisplay = document.querySelector(".aec-content-display");
  contentDisplay.innerHTML = content;

  document
    .querySelectorAll(".aec-content-display .right-display")
    .forEach((el) => {
      el.classList.remove("right-display-animate");
      void el.offsetWidth;
      el.classList.add("right-display-animate");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const contentDisplay = document.querySelector(".aec-content-display");
  if (contentDisplay) {
    changeContent("top");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const funnels = document.querySelectorAll(".aec-selector .awareness-container, .aec-selector .engagement-container, .aec-selector .conversion-container");

  setInitialState(funnels);

  funnels.forEach((funnel) => {
    funnel.addEventListener("click", function () {
      funnels.forEach((f) => {
        f.style.opacity = 0.2;
        f.classList.add('bounce');
      });
      this.style.opacity = 1;
      this.classList.remove('bounce');
    });
  });

  function setInitialState(funnels) {
    funnels.forEach((funnel, index) => {
      funnel.style.opacity = index === 0 ? 1 : 0.2;
      if (index === 0) {
        funnel.classList.remove('bounce');
      } else {
        funnel.classList.add('bounce');
      }
    });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.5
  });

  const contactContainer = document.querySelector('.contact-us-container');
  observer.observe(contactContainer);
});

// Modal Box
// Highlights Modal Box
function openModalOHC1() {
  const modalOHC1 = document.getElementById('modal-ohc-1');
  modalOHC1.style.display = "block";
}

function closeModalOHC1() {
  var modal = document.getElementById('modal-ohc-1');
  modal.style.display = 'none';
}

function openModalOHC2() {
  const modalOHC2 = document.getElementById('modal-ohc-2');
  modalOHC2.style.display = "block";
}

function closeModalOHC2() {
  var modal = document.getElementById('modal-ohc-2');
  modal.style.display = 'none';
}

// Grid Modal Box
function openModalImg(imageSrcDesktop, imageSrcMobile) {
  const modalImage = document.getElementById('modalImage');
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (width <= 900) {
    modalImage.src = imageSrcMobile;
  } else {
    modalImage.src = imageSrcDesktop;
  }

  var modal = document.getElementById("modal-ogc");
  modal.style.display = "block";
}

function closeModalOGC() {
  var modal = document.getElementById('modal-ogc');
  modal.style.display = 'none';
}

// Fungsi untuk menutup modal jika klik diluar modal
window.onclick = function (event) {
  var modalOGC = document.getElementById('modal-ogc');
  if (event.target == modalOGC) {
    closeModalOGC();
  }
}

// Testimonials Swiper
document.addEventListener('DOMContentLoaded', function () {
  const swiperContainer = document.querySelector('.mySwiper');
  if (swiperContainer) {
    const mySwiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 8000,  // Jeda waktu 8 detik
        disableOnInteraction: false,  // Autoplay tidak akan berhenti ketika interaksi pengguna
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  } else {
    console.log('Swiper container not found, skipping initialization.');
  }
});

// Scroll to Top Function
var scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}