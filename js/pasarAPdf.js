function genPDF() {
    var doc = new jsPDF();

    // Obtener el mensaje del elemento con ID 'textoEscrito'
    let mensaje = document.getElementById("textoEscrito").value;

    // Obtener la fecha seleccionada del elemento con ID 'fecha'
    let fechaSeleccionada = document.getElementById("fecha").value;
    if (!fechaSeleccionada) {
        alert("Por favor, selecciona una fecha.");
        return;
    }
    // Formatear la fecha seleccionada (yyyy-mm-dd a dd/mm/yyyy)
    let partesFecha = fechaSeleccionada.split("-");
    let fechaFormateada = partesFecha[2] + "/" + partesFecha[1] + "/" + partesFecha[0];

    //Generar numero del 0 al 11 y luego lo pasamos a minutos
    let max = 11;
    let randomInt = Math.floor(Math.random() * max);
    let minutosRandom = randomInt * 5;

    //Generar numero para las horas
    let min = 7;
    max = 15;
    randomInt = Math.floor(Math.random() * (max - min) + min);
    let horasRandom = randomInt * 5;

    let horarioGenerado = horasRandom + ":" + minutosRandom;

    // Añadir el mensaje y la fecha al PDF
    doc.text(20, 20, "Fecha: " + fechaFormateada);
    doc.text(20, 30, mensaje);
    doc.text(20, 40, mensaje);

    // Añadir una nueva página y un mensaje adicional
    doc.addPage();
    doc.text(20, 20, "Mi trabajo!!");

    // Agregar un párrafo al DOM con la información
    let outputDiv = document.getElementById("output");
    let nuevoParrafo = document.createElement("p");
    nuevoParrafo.textContent = `Mensaje: ${mensaje} - Fecha: ${fechaFormateada} - Horario ${horarioGenerado}`;
    outputDiv.appendChild(nuevoParrafo);

    // Guardar el PDF
    doc.save("Test.pdf");
}
