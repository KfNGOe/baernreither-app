//	window.addEventListener("resize", function() {
//		"use strict"; window.location.reload(); 
//	});


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
	//show compare buttons and load compare data		
	$( 'div.synoptik-box:nth-child(2) div.nav-werke #navbar-baern li.nav-item:nth-child(5) a.dropdown-item' ).click(function() {	
		console.log( this );
		let click = $( this );
		if (click.text() == "Bae_MF_6-2") {
			$( 'div.compare-buttons' ).show();
		}			
	}) ;
	//check if compare button is clicked
	$( 'div.compare-buttons .comp-equal' ).click(function() {
		console.log( this );
		let click = $( this );
		click.addClass('comp-selected');
		$( 'div.compare-buttons .comp-inequal' ).removeClass('comp-selected');
		$( 'div.compare-buttons .comp-not' ).removeClass('comp-selected');
	}) ;		
	$( 'div.compare-buttons .comp-inequal' ).click(function() {
		console.log( this );
		let click = $( this );
		click.addClass('comp-selected');
		$( 'div.compare-buttons .comp-equal' ).removeClass('comp-selected');
		$( 'div.compare-buttons .comp-not' ).removeClass('comp-selected');			
	}) ;
	$( 'div.compare-buttons .comp-not' ).click(function() {
		console.log( this );
		let click = $( this );
		click.addClass('comp-selected');			
		$( 'div.compare-buttons .comp-equal' ).removeClass('comp-selected');
		$( 'div.compare-buttons .comp-inequal' ).removeClass('comp-selected');
	}) ;		
}) ;


// DOMContentLoaded  end