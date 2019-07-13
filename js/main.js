(function(){
"use strict";

var regalo =document.getElementById('regalo');

    document.addEventListener('DOMContentLoaded', function(){
        var mapa = document.getElementById('mapa');
        if(mapa){

        var map = L.map('mapa').setView([9.021681, -79.531789], 15);  

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([9.021681, -79.531789]).addTo(map)
        .bindPopup('GDLWebCamp 2019.<br> Boletos ya disponibles.')
        .openPopup()
        .bindTooltip('Te esperamos')
        .openTooltip();

        }

        

        //Datos Usuario
        let nombre = document.getElementById('nombre');
        let apellido = document.getElementById('apellido');
        let email = document.getElementById('email');

        //Campos pases
        let pase_dia = document.getElementById('pase_dia');
        let pase_dosdias = document.getElementById('pase_dosdias');
        let pase_completo = document.getElementById('pase_completo');

        // Botones y divs
        let calcular = document.getElementById('calcular');
        let errorDiv = document.getElementById('error');
        let botonRegistro = document.getElementById('btnRegistro');
        let lista_productos = document.getElementById('lista-productos');
        let suma = document.getElementById('suma-total');

        //Extras
        let etiquetas = document.getElementById('etiqueta');
        let camisas = document.getElementById('camisa_evento');

        calcular.addEventListener('click', calcularMontos);

        pase_dia.addEventListener('blur', mostrarDias);
        pase_dosdias.addEventListener('blur', mostrarDias);
        pase_completo.addEventListener('blur', mostrarDias);

        nombre.addEventListener('blur', validarDatosUsuario);
        apellido.addEventListener('blur', validarDatosUsuario);
        email.addEventListener('blur', validarDatosUsuario);
        email.addEventListener('blur', validarEmail);
       

        function validarDatosUsuario(){
            if (this.value == ''){
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = 'Este campo es obligatorio *';
                this.style.border = '1px solid red';
                
            }
            else{
                errorDiv.style.display = 'none';
                this.style.border = '1px solid #cccccc';
            }
        }

        function validarEmail(){
            if(this.value.indexOf('@')>-1){
                errorDiv.style.display = 'none';
                this.style.border = '1px solid #cccccc';
            }
            else{
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = 'Este campo debe contener un @ *';
                this.style.border = '1px solid red';
            }
        }

        

        function calcularMontos(event){
            event.preventDefault();
            console.log(regalo.value);
            if(regalo.value===''){
               // alert('Por favor elija un regalo');
            regalo.focus();
            }
            else{
                //Se pasan los valores a enteros
                let boletosDia = parseInt (pase_dia.value,10)|| 0,
                    boletos_dosdias = parseInt  (pase_dosdias.value, 10)|| 0,
                    boletoCompleto = parseInt  (pase_completo.value, 10)|| 0,
                    cantCamisas = parseInt  (camisas.value, 10)|| 0,
                    cantEtiquetas = parseInt  (etiquetas.value, 10)|| 0;

                    //Se calcula el precio de la cantidad de boletos comprados + sus extras solicitados
                    let TotalPagar = (boletosDia * 30) +(boletos_dosdias * 40) + (boletoCompleto * 50) + ((cantCamisas * 10)*.93) + (cantEtiquetas * 2);

                    //Se crea el arreglo que contiene el resumen de los boletos comprados
                    let listadoProductos =[];

                    if(boletosDia>=1){listadoProductos.push(boletosDia + ' Pases por día');}

                    if(boletos_dosdias>=1){listadoProductos.push(boletos_dosdias + ' Pases por 2 días');}

                    if(boletoCompleto>=1){listadoProductos.push(boletoCompleto + ' Pases Completos');}

                    if(cantCamisas>=1){listadoProductos.push(cantCamisas + ' Camisas');}

                    if(cantEtiquetas>=1){listadoProductos.push(cantEtiquetas + ' Etiquetas');}


                    lista_productos.style.display = "block";
                    lista_productos.innerHTML='';
                    for (let i = 0; i<listadoProductos.length;i++){
                        lista_productos.innerHTML += listadoProductos[i] + '<br/>';
                    } 
                    
                    suma.innerHTML = '$ '+TotalPagar.toFixed(2);


                    console.log(listadoProductos);
            }
        }

        function mostrarDias(){
            let boletosDia = parseInt (pase_dia.value,10)|| 0 ,
                boletos_dosdias = parseInt  (pase_dosdias.value, 10)|| 0,
                boletoCompleto = parseInt  (pase_completo.value, 10)|| 0;

            let diasElegidos = [];

            if(boletosDia >=1){diasElegidos.push('viernes')};
            if(boletos_dosdias >=1){diasElegidos.push('viernes','sabado')} ;
            if(boletoCompleto >=1){diasElegidos.push('viernes','sabado','domingo')} ;

            for(let i = 0; i < diasElegidos.length;i++){
                if(diasElegidos[i] !== ''){document.getElementById(diasElegidos[i]).style.display ='block';}
                
                
            }

            //boletosDia =
            //boletos_dosdias = 
           // boletoCompleto = 


            console.log(boletosDia);
            console.log(boletos_dosdias);
            console.log(boletoCompleto);
            console.log(diasElegidos);
        }

    });//DOM Content
})();//Function