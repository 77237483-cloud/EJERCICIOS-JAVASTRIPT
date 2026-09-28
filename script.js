// ==========================================
// ARRAY DE PREGUNTAS
// ==========================================

const preguntas = [

    {
        pregunta:
            "¿Qué es el phishing?",

        opciones: [
            "Un programa antivirus",
            "Un intento de engañar para robar información",
            "Un método para mejorar Internet",
            "Un sistema operativo"
        ],

        correcta: 1,

        categoria: "phishing"
    },


    {
        pregunta:
            "¿Qué debes hacer si recibes un correo sospechoso solicitando tu contraseña?",

        opciones: [
            "Responder con la contraseña",
            "Abrir todos sus enlaces",
            "Ignorarlo y verificar quién lo envió",
            "Reenviarlo a todos tus contactos"
        ],

        correcta: 2,

        categoria: "phishing"
    },


    {
        pregunta:
            "¿Cuál de estas contraseñas es más segura?",

        opciones: [
            "123456",
            "password",
            "juan2026",
            "T3ch#Segura!2026"
        ],

        correcta: 3,

        categoria: "contrasenas"
    },


    {
        pregunta:
            "¿Qué es recomendable hacer con nuestras contraseñas?",

        opciones: [
            "Usar la misma en todas las cuentas",
            "Compartirlas con amigos",
            "Utilizar contraseñas diferentes y seguras",
            "Escribirlas públicamente"
        ],

        correcta: 2,

        categoria: "contrasenas"
    },


    {
        pregunta:
            "¿Qué es un malware?",

        opciones: [
            "Un programa malicioso",
            "Un navegador web",
            "Un tipo de computadora",
            "Una conexión WiFi"
        ],

        correcta: 0,

        categoria: "malware"
    },


    {
        pregunta:
            "¿Cuál de los siguientes puede ser un tipo de malware?",

        opciones: [
            "Virus",
            "Firewall",
            "HTML",
            "Bluetooth"
        ],

        correcta: 0,

        categoria: "malware"
    },


    {
        pregunta:
            "¿Qué función cumple un antivirus?",

        opciones: [
            "Crear contraseñas automáticamente",
            "Detectar y eliminar amenazas",
            "Aumentar la velocidad de Internet",
            "Crear páginas web"
        ],

        correcta: 1,

        categoria: "malware"
    },


    {
        pregunta:
            "¿Qué significa HTTPS en una página web?",

        opciones: [
            "Que la conexión utiliza cifrado",
            "Que la página es gratuita",
            "Que la página no tiene contraseña",
            "Que funciona sin Internet"
        ],

        correcta: 0,

        categoria: "redes"
    },


    {
        pregunta:
            "¿Qué debes evitar al conectarte a una red WiFi pública?",

        opciones: [
            "Leer noticias",
            "Consultar información general",
            "Ingresar datos bancarios sin protección",
            "Buscar información académica"
        ],

        correcta: 2,

        categoria: "redes"
    },


    {
        pregunta:
            "¿Para qué sirve la autenticación en dos pasos?",

        opciones: [
            "Para eliminar contraseñas",
            "Para agregar una capa adicional de seguridad",
            "Para navegar más rápido",
            "Para desactivar el antivirus"
        ],

        correcta: 1,

        categoria: "contrasenas"
    }

];


// ==========================================
// VARIABLES
// ==========================================

let preguntasJuego = [];

let preguntaActual = 0;

let puntos = 0;

let vidas = 3;

let correctas = 0;

let incorrectas = 0;


// ==========================================
// ELEMENTOS DEL DOM
// ==========================================

const pantallaInicio =
    document.getElementById("pantallaInicio");

const pantallaJuego =
    document.getElementById("pantallaJuego");

const pantallaResultado =
    document.getElementById("pantallaResultado");


const btnComenzar =
    document.getElementById("btnComenzar");

const btnReiniciar =
    document.getElementById("btnReiniciar");


const categoriaSelect =
    document.getElementById("categoria");


const preguntaTexto =
    document.getElementById("pregunta");

const opcionesContenedor =
    document.getElementById("opciones");

const mensaje =
    document.getElementById("mensaje");


const puntosElemento =
    document.getElementById("puntos");

const vidasElemento =
    document.getElementById("vidas");

const numeroPregunta =
    document.getElementById("numeroPregunta");

const totalPreguntas =
    document.getElementById("totalPreguntas");

const progreso =
    document.getElementById("progreso");

const categoriaPregunta =
    document.getElementById("categoriaPregunta");


// ==========================================
// EVENTOS
// ==========================================

btnComenzar.addEventListener(
    "click",
    iniciarJuego
);


btnReiniciar.addEventListener(
    "click",
    volverInicio
);


// ==========================================
// INICIAR JUEGO
// ==========================================

function iniciarJuego() {

    const categoriaSeleccionada =
        categoriaSelect.value;


    // USO DE FILTER()

    if (categoriaSeleccionada === "todas") {

        preguntasJuego = [
            ...preguntas
        ];

    } else {

        preguntasJuego =
            preguntas.filter(
                pregunta =>
                    pregunta.categoria ===
                    categoriaSeleccionada
            );

    }


    preguntaActual = 0;

    puntos = 0;

    vidas = 3;

    correctas = 0;

    incorrectas = 0;


    pantallaInicio.classList.remove("activa");

    pantallaResultado.classList.remove("activa");

    pantallaJuego.classList.add("activa");


    totalPreguntas.textContent =
        preguntasJuego.length;


    actualizarDatos();

    mostrarPregunta();
}


// ==========================================
// MOSTRAR PREGUNTA
// ==========================================

function mostrarPregunta() {

    mensaje.textContent = "";

    mensaje.className = "mensaje";


    const pregunta =
        preguntasJuego[preguntaActual];


    preguntaTexto.textContent =
        pregunta.pregunta;


    categoriaPregunta.textContent =
        obtenerNombreCategoria(
            pregunta.categoria
        );


    numeroPregunta.textContent =
        preguntaActual + 1;


    opcionesContenedor.innerHTML = "";


    pregunta.opciones.forEach(
        (opcion, indice) => {

            const boton =
                document.createElement("button");


            boton.classList.add("opcion");

            boton.textContent =
                `${indice + 1}. ${opcion}`;


            boton.addEventListener(
                "click",
                () =>
                    comprobarRespuesta(
                        indice,
                        boton
                    )
            );


            opcionesContenedor.appendChild(
                boton
            );

        }
    );


    actualizarProgreso();
}


// ==========================================
// COMPROBAR RESPUESTA
// ==========================================

function comprobarRespuesta(
    indiceSeleccionado,
    botonSeleccionado
) {

    const pregunta =
        preguntasJuego[preguntaActual];


    const botones =
        document.querySelectorAll(
            ".opcion"
        );


    // Evitamos más respuestas

    botones.forEach(
        boton =>
            boton.disabled = true
    );


    if (
        indiceSeleccionado ===
        pregunta.correcta
    ) {

        puntos += 10;

        correctas++;


        botonSeleccionado.classList.add(
            "correcta"
        );


        mensaje.textContent =
            "✅ ¡Respuesta correcta! +10 puntos";


        mensaje.classList.add(
            "mensaje-correcto"
        );

    } else {

        vidas--;

        incorrectas++;


        botonSeleccionado.classList.add(
            "incorrecta"
        );


        botones[
            pregunta.correcta
        ].classList.add(
            "correcta"
        );


        mensaje.textContent =
            "❌ Respuesta incorrecta. Pierdes una vida.";


        mensaje.classList.add(
            "mensaje-error"
        );

    }


    actualizarDatos();


    // Esperamos antes de pasar
    // a la siguiente pregunta

    setTimeout(
        siguientePregunta,
        1300
    );
}


// ==========================================
// SIGUIENTE PREGUNTA
// ==========================================

function siguientePregunta() {

    preguntaActual++;


    // Si pierde todas las vidas

    if (vidas <= 0) {

        finalizarJuego();

        return;
    }


    // Si terminó las preguntas

    if (
        preguntaActual >=
        preguntasJuego.length
    ) {

        finalizarJuego();

        return;
    }


    mostrarPregunta();
}


// ==========================================
// ACTUALIZAR DATOS
// ==========================================

function actualizarDatos() {

    puntosElemento.textContent =
        puntos;

    vidasElemento.textContent =
        vidas;
}


// ==========================================
// ACTUALIZAR PROGRESO
// ==========================================

function actualizarProgreso() {

    const porcentaje =
        (
            preguntaActual /
            preguntasJuego.length
        ) * 100;


    progreso.style.width =
        porcentaje + "%";
}


// ==========================================
// FINALIZAR
// ==========================================

function finalizarJuego() {

    pantallaJuego.classList.remove(
        "activa"
    );

    pantallaResultado.classList.add(
        "activa"
    );


    document.getElementById(
        "puntajeFinal"
    ).textContent = puntos;


    document.getElementById(
        "correctasFinal"
    ).textContent = correctas;


    document.getElementById(
        "incorrectasFinal"
    ).textContent = incorrectas;


    document.getElementById(
        "vidasFinal"
    ).textContent = vidas;


    mostrarMensajeFinal();
}


// ==========================================
// MENSAJE FINAL
// ==========================================

function mostrarMensajeFinal() {

    const mensajeFinal =
        document.getElementById(
            "mensajeFinal"
        );


    const total =
        correctas + incorrectas;


    let porcentaje = 0;


    if (total > 0) {

        porcentaje =
            (correctas / total) * 100;

    }


    if (porcentaje >= 80) {

        mensajeFinal.textContent =
            "🏆 Excelente. Tienes muy buenos conocimientos de ciberseguridad.";

    } else if (porcentaje >= 50) {

        mensajeFinal.textContent =
            "👍 Buen trabajo. Continúa aprendiendo sobre seguridad informática.";

    } else {

        mensajeFinal.textContent =
            "📚 Sigue practicando. La ciberseguridad es importante para proteger tus datos.";

    }

}


// ==========================================
// VOLVER AL INICIO
// ==========================================

function volverInicio() {

    pantallaResultado.classList.remove(
        "activa"
    );

    pantallaInicio.classList.add(
        "activa"
    );
}


// ==========================================
// NOMBRE DE CATEGORÍA
// ==========================================

function obtenerNombreCategoria(
    categoria
) {

    const nombres = {

        phishing:
            "Phishing",

        contrasenas:
            "Contraseñas",

        malware:
            "Malware",

        redes:
            "Redes y navegación"

    };


    return nombres[categoria];
}