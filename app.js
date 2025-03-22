/*let titulo = document.querySelector('h1');
/*el document es un puente que noscomunica con el html y el queryselector indica un tipo de dato que se puede poner en este caso pusimos un texto
titulo.innerHTML = 'Juego del número secreto'; 
//con el innerhtml asignas un titulo 
let parrafo = document.querySelector('p');
parrafo.innerHTML = "Indica un número del 1 al 10";
*/
//se asignan parametros y elementos en parentesis
//se puedes asignar parametros entre los parentesis para que sea generica y se pueda reutilizar adelante
let numeroSecreto = 0;
let intentos = 1;
let listaNumerosSorteados = [];//se crea lista de array
let numeroMaximo = 10;



function asignarTextoElementos(elemento, texto){
    let elemetoHTML = document.querySelector(elemento);
    elemetoHTML.innerHTML = texto;
    return;//es recomendable que retorne algun valor al final, no es necesario pero es una buena practica
}

function verificarIntento(){//se crea la funcion y con el nombre se llama en el html y es la accion que se quiere hacer en la función
    //se crea una id en el imput para identificarlo y se llama con el getElementById y al final se pone .value para que de el valor numerico y no un texto
    //se llama al parseint para que valor sea de numero 
    let numeroDeUsusario = parseInt(document.getElementById('valorUsuario').value);
    
    if(numeroDeUsusario === numeroSecreto){
        asignarTextoElementos('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');  
    }else{
        if(numeroDeUsusario > numeroSecreto){
            asignarTextoElementos('p', 'El número secreto es menor');
        }else{
            asignarTextoElementos('p', 'El número secreto es mayor');
        }
        intentos ++;
        limpiarCaja();
    }
    //console.log(numeroDeUsusario === numeroSecreto);///el 3 igual se utiliza para comparara que los dos valores sean iguales en valor y en tipo de dato
    return;
}

function limpiarCaja(){//limpia la caja donde se pone el numero
    document.querySelector('#valorUsuario').value = '';
    /*otra forma de hacerlo es
    let valorCaja = document.querySelector('#valorUsuario');
    valorCaja = '';*/
}

//aqui no se necesita crear variable porque ya se creo antes y solo se retorna el valor
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*10)+1;
    //console.log(numeroGenerado);
    //console.log(listaNumerosSorteados);
    //si ya sorteamos todos los numeros
    if(listaNumerosSorteados.length == 10){//length es la cantidad de datos en la lista
        asignarTextoElementos('p', 'Ya se sortearon todos los números posibles');
    }else{
        //si el numero generado esta incluido en la lista hacemos una operacion sino hacemos otra
        if (listaNumerosSorteados.includes(numeroGenerado)){ //el includes barre la lista
        return generarNumeroSecreto();//el return se debe de poner para regresar la misma funcion y se puede llamar la misma funcion dentro de ella para no crear otra
        }else{
        listaNumerosSorteados.push(numeroGenerado);//agrega a la lista 
        return numeroGenerado;
    }
    }
    
}

function condicionesIniciales() {
    //de esta manera se llama a la funcion y ya no tiene que repetir el codigo de definir variables y el parrafoinnerHTML para poner texto
    //así se optimiza el codigo para poner texto y no declarar tantas variables
    asignarTextoElementos('h1', "Juego del número secreto");
    asignarTextoElementos('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //limmpiar caja
    limpiarCaja();
    //indicar mensaje de intervalo de numeros
    //generar numero aleatorio
    condicionesIniciales();
    //reiniciar contador de intentos
        //deshabilitar boton juevo nuevo
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();
