// Función para detectar si es un dispositivo móvil
function isMobileDevice() {
    return window.matchMedia('(max-width: 767px)').matches; // Cambiar el valor 767 según sea necesario para adaptarlo a tu diseño responsive
  }
  
  // Condición para cargar animate.css solo en dispositivos no móviles
  if (!isMobileDevice()) {
    var animateCSS = document.createElement("link");
    animateCSS.rel = "stylesheet";
    animateCSS.href = "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
    document.head.appendChild(animateCSS);
  }
  