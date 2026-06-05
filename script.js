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
const AGE_VERIFIED_KEY = "vapedesconto_age_verified";

function getStoredAgeVerification() {
  try {
    return window.localStorage.getItem(AGE_VERIFIED_KEY) === "true";
  } catch (error) {
    console.warn("Age gate storage is unavailable.", error);
    return false;
  }
}

function setStoredAgeVerification() {
  try {
    window.localStorage.setItem(AGE_VERIFIED_KEY, "true");
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

document.querySelectorAll('a[href^="http"]').forEach((link) => {
  try {
    const url = new URL(link.href, window.location.href);

    if (url.origin !== window.location.origin) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  } catch (error) {
    console.warn("External link attributes could not be applied.", error);
  }
});

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
      image: "img/VapSolo-Quads-80K-Vape-Descartável-Portugal-Strawberry-Mango-Watermelon-Ice-80000-Tragadas.png",
      alt: "Modelo VapSolo Quads 80K",
      label: "Modelo apresentado",
      text: "Referencia visivel nesta pagina informativa com ligacao direta para consulta no site principal.",
      name: "VapSolo Quads 80K"
    },
    {
      image: "img/JNR-Triple-3-em-1-110K-Vape-Descartável-Portugal-Watermelon-Ice-Triple-Melon-Strawberry-Watermelon-Ice-110000-Tragadas.png",
      alt: "Modelo JNR Triple 3 em 1 110K",
      label: "Modelo apresentado",
      text: "Modelo listado entre os destaques da pagina para adultos em Portugal.",
      name: "JNR Triple 3 em 1 110K"
    },
    {
      image: "img/Fumot-Eco-2-em-1-50K-Vape-Descartável-Portugal-Banana-Ice-Black-Dragon-Ice-50000-Tragadas.png",
      alt: "Modelo Fumot Eco 2 em 1 50K",
      label: "Referencia visivel",
      text: "Opcao incluida no bloco principal de modelos apresentados nesta pagina.",
      name: "Fumot Eco 2 em 1 50K"
    },
    {
      image: "img/VapSolo-Twins-Pro-50K-Vape-Descartável-Portugal-Strawberry-kiwi-Strawberry-raspberry-chery-ice-50000-Tragadas.png",
      alt: "Modelo VapSolo Twins Pro 50K",
      label: "Referencia visivel",
      text: "Modelo disponivel na lista principal, com consulta adicional em vapeportugal.pt.",
      name: "VapSolo Twins Pro 50K"
    },
    {
      image: "img/JNR-RageGorilla-55K-Vape-Descartável-Portugal-Blueberry-Raspberry-Cherry-55000-Tragadas.png",
      alt: "Modelo JNR RageGorilla 55K",
      label: "Modelo apresentado",
      text: "Destaque visual reutilizado para resumir o conteudo da pagina sem usar citacoes de clientes.",
      name: "JNR RageGorilla 55K"
    },
    {
      image: "img/Al-Fakher-Crown-Bar-EHose-X-60K-Vape-Descartável-Portugal-berry-blue-60000-Tragadas.png",
      alt: "Modelo AlFakher E-Hose X 66K",
      label: "Referencia visivel",
      text: "Cartao informativo pensado para encaminhar a pesquisa completa para o site principal.",
      name: "AlFakher E-Hose X 66K"
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
    const label = document.createElement("div");
    const text = document.createElement("p");
    const name = document.createElement("strong");

    card.className = "testi-card";
    image.className = "testi-card__img";
    image.src = item.image;
    image.alt = item.alt;
    image.loading = "lazy";
    image.decoding = "async";
    label.className = "testi-card__stars";
    label.textContent = item.label;
    text.textContent = item.text;
    name.textContent = item.name;

    card.append(image, label, text, name);
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
