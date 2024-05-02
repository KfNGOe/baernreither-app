$( document ).ready(function() {
    console.log( "ready!" );    
    $("ul.navbar-nav li.nav-item a.nav-link").removeClass("active");
    $( "ul.navbar-nav li.nav-item a[href='#TgbEdit']" ).addClass("active");	
}) ;

$( 'nav.scroll-nav li a' ).click(function() {
	console.log( this );
	let click = $( this );
	$( 'nav.scroll-nav li a' ).removeClass('active');
	click.addClass('active');
}) ;
	
//show compare buttons and load html compare data
$( 'div.synoptik-box:nth-child(2) div.nav-werke #navbar-baern li.nav-item:nth-child(5) a.dropdown-item' ).click(function() {	
	console.log( this );
	let click = $( this );
	if (click.text() == "Bae_MF_6-2") {
		$( 'div.compare-buttons' ).show();
		//remove old + load new html data
		$( 'div.synoptik-box:nth-child(3) div.auswahl-content div.col-12' ).children().remove() ;
		$( 'div.synoptik-box:nth-child(3) div.auswahl-content div.col-12' ).load("compRes.html div#Bae_MF_6-2") ;
	}
}) ;
//check if compare button is clicked
$( 'div.compare-buttons .comp-equal' ).click(function() {
	console.log( this );
	let click = $( this );
	click.addClass('comp-selected');
	$( 'div.compare-buttons .comp-inequal' ).removeClass('comp-selected');
	$( 'div.compare-buttons .comp-not' ).removeClass('comp-selected');
	//show equal elements
	$( 'a.comp-img-equal' ).show();
	$( 'a.comp-img-inequal' ).hide();
	$( 'a.comp-img-not' ).hide();
	//highlight equal elements
	$( 'span.comp-passage-equal' ).css( "background-color", "#f7e0c7" );
	$( 'span.comp-passage-inequal' ).css( "background-color", "transparent" );
	$( 'span.comp-passage-not' ).css( "background-color", "transparent" );
}) ;		
$( 'div.compare-buttons .comp-inequal' ).click(function() {
	console.log( this );
	let click = $( this );
	click.addClass('comp-selected');
	$( 'div.compare-buttons .comp-equal' ).removeClass('comp-selected');
	$( 'div.compare-buttons .comp-not' ).removeClass('comp-selected');
	//show not equal elements		
	$( 'a.comp-img-inequal' ).show();
	$( 'a.comp-img-equal' ).hide();
	$( 'a.comp-img-not' ).hide();
	//highlight not equal elements
	$( 'span.comp-passage-inequal' ).css( "background-color", "#f7e0c7" );
	$( 'span.comp-passage-equal' ).css( "background-color", "transparent" );
	$( 'span.comp-passage-not' ).css( "background-color", "transparent" );
}) ;
$( 'div.compare-buttons .comp-not' ).click(function() {
	console.log( this );
	let click = $( this );
	click.addClass('comp-selected');			
	$( 'div.compare-buttons .comp-equal' ).removeClass('comp-selected');
	$( 'div.compare-buttons .comp-inequal' ).removeClass('comp-selected');
	//show missing elements
	$( 'a.comp-img-not' ).show();
	$( 'a.comp-img-equal' ).hide();
	$( 'a.comp-img-inequal' ).hide();
	//highlight missing elements
	$( 'span.comp-passage-not' ).css( "background-color", "#f7e0c7" );
	$( 'span.comp-passage-equal' ).css( "background-color", "transparent" );
	$( 'span.comp-passage-inequal' ).css( "background-color", "transparent" );

}) ;		
//}) ;


// DOMContentLoaded  end