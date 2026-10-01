/* ======================================
   MOVE DANCE ACADEMY
   RECEPCIÓN PREMIUM
====================================== */

/* MENSAJES PRINCIPALES */

const messages = [

    "✨ ¡Bienvenidos a MOVE! ✨",

    "💖 Que tengas una excelente clase 💖",

    "🩰 Hoy será un gran día para bailar 🩰",

    "🌸 Gracias por ser parte de MOVE 🌸",

    "💃 Disfruta cada paso 💃",

    "🩷 Nunca dejes de bailar 🩷"

];

/* FRASES INSPIRADORAS */

const quotes = [

    "💖 La disciplina supera al talento.",

    "🌸 Cree en ti.",

    "🩰 Nunca dejes de soñar.",

    "✨ Cada paso cuenta.",

    "⭐ El esfuerzo de hoy es el logro de mañana.",

    "💃 Haz lo que amas.",

    "🎀 Todo gran bailarín comenzó con un primer paso."

];

const welcomeMessage =
document.getElementById("welcomeMessage");

const quote =
document.getElementById("quote");

let messageIndex = 0;
let quoteIndex = 0;


/* MENSAJES ROTATIVOS */

function rotateMessages(){

    if(!welcomeMessage) return;

    welcomeMessage.style.opacity = 0;

    setTimeout(()=>{

        messageIndex++;

        if(messageIndex >= messages.length){

            messageIndex = 0;

        }

        welcomeMessage.innerHTML =
        messages[messageIndex];

        welcomeMessage.style.opacity = 1;

    },400);

}

setInterval(
    rotateMessages,
    5000
);


/* FRASES ROTATIVAS */

function rotateQuotes(){

    if(!quote) return;

    quote.style.opacity = 0;

    setTimeout(()=>{

        quoteIndex++;

        if(quoteIndex >= quotes.length){

            quoteIndex = 0;

        }

        quote.innerHTML =
        quotes[quoteIndex];

        quote.style.opacity = 1;

    },400);

}

setInterval(
    rotateQuotes,
    8000
);


/* RELOJ Y FECHA */

const clock =
document.getElementById("clock");

const dateElement =
document.getElementById("date");

const greeting =
document.getElementById("greeting");


function updateDateTime(){

    // Todo en hora de Guatemala (no la de la tablet, que puede tener
    // mal la zona horaria): hora, fecha y el saludo según la hora.
    const now = new Date();

    const time =
    now.toLocaleTimeString(
        "es-GT",
        {
            timeZone:"America/Guatemala",
            hour:"2-digit",
            minute:"2-digit"
        }
    );

    if(clock){

        clock.innerHTML = time;

    }

    const date =
    now.toLocaleDateString(
        "es-GT",
        {
            timeZone:"America/Guatemala",
            weekday:"long",
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );

    if(dateElement){

        dateElement.innerHTML =
        date.charAt(0).toUpperCase() +
        date.slice(1);

    }

    // Hora de 0 a 23 en Guatemala (hourCycle "h23" para que la
    // medianoche sea 0 y no 24).
    const hour =
    Number(
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone:"America/Guatemala",
                hour:"numeric",
                hourCycle:"h23"
            }
        ).format(now)
    );

    let greetingText =
    "";

    if(hour < 12){

        greetingText =
        "☀️ Buenos días";

    }

    else if(hour < 18){

        greetingText =
        "🌤️ Buenas tardes";

    }

    else{

        greetingText =
        "🌙 Buenas noches";

    }

    if(greeting){

        greeting.innerHTML =
        greetingText;

    }

}

updateDateTime();

setInterval(
    updateDateTime,
    1000
);


/* BOTÓN CAJA DE ENTRADAS (solo en temporada de venta) */

// Recepción lo enciende o apaga en su panel ("🎟️ Venta de entradas").
// Como esta pantalla se queda prendida todo el día, se le pregunta al
// Worker cada minuto (y al volver a la pantalla): el botón aparece o
// desaparece solo, sin recargar. Si el Worker no responde, tarda más
// de 10 s o contesta algo raro, el botón queda OCULTO (más seguro que
// mostrarlo). El botón solo abre la caja; la caja sigue pidiendo su
// propia clave.

const WORKER_URL =
"https://portalalumnas.movedancea.workers.dev";

const btnCajaEntradas =
document.getElementById("btnCajaEntradas");

async function revisarVentaEntradas(){

    let visible = false;

    try{

        const controlador = new AbortController();

        const espera = setTimeout(
            ()=>controlador.abort(),
            10000
        );

        const resp = await fetch(
            WORKER_URL,
            {
                method:"POST",
                headers:{ "Content-Type":"application/json" },
                body:JSON.stringify({ accion:"ventaEntradasVisible" }),
                signal:controlador.signal
            }
        );

        clearTimeout(espera);

        const datos = await resp.json();

        visible =
        resp.ok &&
        datos.success === true &&
        datos.activa === true;

    }

    catch(e){

        visible = false;

    }

    if(btnCajaEntradas){

        btnCajaEntradas.hidden = !visible;

    }

}

revisarVentaEntradas();

setInterval(
    revisarVentaEntradas,
    60000
);

document.addEventListener(
    "visibilitychange",
    ()=>{

        if(document.visibilityState === "visible"){

            revisarVentaEntradas();

        }

    }
);


/* ANIMACIÓN DE ENTRADA */

window.addEventListener(
    "load",
    ()=>{

        document.body.style.opacity =
        "0";

        document.body.style.transition =
        "opacity .8s ease";

        setTimeout(()=>{

            document.body.style.opacity =
            "1";

        },100);

    }
);
