// Variables para acumular los totales de inversión e intereses
let totalInversion = 0;
let totalInteres = 0;

// Función para actualizar el total de la cuenta (inversión + intereses)
function actualizarTotalCuenta() {
  const total = totalInversion + totalInteres;
  document.getElementById("totalCuenta").textContent = total.toFixed(2);
}

// Función principal para agregar un nuevo movimiento
function agregarMovimiento() {
  // Obtener valor ingresado
  const valor = parseFloat(document.getElementById("valorMovimiento").value);
  const tipo = document.getElementById("tipoMovimiento").value;

  // Validar que el valor sea numérico y mayor que cero
  if (isNaN(valor) || valor <= 0) {
    alert("Por favor ingresa un valor válido.");
    return;
  }

  // Obtener la fecha actual formateada como dd/mm/yyyy
  const hoy = new Date();
  const fechaFormateada = hoy.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  // Obtener el cuerpo de la tabla
  const tabla = document.getElementById("tablaMovimientos").getElementsByTagName("tbody")[0];
  const fila = tabla.insertRow(); // Insertar nueva fila

  // Celda: Fecha
  const celdaFecha = fila.insertCell();
  celdaFecha.style.textAlign = "center";
  celdaFecha.textContent = fechaFormateada;

  // Celda: Tipo de movimiento
  const celdaTipo = fila.insertCell();
  celdaTipo.style.textAlign = "center";
  celdaTipo.textContent = tipo;

  // Celda: Valor
  const celdaValor = fila.insertCell();
  celdaValor.textContent = `$${valor.toFixed(2)}`;

  // Celda: Botón de eliminar
  const celdaAccion = fila.insertCell();
  const botonEliminar = document.createElement("button");
  botonEliminar.textContent = "🗑️";
  botonEliminar.style.cursor = "pointer";
  botonEliminar.style.background = "transparent";
  botonEliminar.style.border = "none";
  botonEliminar.style.fontSize = "18px";

  // Evento para eliminar la fila y actualizar totales
  botonEliminar.onclick = function () {
    // Confirmación antes de eliminar (opcional)
    const confirmar = confirm("¿Deseas eliminar este registro?");
    if (!confirmar) return;

    // Restar el valor al total correspondiente
    if (tipo === "Inversión") {
      totalInversion -= valor;
      document.getElementById("totalInversion").textContent = totalInversion.toFixed(2);
    } else if (tipo === "Interés") {
      totalInteres -= valor;
      document.getElementById("totalInteres").textContent = totalInteres.toFixed(2);
    }

    // Actualizar total general
    actualizarTotalCuenta();

    // Eliminar la fila de la tabla
    fila.remove();
  };

  // Agregar botón a la celda
  celdaAccion.appendChild(botonEliminar);

  // Sumar al total correspondiente
  if (tipo === "Inversión") {
    totalInversion += valor;
    document.getElementById("totalInversion").textContent = totalInversion.toFixed(2);
  } else if (tipo === "Interés") {
    totalInteres += valor;
    document.getElementById("totalInteres").textContent = totalInteres.toFixed(2);
  }

  // Actualizar total cuenta
  actualizarTotalCuenta();

 // Limpiar el campo de entrada después de registrar
document.getElementById("valorMovimiento").value = "";

}

