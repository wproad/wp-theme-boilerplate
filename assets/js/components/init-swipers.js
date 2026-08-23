import Swiper from "swiper";
import { Navigation, FreeMode } from "swiper/modules";

export function initCommonSwipers() {
  document.querySelectorAll(".commonSwiper").forEach((swiperEl) => {
    if (swiperEl.dataset.initialized) return; // Prevent double init
    swiperEl.dataset.initialized = "true";

    new Swiper(swiperEl, {
      slidesPerView: "auto",
      spaceBetween: 23,
      watchOverflow: true,
      modules: [Navigation, FreeMode],
      freeMode: true,
    });
  });
}