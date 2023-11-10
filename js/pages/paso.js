const tipoEleccion = 1; //1 -> Paso 2 -> Generales
const tipoRecuento = 1;

let anioSelect = document.getElementById('comboAnio');
let cargosSelect = document.getElementById('comboCargo');
let distritoSelect = document.getElementById("comboDistrito");
let seccionSelect = document.getElementById("comboSeccion");


fetch("https://resultados.mininterior.gob.ar/api/menu/periodos")
    .then(response => response.json())
    .then(data => {
        data.forEach(anio => {
            let option = document.createElement('option');
            option.value = anio;
            option.text = anio;
            anioSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error al seleccionar el año: ', error));

anioSelect.addEventListener("change", () => {
    const selectedAnio = anioSelect.value;
    if (selectedAnio) {
        fetch(`https://resultados.mininterior.gob.ar/api/menu?año=${selectedAnio}`)
            .then(response => response.json())
            .then(data => {
                cargosSelect.innerHTML = '<option>Cargo</option>';
                data.forEach(eleccion => {
                    if (eleccion.IdEleccion == tipoEleccion) {
                        eleccion.Cargos.forEach(cargo => {
                            const option = document.createElement("option");
                            option.value = cargo.IdCargo;
                            option.text = cargo.Cargo;
                            cargosSelect.appendChild(option);
                        });
                    }
                });
            })
            .catch(error => console.error("Error al cargar los cargos:", error));
    }
});

cargosSelect.addEventListener("change", () => {
    const selectedAnio = anioSelect.value;
    const selectedCargo = cargosSelect.value;
    if (selectedAnio && selectedCargo) {
        distritoSelect.innerHTML = '';
        fetch(`https://resultados.mininterior.gob.ar/api/menu?año=${selectedAnio}`)
            .then(response => response.json())
            .then(data => {
                distritoSelect.innerHTML = '<option value="">Distrito</option>';
                data.forEach(eleccion => {
                    if (eleccion.IdEleccion == tipoEleccion) {
                        eleccion.Cargos.forEach(cargo => {
                            if (cargo.IdCargo == selectedCargo) {
                                cargo.Distritos.forEach(distrito => {
                                    const option = document.createElement("option");
                                    option.value = distrito.IdDistrito;
                                    option.text = distrito.Distrito;
                                    distritoSelect.appendChild(option);
                                });
                            }
                        });
                    }
                });
            })
            .catch(error => console.error("Error al cargar los distritos:", error));
    }
});

distritoSelect.addEventListener("change", () => {
    const selectedAnio = anioSelect.value;
    const selectedCargo = cargosSelect.value;
    const selectedDistrito = distritoSelect.value;
    if (selectedAnio && selectedCargo && selectedDistrito) {
        fetch(`https://resultados.mininterior.gob.ar/api/menu?año=${selectedAnio}`)
            .then(response => response.json())
            .then(data => {
                seccionSelect.innerHTML = '<option value="">Sección</option>';
                data.forEach(eleccion => {
                    if (eleccion.IdEleccion == tipoEleccion) {
                        eleccion.Cargos.forEach(cargo => {
                            if (cargo.IdCargo == selectedCargo) {
                                cargo.Distritos.forEach(distrito => {
                                    if (distrito.IdDistrito == selectedDistrito) {
                                        let hdSeccionProvincial = document.getElementById("hdSeccionProvincial");
                                        hdSeccionProvincial.value = distrito.IdSecccionProvincial;
                                        distrito.SeccionesProvinciales.forEach(seccionProv => {
                                            seccionProv.Secciones.forEach(seccion => {
                                                const option = document.createElement("option");
                                                option.value = seccion.IdSeccion;
                                                option.text = seccion.Seccion;
                                                seccionSelect.appendChild(option);
                                            });
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            })
            .catch(error => console.error("Error al cargar las secciones:", error));
    }
});

