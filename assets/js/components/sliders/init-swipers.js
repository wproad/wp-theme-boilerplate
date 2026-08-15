import Swiper from "swiper";
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";

const defaultCommonSwiperConfig = {
  slidesPerView: "auto",
  watchOverflow: true,
  modules: [FreeMode],
  freeMode: true,
  breakpoints: {
    0: {
      spaceBetween: 8,
    },
    768: {
      spaceBetween: 12,
    },
  },
};

const defaultCarouselSwiperConfig = {
  slidesPerView: 1,
  spaceBetween: 12,
  watchOverflow: true,
  modules: [Navigation, Pagination, Autoplay, FreeMode],
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    type: "bullets",
  },
  freeMode: true,
};

const defaultGalleryThumbsConfig = {
  spaceBetween: 8,
  slidesPerView: 4.5,
  freeMode: true,
  watchSlidesProgress: true,
  modules: [FreeMode, Thumbs],
};

const defaultGalleryMainConfig = {
  spaceBetween: 8,
  modules: [Navigation, Pagination, Thumbs],
  navigation: {
    nextEl: null,
    prevEl: null,
  },
  pagination: {
    el: null,
    clickable: true,
    type: "bullets",
  },
  thumbs: {
    swiper: null,
  },
};

function deepMerge(defaultConfig, customConfig) {
  const merged = { ...defaultConfig };

  for (const key in customConfig) {
    if (
      customConfig[key] &&
      typeof customConfig[key] === "object" &&
      !Array.isArray(customConfig[key]) &&
      !(customConfig[key] instanceof Swiper)
    ) {
      merged[key] = deepMerge(merged[key] || {}, customConfig[key]);
    } else {
      merged[key] = customConfig[key];
    }
  }

  return merged;
}

function resolveElement(element) {
  return typeof element === "string" ? document.querySelector(element) : element;
}

function claimInit(el, datasetKey = "initialized") {
  if (!el || el.dataset[datasetKey]) return false;
  el.dataset[datasetKey] = "true";
  return true;
}

/**
 * Initialize a single free-mode / auto-width swiper.
 * @param {HTMLElement|string} element
 * @param {Object} customConfig
 * @returns {Swiper|null}
 */
export function initCommonSwiper(element, customConfig = {}) {
  const swiperEl = resolveElement(element);
  if (!claimInit(swiperEl)) return null;

  return new Swiper(swiperEl, deepMerge(defaultCommonSwiperConfig, customConfig));
}

/**
 * Initialize a single carousel (navigation, pagination, optional autoplay).
 * @param {HTMLElement|string} element
 * @param {Object} customConfig
 * @returns {Swiper|null}
 */
export function initCarouselSwiper(element, customConfig = {}) {
  const swiperEl = resolveElement(element);
  if (!claimInit(swiperEl)) return null;

  return new Swiper(swiperEl, deepMerge(defaultCarouselSwiperConfig, customConfig));
}

/**
 * Initialize a thumbs + main gallery pair inside a wrapper.
 * @param {HTMLElement|string} wrapperElement
 * @param {Object} customConfig - thumbsSelector, swiperSelector, thumbsConfig, mainConfig, initialSlide
 * @returns {{ thumbs: Swiper, main: Swiper }|null}
 */
export function initGallerySwiper(wrapperElement, customConfig = {}) {
  const wrapper = resolveElement(wrapperElement);
  if (!claimInit(wrapper, "galleryInitialized")) return null;

  const thumbsSelector = customConfig.thumbsSelector || ".galleryThumbs";
  const swiperSelector = customConfig.swiperSelector || ".gallerySwiper";
  const thumbsEl = wrapper.querySelector(thumbsSelector);
  const swiperEl = wrapper.querySelector(swiperSelector);

  if (!thumbsEl || !swiperEl) {
    delete wrapper.dataset.galleryInitialized;
    return null;
  }

  const initialSlide =
    customConfig.initialSlide !== undefined ? customConfig.initialSlide : 0;

  const thumbsConfig = deepMerge(defaultGalleryThumbsConfig, customConfig.thumbsConfig || {});
  const mainConfig = deepMerge(
    {
      ...defaultGalleryMainConfig,
      navigation: {
        nextEl: swiperEl.querySelector(".swiper-button-next"),
        prevEl: swiperEl.querySelector(".swiper-button-prev"),
      },
      pagination: {
        ...defaultGalleryMainConfig.pagination,
        el: swiperEl.querySelector(".swiper-pagination"),
      },
      initialSlide,
    },
    customConfig.mainConfig || {},
  );

  try {
    const thumbs = new Swiper(thumbsEl, {
      ...thumbsConfig,
      initialSlide,
      autoHeight: false,
    });

    mainConfig.thumbs.swiper = thumbs;

    const main = new Swiper(swiperEl, {
      ...mainConfig,
      autoHeight: false,
    });

    const instances = { thumbs, main };
    wrapper.swiperInstances = instances;
    return instances;
  } catch (error) {
    console.error("Error initializing gallery swiper:", error);
    delete wrapper.dataset.galleryInitialized;
    return null;
  }
}

export function initCommonSwipers() {
  document.querySelectorAll(".commonSwiper").forEach((swiperEl) => {
    initCommonSwiper(swiperEl);
  });
}

export function initCarouselSwipers() {
  document.querySelectorAll(".carouselSwiper").forEach((swiperEl) => {
    initCarouselSwiper(swiperEl);
  });
}

export function initGallerySwipers() {
  document.querySelectorAll(".gallery-main").forEach((wrapper) => {
    initGallerySwiper(wrapper);
  });
}
