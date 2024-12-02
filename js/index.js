function formatTime(givenMinutes) {
    // Calculamos las horas y minutos
    let hours = Math.floor(givenMinutes / 60);
    let minutes = Math.floor(givenMinutes % 60);
    minutes = Math.round(minutes / 5) * 5 === 60 ? 0 : Math.round(minutes / 5) * 5;

    // Aseguramos que los valores tengan dos dígitos
    let formattedHours = hours.toString().padStart(2, "0");
    let formattedMinutes = minutes.toString().padStart(2, "0");

    // Formateamos en el formato hh:mm
    return `${formattedHours}:${formattedMinutes}`;
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
            let firstIndex = firstOccurrences[element];
            result.push(2); // Calculamos la diferencia de índices y añadimos al resultado
        }
    }

    return result;
}

function generatePccActivities() {
    // Lista de elementos
    let pcc = ["1B", "2B", "3F", "4B"];
    let listaRegistros = [];
    let registroComponentes = [];

    // Agregar elemento al array aleatoriamente
    let max = pcc.length;
    let randomInt = Math.floor(Math.random() * max);
    pcc.push(pcc[randomInt]);

    // Ordenar aleatoriamente
    pcc.sort(() => Math.random() - 0.5);

    registroComponentes = arrayContadorDeDuplicados(pcc);

    let textoAnexto = "16/07/2024" + "<br>";
    let descripcion = "";

    const inicioHoraFaena = document.getElementById("inicio-faena").value;
    const inicioMinFaena = document.getElementById("inicio-min-faena").value;
    const finHoraFaena = document.getElementById("fin-faena").value;
    const finMinFaena = document.getElementById("fin-min-faena").value;
    const inicioHoraDespostada = document.getElementById("inicio-despostada").value;
    const inicioMinDespostada = document.getElementById("inicio-min-despostada").value;
    const finHoraDespostada = document.getElementById("fin-despostada").value;
    const finMinDespostada = document.getElementById("fin-min-despostada").value;

    let inicioFaenaEnMinutos = +inicioHoraFaena * 60 + +inicioMinFaena;
    let finFaenaEnMinutos = +finHoraFaena * 60 + +finMinFaena;
    let totalTrabajadoEnMinutosFaena = finFaenaEnMinutos - inicioFaenaEnMinutos;
    let horarioActividadEnFaenaEnMinutos = inicioFaenaEnMinutos;

    let inicioDespostadaEnMinutos = +inicioHoraDespostada * 60 + +inicioMinDespostada;
    let finDespostadaEnMinutos = +finHoraDespostada * 60 + +finMinDespostada;
    let totalTrabajadoEnMinutosDespostada = finDespostadaEnMinutos - inicioDespostadaEnMinutos;
    let horarioActividadEnDespostadaEnMinutos = inicioDespostadaEnMinutos;

    for (let i = 0; i < pcc.length; i++) {
        let planilla = new Object();

        if (registroComponentes[i] != 1) {
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
        min = totalTrabajadoEnMinutosFaena / 10;
        //Máximo = La cantidad de PCC a los que se van en el recorrido.
        max = totalTrabajadoEnMinutosFaena / +pcc.length;
        const espacioAleatoriosEntreRecorridos = Math.floor(Math.random() * (max - min + 1)) + min;
        horarioActividadEnFaenaEnMinutos += espacioAleatoriosEntreRecorridos;

        if (planilla.esFaena) {
            if (
                horarioActividadEnFaenaEnMinutos >= 12 * 60 + 20 &&
                horarioActividadEnFaenaEnMinutos <= 13 * 60
            ) {
                horarioActividadEnFaenaEnMinutos =
                    12 * 60 - Math.floor(Math.random() * (15 - 5 + 1)) + 5;
            }
        } else {
            if (
                horarioActividadEnFaenaEnMinutos >= 13 * 60 &&
                horarioActividadEnFaenaEnMinutos <= 14 * 60
            ) {
                horarioActividadEnFaenaEnMinutos -= Math.floor(Math.random() * (15 - 5 + 1)) + 5;
            }
        }

        planilla.hora = formatTime(horarioActividadEnFaenaEnMinutos);
        planilla.componente = registroComponentes[i];
        planilla.descripcion = descripcion;

        listaRegistros.push(planilla);
    }

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
            "<br>";
    }

    // Mostrar el resultado en el DOM
    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = textoAnexto;

    // outputDiv.textContent = algo +'Orden aleatorio: ' + pcc.join(', ');
}

function generateHourOptions() {
    let options = "";
    for (let i = 0; i < 24; i++) {
        options += `<option value="${i.toString().padStart(2, "0")}">${i
            .toString()
            .padStart(2, "0")}</option>`;
    }
    return options;
}

function generateMinuteOptions() {
    let options = "";
    for (let i = 0; i < 60; i += 5) {
        // Incremento de 5 minutos
        options += `<option value="${i.toString().padStart(2, "0")}">${i
            .toString()
            .padStart(2, "0")}</option>`;
    }
    return options;
}

function toggleHorario(id, name) {
    const checkbox = document.getElementById(id);
    const container = document.getElementById("horarios");

    if (checkbox.checked) {
        const div = document.createElement("div");
        div.className = "horario";
        div.id = `horario-${id}`;
        div.innerHTML = `
            <h3>${name}</h3>
            <label for="inicio-${id}">Hora de Inicio:</label>


            <!--<select id="inicio-${id}"><option value="07">07</option></select>:<select id="inicio-min-${id}">${generateMinuteOptions()}</select>-->


            <select id="inicio-${id}">${generateHourOptions()}</select>:<select id="inicio-min-${id}">${generateMinuteOptions()}</select>

            <br>
            <label for="fin-${id}">Hora de Finalización:</label>
            <select id="fin-${id}"><option value="17">17</option></select>:<select id="fin-min-${id}">${generateMinuteOptions()}</select>   
            
            <!--<select id="fin-${id}">${generateHourOptions()}</select>:<select id="fin-min-${id}">${generateMinuteOptions()}</select>-->


            <br>
            <label>Tipo de Actividad:</label>
            <input type="checkbox" id="preoperacional-${id}" value="Preoperacional"> Preoperacional
            <input type="checkbox" id="operacional-${id}" value="Operacional"> Operacional
            <br>
            <button onclick="agregarActividad('${name}', 'inicio-${id}', 'inicio-min-${id}', 'fin-${id}', 'fin-min-${id}', 'preoperacional-${id}', 'operacional-${id}')">Agregar a la Lista</button>
        `;
        container.appendChild(div);
    } else {
        const div = document.getElementById(`horario-${id}`);
        if (div) {
            container.removeChild(div);
        }
    }
}

function agregarActividad(
    name,
    inicioId,
    inicioMinId,
    finId,
    finMinId,
    preoperacionalId,
    operacionalId
) {
    const inicioHora = document.getElementById(inicioId).value;
    const inicioMin = document.getElementById(inicioMinId).value;
    const finHora = document.getElementById(finId).value;
    const finMin = document.getElementById(finMinId).value;

    const tipoActividad = [];
    if (document.getElementById(preoperacionalId).checked) tipoActividad.push("Preoperacional");
    if (document.getElementById(operacionalId).checked) tipoActividad.push("Operacional");

    const lista = document.getElementById("lista-actividades");
    const li = document.createElement("li");
    li.textContent = `${name}: De ${inicioHora}:${inicioMin} a ${finHora}:${finMin} (${tipoActividad.join(
        ", "
    )})`;
    lista.appendChild(li);
}

function generateRandomOrder() {
    let horaInicio = 7;
    let max = 18;
    let min = 10;

    let minutosDecimalRandom = Math.floor(Math.random() * (max - min) + min) + 1;

    minutosDecimalRandom = (minutosDecimalRandom / 10) * 3600;

    function formatTime(seconds) {
        // Calculamos las horas y minutos
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        minutes = Math.round(minutes / 5) * 5;

        // Aseguramos que los valores tengan dos dígitos
        let formattedHours = hours.toString().padStart(2, "0");
        let formattedMinutes = minutes.toString().padStart(2, "0");

        // Formateamos en el formato hh:mm
        return `${formattedHours}:${formattedMinutes}`;
    }
}
