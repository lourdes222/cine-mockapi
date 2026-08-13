document.addEventListener("DOMContentLoaded", ()=>{
    mostrarPeliculas();
    const btn_agregar=document.querySelector("#btn-agregar");
    btn_agregar.addEventListener("click", ()=>{
        document.querySelector("#form-agregar").style.display="block";
    })
    document.querySelector("#btn-cerrar-formAgregar").addEventListener("click", (e)=>{
        e.preventDefault();
        document.querySelector("#form-agregar").style.display="none";
    })
    
    const form_agregar = document.querySelector("#form-agregar");
form_agregar.addEventListener("submit", (e) => {
    e.preventDefault();

    const archivoImagen = document.querySelector("#imagen").files[0];


    const mandarALocalStorage = (imagenBase64) => {
        const peliculasActuales= JSON.parse(localStorage.getItem('peliculas'))||[]
        const proximoCodigo= peliculasActuales.length+1;
        const nuevaPelicula = {
            titulo: form_agregar.querySelector('[name="titulo"]').value,
            genero: form_agregar.querySelector('[name="genero"]').value,
            codigo: peliculasActuales.length+1,
            imagen: imagenBase64
        };

        agregarPelicula(nuevaPelicula);
        form_agregar.reset();
        form_agregar.style.display = "none";
    };

    if (archivoImagen) {
        const reader = new FileReader();
        reader.onloadend = () => {
            mandarALocalStorage(reader.result);
        };
        reader.readAsDataURL(archivoImagen);
    } else {
        mandarALocalStorage("");
    }
});
    const form_buscar= document.querySelector("#form-buscar");
    form_buscar.addEventListener("submit", (e)=>{
        e.preventDefault();

        const peliculaABuscar={
            nombreABuscar: form_buscar.querySelector('[name="nombreBuscar"]').value.trim(),
            generoABuscar: form_buscar.querySelector('[name="generoBuscar"]').value
        }
        buscarPelicula(peliculaABuscar);
    });
    const btn_filtros=document.querySelector('#btn-filtros');
    btn_filtros.addEventListener('click', (e)=>{
        e.preventDefault();
        form_buscar.reset();
        mostrarPeliculas();
    });
    const form_modificar=document.querySelector("#form-modificar");
    form_modificar.addEventListener("submit", (e)=>{
        e.preventDefault();

        const nuevosDatos={
            nombreAModif: form_modificar.querySelector('input[name="titulo"]').value,
            generoAModif: form_modificar.querySelector('select[name="genero"]').value,
            codigoAModif: form_modificar.querySelector('input[name="codigo"]').value
        }
        modificarPelicula(nuevosDatos);
        form_modificar.style.display="none";
    })
})