const URL_API= 'https://6a73b28c15e0453fe1b424c5.mockapi.io/peliculas'


//POST
const agregarPelicula = async (nuevaPelicula) => {
fetch('https://6a73b28c15e0453fe1b424c5.mockapi.io/peliculas', {
  method: 'POST',
  headers: {'content-type':'application/json'},
  body: JSON.stringify(nuevaPelicula)
}).then(res => {
  if (res.ok) {
      return res.json();
  }
}).then(pelicula => {
  console.log('Pelicula creada:', pelicula);
}).catch(error => {
    console.error('Error creando la película:', error);
})

}

//GET
const mostrarPeliculas = (peliculasEncontradas) => {
    let contenedorPeliculas = document.querySelector('#listadoPeliculas');
    
    if (!contenedorPeliculas) return; 

    contenedorPeliculas.innerHTML = '';

    if (peliculasEncontradas) {
        if (peliculasEncontradas.length > 0) {
            peliculasEncontradas.forEach(p => {
                let fotoPoster = p.imagen || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=200';
                contenedorPeliculas.innerHTML += `
                    <div class="pelicula">
                        <img src="${fotoPoster}" alt="Poster" class="poster-pelicula">
                        <div class="info">
                            <p><strong>Título:</strong> ${p.titulo}</p>
                            <p><strong>Género:</strong> ${p.genero}</p>
                            <p><strong>Código:</strong> ${p.codigo}</p> <!-- VOLVIMOS A p.codigo -->
                        </div>
                        <div class="botones">
                            <button class="btn-modificar" onclick="mostrarFormModificar('${p.titulo}', '${p.genero}', '${p.codigo}')">Modificar</button>
                            <button class="btn-eliminar" onclick="eliminarPelicula('${p.codigo}')">Eliminar</button>
                        </div>
                    </div>
                `;
            });
        } else {
            contenedorPeliculas.innerHTML = '<p>No hay películas para mostrar.</p>';
        }
    } else {
        fetch(URL_API, {
            method: 'GET',
            headers: {'content-type':'application/json'},
            cache: 'no-cache' 
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(peliculas => {
            if (peliculas.length > 0) {
                peliculas.forEach(p => {
                    let fotoPoster = p.imagen || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=200';
                    contenedorPeliculas.innerHTML += `
                        <div class="pelicula">
                            <img src="${fotoPoster}" alt="Poster" class="poster-pelicula">
                            <div class="info">
                                <p><strong>Título:</strong> ${p.titulo}</p>
                                <p><strong>Género:</strong> ${p.genero}</p>
                                <p><strong>Código:</strong> ${p.codigo}</p> 
                            </div>
                            <div class="botones">
                                <button class="btn-modificar" onclick="mostrarFormModificar('${p.titulo}', '${p.genero}', '${p.codigo}')">Modificar</button>
                                <button class="btn-eliminar" onclick="eliminarPelicula('${p.codigo}')">Eliminar</button>
                            </div>
                        </div>
                    `;
                });
            } else {
                contenedorPeliculas.innerHTML = '<p>No hay películas para mostrar.</p>';
            }
        }).catch(error => {
            console.error('Error trayendo las películas:', error);
        });
    }
}
//GET
const buscarPelicula = (datosBusqueda) => {
    fetch(URL_API, {
        method: 'GET',
        headers: {'content-type':'application/json'},
        cache: 'no-cache'
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    }).then(peliculas => {
        let peliculasEncontradas = peliculas.filter(p => {
            let tituloPeli = (p.titulo || '').toLowerCase();
            let generoPeli = (p.genero || '').toLowerCase();
            
            let buscadoTitulo = (datosBusqueda.nombreABuscar || '').toLowerCase();
            let buscadoGenero = (datosBusqueda.generoABuscar || '').toLowerCase();

            const coincideTitulo = buscadoTitulo ? tituloPeli.includes(buscadoTitulo) : true;
            const coincideGenero = buscadoGenero ? generoPeli === buscadoGenero : true;

            return coincideTitulo && coincideGenero;
        }); 
        mostrarPeliculas(peliculasEncontradas);
    }).catch(error => {
        console.error('Error en la búsqueda:', error);
    });
}
//DELETE
const eliminarPelicula = (codigo) => {
    if (confirm ("¿Desea eliminar esta pelicula de la cartelera?")){
        fetch(`${URL_API}/${codigo}`, {
            method: 'DELETE',
            headers: {'content-type':'application/json'},
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(pelicula => {
            console.log('Pelicula eliminada:', pelicula);
            mostrarMensaje("Pelicula eliminada");
            mostrarPeliculas(); 
        }).catch(error => {
            console.error('Error eliminando la película:', error);
        });    
    }
}
//GET
const mostrarFormModificar = (tituloActual, generoActual, codigo) => {
    document.querySelector('#form-modificar').innerHTML = `
        <div class="cerrar">
            <button type="button" class="btn-cerrar-formModif" onclick="document.querySelector('#form-modificar').style.display='none'">X</button>
        </div>
        <h3>Modificar Película</h3>
        <p>Editando código: <strong>#${codigo}</strong></p>
        
        <input type="hidden" name="codigo" value="${codigo}">
        
        <label>Nuevo Título</label>
        <input type="text" name="titulo" value="${tituloActual}" required>
        
        <label>Nuevo Género</label>
        <select name="genero" required>
            <option value="Comedia" ${generoActual.toLowerCase() === 'comedia' ? 'selected' : ''}>Comedia</option>
            <option value="Terror" ${generoActual.toLowerCase() === 'terror' ? 'selected' : ''}>Terror</option>
            <option value="Ciencia Ficción" ${generoActual.toLowerCase() === 'ciencia ficción' ? 'selected' : ''}>Ciencia Ficción</option>
            <option value="Aventura" ${generoActual.toLowerCase() === 'aventura' ? 'selected' : ''}>Aventura</option>
            <option value="Romance" ${generoActual.toLowerCase() === 'romance' ? 'selected' : ''}>Romance</option>
            <option value="Infantil" ${generoActual.toLowerCase() === 'infantil' ? 'selected' : ''}>Infantil</option>
        </select>
        
        <input type="submit" name="submit" value="Guardar Cambios">
    `;
    
    document.querySelector('#form-modificar').style.display = 'block';
}

//PUT
const modificarPelicula=(nuevosDatos)=>{  
    const datosEditados = {
        titulo: nuevosDatos.nombreAModif,
        genero: nuevosDatos.generoAModif
    };

    fetch(`${URL_API}/${nuevosDatos.codigoAModif}`, {
        method: 'PUT',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(datosEditados)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    }).then(pelicula => {
        console.log('Pelicula modificada:', pelicula);
        mostrarPeliculas();
        mostrarMensaje("Pelicula modificada");
        document.querySelector('#form-modificar').style.display = 'none';
    }).catch(error => {
        console.error('Error modificando la película:', error);
    });
}