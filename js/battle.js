let p1 = { nombre: "", img: "", hp: 100, turnosPasados: 0, defendiendo: false };
let p2 = { nombre: "", img: "", hp: 100, turnosPasados: 0, defendiendo: false };

let turnoActual = 1;
let movimientosTotales = 0;
const MAX_MOVIMIENTOS = 100;

const selectA = document.getElementById("pokemonA");
const selectB = document.getElementById("pokemonB");

const log = document.getElementById("battleLog");

window.onload = cargarPokemons;

async function cargarPokemons() {

    try {

        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const data = await response.json();

        data.results.forEach(poke => {

            const op1 = document.createElement("option");
            op1.value = poke.name;
            op1.textContent = poke.name.toUpperCase();
            selectA.appendChild(op1);

            const op2 = document.createElement("option");
            op2.value = poke.name;
            op2.textContent = poke.name.toUpperCase();
            selectB.appendChild(op2);

        });

    } catch (error) {
        console.log("Error cargando Pokémon", error);
    }
}

async function iniciarBatalla(){

    const nombre1 = selectA.value;
    const nombre2 = selectB.value;

    if(nombre1 === nombre2){
        alert("Selecciona Pokémon diferentes");
        return;
    }

    const data1 = await obtenerPokemon(nombre1);
    const data2 = await obtenerPokemon(nombre2);

    configurarPokemon(p1,data1,"A");
    configurarPokemon(p2,data2,"B");

    turnoActual = 1;
    movimientosTotales = 0;

    log.innerHTML = "";
    escribirLog(`Batalla: ${p1.nombre} vs ${p2.nombre}`);
}

async function obtenerPokemon(nombre){

    const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    return await r.json();
}

function configurarPokemon(obj,data,prefix){

    obj.nombre = data.name.toUpperCase();
    obj.img = data.sprites.other["official-artwork"].front_default || data.sprites.front_default;
    obj.hp = 100;
    obj.turnosPasados = 0;
    obj.defendiendo = false;

    document.getElementById(`img${prefix}`).src = obj.img;
    document.getElementById(`hpText${prefix}`).innerText = "Vida: 100";
}

function siguienteTurno(){

    movimientosTotales++;

    if(movimientosTotales > MAX_MOVIMIENTOS){
        terminarPorVida();
        return;
    }

    const atacante = turnoActual === 1 ? p1 : p2;
    const defensor = turnoActual === 1 ? p2 : p1;

    let acciones = ["ataque","defensa"];

    if(atacante.turnosPasados >= 3){
        acciones.push("especial");
    }

    const accion = acciones[Math.floor(Math.random()*acciones.length)];
    const falla = Math.random() < 0.20;

    if(falla){
        escribirLog(`${atacante.nombre} intentó ${accion} pero falló`);
    }else{
        procesarAccion(atacante,defensor,accion);
    }

    atacante.turnosPasados++;

    if(defensor.hp <= 0){
        mostrarGanador(atacante);
        return;
    }

    turnoActual = turnoActual === 1 ? 2 : 1;
}

function procesarAccion(atacante,defensor,tipo){

    let daño = 0;

    if(tipo === "ataque"){
        daño = random(10,18);
    }

    if(tipo === "especial"){
        daño = random(24,34);
    }

    if(tipo === "defensa"){
        atacante.defendiendo = true;
        escribirLog(`${atacante.nombre} se defiende`);
        return;
    }

    if(defensor.defendiendo){
        daño = Math.floor(daño/2);
        escribirLog(`${defensor.nombre} redujo el daño`);
    }

    defensor.hp -= daño;
    if(defensor.hp < 0) defensor.hp = 0;

    escribirLog(`${atacante.nombre} usa ${tipo} y hace ${daño} de daño`);

    actualizarBarras();
}

function actualizarBarras(){

    document.getElementById("hpA").style.width = p1.hp + "%";
    document.getElementById("hpB").style.width = p2.hp + "%";

    document.getElementById("hpTextA").innerText = "Vida: " + p1.hp;
    document.getElementById("hpTextB").innerText = "Vida: " + p2.hp;
}

function mostrarGanador(g){

    escribirLog("🏆 Ganador: "+g.nombre);

    document.getElementById("winnerText").innerText = "Ganador: "+g.nombre;
    document.getElementById("winnerImg").src = g.img;
    document.getElementById("winnerBanner").style.display="block";
}

function terminarPorVida(){

    if(p1.hp === p2.hp){
        escribirLog("Empate");
        return;
    }

    const ganador = p1.hp > p2.hp ? p1 : p2;
    mostrarGanador(ganador);
}

function escribirLog(txt){

    const p = document.createElement("p");
    p.textContent = txt;
    log.appendChild(p);
}

function random(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}