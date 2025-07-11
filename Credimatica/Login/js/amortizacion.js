function calcularAmortizacion() {
  const monto = parseFloat(document.getElementById('monto').value);
  const cuotas = parseInt(document.getElementById('cuotas').value);
  const interesMensual = parseFloat(document.getElementById('interes').value) / 100;

  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = '';

  if (isNaN(monto) || isNaN(cuotas) || isNaN(interesMensual)) {
    resultadoDiv.innerHTML = '<p class="error">Por favor completa todos los campos correctamente.</p>';
    return;
  }

  const cuota = (monto * interesMensual) / (1 - Math.pow(1 + interesMensual, -cuotas));
  let saldo = monto;

  let tabla = `
    <table>
      <tr>
        <th>Cuota</th>
        <th>Pago</th>
        <th>Interés</th>
        <th>Abono Capital</th>
        <th>Saldo</th>
      </tr>
  `;

  for (let i = 1; i <= cuotas; i++) {
    const interes = saldo * interesMensual;
    const abonoCapital = cuota - interes;
    saldo -= abonoCapital;

    tabla += `
      <tr>
        <td>${i}</td>
        <td>${cuota.toFixed(2)}</td>
        <td>${interes.toFixed(2)}</td>
        <td>${abonoCapital.toFixed(2)}</td>
        <td>${saldo > 0 ? saldo.toFixed(2) : '0.00'}</td>
      </tr>
    `;
  }

  tabla += `</table>`;
  resultadoDiv.innerHTML = tabla;
}

// Función principal que se llama al hacer clic en el botón "Calcular"
function calcularAmortizacion() {
  // Obtener el valor ingresado del monto
  const monto = parseFloat(document.getElementById('monto').value);

  // Obtener el número de cuotas ingresado
  const cuotas = parseInt(document.getElementById('cuotas').value);

  // Obtener la tasa de interés mensual y convertirla de porcentaje a decimal
  const interesMensual = parseFloat(document.getElementById('interes').value) / 100;

  // Obtener la referencia al contenedor donde se mostrará el resultado
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = ''; // Limpiar resultados anteriores

  // Validar que los campos estén correctamente llenos
  if (isNaN(monto) || isNaN(cuotas) || isNaN(interesMensual)) {
    resultadoDiv.innerHTML = '<p class="error">Por favor completa todos los campos correctamente.</p>';
    return; // Detener la función si hay datos inválidos
  }

  // Calcular la cuota fija mensual usando la fórmula de amortización francesa
  const cuota = (monto * interesMensual) / (1 - Math.pow(1 + interesMensual, -cuotas));

  // Inicializar el saldo pendiente con el monto total del préstamo
  let saldo = monto;

  // Obtener la fecha actual
  const hoy = new Date();

  // Establecer la fecha de la primera cuota como el primer día del mes siguiente
  let fecha = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 1);

  // Construir el encabezado de la tabla HTML
  let tabla = `
    <table>
      <tr>
        <th>Cuota</th>
        <th>Fecha</th>
        <th>Pago</th>
        <th>Interés</th>
        <th>Abono Capital</th>
        <th>Saldo</th>
      </tr>
  `;

  // Iterar por cada cuota mensual
  for (let i = 1; i <= cuotas; i++) {
    // Calcular el interés del mes actual
    const interes = saldo * interesMensual;

    // Calcular cuánto se abona a capital en esta cuota
    const abonoCapital = cuota - interes;

    // Reducir el saldo pendiente
    saldo -= abonoCapital;

    // Formatear la fecha en formato dd/mm/yyyy para mostrarla en la tabla
    const fechaFormateada = fecha.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Agregar una fila a la tabla con los datos de esta cuota
    tabla += `
      <tr>
        <td>${i}</td>
        <td>${fechaFormateada}</td>
        <td>${cuota.toFixed(2)}</td>
        <td>${interes.toFixed(2)}</td>
        <td>${abonoCapital.toFixed(2)}</td>
        <td>${saldo > 0 ? saldo.toFixed(2) : '0.00'}</td>
      </tr>
    `;

    // Avanzar al primer día del mes siguiente para la próxima cuota
    fecha.setMonth(fecha.getMonth() + 1);
  }

  // Cerrar la tabla HTML
  tabla += `</table>`;

  // Mostrar la tabla en pantalla
  resultadoDiv.innerHTML = tabla;
}

