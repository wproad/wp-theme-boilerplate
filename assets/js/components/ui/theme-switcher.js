// Theme switcher functionality module (compatible with old theme system)
let isNewThemeInitialized = false;

export function initNewThemeSwitcher() {
    // Prevent multiple initializations
    if (isNewThemeInitialized) {
        return;
    }
    
    isNewThemeInitialized = true;
    
    // Get DOM elements
    const bodyElement = document.body;
    const switcher = document.getElementById("theme-switcher");
    const darkCircle = document.querySelector(".darkCircle");
    const lightCircle = document.querySelector(".lightCircle");
    
    // Check if switcher exists
    if (!switcher) {
        return;
    }
    
    // CSS class constants (same as old theme system)
    const darkModeClass = "manual-dark";
    const lightModeClass = "manual-light";
    const oldToggleButtonActiveClass = "theme-toggle--toggled";

    // Get system preference theme
    function getSystemPreferenceTheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    // Apply theme to both old and new systems
    function applyTheme(themeMode) {
        // Update old theme system (body classes) - sync with existing old theme
        bodyElement.classList.remove(darkModeClass, lightModeClass);
        if (themeMode === "dark") {
            bodyElement.classList.add(darkModeClass);
        } else {
            bodyElement.classList.add(lightModeClass);
        }
        
        // Update new theme system (html class for Tailwind)
        if (themeMode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        
        // Update old theme toggle button (if exists)
        const oldThemeToggle = document.getElementById("musicdel-theme-toggle");
        if (oldThemeToggle) {
            if (themeMode === "dark") {
                oldThemeToggle.classList.add(oldToggleButtonActiveClass);
            } else {
                oldThemeToggle.classList.remove(oldToggleButtonActiveClass);
            }
        }
        
        // Update new theme switcher UI
        if (darkCircle && lightCircle) {
            if (themeMode === "dark") {
                lightCircle.classList.remove("circle-grow");
                darkCircle.classList.add("circle-grow");
            } else {
                darkCircle.classList.remove("circle-grow");
                lightCircle.classList.add("circle-grow");
            }
        }
        
        // Update switcher title for accessibility
        if (switcher) {
            switcher.setAttribute("title", `Switch to ${themeMode === "dark" ? "light" : "dark"} mode`);
        }
        
        // Update localStorage (maintain compatibility with both systems)
        localStorage.setItem("theme", themeMode);
        localStorage.setItem("color-mode", themeMode);
    }

    // Update new theme switcher visual state only
    function updateNewThemeSwitcherState(themeMode) {
        if (darkCircle && lightCircle) {
            if (themeMode === "dark") {
                lightCircle.classList.remove("circle-grow");
                darkCircle.classList.add("circle-grow");
            } else {
                darkCircle.classList.remove("circle-grow");
                lightCircle.classList.add("circle-grow");
            }
        }
        
        if (switcher) {
            switcher.setAttribute("title", `Switch to ${themeMode === "dark" ? "light" : "dark"} mode`);
        }
    }

    // Initialize theme based on stored preference or system preference
    // Check both old and new theme system storage keys
    const storedThemePreference = localStorage.getItem("color-mode") || localStorage.getItem("theme");
    const currentTheme = storedThemePreference || getSystemPreferenceTheme();
    
    // Apply initial theme and sync both systems
    applyTheme(currentTheme);

    // Handle new theme switcher click
    switcher.addEventListener("click", function () {
        const isCurrentlyDark = bodyElement.classList.contains(darkModeClass) || 
                               document.documentElement.classList.contains("dark") ||
                               (!bodyElement.classList.contains(lightModeClass) && getSystemPreferenceTheme() === "dark");
        
        const newTheme = isCurrentlyDark ? "light" : "dark";
        applyTheme(newTheme);
    });

    // Listen for changes from old theme system
    window.addEventListener("storage", function(e) {
        if ((e.key === "color-mode" || e.key === "theme") && e.newValue && e.newValue !== e.oldValue) {
            // Only update new theme switcher UI, don't apply full theme to avoid loops
            updateNewThemeSwitcherState(e.newValue);
            
            // Ensure HTML has correct class for Tailwind
            if (e.newValue === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    });

    // Listen for system theme preference changes (only if no stored preference)
    if (!storedThemePreference) {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (mediaQueryEvent) {
            const newTheme = mediaQueryEvent.matches ? "dark" : "light";
            applyTheme(newTheme);
        });
    }
}

// Auto-initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    initNewThemeSwitcher();
});
