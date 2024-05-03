var textData_in ;

window.fetchData = async function(filepath) {
	try {        
		const response = await fetch(filepath, {
		  signal:  AbortSignal.timeout(3000)
		}) ;      
		if (filepath.includes('.json')) {            
			const json_in = await response.json();
			return json_in ;            
		} else {
			const text_in = await response.text();
			return text_in ;
		}        
	} catch (error) {        
		console.error('Error:', error);
		if (error.name === 'AbortError') {
			alert('fetch data: Timeout!') ;
		}        
	}
  } ;

window.boxNavItems = function(li,date,groupedByTitle) {	
	//get title
	let title = li.text() ;		
	//get textdata for title
	let textData = groupedByTitle[title] ;
	//get date of textData
	let dateFile ;
	dateFile = textData[0].date.includes('-') ? textData[0].date.substring(0, textData[0].date.indexOf('-')) : textData[0].date ;		
	//check if date of textData is equal to clicked date
	if(dateFile !== date) {
		li.hide() ;
	} else {
		li.show() ;
	}
} ;  

$( function() {
    console.log( "ready!" );
	//highlight active nav item	
    $("ul.navbar-nav li.nav-item a.nav-link").removeClass("active");
    $( "ul.navbar-nav li.nav-item a#navbar_TBEDIT" ).addClass("active");
	//remove data from navbar dropdowns
	$( 'div#box-left ul.navbar-nav ul.dropdown-menu' ).children().remove() ;			
	$( 'div#box-right ul.navbar-nav ul.dropdown-menu' ).children().remove() ;
	//set work of page
	$( 'div#box-left div.page-skip div#page_work_left' ).text('') ;
	$( 'div#box-right div.page-skip div#page_work_right' ).text('') ;
	//remove page numbers
	$( 'div#box-left div.page-skip span#page_nr_left' ).text('') ;
	$( 'div#box-right div.page-skip span#page_nr_right' ).text('') ;
	//set years containing works
	(async () => {		
		//get text data
		let filepath = './data/json/textData.json' ;
		textData_in = await fetchData(filepath) ;		
		//get text data
		let dateFile ;
		let textData_arr = textData_in.results.bindings
		textData_arr.forEach(function(result, index) {
			if(result.date.includes('-')) {
				dateFile = result.date.substring(0, result.date.indexOf('-')) ;
			} else {
				dateFile = result.date ;
			}
			//build id
			let id = 'scroll_nav_' + dateFile ;
			//set years containing works
			$( 'nav.scroll-nav li a#' + id ).addClass('back') ;
			//build dropdown menu			
			if(result.title.short.includes('Bae_TB')) {
				let li = '<li><a class="dropdown-item" href="#" id="navbar_' + result.title.short + '">' + result.title.short + '</a></li>' ;
				//let li = $.parseHTML(li_str) ;
				$( 'div#box-left a#navbar_TB_left' ).siblings('ul.dropdown-menu').append(li) ;
				$( 'div#box-right a#navbar_TB_right' ).siblings('ul.dropdown-menu').append(li) ;
			}
			if(result.title.short.includes('Bae_MF')) {
				let li = '<li><a class="dropdown-item" href="#" id="navbar_' + result.title.short + '">' + result.title.short + '</a></li>' ;
				//let li = $.parseHTML(li_str) ;
				$( 'div#box-left a#navbar_MF_left' ).siblings('ul.dropdown-menu').append(li) ;
				$( 'div#box-right a#navbar_MF_right' ).siblings('ul.dropdown-menu').append(li) ;
			}
		}) ;
	})() ;		
}) ;

//timebar click event
$( 'div.synoptik-box nav.scroll-nav li a' ).click(function() {
	//find box of clicked element
	let click = $( this );
	let parent = click.parents('div.synoptik-box').attr('id') ;
	//get date of clicked element
	let id = click.attr('id') ; 
	let date = id.replace('scroll_nav_', '') ;
	//check if another date is active
	//if (click.hasClass('back')) {
	//	$( 'div#' + parent + ' nav.scroll-nav li a' ).removeClass('active');
	//	click.addClass('active');	
	//}	
	//group textdata by title short
	let	groupedByTitle = Object.groupBy(textData_in.results.bindings, ({ title }) => title.short)
	//check box side
	let boxSide = parent.includes('left') ? 'left' : 'right' ; 		
	//iterate over synoptik-nav items
	$( 'div#box-' + boxSide + ' a#navbar_TB_' + boxSide ).siblings('ul.dropdown-menu').children('li').each(function() {
		let li = $( this ) ;
		boxNavItems(li,date,groupedByTitle) ;		
	}) ;
	$( 'div#box-' + boxSide + ' a#navbar_MF_' + boxSide ).siblings('ul.dropdown-menu').children('li').each(function() {
		let li = $( this ) ;
		boxNavItems(li,date,groupedByTitle) ;
	}) ;	

	$( 'div#' + parent + ' nav.scroll-nav li a' ).removeClass('active');
	click.addClass('active');
}) ;

//werke dropdown click event
$( 'li.nav-item ul.dropdown-menu li a' ).on('click', function() {
	//div.synoptik-box ul.navbar-nav li.nav-item 
	//find box of clicked element
	let click = $( this );
	let text = click.find('a.dropdown-item').text() ;
	console.log( click.text() );
	/*
	let parent = click.parents('div.synoptik-box').attr('id') ;
	//get title of clicked element
	let title = click.text() ;
	//get date of clicked element
	let date = $( 'div#' + parent + ' nav.scroll-nav li a.active' ).attr('id').replace('scroll_nav_', '') ;
	//group textdata by title short
	let	groupedByTitle = Object.groupBy(textData_in.results.bindings, ({ title }) => title.short)
	//check box side
	let boxSide = parent.includes('left') ? 'left' : 'right' ; 
	//iterate over synoptik-nav items
	$( 'div#box-' + boxSide + ' a#navbar_TB_' + boxSide ).siblings('ul.dropdown-menu').children('li').each(function() {
		let li = $( this ) ;
		boxNavItems(li,date,groupedByTitle) ;		
	}) ;
	$( 'div#box-' + boxSide + ' a#navbar_MF_' + boxSide ).siblings('ul.dropdown-menu').children('li').each(function() {
		let li = $( this ) ;
		boxNavItems(li,date,groupedByTitle) ;
	}) ;
	*/	
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