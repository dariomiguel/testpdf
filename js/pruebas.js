const checkboxTimeFaena = document.getElementById("actividadEnFanea");
const checkboxTimeDespostada = document.getElementById("actividadEnDespostada");
const timeContainerFaena = document.getElementById("timeContainerFaena");
const timeContainerDespostada = document.getElementById("timeContainerDespostada");
const ingresoFaena = document.getElementById("ingresoFaena");
const salidaFaena = document.getElementById("salidaFaena");

checkboxTimeFaena.addEventListener("change", function () {
    ingresoFaena.disabled = !checkboxTimeFaena.checked;
    salidaFaena.disabled = !checkboxTimeFaena.checked;
});

checkboxTimeDespostada.addEventListener("change", function () {
    ingresoDespostada.disabled = !checkboxTimeDespostada.checked;
    salidaDespostada.disabled = !checkboxTimeDespostada.checked;
});

const btnGenerar = document.getElementById("btnGenerar");
btnGenerar.addEventListener("click", function () {
    const pcc = [];
    if (checkboxTimeFaena.checked) {
        pcc.push("1B", "4B");
    }
    if (checkboxTimeDespostada.checked) {
        pcc.push("2B", "3F");
    }
    console.log(pcc);

    // Agregar elemento al array aleatoriamente
    let randomInt = Math.floor(Math.random() * pcc.length);
    pcc.push(pcc[randomInt]);
    // Ordenar aleatoriamente
    pcc.sort(() => Math.random() - 0.5);

    console.log(pcc);
});

function convertirHoraAMinutosDelDia(tiempoEnHsYMinutos) {
    const [horas, minutos] = tiempoEnHsYMinutos.split(":");
    let minutosDelDia = horas * 60 + +minutos;

    return minutosDelDia;
}
