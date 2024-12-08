const checkboxTimeFaena = document.getElementById("actividadEnFanea");
const checkboxTimeDespostada = document.getElementById("actividadEnDespostada");
const timeContainerFaena = document.getElementById("timeContainerFaena");
const timeContainerDespostada = document.getElementById("timeContainerDespostada");

const ingresoFaena = document.getElementById("ingresoFaena").value;
const salidaFaena = document.getElementById("salidaFaena").value;
const ingresoDespostada = document.getElementById("ingresoDespostada").value;
const salidaDespostada = document.getElementById("salidaDespostada").value;

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

    const ingresoFaenaEnMinutos = convertirHoraAMinutosDelDia(ingresoFaena);
    const salidaFaenaEnMinutos = convertirHoraAMinutosDelDia(salidaFaena);
    const horarioAlmuerzoFaena = convertirHoraAMinutosDelDia("12:30");
    const horarioFinAlmuerzoFaena = convertirHoraAMinutosDelDia("13:10");
    const ingresoDespostadaEnMinutos = convertirHoraAMinutosDelDia(ingresoDespostada);
    const salidaDespostadaEnMinutos = convertirHoraAMinutosDelDia(salidaDespostada);
    const horarioAlmuerzoDespostada = convertirHoraAMinutosDelDia("13:00");
    const horarioFinAlmuerzoDespostada = convertirHoraAMinutosDelDia("14:45");

    const totalMinutosTrabajadosEnFaena = salidaFaenaEnMinutos - ingresoFaenaEnMinutos;
    // const totalMinutosTrabajadosEnDespostada =        salidaDespostadaEnMinutos - ingresoDespostadaEnMinutos;
    let horarioActividadEnFaenaEnMinutos = ingresoFaenaEnMinutos;
    // let horarioActividadEnDespostadaEnMinutos = ingresoDespostadaEnMinutos;

    for (let i = 0; i < pcc.length; i++) {
        let planilla = new Object();

        if (registroComponentesDuplicados[i] != 1) {
            descripcion = "Registro";
        } else {
            switch (pcc[i]) {
                case "1B":
                    // Cantidad de medias reses revisadas
                    min = 9;
                    max = 12;
                    planilla.esFaena = true;
                    descripcion =
                        Math.floor(Math.random() * (max - min + 1)) + min + " medias reses";
                    break;
                case "2B":
                    descripcion = "Recorte bovino";
                    planilla.esFaena = false;
                    break;
                case "3F":
                    descripcion = "Producto Final";
                    planilla.esFaena = false;
                    break;
                case "4B":
                    descripcion = "Ácido lactico";
                    planilla.esFaena = true;
                    break;
            }
        }

        //Generamos los minutos máximos y mínimos para sumar a la última hora que se hizo el PCC o al inicio de actividades.
        //Mínimo = Una hora apróximadamente.
        const minutosMinimos = totalMinutosTrabajadosEnFaena / 10;
        //Máximo = La cantidad de PCC a los que se van en el recorrido.
        const minutosMaximos = totalMinutosTrabajadosEnFaena / +pcc.length;

        const espacioAleatoriosEntreRecorridos =
            Math.floor(Math.random() * (minutosMaximos - minutosMinimos + 1)) + minutosMinimos;
        horarioActividadEnFaenaEnMinutos += espacioAleatoriosEntreRecorridos;

        planilla.pcc = pcc[i];
        planilla.hora = conventirMinutosAHoras(horarioActividadEnFaenaEnMinutos);
        planilla.componente = registroComponentesDuplicados[i];
        planilla.descripcion = descripcion;

        let entreHorarioMinimo = 0;
        let entreHorarioMaximo = 0;
        let horarioAleatiorio = 0;
        const primerHorario = Math.random() < 0.5;
        if (planilla.isFaena) {
            if (primerHorario) {
                entreHorarioMinimo = ingresoFaenaEnMinutos;
                entreHorarioMaximo = horarioAlmuerzoFaena;
            } else {
                entreHorarioMinimo = horarioFinAlmuerzoFaena;
                entreHorarioMaximo = SalidaFaenaEnMinutos;
            }
        } else {
            if (primerHorario) {
                entreHorarioMinimo = ingresoDespostadaEnMinutos;
                entreHorarioMaximo = horarioAlmuerzoDespostada;
            } else {
                entreHorarioMinimo = horarioFinAlmuerzoDespostada;
                entreHorarioMaximo = salidaDespostadaEnMinutos;
            }
        }

        horarioAleatiorio =
            Math.floor(Math.random() * (entreHorarioMaximo - entreHorarioMinimo + 1)) +
            entreHorarioMinimo;

        planilla.horarioNuevoAleatorio = conventirMinutosAHoras(horarioAleatiorio);

        listaRegistros.push(planilla);
    }
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
            "\n" +
            listaRegistros[i].horarioNuevoAleatorio +
            "\n";
    }
    console.log(textoAnexto);
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
