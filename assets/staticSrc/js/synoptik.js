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
	let dateData ;
	dateData = textData[0].date.includes('-') ? textData[0].date.substring(0, textData[0].date.indexOf('-')) : textData[0].date ;		
	//check if date of textData is equal to clicked date
	if(dateData !== date) {
		li.hide() ;
	} else {
		li.show() ;
	}
} ;

//function to get transcription type
window.getTransType = function() {
	let type = $( 'div.synoptik-box div.nav-werke ul.dropdown-menu li.active a' ).attr('id') ;
	return type ;
} ;

//function to insert work data in DOM
window.insertWorkData = function(filepath,boxSide) {
	(async () => {
		//remove old data
		$( 'div#box-' + boxSide + ' div.auswahl-content div.col-12' ).find('*').remove() ;		
		//get text data		
		let content_str = await fetchData(filepath) ;
		let content = $.parseHTML(content_str) ;
		$( 'div#box-' + boxSide + ' div.auswahl-content div.col-12' ).append(content) ;		
	})() ;
} 	

$( function() {
    console.log( "ready!" );	
	//highlight active nav item	
    $("ul.navbar-nav li.nav-item a.nav-link").removeClass("active");
    $( "ul.navbar-nav li.nav-item a#navbar_TBEDIT" ).addClass("active");
	//remove data from navbar dropdowns
	$( 'div#box-left div.werke-dropdown ul.navbar-nav ul.dropdown-menu' ).children().remove() ;			
	$( 'div#box-right div.werke-dropdown ul.navbar-nav ul.dropdown-menu' ).children().remove() ;
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
			let li_left = '<li><a class="dropdown-item" href="#" id="work_sel_left_' + result.title.short + '">' + result.title.short + '</a></li>' ;
			let li_right = '<li><a class="dropdown-item" href="#" id="work_sel_right_' + result.title.short + '">' + result.title.short + '</a></li>' ;			
			if(result.title.short.includes('Bae_TB')) {				
				$( 'div#box-left a#navbar_TB_left' ).siblings('ul.dropdown-menu').append(li_left) ;
				$( 'div#box-right a#navbar_TB_right' ).siblings('ul.dropdown-menu').append(li_right) ;
			}
			if(result.title.short.includes('Bae_MF')) {								
				$( 'div#box-left a#navbar_MF_left' ).siblings('ul.dropdown-menu').append(li_left) ;
				$( 'div#box-right a#navbar_MF_right' ).siblings('ul.dropdown-menu').append(li_right) ;
			}
		}) ;
	})() ;		
}) ;

//timebar click event
$( 'div.synoptik-box nav.scroll-nav li a' ).on('click',function() {
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
$( 'div.synoptik-box div.werke-dropdown ul.dropdown-menu' ).on('click','li',function() {	
	//find box of clicked element
	let click = $( this ) ;
	
	//check if clicked work is already active
	if(click.hasClass('active')) {
		return ;
	}
	
	//get id
	let id = click.find('a.dropdown-item').attr('id') ;
	//get box side
	let boxSide = id.includes('work_sel_left') ? 'left' : 'right' ;
	//get work title
	let workTitle = id.includes('work_sel_left') ? id.replace('work_sel_left_', '') : id.replace('work_sel_right_', '') ;
	//get number of pages
	let pageCount = textData_in.results.bindings.find((item, index) => {
		return item.title.short === workTitle ;
	}).pageCount ;	
	//put work title in DOM
	$( 'div#box-' + boxSide + ' div.page-skip div#page_work_' + boxSide ).text(workTitle) ;
	//put number of pages in DOM
	$( 'div#box-' + boxSide + ' div.page-skip span#page_nr_' + boxSide ).text(pageCount) ;	
	//get transcription type in nav-werke
	let type = getTransType() ;
	
	//get file name
	let fileName = workTitle + '_dipl_html.txt' ;	
	//get text data
	let filepath = './data/txt/' + fileName ;
	//set class for text data to active		
	click.siblings().removeClass('active') ;
	click.addClass('active') ;
	//insert work data in DOM	
	insertWorkData(filepath,boxSide) ;
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

//nav werke click event
$( 'div.synoptik-box div.nav-werke ul.dropdown-menu' ).on('click','li',function() {
	//find box of clicked element
	let click = $( this ) ;	
	//get id
	let id = click.find('a.dropdown-item').attr('id') ;
	//get box side
	let boxSide = id.includes('_left') ? 'left' : 'right' ;
	//get transcript type
	let type = id.includes('dipl') ? 'dipl' : 'full' ;
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