const ageGate = document.getElementById("ageGate");
const confirmAgeButton = document.getElementById("confirmAge");
const rejectAgeButton = document.getElementById("rejectAge");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const faqButtons = document.querySelectorAll(".faq-question");
const currentYear = document.getElementById("currentYear");
const citiesToggle = document.getElementById("cities-toggle");
const portugalCities = document.getElementById("portugal-cities");
const citiesArrow = citiesToggle?.querySelector(".footer-toggle-arrow");
const AGE_VERIFIED_KEY = "ageVerified";

function getStoredAgeVerification() {
  try {
    return window.sessionStorage.getItem(AGE_VERIFIED_KEY) === "true";
  } catch (error) {
    console.warn("Age gate storage is unavailable.", error);
    return false;
  }
}

function setStoredAgeVerification() {
  try {
    window.sessionStorage.setItem(AGE_VERIFIED_KEY, "true");
    document.documentElement.classList.add("age-verified");
  } catch (error) {
    console.warn("Age gate verification could not be persisted.", error);
  }
}

function hideAgeGate() {
  if (!ageGate) {
    return;
  }

  ageGate.classList.add("is-hidden");
  ageGate.setAttribute("aria-hidden", "true");
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (ageGate && getStoredAgeVerification()) {
  hideAgeGate();
}

if (confirmAgeButton) {
  confirmAgeButton.addEventListener("click", () => {
    setStoredAgeVerification();
    hideAgeGate();
  });
}

if (rejectAgeButton) {
  rejectAgeButton.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = button.getAttribute("aria-expanded") === "true";

    faqButtons.forEach((otherButton) => {
      otherButton.setAttribute("aria-expanded", "false");
      otherButton.closest(".faq-item")?.classList.remove("is-open");
    });

    if (!isOpen) {
      button.setAttribute("aria-expanded", "true");
      item?.classList.add("is-open");
    }
  });
});

if (citiesToggle && portugalCities) {
  portugalCities.hidden = true;

  citiesToggle.addEventListener("click", () => {
    const shouldOpen = citiesToggle.getAttribute("aria-expanded") !== "true";

    citiesToggle.setAttribute("aria-expanded", String(shouldOpen));
    portugalCities.hidden = !shouldOpen;
    portugalCities.classList.toggle("is-open", shouldOpen);

    if (citiesArrow) {
      citiesArrow.textContent = shouldOpen ? "^" : "v";
    }
  });
}

(function () {
  const animatedBenefits = document.querySelector(".benefits--animated");
  const revealItems = document.querySelectorAll(".benefits--animated .reveal-up");

  if (!animatedBenefits || !revealItems.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        revealItems.forEach((item) => item.classList.add("is-visible"));
        observer.disconnect();
      });
    },
    {
      threshold: 0.22,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  observer.observe(animatedBenefits);
})();

(function () {
  const viewport = document.getElementById("testiViewport");
  const track = document.getElementById("testiTrack");
  const prevBtn = document.getElementById("testiPrev");
  const nextBtn = document.getElementById("testiNext");
  const dotsEl = document.getElementById("testiDots");

  if (!viewport || !track || !prevBtn || !nextBtn || !dotsEl) {
    return;
  }

  const GAP = 24;
  const testimonials = [
    {
      image: "img/jnr-vape-descartavel-portugal-avaliacao.jpg",
      alt: "Avaliacao Ana S.",
      text: "\"Já experimentei vários cigarros eletrónicos mas este foi dos meus favoritos\"",
      name: "Ana S."
    },
    {
      image: "img/merrymi-vape-descartavel-portugal-avaliacao.jpg",
      alt: "Avaliacao Maria J.",
      text: "\"Um dos melhores vapers que ja usei. Muitas tragadas, bom sabor e perfeito para o dia a dia.\"",
      name: "Maria J."
    },
    {
      image: "img/vapsolo-vape-descartavel-portugal-avaliacao.jfif",
      alt: "Avaliacao Monika W.",
      text: "\"Comprei nesta vape shop e fiquei impressionada. Os vapes descartaveis sao de alta qualidade e duram bastante.\"",
      name: "Xavier W."
    },
    {
      image: "img/alfahker-vape-descartavel-portugal-avaliacao.jpg",
      alt: "Avaliacao Sofia C.",
      text: "\"Este vape Portugal tem qualidade premium. Perfeito para quem procura vapes descartaveis com muitas tragadas.\"",
      name: "Sofia C."
    },
    {
      image: "img/fumot-vape-descartavel-portugal-avaliacao.jpg",
      alt: "Avaliacao Ines T.",
      text: "\"Vape top 😮‍💨 sabor limpo, boa bateria e muitas tragadas.\"",
      name: "Ines T."
    },
    {
      image: "img/merrymi-mk20000-vape-descartavel-portugal-avaliacao.jpg",
      alt: "Avaliacao Beatriz M.",
      text: "\"Adorei este vap. Compacto, facil de usar e com excelentes sabores de vape. Recomendo a qualquer vaper.\"",
      name: "Beatriz M."
    }
  ];

  let currentIndex = 0;
  let cardsPerView = 4;
  let step = 0;

  function getCardsPerView() {
    if (window.innerWidth < 768) {
      return 1;
    }
    if (window.innerWidth < 1100) {
      return 2;
    }
    return 4;
  }

  function createCard(item) {
    const card = document.createElement("article");
    const image = document.createElement("img");
    const stars = document.createElement("div");
    const text = document.createElement("p");
    const name = document.createElement("strong");

    card.className = "testi-card";
    image.className = "testi-card__img";
    image.src = item.image;
    image.alt = item.alt;
    image.loading = "lazy";
    stars.className = "testi-card__stars";
    stars.textContent = "★★★★★";
    text.textContent = item.text;
    name.textContent = item.name;

    card.append(image, stars, text, name);
    return card;
  }

  function renderCards() {
    track.innerHTML = "";
    testimonials.forEach((item) => {
      track.appendChild(createCard(item));
    });

    const firstCard = track.querySelector(".testi-card");
    if (!firstCard) {
      return;
    }

    step = firstCard.getBoundingClientRect().width + GAP;
    updateSlider();
    renderDots();
  }

  function maxIndex() {
    return Math.max(0, testimonials.length - cardsPerView);
  }

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * step}px)`;

    dotsEl.querySelectorAll("button").forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  }

  function renderDots() {
    dotsEl.innerHTML = "";
    for (let i = 0; i <= maxIndex(); i += 1) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = i === currentIndex ? "is-active" : "";
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateSlider();
      });
      dotsEl.appendChild(dot);
    }
  }

  function syncLayout() {
    cardsPerView = getCardsPerView();
    currentIndex = Math.min(currentIndex, maxIndex());
    renderCards();
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = Math.min(maxIndex(), currentIndex + 1);
    updateSlider();
  });

  window.addEventListener("resize", syncLayout);
  syncLayout();
})();
