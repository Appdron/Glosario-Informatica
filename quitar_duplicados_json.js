function loadJSON(callback) {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', 'glosario.json', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.send(null);
}

function removeDuplicates(data) {
    const uniqueData = [];
    const seen = new Set();

    data.forEach(entry => {
        if (!seen.has(entry.siglas)) {
            seen.add(entry.siglas);
            uniqueData.push(entry);
        }
    });

    return uniqueData;
}

function renderGlosario(data) {
    glosarioContainer.innerHTML = ""; // Limpiar el contenido anterior
    data.sort((a, b) => a.siglas.localeCompare(b.siglas));

    data.forEach((entry, index) => {
        const termElement = document.createElement("div");
        termElement.classList.add("term");

        const siglasElement = document.createElement("strong");
        siglasElement.innerHTML = `${index + 1}. ${entry.siglas} <span id='definicion'>(${entry.definicion})</span>`;

        const traductionElement = document.createElement("div");
        traductionElement.classList.add("traduction");
        traductionElement.textContent = entry.traduccion;

        const explicacionElement = document.createElement("div");
        explicacionElement.classList.add("explicacion");
        explicacionElement.textContent = entry.explicacion;

        termElement.appendChild(siglasElement);
        termElement.appendChild(traductionElement);
        termElement.appendChild(explicacionElement);

        glosarioContainer.appendChild(termElement);
    });
}

function showCleanJSON(data) {
    const jsonDiv = document.getElementById("jsonOutput");
    jsonDiv.textContent = JSON.stringify(data, null, 2);
}

// Cargar el JSON y procesarlo
loadJSON(function(response) {
    let glosarioData = JSON.parse(response);
    let uniqueData = removeDuplicates(glosarioData);
    renderGlosario(uniqueData);
    showCleanJSON(uniqueData);
});
// Evento de búsqueda
searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredData = glosarioData.filter(entry =>
        entry.siglas.toLowerCase().includes(searchTerm) ||
        entry.definicion.toLowerCase().includes(searchTerm) ||
        entry.traduccion.toLowerCase().includes(searchTerm)
    );
    renderGlosario(filteredData);
});


