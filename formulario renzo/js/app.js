document.addEventListener('DOMContentLoaded', function(){

    //7-Creamos un objeto

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //1- seleccionamos los elementos de la interfaz

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnEnviar = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //2-Agregamos add event listener para escuchar eventos

    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail)

    //10-Creamos un callback para el boton de resetear
    btnReset.addEventListener('click', function(e) {
        e.preventDefault();

        //Reiniciamos el objeto porque al reiniciar no se deshabilita el boton enviar, 1 por objeto
        resetFormulario();

       
       
    })

    //11-Funcion spinner

    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.add('spinner');
        spinner.classList.remove('spinner__hidden');

       

        
        setTimeout(() => {
            spinner.classList.remove('spinner');
            spinner.classList.add('spinner__hidden');

            resetFormulario()
       

            //13-Creamos alerta de exito
           const alertaExito = document.createElement('P');
           alertaExito.classList.add('alerta__exito');
           alertaExito.textContent = 'Formulario enviado con éxito';
           formulario.appendChild(alertaExito);

           setTimeout(() => {
                alertaExito.remove('alerta__exito');
           }, 2000);
        
        }, 2000);

       
    }
    

    //3-funcion validad

    function validar(e) {
        if(e.target.value.trim() == '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            
            return;
            
        }
       
        if (e.target.id === 'email' && !validarEmail(e.target.value)){ //si el id es igual a email y la validar email es falso, se muestra la alerta
            mostrarAlerta('El email no es válido', e.target.parentElement);
            
            //Reiniciamos el objeto porque sino tiene un valor fijo y no se desactiva el boton enviar-se reincia solo el valor que detecta un espacio vacio
            email[e.target.name] = '';
            
            comprobarEmail();
            return;
        }

        //si pasa el return es porque hay algo, llamamos a limpiar alerta, con la referencia para que sepa que borrar
        limpiarAlerta(e.target.parentElement);

        //8-Asignamos los valores del formulario al objeto de forma dinamica
        email[e.target.name] = e.target.value.trim().toLowerCase();
        console.log(email);

     

        //llamamos a la funcion comprobar email
        comprobarEmail();

    }

    //4-Funcion que muestra una alerta

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);
        
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red', 'text-white', 'text-center', 'padding-2');

        //Metemos el parrafo en el html usando la referencia, debajo del div que contiene el label y el input

        referencia.appendChild(error);

    }

    //5-Funcion que limpia las alertas una vez que pasamos la validación
    function limpiarAlerta(referencia) {
        //Pasamos la alerta que tenemos que llamar, la ubicacion
        //Comprobamos si hay una alerta y la borramos, si la referencia tiene esa clase, quiere decir uqe hay una alerta, la borramos
        const alerta = referencia.querySelector('.bg-red');
        if(alerta) {
            alerta.remove();
        }
        
    }

    //6-Funcion para validar el email, que sea formato e mail

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const resultado = regex.test(email);
        return resultado;
    }

    //9-Funcion que comprueba que el objeto está lleno
    function comprobarEmail() {
        if(Object.values(email).includes('')) {
            btnEnviar.classList.add('opacidad-50');
            btnEnviar.disabled = true;
        } else {
            btnEnviar.classList.remove('opacidad-50');
            btnEnviar.disabled = false;
        }
    }

    //12-Funcion que reinicia el formulario

    function resetFormulario() {
         /*luego de que salga el spinner se reinicia el formulario para que ya no hayan campos llenos*/ 
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
 
        formulario.reset();
        comprobarEmail();
    }


})