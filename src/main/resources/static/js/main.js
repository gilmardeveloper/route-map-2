var old;

$(document).ready(function () {

    verifyDevice();
    old = $("#li-first");

    $(".li-menu").on({
        mouseenter: function(){
            if ($(window).width() > 991.98) {
                if (old[0] != $(this)[0]) {
                    setTimeout(() =>{$(this).children().addClass('text-white')}, 150);
                    $(this).removeClass('menu-leave');
                    $(this).addClass('menu-enter');
                }
            }
        },  
        mouseleave: function(){
         if ($(window).width() > 991.98) {
            if (old[0] != $(this)[0]) {
                setTimeout(() =>{$(this).children().removeClass('text-white')}, 150);
                $(this).removeClass('menu-enter');
                $(this).addClass('menu-leave');
            }
        }
    }, 
    click: function(){
        if ($(window).width() > 991.98) {
            old.children().toggleClass('text-white');
            old.removeClass('menu-enter');
            old.addClass('menu-leave');
            setTimeout(() =>{$(this).children().addClass('text-white')}, 150);
            $(this).removeClass('menu-leave');
            $(this).addClass('menu-enter');
            old = $(this);
        }
    }  
});

   /* $("li").mouseenter(function () {
        if ($(window).width() > 767.98) {
            if (old[0] != $(this)[0]) {
                setTimeout(() =>{$(this).children().toggleClass('text-white')}, 150);
                $(this).toggleClass('menu-hover');
            }
        }
    }); 


    $(".li-menu").click(function () {
        if ($(window).width() > 767.98) {
            old.children().toggleClass('text-white bg-blue');
            $(this).addClass('text-white bg-blue');
            old = $(this);
        }
    });
    */

    $(window).resize(function () {

        if ($(window).width() <= 991.98) {

           $('.navbar').removeClass('p-0');
           $('.li-menu').removeClass('menu-leave menu-enter pt-4 pb-2 mr-5');
           $('.li-menu').addClass('bg-blue');
           $('nav').removeClass('bg-white');
           $('nav').addClass('bg-blue');
           $('button.navbar-toggler').addClass('btn-light');
           $('a.nav-link').addClass('text-white');
           
           

       } else {

        $('.navbar').addClass('p-0');
           $('.li-menu').addClass('pt-4 pb-2 mr-5');
           $('.li-menu').removeClass('bg-blue');
           $('nav').removeClass('bg-blue');
           $('nav').addClass('bg-white');
           $('button.navbar-toggler').removeClass('btn-light');
           $('a.nav-link').removeClass('text-white');
           
           old.children().toggleClass('text-white');
           old.addClass('menu-enter');



       }

       if ($(window).width() > 768.98) {
        $('div.footer-menu-item').addClass('border-right')
    }

    if ($(window).width() < 769) {
        $('div.footer-menu-item').removeClass('border-right');
    }  

});

     //map
     $("#btn-search").click(addMarcador);

     $('#localizacao').keypress(function (e) {
        var key = e.which;
        if(key == 13)  
        {
           addMarcador();
           return false;  
       }
   });

 });

function addMarcador() {
  document.getElementById("card-lateral").innerHTML = ""; 
	addPersonMarker($("#localizacao").val());
}

function showInfoRoute(titulo, distancia, duracao) {

	$('#card-info').removeClass('hidden');
	$('#nome-autoescola').text(titulo);
	$('#distancia').text(distancia);
	$('#duracao').text(duracao);
	$('#modal-cotacoes').modal('show');
}

function verifyDevice() {
    if ($(window).width() <= 991.98) {

        $('.navbar').removeClass('p-0');
       $('.li-menu').removeClass('pt-4 pb-2 mr-5');
       $('nav').removeClass('bg-white');
       $('nav').addClass('bg-blue');
       $('button.navbar-toggler').addClass('btn-light');
       $('a.nav-link').addClass('text-white');

       if ($(window).width() <= 769) {
        $('div.footer-menu-item').removeClass('border-right');
    }
}   
}


