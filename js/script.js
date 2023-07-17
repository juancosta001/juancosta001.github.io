const botonDesplegar = document.getElementById("desplegar-menu");
const menuDesplegable = document.querySelector(".menu-desplegable");

botonDesplegar.addEventListener("mouseover", function() {
  // Mostrar el menú desplegable
  menuDesplegable.style.display = "block";
});

menuDesplegable.addEventListener("mouseleave", function() {
  // Ocultar el menú desplegable cuando se sale de él
  menuDesplegable.style.display = "none";
});

function toggleMenu() {
  if (menuDesplegable.style.display === "block") {
    menuDesplegable.style.display = "none";
  } else {
    menuDesplegable.style.display = "block";
  }
}

document.addEventListener("click", function(event) {
  // Verificar si el objetivo del clic está dentro del menú desplegable
  const isClickInsideMenu = menuDesplegable.contains(event.target);

  if (!isClickInsideMenu) {
    // Si el clic es fuera del menú, ocultar el menú desplegable
    menuDesplegable.style.display = "none";
  }
  
  
});
botonDesplegar.addEventListener("click", function(event) {
  // Verificar si el dispositivo es móvil
  if (window.innerWidth < 768) {
    // Detener la propagación del evento click para evitar que se cierre inmediatamente
    event.stopPropagation();
    toggleMenu();
  }
});
botonDesplegar.addEventListener("touchstart", function(event) {
  // Verificar si el dispositivo es móvil
  if (window.innerWidth < 768) {
    event.preventDefault(); // Evitar el comportamiento táctil predeterminado (como hacer zoom en la página)
    toggleMenu();
  }
});

// Evento click en cualquier parte del documento para cerrar el menú desplegable en dispositivos móviles
document.addEventListener("click", function() {
  // Verificar si el dispositivo es móvil
  if (window.innerWidth < 768) {
    menuDesplegable.style.display = "none";
  }
});

// Precarga de imágenes
function preloadCarouselImages() {
  return Promise.all(   // Acá se crea una promesa que se resolverá cuando todas las promesas son cumplidas
    imagenes.map((imagen) => {        // acá se utiliza map para establecer la cantidad de veces que se va a ejecutar, dependiendo del largo del array
      return new Promise((resolve, reject) => { //resolve es una funcion que se invoca cuando la promesa se resuelve, y reject cuando no
        const img = new Image(); //el objeto imagen se usa para representar una imagen, para luego darle propiedades
        img.onload = resolve; //cuando la imagen se cara, la funcion resolve se invoca
        img.onerror = resolve; // Manejo de errores de carga de imágenes
        img.src = imagen.url; //imagen.url es la url de la imagen que se carga,y se obtiene del array
      });
    })
  );
}

let imagenes = [
  {
    "url": "img/carrusel/imagen2.webp",
    "nombre": "Amplio Menú",
    "descripcion": "Explora un mundo de sabores en nuestro menú. Delicias gastronómicas que te sorprenderán."
  },
  {
    "url": "img/carrusel/imagen6.webp",
    "nombre": "Océano de Sabores",
    "descripcion": "Sumérgete en un océano de sabores: Nuestra carta de cervezas y cócteles te espera para deleitar tus sentidos"
  },
  {
    "url": "img/carrusel/imagen4.webp",
    "nombre": "Control de Calidad",
    "descripcion": "Excelencia en cada detalle. Nuestro restobar, donde el control de calidad es una prioridad, para brindarte el sabor impecable que mereces."
  },
  {
    "url": "img/carrusel/imagen5.webp",
    "nombre": "Atención al Cliente",
    "descripcion": "La combinación perfecta: Cerveza helada y atención excepcional. En nuestro restobar, vivirás una experiencia refrescante y única"
  },
  {
    "url": "img/carrusel/imagen3.webp",
    "nombre": "Métodos de Pago",
    "descripcion": "Abre un mundo de posibilidades para pagar en nuestro restobar. Descubre la libertad de elegir entre múltiples métodos de pago y disfruta de una experiencia sin límites"
  },
  {
    "url": "img/carrusel/imagen7.webp",
    "nombre": "Ambiente",
    "descripcion": "Sumérgete en el cálido abrazo de nuestro restobar, donde la diversión y la camaradería crean recuerdos inolvidables"
  }
];
//declarar variables las cuales las llamados por el id
let atras = document.getElementById('atras');
let adelante = document.getElementById('adelante');
let imagen = document.getElementById('img');
let puntos = document.getElementById('puntos');
let texto = document.getElementById('texto');
let actual = 0;
let intervaloCarrusel;
let transicionActiva = false;

//se encarga de cambiar la imagen
function cambiarImagen(direccion) {
  if (transicionActiva) { //si hay una transición activa, la función retorna sin hacer nada, si no, se establece la transición
    return;
  }

  transicionActiva = true;

 
  setTimeout(function() { //sirve para realizar un time out para que la imagen vaya cambiando después de determinado tiempo
    actual += direccion;  //la variable actual sirve para representar la posición, la direccion se utiliza para elegir la dirección
                          //en que se cambia el carrusel, va sumando

    if (actual < 0) {   // si es menor que 0, se establece como el último indice valido
      actual = imagenes.length - 1;
    } else if (actual >= imagenes.length) { // si actual es mayor que el largo de las imagenes, se establece como 0, volviendo al inicio
      actual = 0;
    }

    mostrarImagenActual(); //básicamente muestra la nueva imagen

    setTimeout(function() { 
      transicionActiva = false;
    }, 1000); // Duración de la transición en milisegundos, para evitar el spameo continuo del desplazamientoo
  }); 
}

function mostrarImagenActual() {  //se encarga de actualizar la visualización de la imagen actual
  imagen.innerHTML = `<img class="img animate__animated animate__fadeIn" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`; 
  //equivale a la imagen en sí, igualando al actual
  texto.innerHTML = ` <h3 class="animate__animated animate__fadeIn">${imagenes[actual].nombre}</h3>
    <p class="animate__animated animate__fadeIn">${imagenes[actual].descripcion}</p>
  `;
  //equivale al texto de descripción
  posicionCarrusel();
}

function posicionCarrusel() { //básicamente se encarga de la visualización de los puntos, para así dependiendo de las imagenes se vaya actualizando
  puntos.innerHTML = "";
  for (var i = 0; i < imagenes.length; i++) {
    if (i === actual) {
      puntos.innerHTML += '<p class="bold">.<p>';
    } else {
      puntos.innerHTML += '<p>.<p>';
    }
  }
}

function iniciarCarrusel() { //básicemente inicia el carrusel, con un intervalo para ejecutar la función de cambiar imagen
  intervaloCarrusel = setInterval(cambiarImagen, 10000, 1);
}

function detenerCarrusel() {  //se encarga de detener el carrusel en sí
  clearInterval(intervaloCarrusel);
}

atras.addEventListener('click', function() {  //asigna una función a la imagen de atras, que al darle click pase a la siguiente imagen,restando 1
  detenerCarrusel();
  cambiarImagen(-1);
  iniciarCarrusel();
});

adelante.addEventListener('click', function() {//asigna una función a la imagen de adelante, que al darle click pase a la siguiente imagen,sumando 1
  detenerCarrusel();
  cambiarImagen(1);
  iniciarCarrusel();
});

window.addEventListener('DOMContentLoaded', () => { //basicamente el DOMcontentLoaded equivale a cuando se ha cargado el documento HTML completo
  preloadCarouselImages().then(() => {  //se llama a la función de precargar las imagenes para la correcta carga de imagenes.
    mostrarImagenActual();  //para mostrar la imagen inicial y todo su contenido
    iniciarCarrusel();  //para iniciar el carrusel
  });
});

document.addEventListener('DOMContentLoaded', function() {  //también se dispara cuando la página se carga correctamente
  if (window.location.pathname.includes('galeria-imagenes.html')) { //se verifica si incluye la cadena de galeria-imagenes.html, básicamente si se encuentra dentro de esa página
    if (document.querySelector('.carrusel')) {  //se verifica si contiene el carrusel
      $(".carrusel").swipe({    //se aplican todos los elementos de clase CSS, utilizando swipe, que es parte de la biblioteca Jquery
        swipe: function(event, direction, distance, duration, fingerCount, fingerData) { //configura el desplazamiento táctil en el carrusel
          if (direction === "left") { //dependiendo de la dirección, se detiene, cambia la imagen y automaticamente inicia el carrusel
            detenerCarrusel();
            cambiarImagen(1); // Cambiar a la imagen siguiente
            iniciarCarrusel();
          } else if (direction === "right") {
            detenerCarrusel();
            cambiarImagen(-1); // Cambiar a la imagen anterior
            iniciarCarrusel();
          }
        }
      });
    }
  }
});


window.onload = function() { //también utiliza la función de cargar para verificar que se cargue todo correctamente
  document.getElementById('sugerencia-form').addEventListener('submit', function(event) { //se agrega un evento submit que se dispara cuando se envia el formulario
      event.preventDefault();  // Obtén los valores del formulario, basicamente prevenir que recargue la pagina
      var nombre = document.getElementById('nombre').value; //declaramos las variables
      var email = document.getElementById('email').value;
      var mensaje = document.getElementById('mensaje').value;
      emailjs.send('default_service', 'template_2jcaq7x', { // Envía el formulario utilizando EmailJS, el primero es el ID y el segundo el template
          from_name: nombre,                                //estas son las variables que establecimos en emailJS
          message: mensaje, 
          email_id: email
      })
      .then(function(response) { // Muestra el modal de éxito, es una promesa para manejar la respuesta existosa
          var modal = document.getElementById('modal');
          modal.style.display = 'block';
          console.log('ID del envío:', response.text); // Acciones adicionales después de enviar el formulario, basicamente consola
          document.getElementById('sugerencia-form').reset(); // Reinicia el formulario, limpiando archivos
      })
      .catch(function(error) {
          alert('Hubo un error al enviar el formulario. Por favor, intenta nuevamente más tarde.');
          console.log('Error:', error);
      });
  });

  // Cierra el modal al hacer clic en la "x"
  var closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', function() {
      var modal = document.getElementById('modal');
      modal.style.display = 'none';
  });
};


