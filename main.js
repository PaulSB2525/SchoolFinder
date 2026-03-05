const selectMunicipios = document.getElementById('municipios');
const selectNiveles = document.getElementById('nivel');
const resultsContainer = document.querySelector('.results-container');
const inputBusqueda = document.getElementById('school-name');


municipios.data.forEach(muni => {
    const option = document.createElement('option');
    option.value = muni;
    option.textContent = muni;
    selectMunicipios.appendChild(option);
});
niveles.data.forEach(nivel => {
    const option = document.createElement('option');
    option.value = nivel;
    option.textContent = nivel;
    selectNiveles.appendChild(option);
});

render(escuelas.data);

function render(data) {
    resultsContainer.innerHTML = "";

    data.forEach(escuela => {
        const cardHTML = `
            <div class="card">
                <h3>${escuela.nombre}</h3>
                <p><strong>Clave:</strong> ${escuela.clave}</p>
                <p><strong>Ubicación:</strong> ${escuela.municipio}, JAL</p>
                <div class="badge">${escuela.control}</div>
            </div>
        `;
        resultsContainer.innerHTML += cardHTML;
    });
}


function buscar() {
    const busqueda = inputBusqueda.value.toLowerCase();
    const muniSel = selectMunicipios.value;
    const nivelSel = selectNiveles.value;

    const filtros = escuelas.data.filter(escuela => {
        const coincideName = escuela.nombre.toLowerCase().includes(busqueda);
        const coincideMuni = muniSel === "" || escuela.municipio === muniSel;
        const coincideNivel = nivelSel === "" || escuela.nivel === nivelSel;

        return coincideName && coincideMuni && coincideNivel;
    });
    render(filtros);
}
inputBusqueda.addEventListener('input', buscar);
selectMunicipios.addEventListener('change', buscar);
selectNiveles.addEventListener('change', buscar);
