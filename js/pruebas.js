const checkboxTimeFaena = document.getElementById("actividadEnFanea");
const checkboxTimeDespostada = document.getElementById("actividadEnDespostada");
const timeContainerFaena = document.getElementById("timeContainerFaena");
const timeContainerDespostada = document.getElementById("timeContainerDespostada");

const ingresoFaena = document.getElementById("ingresoFaena");
const salidaFaena = document.getElementById("salidaFaena");
const ingresoDespostada = document.getElementById("ingresoDespostada");
const salidaDespostada = document.getElementById("salidaDespostada");

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
    const listaRegistros = [];
    let registroComponentesDuplicados = [];

    if (checkboxTimeFaena.checked) {
        pcc.push("1B", "4B");
    }
    if (checkboxTimeDespostada.checked) {
        pcc.push("2B", "3F");
    }

    // Agregar elemento al array aleatoriamente
    let randomInt = Math.floor(Math.random() * pcc.length);
    pcc.push(pcc[randomInt]);
    // Ordenar aleatoriamente
    pcc.sort(() => Math.random() - 0.5);

    registroComponentesDuplicados = arrayContadorDeDuplicados(pcc);

    const inicioFaenaEnMinutos = convertirHoraAMinutosDelDia(ingresoFaena.value);
    const salidaFaenaEnMinutos = convertirHoraAMinutosDelDia(salidaFaena.value);
    const horarioAlmuerzoFaenaEnMinutos = convertirHoraAMinutosDelDia("12:00");
    const horarioFinAlmuerzoFaenaEnMinutos = convertirHoraAMinutosDelDia("12:30");
    const inicioDespostadaEnMinutos = convertirHoraAMinutosDelDia(ingresoDespostada.value);
    const salidaDespostadaEnMinutos = convertirHoraAMinutosDelDia(salidaDespostada.value);
    const horarioAlmuerzoDespostadaEnMinutos = convertirHoraAMinutosDelDia("13:00");
    const horarioFinAlmuerzoDespostadaEnMinutos = convertirHoraAMinutosDelDia("13:45");

    //Verificación si hay almuerzo
    const huboAlmuerzoEnFaena = salidaFaenaEnMinutos > convertirHoraAMinutosDelDia("14:00");
    const huboAlmuerzoEnDespostada =
        salidaDespostadaEnMinutos > convertirHoraAMinutosDelDia("14:00");

    for (let i = 0; i < pcc.length; i++) {
        let planilla = new Object();

        if (registroComponentesDuplicados[i] != 1) {
            descripcion = "Registro";
            planilla.retardoDesdeInicioActividad = 15;
        } else {
            switch (pcc[i]) {
                case "1B":
                    // Cantidad de medias reses revisadas
                    min = 9;
                    max = 12;
                    planilla.esFaena = true;
                    planilla.retardoDesdeInicioActividad = 45;
                    descripcion =
                        Math.floor(Math.random() * (max - min + 1)) + min + " medias reses";

                    break;
                case "2B":
                    descripcion = "Recorte bovino";
                    planilla.retardoDesdeInicioActividad = 20;
                    planilla.esFaena = false;
                    break;
                case "3F":
                    descripcion = "Producto Final";
                    planilla.retardoDesdeInicioActividad = 20;
                    planilla.esFaena = false;
                    break;
                case "4B":
                    descripcion = "Ácido láctico";
                    planilla.retardoDesdeInicioActividad = 45;
                    planilla.esFaena = true;
                    break;
            }
        }

        planilla.pcc = pcc[i];
        planilla.componente = registroComponentesDuplicados[i];
        planilla.descripcion = descripcion;

        let entreHorarioMinimo = 0;
        let entreHorarioMaximo = 0;
        let horarioAleatiorio = 0;

        //Si es registro siempre se ve por la tarde
        const primerHorario = registroComponentesDuplicados[i] == 2 ? false : Math.random() < 0.5;

        //Límites para generación de horarios
        if (planilla.esFaena) {
            if (huboAlmuerzoEnFaena) {
                if (primerHorario) {
                    entreHorarioMinimo = inicioFaenaEnMinutos;
                    entreHorarioMaximo = horarioAlmuerzoFaenaEnMinutos;
                } else {
                    entreHorarioMinimo = horarioFinAlmuerzoFaenaEnMinutos;
                    entreHorarioMaximo = salidaFaenaEnMinutos;
                }
            } else {
                entreHorarioMinimo = inicioFaenaEnMinutos;
                entreHorarioMaximo = salidaFaenaEnMinutos;
            }
        } else {
            if (huboAlmuerzoEnDespostada) {
                if (primerHorario) {
                    entreHorarioMinimo = inicioDespostadaEnMinutos;
                    entreHorarioMaximo = horarioAlmuerzoDespostadaEnMinutos;
                } else {
                    entreHorarioMinimo = horarioFinAlmuerzoDespostadaEnMinutos;
                    entreHorarioMaximo = salidaDespostadaEnMinutos;
                }
            } else {
                entreHorarioMinimo = inicioDespostadaEnMinutos;
                entreHorarioMaximo = salidaDespostadaEnMinutos;
            }
        }

        //Generación de horarios aleatorios
        let condicionWhile = true;
        let intentos = 0;
        do {
            intentos++;
            horarioAleatiorio =
                Math.floor(Math.random() * (entreHorarioMaximo - entreHorarioMinimo + 1)) +
                entreHorarioMinimo +
                planilla.retardoDesdeInicioActividad;

            planilla.hora = conventirMinutosAHoras(horarioAleatiorio);

            condicionWhile = listaRegistros.some((registro) => {
                if (registro.esFaena == planilla.esFaena) {
                    return (
                        convertirHoraAMinutosDelDia(registro.hora) <= +horarioAleatiorio + 5 &&
                        convertirHoraAMinutosDelDia(registro.hora) >= +horarioAleatiorio - 5
                    );
                } else {
                    return (
                        convertirHoraAMinutosDelDia(registro.hora) <= +horarioAleatiorio + 10 &&
                        convertirHoraAMinutosDelDia(registro.hora) >= +horarioAleatiorio - 10
                    );
                }
            });

            //Intentos de generación antes de que salte el error
            if (intentos >= 100) {
                console.log("Se alcanzó el máximo de intentos. Fin de la generación.");
                break;
            }
        } while (condicionWhile);

        // console.log(
        //     "Mínimo: " +
        //         entreHorarioMinimo +
        //         "  Máximo: " +
        //         entreHorarioMaximo +
        //         "\n" +
        //         "Número aleatorios: " +
        //         horarioAleatiorio +
        //         "\n" +
        //         "En horas: " +
        //         planilla.hora
        // );

        listaRegistros.push(planilla);
    }
    listaRegistros.sort(
        (a, b) => convertirHoraAMinutosDelDia(a.hora) - convertirHoraAMinutosDelDia(b.hora)
    );
    let textoAnexto = "";
    for (let i = 0; i < pcc.length; i++) {
        textoAnexto +=
            listaRegistros[i].pcc +
            "| " +
            listaRegistros[i].hora +
            " |" +
            listaRegistros[i].componente +
            "| " +
            listaRegistros[i].descripcion +
            " |" +
            " ✓ " +
            "\n";
    }
    console.log(textoAnexto);

    // const primerHorarioFaena = Math.random() < 0.5;

    if (listaRegistros[0].esFaena) {
        console.log("Hora de inicio faena: " + inicioFaenaEnMinutos);
    } else {
        console.log("Hora de inicio despostada: " + inicioDespostadaEnMinutos);
    }

    const listaValidadorDeHorarios = [];
    for (let i = 0; i < listaRegistros.length; i++) {
        const horarioActual = convertirHoraAMinutosDelDia(listaRegistros[i].hora);

        if (listaRegistros[i].esFaena) {
            listaValidadorDeHorarios.push(horarioActual < horarioAlmuerzoFaenaEnMinutos);
        } else {
            listaValidadorDeHorarios.push(horarioActual < horarioAlmuerzoDespostadaEnMinutos);
        }
    }

    let posicionCambio = -1; // Indicador de que no se encontró ningún cambio
    for (let i = 1; i < listaValidadorDeHorarios.length; i++) {
        if (listaValidadorDeHorarios[i - 1] === true && listaValidadorDeHorarios[i] === false) {
            posicionCambio = i;
            break; // Detener el bucle en el primer cambio
        }
    }

    //Verificación si hubo almuerzo, lo que hace un corte en los horarios
    if (posicionCambio !== -1) {
        if (huboAlmuerzoEnFaena) {
            if (listaRegistros[posicionCambio - 1].esFaena) {
                console.log("Almuerzo faena: " + horarioAlmuerzoFaenaEnMinutos);
            } else {
                console.log("Almuerzo despostada: " + horarioAlmuerzoDespostadaEnMinutos);
            }
        }

        if (huboAlmuerzoEnDespostada) {
            if (listaRegistros[posicionCambio].esFaena) {
                console.log("Fin almuerzo faena: " + horarioFinAlmuerzoFaenaEnMinutos);
            } else {
                console.log("Fin almuerzo despostada: " + horarioFinAlmuerzoDespostadaEnMinutos);
            }
        }
    } else {
        console.log("No hubo almuerzo en el día.");
    }

    if (listaRegistros[listaRegistros.length - 1].esFaena) {
        console.log("Hora de fin faena: " + salidaFaenaEnMinutos);
    } else {
        console.log("Hora de fin despostada: " + salidaDespostadaEnMinutos);
    }
    // if (primerHorarioFaena) {
    // } else {
    // }
});

function convertirHoraAMinutosDelDia(tiempoEnHsYMinutos) {
    const [horas, minutos] = tiempoEnHsYMinutos.split(":");
    let minutosDelDia = horas * 60 + +minutos;

    return minutosDelDia;
}

function conventirMinutosAHoras(minutos) {
    let hs = Math.floor(minutos / 60); // Calcula las horas completas
    let min = minutos % 60; // Calcula los minutos restantes

    // Formatear para asegurarse de que sean dos dígitos (por ejemplo, "01" en vez de "1")
    hs = hs.toString().padStart(2, "0");
    min = min.toString().padStart(2, "0");

    const horaConvertida = `${hs}:${min}`;

    return horaConvertida;
}

function arrayContadorDeDuplicados(arr) {
    // Objeto para almacenar la primera aparición de cada elemento
    let firstOccurrences = {};

    // Array resultado
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];

        if (firstOccurrences[element] === undefined) {
            // Si es la primera vez que aparece el elemento
            firstOccurrences[element] = i;
            result.push(1); // Añadimos 1 al resultado
        } else {
            // Si el elemento ya apareció antes
            result.push(2);
        }
    }

    return result;
}
