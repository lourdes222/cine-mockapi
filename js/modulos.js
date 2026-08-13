const URL_API= 'https://6a73b28c15e0453fe1b424c5.mockapi.io/peliculas'


//POST
const agregarPelicula = async (nuevaPelicula) => {
fetch('https://6a73b28c15e0453fe1b424c5.mockapi.io/peliculas', {
  method: 'POST',
  headers: {'content-type':'application/json'},
  // Send your data in the request body as JSON
  body: JSON.stringify(nuevaPelicula)
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(pelicula => {
  console.log('Pelicula creada:', pelicula);
}).catch(error => {
  // handle error
})

}

//GET
const mostrarPeliculas = (peliculasEncontradas) => {
    let contenedorPeliculas = document.querySelector('#listadoPeliculas');
    
    if (!contenedorPeliculas) return; 

    contenedorPeliculas.innerHTML = '';

    let peliculas = peliculasEncontradas || JSON.parse(localStorage.getItem('peliculas')) || [];

    if (peliculas.length > 0) {
   
        peliculas.forEach(p => {
                 let fotoPoster= p.imagen|| 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=200'
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
}
//GET
const buscarPelicula = (datosBusqueda) => {
    let peliculas = JSON.parse(localStorage.getItem('peliculas')) || [];
    let peliculasEncontradas = peliculas.filter(p => {
        const coincideTitulo = datosBusqueda.nombreABuscar ?
         p.titulo.toLowerCase().includes(datosBusqueda.nombreABuscar.toLowerCase()) : true;

        const coincideGenero = datosBusqueda.generoABuscar ?
         p.genero.toLowerCase() === datosBusqueda.generoABuscar.toLowerCase() : true;

        return coincideTitulo && coincideGenero;
    }); 
    mostrarPeliculas(peliculasEncontradas);
}
//DELETE
const eliminarPelicula = (codigo) => {
    if (confirm ("¿Desea eliminar esta pelicula de la cartelera?")){
        let peliculas = JSON.parse(localStorage.getItem("peliculas"))||[];
        let indice=peliculas.findIndex(p=>p.codigo==codigo);

        peliculas.splice(indice, 1);
        localStorage.setItem("peliculas", JSON.stringify(peliculas));
        mostrarPeliculas()
        mostrarMensaje("Pelicula eliminada")
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
    let peliculas= JSON.parse(localStorage.getItem('peliculas'))||[];
    let peliculasAModif= peliculas.find(p=>String(p.codigo)===String(nuevosDatos.codigoAModif));
    
    if(peliculasAModif){
        peliculasAModif.titulo=nuevosDatos.nombreAModif;
        peliculasAModif.genero=nuevosDatos.generoAModif;
    
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    mostrarPeliculas(peliculas);
    mostrarMensaje("Pelicula actualizada")
}
}