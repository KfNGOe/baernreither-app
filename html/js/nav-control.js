
let url = window.location.pathname ;
let fullName = url.substring(url.lastIndexOf('/')+1) ;//test.html
let fileName = fullName.substring(0, fullName.indexOf('.')) ; //test

//highlight active nav item	
$("ul.navbar-nav li.nav-item a").removeClass("active");
$( '[href="' + fullName + '"]' ).addClass("active");

if(fullName == "") {
	$("ul.navbar-nav li.nav-item a").removeClass("active");
$( '[href="index.html"]' ).addClass("active");
	console.log( fullName ) ;	
}

if(fullName == "editionsgeschichte.html") {
	$( '#info_edit' ).addClass("active") ;
	console.log( fullName ) ;	
}
if(fullName == "editionsrichtlinien.html") {
	$( '#info_edit' ).addClass("active") ;
	console.log( fullName ) ;	
}
if(fullName == "zeitplantagebuecher.html") {
	$( '#info_edit' ).addClass("active") ;
	console.log( fullName ) ;	
}
if(fullName == "nutzung.html") {
	$( '#info_edit' ).addClass("active") ;
	console.log( fullName ) ;	
}
if(fullName == "uebersicht.html") {
	$( '#tb_edit' ).addClass("active") ;
	console.log( fullName ) ;	
}
if(fullName == "synoptik.html") {
	$( '#tb_edit' ).addClass("active") ;
	console.log( fullName ) ;	
}
if(fullName == "biographie.html") {
	$( '#info_baern' ).addClass("active") ;
	console.log( fullName ) ;	
}

document.addEventListener("DOMContentLoaded", function(){       

	/////// Prevent closing from click inside dropdown
	document.querySelectorAll('.dropdown-menu').forEach(function(element){
		element.addEventListener('click', function (e) {
		  e.stopPropagation();
		});
	})

	// make it as accordion for smaller screens
	if (window.innerWidth < 992) {

		// close all inner dropdowns when parent is closed
		document.querySelectorAll('.navbar .dropdown').forEach(function(everydropdown){
			everydropdown.addEventListener('hidden.bs.dropdown', function () {
				// after dropdown is hidden, then find all submenus
				  this.querySelectorAll('.submenu').forEach(function(everysubmenu){
					  // hide every submenu as well
					  everysubmenu.style.display = 'none';
				  });
			})
		});
		
		document.querySelectorAll('.dropdown-menu a').forEach(function(element){
			element.addEventListener('click', function (e) {
	
				  let nextEl = this.nextElementSibling;
				  if(nextEl && nextEl.classList.contains('submenu')) {	
					  // prevent opening link if link needs to open dropdown
					  e.preventDefault();
					  console.log(nextEl);
					  if(nextEl.style.display == 'block'){
						  nextEl.style.display = 'none';
					  } else {
						  nextEl.style.display = 'block';
					  }

				  }
			});
		})
	}
	//end if innerWidth

}) ;

$( "ul.dropdown-menu li a.dropdown-item" ) .click(function() {
	console.log( this );
	let click = $( this );
	click.parent('ul.dropdown-menu').siblings('a.nav-link').addClass('active') ;	
}) ;

// DOMContentLoaded  end