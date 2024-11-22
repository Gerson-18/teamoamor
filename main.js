// Variables globales
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let PrimerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let tiempoRegresivoId = null;
let timer = 30;
let timerInicial = 30;
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];




//creamos un objeto de audio ponemos la ruta con un wav al final

let winAudio = new  Audio ('./sounds/win.wav');
let loseAudio =  new Audio ('./sounds/lose.wav');
let clickAudio =  new Audio ('./sounds/click.wav');
let rightAudio =  new Audio ('./sounds/rigut.wav');
let wrongAudio =  new Audio ('./sounds/wrong.wav');
let clickAudio2 =  new Audio ('./sounds/click.wav');





//barajar el arreglo -2numeros" para que las tarjetas se muestren en orden aleatorio
numeros = numeros.sort(() => Math.random() - 0.5);


// Obtener elementos HTML por su ID y almacenarlos en variables
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

// Función para contar el tiempo
function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = 'Tiempo: ' + timer + ' segundos';

        if (timer === 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();

            //aqui pondremos el audio de perder lose, por que , cuando se acabe de contar el tiempo y no se logro pondremos el sonido de perder
            loseAudio.play();  //cuando se termine el juego este sonido se ejecute
        }
    }, 1000);
}


//funcion bloquearTarjeta
function bloquearTarjetas(){
    //haremos un recorrido por las tarjetas con un ciclo for y despues bloqueamos todas las tarjetas y mostramos el numero
    for(let i = 0; i <=15 ; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src = "./images/${numeros[i]}.png" alt="">`
        tarjetaBloqueada.disabled = true;
    }
}



//despues de general los numeros aleatorios creamos funcion principal

//funcion principal como parametro ( ira el id de cada boton) cuando se precione un boton se llamara la funcion destapar


function destapar(id){

    //llamamos la variable temporizador para el tiempo y le pondremos  con un if si es igual a falso ejecutaremos una funcion contar tiempo

    if (temporizador == false){
        contarTiempo();
        temporizador = true;
        

    }

    




    tarjetasDestapadas++;    //llamamos la variable que creamos el ++ es para que cada vez que el usuario presione un boton

    if (tarjetasDestapadas ==1){
        clickAudio.play();

        //mostrar el primer numero
        tarjeta1 = document.getElementById(id);
        PrimerResultado= numeros[id]    //llamamos nuestro numeros con el id de cada buton para que se asocien
        tarjeta1.innerHTML = `<img src = "./images/${PrimerResultado}.png" alt="">`  //por que lo guardo en la variable primerresultado por que posteriormente nesecito comparar si la primera tarjeta es igual a la segunda tarjeta , comparacion, tendre que comparar el primer resultado con el segundo reslutado 

        //llamamos a nuestro audio click con su metodo play() para cuando se de click en una tarjeta pongamos un sonido




        //deshabilitamos el primer boton para que cuando el usuario presione no se sigan marcando numeros si no que solo aparezca no por cuadro se bloquee cuando se presiona para que no se marquen numeros al azar

        //utilizamos disabled para realizar esa accion

        tarjeta1.disabled = true;


        
    }else if(tarjetasDestapadas ==2){
        clickAudio2.play();
        //mostrar el segundo numero
        //llamamos la variable tarjeta dos  apunrara al documento html con su id
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];  // guardamos en variable segundo resultado lo que me arroja  mi array de numneros 
        //lo imprimimos sobre la tarjeta dos con el metodo innerhtml y sera igual al segundo resultado
        tarjeta2.innerHTML = `<img src = "./images/${segundoResultado}.png" alt="">`
        
        

        //deshabilitamos el segundo boton para que cuando lo presionemos solo salga una imagen y no salgan muchas por boton
        tarjeta2.disabled  = true;


          // segun la logica del juego el movimiento se da  cada vez que destapas las dos tarjetas
        //incrementar movimientos, nuestro cuadro de moviemientos se hace en el caso cuando se ejecuta la segunda tarjeta entones eso es un movimiento
        //cuando se cumple la condificion de que el numero de tajetas destapadas sea igual a dos y se realiza el movimiento

        movimientos ++;
        mostrarMovimientos.innerHTML = 'Movimientos: ' + movimientos;

        if (PrimerResultado === segundoResultado) {
            aciertos++;
            mostrarAciertos.innerHTML = 'Aciertos: ' + aciertos;

            //si la tarjetas son iguales ponemos el audio de correcto right
            rightAudio.play()

            if (aciertos === 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = 'Aciertos: ' + aciertos + ' 😊😎😱 😎';
                mostrarMovimientos.innerHTML = 'Movimientos: ' + movimientos + '👍🙌';
                mostrarTiempo.innerHTML = 'GENIAL 😎 SOLO DEMORASTE: ' + (timerInicial - timer) + ' segundos';
                bloquearTarjetas();
            } else {
                // Reiniciar variables para permitir que el usuario destape más tarjetas
                tarjeta1 = null;
                tarjeta2 = null;
                PrimerResultado = null;
                segundoResultado = null;
                tarjetasDestapadas = 0;
            }
        } else {
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjeta1 = null;
                tarjeta2 = null;
                PrimerResultado = null;
                segundoResultado = null;
                tarjetasDestapadas = 0;
            }, 800);
        }
     
    }
}


// Función para reiniciar el juego

function reiniciarJuego() {
    clearInterval(tiempoRegresivoId); // Detener el contador de tiempo
    timer = timerInicial; // Restablecer el temporizador a su valor inicial
    mostrarTiempo.innerHTML = 'Tiempo: ' + timer + ' segundos'; // Actualizar la visualización del tiempo
    tarjetasDestapadas = 0; // Reiniciar contador de tarjetas destapadas
    movimientos = 0; // Reiniciar contador de movimientos
    aciertos = 0; // Reiniciar contador de aciertos

    mostrarAciertos.innerHTML = 'Aciertos: 0'; // Actualizar la visualización de aciertos
    mostrarMovimientos.innerHTML = 'Movimientos: 0'; // Actualizar la visualización de movimientos

    // Restablecer todas las tarjetas
    for (let i = 0; i <= 15; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = '';
        tarjeta.disabled = false;
    }

    // Volver a barajar las tarjetas
    numeros = numeros.sort(() => {
        return Math.random() - 0.5;
    });

    // Habilitar temporizador y reiniciar el juego
    temporizador = false;
}


/**te código contiene las siguientes partes:

Declaración de variables globales: Estas variables almacenan información esencial para el funcionamiento del juego, como el estado de las tarjetas, los movimientos, los aciertos y más.

Barajear las tarjetas: La matriz numeros contiene los valores de las tarjetas. Utilizas numeros.sort(() => Math.random() - 0.5) para barajear aleatoriamente las tarjetas al inicio del juego.

Función contarTiempo(): Esta función inicia un temporizador que cuenta hacia abajo desde 30 segundos y actualiza el tiempo restante en la página HTML. Cuando el tiempo se agota, detiene el temporizador y bloquea las tarjetas.

Función bloquearTarjetas(): Esta función bloquea todas las tarjetas al mostrar sus valores y deshabilitarlas.

Función destapar(id): Esta función se llama cuando el jugador destapa una tarjeta haciendo clic en ella. Controla la lógica del juego, como verificar si las tarjetas coinciden, actualizar los movimientos y los aciertos, y gestionar el temporizador. También se encarga de ocultar las tarjetas si no coinciden.

Función reiniciarJuego(): Esta función se llama cuando el jugador presiona el botón "Reiniciar Juego". Restablece todas las variables a sus valores iniciales, oculta las tarjetas, vuelve a barajarlas y reinicia el temporizador. */


