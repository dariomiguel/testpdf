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
    if (checkboxTimeFaena.checked) {
        console.log(
            "Ingreso Faena: " +
                convertirHoraAMinutosDelDia(ingresoFaena.value) +
                " Salida Faena:" +
                convertirHoraAMinutosDelDia(salidaFaena.value)
        );
    }
    if (checkboxTimeDespostada.checked) {
        console.log(
            "Ingreso Despostada: " +
                convertirHoraAMinutosDelDia(ingresoDespostada.value) +
                " Salida Despostada:" +
                convertirHoraAMinutosDelDia(salidaDespostada.value)
        );
    }
});

function convertirHoraAMinutosDelDia(tiempoEnHsYMinutos) {
    const [horas, minutos] = tiempoEnHsYMinutos.split(":");
    let minutosDelDia = horas * 60 + +minutos;

    return minutosDelDia;
}
