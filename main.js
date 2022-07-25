//variable declaration
let tarjetasDestapadas = 0;
let card1 = null;
let card2 = null;
let firstResult = 0;
let secondResult = 0;
let movements = 0;
let showMovements = document.getElementById('movimientos');
let successes = 0;
let showSuccesses = document.getElementById('successes');
let temporizador = false;
let timer = 60;
let timerInicial = 60;
let mostrarTiempo = document.getElementById('t-restante');
let tiempoRegresivo = null;


//generate random numbers
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,];
numbers = numbers.sort(()=>{return Math.random()-0.5});
console.log(numbers);

//functions
function contarTiempo(){
    tiempoRegresivo = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo ${timer} segundos`;
        if (timer == 0){
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
        }
    },1000)
}

function bloquearTarjetas(){
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numbers[i];
        tarjetaBloqueada.disabled = true;
    }
}

function uncover(id) {
    //temporizador
    if(temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;   
    console.log(tarjetasDestapadas);
    if(tarjetasDestapadas ==1){
        //show first number
        card1 = document.getElementById(id);
        firstResult = numbers[id];
        card1.innerHTML = firstResult;

        //disable first button
        card1.disabled = true;
    }
    else if(tarjetasDestapadas == 2){
        //show second number
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = secondResult;
        movements++;
        showMovements.innerHTML = `Movimientos: ${movements}`;

        //disable second button
        card2.disabled = true;

        if(firstResult == secondResult){
            //reset tarjetasDestapadas
            tarjetasDestapadas = 0;
    
            successes++;
            showSuccesses.innerHTML = `Aciertos: ${successes}`;
            if(successes == 8){
                clearInterval(tiempoRegresivo);
                showSuccesses.innerHTML = `Aciertos: ${successes} 😎😎😎😎 `
                showMovements.innerHTML = `Te tomó ${movements} movimientos `;
                mostrarTiempo.innerHTML = `Felicidades completaste el reto en ${timerInicial - timer} segundos`;
                alert('Felicidades has conseguido terminar el juego 😁👌');
            }
        }else{
            //temporarily display the values and recap
            setTimeout(()=>{
                card1.innerHTML = ' ';
                card2.innerHTML = ' ';
                card1.disabled = false;
                card2.disabled = false;
                tarjetasDestapadas = 0;
            }, 1000);
        }
    }

    
}
