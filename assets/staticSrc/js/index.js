$( document ).ready(function() {
    console.log( "ready!" );
    //ul.navbar-nav li.nav-item a.nav-link.active                          
    $("ul.navbar-nav li.nav-item a.nav-link").removeClass("active");
    $( "[href='index.html']" ).addClass("active");
}) ;