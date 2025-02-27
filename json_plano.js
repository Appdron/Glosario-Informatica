/*// Función para cargar y mostrar el JSON
function json() {
    fetch('glosario.json')
      .then(response => response.json()) // Parsear la respuesta como JSON
      .then(data => {
        console.log(data); // Mostrar el objeto JSON en la consola
        // Convertir el objeto JSON a texto y mostrarlo en el elemento 'glosario'
        document.getElementById('glosario').innerText = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
      });
}

// Llamar a la función para cargar y mostrar el JSON
json();
*/
// Función para cargar, ordenar y mostrar el JSON
function json() {
    fetch('glosario.json')
      .then(response => response.json()) // Parsear la respuesta como JSON
      .then(data => {
        // Verificar si es un objeto
        if (typeof data === 'object' && data !== null) {
            const sortedData = {}; // Nuevo objeto para almacenar datos ordenados
            // Obtener las claves del objeto y ordenarlas alfabéticamente por las siglas
            Object.keys(data).sort((a, b) => data[a].siglas.localeCompare(data[b].siglas)).forEach(key => {
                sortedData[key] = data[key];
            });
            data = sortedData;
        }

        // Convertir el objeto JSON a texto y mostrarlo en el elemento 'glosario'
        document.getElementById('glosario').innerText = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
      });
}

// Llamar a la función para cargar, ordenar y mostrar el JSON
//json();
