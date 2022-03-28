const nombre = document.getElementById("nom_form");
const numero = document.getElementById("num_form");
const direccion = document.getElementById("dir_form");
const agregar = document.getElementById("agregar");
const listado = document.getElementById("listado_tareas");
const header_listado = document.getElementById("header_listado");
const formulario = document.getElementById("form");

//Array donde vamos a guardar el listado de contactos.
let contactos = [];

/*Evento para el boton agregar */
agregar.addEventListener("click", (e) => {
    e.preventDefault(); //desactivamos la acción por defecto del boton del formulario

    crearContacto();
    guardarContacto();
    mostrarContactos();

    //limpiamos los datos introducidos en el formulario
    formulario.reset();
});

/*Función con la que creamos el objeto contacto y lo guardamos en el array  */
const crearContacto = () => {
    let contacto = {
        id: contactos.length + 1,
        nombre: nombre.value,
        numero: numero.value,
        direccion: direccion.value
    }

    contactos.push(contacto);

};

/*Función con la que guardamos los datos del array en el localstore */
const guardarContacto = () => {

    //como localstore sólo guarda string, parseamos el objeto json a string.
    localStorage.setItem("agenda", JSON.stringify(contactos));
    
}

/*Función con la que mostramos en pantalla la información guardada en la coockie */
const mostrarContactos = () => {

    listado.innerHTML = "";

    //Obtenemos los datos guardados en la coockie, para ello debemos parsearla a JSON
    contactos = JSON.parse(localStorage.getItem("agenda"));

    if(contactos === null || contactos.length == 0){//si no existe la coockie o esta vacía
        contactos = [];
        header_listado.textContent = "No tienes contactos";

    }else{//hay elementos guardados en la coockie
        header_listado.textContent = "Listado de contactos";

        //recorremos los elementos del array y por cada uno creamos los elementos necesarios
        contactos.forEach(contacto => {

            let containerTarea = document.createElement('div');
            containerTarea.classList.add("tarea");

            let nomContacto = document.createElement('p');
            let numContacto = document.createElement('p');
            let dirContacto = document.createElement('p');
            let deleteIcon = document.createElement('span');
            deleteIcon.classList.add('material-icons-sharp', 'icono');

            nomContacto.textContent = contacto.nombre;
            numContacto.textContent = contacto.numero;
            dirContacto.textContent = contacto.dirContacto;
            deleteIcon.textContent = 'delete_forever';

            containerTarea.appendChild(nomContacto);
            containerTarea.appendChild(numContacto);
            containerTarea.appendChild(dirContacto);
            containerTarea.appendChild(deleteIcon);
            listado.appendChild(containerTarea);

            /*Como queremos poder eliminar los contactos le agregamos un evento al icono de la tarea */
            deleteIcon.addEventListener("click", () => {
                contactos.splice(contacto.id - 1, 1);
                guardarContacto();
                mostrarContactos();
            });

        });

        /*Como también queremos poder eliminar todos los contactos creamos un boton al final de la lista
        de tareas y le aplicamos el evento*/
        let deleteAll = document.createElement('button');
        deleteAll.classList.add("btn");
        deleteAll.textContent = "Borrar contactos";
        
        listado.appendChild(deleteAll);

        //Evento que escucha el click del boton
        deleteAll.addEventListener("click", () => {
            contactos.length = 0; //modificamos el tamaño del array a 0
            guardarContacto();
            mostrarContactos();
        });
    }
};

//Con este evento, al cargar la página ejecutamos la función que muestra los datos que haya en la coockie.
window.addEventListener("load", mostrarContactos);