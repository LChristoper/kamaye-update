// Toggle class active untuk hamburger menu
const navbarContainer = document.querySelector(".navbar");
const navbarNav = document.querySelector(".navbar-nav");

// Ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = (event) => {
  console.log("Hamburger menu clicked"); // Debugging
  navbarContainer.classList.toggle("active");
  navbarNav.classList.toggle("active");
  event.stopPropagation(); // Menghentikan event agar tidak terpropagasi ke document
};

// Menambahkan event listener pada setiap item navigasi di navbar
document.querySelectorAll(".navbar-nav a").forEach((item) => {
  item.addEventListener("click", (event) => {
    // Tutup navbar-nav setelah item navigasi diklik
    navbarNav.classList.remove("active");
    event.stopPropagation(); // Menghentikan event agar tidak terpropagasi ke document
  });
});

// Fade Scroll Navbar
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Cek apakah navbar-nav tidak memiliki kelas 'active'
  if (!navbarNav.classList.contains("active")) {
    if (scrollTop > lastScrollTop) {
      navbar.style.top = "-120px"; // Sesuaikan dengan tinggi navbar Anda
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
  root: null, // menggunakan viewport sebagai area konteks
  rootMargin: "0px",
  threshold: 0.1, // elemen harus terlihat minimal 10% sebelum trigger
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

      // Berhenti mengamati setelah odometer diinisialisasi
      observer.unobserve(entry.target);
    }
  });
};

// Membuat observer dengan fungsi callback dan opsi
const observer = new IntersectionObserver(handleIntersect, observerOptions);

// Memulai mengamati elemen target jika elemen tersebut ada di halaman
if (countOdometer) {
  observer.observe(countOdometer);
}

if (influencersOdometer) {
  observer.observe(influencersOdometer);
}

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
      scrub: 0.5, // Mengurangi nilai scrub untuk mengurangi sensitivitas
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
    // Add more cases as needed
    default:
  }

  const contentDisplay = document.querySelector(".aec-content-display");
  contentDisplay.innerHTML = content;

  // Find all .right-display elements within the newly added content and add the animation class
  document
    .querySelectorAll(".aec-content-display .right-display")
    .forEach((el) => {
      el.classList.remove("right-display-animate"); // Remove the class to reset the animation
      // Trigger reflow to restart the animation
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
      // Reset opacity for all funnels
      funnels.forEach((f) => {
        f.style.opacity = 0.2;
        f.classList.add('bounce'); // Ensure bounce is added when not active
      });
      // Set the clicked funnel's opacity to 1 and remove bounce
      this.style.opacity = 1;
      this.classList.remove('bounce');
    });
  });

  function setInitialState(funnels) {
    // Set the first funnel's opacity to 1 and the rest to 0.2
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


document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.5 // Trigger ketika 50% dari elemen masuk ke dalam viewport
  });

  const contactContainer = document.querySelector('.contact-us-container');
  observer.observe(contactContainer);
});

// Swiper Case Studies
const swiper = new Swiper('.swiper', {
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    430: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    430: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }
});

// Modal Box
function openModal(imageSrc) {
  var modal = document.getElementById("Modal");
  var modalImg = document.getElementById("modalImage");
  modal.style.display = "block";
  modalImg.src = imageSrc;
}

function closeModal() {
  var modal = document.getElementById("Modal");
  modal.style.display = "none";
}