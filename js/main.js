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
        let caja = document.getElementById('caja');

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



            // console.log(boletosDia);
            // console.log(boletos_dosdias);
            // console.log(boletoCompleto);
            // console.log(diasElegidos);
        }

    });//DOM Content
})();//Function

$(function(){

//Lettering
$('.nombre-sitio').lettering();

//Menu Fijo
var windowHeight = $(window).height();
var barraAltura = $('.barra').innerHeight();

$(window).scroll(function(){
var scroll = $(window).scrollTop();

if(scroll > windowHeight){
$('.barra').addClass('fixed');
$('.barra').css({'padding': '1rem 0'});
$('body').css({'margin-top': barraAltura +'px'});

}
else{
    $('.barra').removeClass('fixed');
    $('body').css({'margin-top': '0px'});
    $('.barra').css({'padding': '2rem 0'});
}
});

//Programa de Conferencias
$('.programa-evento .info-curso:first').show();
$('.menu-programa a:first').addClass('activo');
$('.menu-programa a').on('click', function(){
    $('.menu-programa a').removeClass('activo');
    $(this).addClass('activo');
    $('.ocultar').hide();
    var enlace = $(this).attr('href');
    $(enlace).fadeIn(1000);
    return false;
    });

//Animacion para los numeros
$('.resumen-evento li:nth-child(1) p').animateNumber({number:6},1200);
$('.resumen-evento li:nth-child(2) p').animateNumber({number:15},1200);
$('.resumen-evento li:nth-child(3) p').animateNumber({number:3},1500);
$('.resumen-evento li:nth-child(4) p').animateNumber({number:9},1500);

//Animacion para cuenta regresiva
$('.cuenta-regresiva').countdown('2019/12/18 09:00:00',function(event){
    $('#dias').html(event.strftime('%D'));
    $('#horas').html(event.strftime('%H'));
    $('#minutos').html(event.strftime('%M'));
    $('#segundos').html(event.strftime('%S'));
});














});