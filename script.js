const opcion = ["opcion1", "opcion2", "opcion3"].map(id => document.getElementById(id));
const numeros = document.querySelectorAll(".numero");
const containerRes = document.querySelector(".containerRes");
const limpiar = document.querySelectorAll(".limpiar");

function clickHandler(event) {
    containerRes.innerHTML = `<p class="${event.target.classList.contains("resultado") ? 'correcto' : 'incorrecto'}">
    ${event.target.classList.contains("resultado") ? 'Correcto' : 'Incorrecto'}<p/>`;
    setTimeout(() => containerRes.innerHTML = "", 2000); // Limpiamos containerRes después de 2 segundos
    limpiarOpciones(); // Limpia las opciones después de hacer clic
    sumaOpciones(); // Calcula nuevas opciones
    opciones(); // Agrega los controladores de eventos a las nuevas opciones
}

function opciones() {
    opcion.forEach(op => {
        op.addEventListener("click", clickHandler);
    });
}

function limpiarOpciones() {
    opcion.forEach(op => {
        op.removeEventListener("click", clickHandler);
        op.classList.remove("resultado", "notMas", "not"); // Aseguramos que las clases se limpian
    });
}

function numerosRandoms() {
    numeros.forEach(numero => {
        numero.textContent = Math.floor(Math.random() * 99);
    });
}

numerosRandoms();

function sumaOpciones() {
    const num1 = parseInt(document.getElementById("num1").textContent);
    const num2 = parseInt(document.getElementById("num2").textContent);
    const opcionRandom = Math.floor(Math.random() * 3);
    let suma = num1 + num2;
    let not1, not2;

    do {
        not1 = Math.floor(Math.random() * 10) - 5 + suma;
        not2 = Math.floor(Math.random() * 10) - 5 + suma;
    } while (not1 === suma || not2 === suma || not1 === not2);

    opcion[opcionRandom].classList.add("resultado");
    opcion[opcionRandom].textContent = suma;
    opcion[(opcionRandom + 1) % 3].classList.add("notMas");
    opcion[(opcionRandom + 1) % 3].textContent = not1;
    opcion[(opcionRandom + 2) % 3].classList.add("not");
    opcion[(opcionRandom + 2) % 3].textContent = not2;
}

sumaOpciones();
opciones();

limpiar.forEach(limpiarBoton => {
    limpiarBoton.addEventListener("click", () => {
        numerosRandoms();
        sumaOpciones();
        opciones();
    });
});
