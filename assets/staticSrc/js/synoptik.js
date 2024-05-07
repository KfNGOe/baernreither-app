var textData_in ;
var annoCompData_in ;

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
window.getTransType = function(boxSide) {
	let type = $( '#trans_' + boxSide).siblings('ul.dropdown-menu').find('a.active').attr('id') ;
	type = type === undefined ? 'dipl' : type.replace('_' + boxSide, '') ;		
	return type ;
} ;

//function to set transcription type
window.setTransType = function(boxSide,type) {	
	$( '#trans_' + boxSide).siblings('ul.dropdown-menu').find('a').removeClass('active') ;
	$( '#trans_' + boxSide).siblings('ul.dropdown-menu').find('a#' + type + '_' + boxSide).addClass('active') ;
} ;

window.setPagenr = function(boxSide,pageNr) {
	$( '#page_input_' + boxSide ).val(pageNr) ;
} ;

//function to get work
window.getWork = function(boxSide) {
	let work = $( 'div#box-' + boxSide + ' div.page-skip div#work_' + boxSide +' span').attr('id') ;
	work = work === undefined ? work : work.replace('work_' + boxSide + '_', '') ;	
	return work ; 	
}

//function to set work
window.setWork = function(boxSide,workTitle) {
	//put work title in DOM
	//set id
	$( 'div#box-' + boxSide + ' div.page-skip div#work_' + boxSide +' span').attr('id', 'work_' + boxSide + '_' + workTitle) ;
	//insert title
	$( 'div#box-' + boxSide + ' div.page-skip div#work_' + boxSide +' span').text(workTitle) ;	
	//set work active
	$( '#works_' + boxSide + 'ul.dropdown-menu').find('a').removeClass('active') ;
	$( '#works_' + boxSide + 'ul.dropdown-menu').find('a#' + workTitle + '_' + boxSide).addClass('active') ;		
}

//function to insert work data in DOM
window.insertDiplText = function(filepath,boxSide) {
	(async () => {
		//remove old data
		$( 'div#box-' + boxSide + ' div.auswahl-content div.col-12' ).find('*').remove() ;		
		//get text data		
		let content_str = await fetchData(filepath) ;
		let content = $.parseHTML(content_str) ;
		$( 'div#box-' + boxSide + ' div.auswahl-content div.col-12' ).append(content) ;
	})() ;
}

//function to insert Full text data in DOM
window.insertFullText = function(boxSide) {
	console.log( "insert full text!" ) ;
} ;

$( function() {
    console.log( "ready!" );	
	//highlight active nav item	
    $("ul.navbar-nav li.nav-item a.nav-link").removeClass("active");
    $( "ul.navbar-nav li.nav-item a#TBEDIT" ).addClass("active");
	//remove data from navbar dropdowns
	$( 'div#box-left div.werke-dropdown ul.navbar-nav ul.dropdown-menu' ).children().remove() ;			
	$( 'div#box-right div.werke-dropdown ul.navbar-nav ul.dropdown-menu' ).children().remove() ;
	//set work of page
	$( 'div#box-left div.page-skip div#work_left span').text('') ;
	$( 'div#box-right div.page-skip div#work_right span' ).text('') ;
	//set input page number
	$( 'div#box-left div.page-skip input#page_input_left' ).val('') ;
	$( 'div#box-right div.page-skip input#page_input_right' ).val('') ;
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
			//build dropdown menu for works
			let li_left = '<li><a class="dropdown-item" href="#" id="' + result.title.short + '_left">' + result.title.short + '</a></li>' ;
			let li_right = '<li><a class="dropdown-item" href="#" id="' + result.title.short + '_right">' + result.title.short + '</a></li>' ;			
			if(result.title.short.includes('Bae_TB')) {				
				$( 'div#box-left a#TB_left' ).siblings('ul.dropdown-menu').append(li_left) ;
				$( 'div#box-right a#TB_right' ).siblings('ul.dropdown-menu').append(li_right) ;
			}
			if(result.title.short.includes('Bae_MF')) {								
				$( 'div#box-left a#MF_left' ).siblings('ul.dropdown-menu').append(li_left) ;
				$( 'div#box-right a#MF_right' ).siblings('ul.dropdown-menu').append(li_right) ;
			}
			//hide dropdown menu for compare
			$( 'div#box-left a#text-comp_left' ).siblings('ul').find('li').remove() ;
			$( 'div#box-right a#text-comp_right' ).siblings('ul').find('li').remove() ;			
		}) ;
		//get anno compare data
		filepath = './data/json/annoCompData.json' ;
		annoCompData_in = await fetchData(filepath) ;
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
	$( 'div#box-' + boxSide + ' a#TB_' + boxSide ).siblings('ul.dropdown-menu').children('li').each(function() {
		let li = $( this ) ;
		boxNavItems(li,date,groupedByTitle) ;		
	}) ;
	$( 'div#box-' + boxSide + ' a#_MF_' + boxSide ).siblings('ul.dropdown-menu').children('li').each(function() {
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
	if(!click.hasClass('active')) {
		//get id
		let id = click.find('a.dropdown-item').attr('id') ;
		//get box side
		let boxSide = id.includes('_left') ? 'left' : 'right' ;
		//get work title
		let workTitle = id.includes('_left') ? id.replace('_left', '') : id.replace('_right', '') ;
		//get number of pages
		let pageCount = textData_in.results.bindings.find((item, index) => {
			return item.title.short === workTitle ;
		}).pageCount ;
		//put number of pages in DOM
		$( 'div#box-' + boxSide + ' div.page-skip span#page_nr_' + boxSide ).text(pageCount) ;			
		//get transcription type in nav-werke
		let type = getTransType(boxSide) ;
		type = type === undefined ? 'dipl' : type ;
		//get file name
		let fileName = workTitle + '_' + type + '_html.txt' ;	
		//get text data
		let filepath = './data/txt/' + fileName ;		
		//set work
		setWork(boxSide,workTitle) ;
		//set page number
		setPagenr(boxSide,'T1') ;
		//set transcription type
		setTransType(boxSide,type) ;		
		if(type === 'dipl') {		
			//insert dipl text data in DOM	
			insertDiplText(filepath,boxSide) ;		
		} else {
			//insert Full text data in DOM
			insertFullText(boxSide) ;
		}
	}
	//hide dropdown
	click.parents('ul.dropdown-menu').removeClass('show') ;
}) ;

//transcription click event
$( 'div.synoptik-box div.nav-werke li.nav-item ul.dropdown-menu' ).on('click','li',function() {
	console.log( "trans clicked!" ) ;
	//find box of clicked element	
	let click = $( this ) ;
	//get id of parents a element
	let id_trans = click.parent('ul').siblings('a').attr('id') ;
	//check if clicked element is a transcription type
	if(id_trans.includes('trans')) {
		//get id
		let id = click.find('a.dropdown-item').attr('id') ;
		//get box side
		let boxSide = id.includes('_left') ? 'left' : 'right' ;
		//get old transcription type
		let typeOld = getTransType(boxSide) ;
		//get new transcript type	
		let typeNew = id.includes('dipl') ? 'dipl' : 'full' ;
		if(typeOld !== typeNew) {
			//set new type
			setTransType(boxSide,typeNew) ;
			//get work
			let workTitle = getWork(boxSide) ;
			if(typeNew === 'dipl') {
				//get file name
				let fileName = workTitle + '_dipl_html.txt' ;	
				//get text data
				let filepath = './data/txt/' + fileName ;		
				//insert dipl text data in DOM	
				insertDiplText(filepath, boxSide) ;
			} else {
				//insert Full text data in DOM
				insertFullText(boxSide) ;
			}		
		}	
		//hide dropdown
		click.parents('ul.dropdown-menu').removeClass('show') ;	
	}
}) ;

//facs click event
$( 'div.synoptik-box div.nav-werke li.nav-item' ).on('click','a',function() {
	//find box of clicked element
	let click = $( this ) ;
	//get id of parents a element
	let id_facs = click.attr('id') ;
	//check if clicked element is a facs type
	if(id_facs.includes('facs')) {
		console.log( "facs clicked!" ) ;
	}
}) ;

//tei click event
$( 'div.synoptik-box div.nav-werke li.nav-item' ).on('click','a',function() {
	//find box of clicked element
	let click = $( this ) ;
	//get id of parents a element
	let id_tei = click.attr('id') ;
	//check if clicked element is a tei type
	if(id_tei.includes('tei')) {
		console.log( "tei clicked!" ) ;
	}
}) ;

//rdf click event
$( 'div.synoptik-box div.nav-werke li.nav-item' ).on('click','a',function() {
	//find box of clicked element
	let click = $( this ) ;
	//get id of parents a element
	let id_rdf = click.attr('id') ;
	//check if clicked element is a rdf type
	if(id_rdf.includes('rdf')) {
		console.log( "rdf clicked!" ) ;
	}
}) ;

//compare click event
$( 'div.synoptik-box div.nav-werke li.nav-item' ).on('click','a',function() {
	//find box of clicked element
	let click = $( this ) ;
	//get id of parents a element
	let id_comp = click.attr('id') ;
	//check if clicked element is a  type
	if(id_comp.includes('text-comp')) {
		console.log( "comp clicked!" ) ;
		//get box side
		let boxSide = id_comp.includes('_left') ? 'left' : 'right' ;
		//get work
		let workTitle = getWork(boxSide) ;
		//TEST
		//workTitle = 'Bae_MF_6-2' ;
		//check if work is selected
		if(workTitle !== undefined && workTitle !== '') {
			console.log( "work selected!" ) ;			
			//group anno compare data by source target			
			let groupedBySourceTarget = Object.groupBy(annoCompData_in.results.bindings, ({ source_target }) => source_target) ;
			//get compare data
			let compData = groupedBySourceTarget[workTitle] ;
			let boxSide_opp = boxSide === 'left' ? 'right' : 'left' ;
			//delete old data
			$( 'div#box-' + boxSide + ' a#text-comp_' + boxSide ).siblings('ul.dropdown-menu').find('li').remove() ;			
			//build dropdown menu for compare
			compData[0].source_body.forEach(function(result, index) {
				let li = '<li><a class="dropdown-item" href="#" id="' + result + '_' + boxSide_opp + '">' + result + '</a></li>' ;
				$( 'div#box-' + boxSide + ' a#text-comp_' + boxSide ).siblings('ul.dropdown-menu').append(li) ;
			}) ;
			//hide dropdown
			//click.siblings('ul.dropdown-menu').removeClass('show') ;
		} else {
			alert('Please select a work!') ;
		}
	}
}) ;

//compare text select click event
$( 'div.synoptik-box div.nav-werke ul.dropdown-menu' ).on('click','li',function() {
	//find box of clicked element
	let click = $( this ) ;
	//get id of parents a element
	let id_this = click.parent('ul').siblings('a').attr('id') ;	
	//get box side of parents
	let boxSide_this = id_this.includes('_left') ? 'left' : 'right' ;
	//check if clicked element is a transcription type
	if(id_this.includes('text-comp')) {		
		//get id
		let id_opp = click.children('a.dropdown-item').attr('id') ;
		//get box side
		let boxSide_opp = id_opp.includes('_left') ? 'left' : 'right' ;
		//get work title of opposite text
		let workTitle_opp = id_opp.includes('_left') ? id_opp.replace('_left', '') : id_opp.replace('_right', '') ;
		//get actual transcription type
		let type_this = getTransType(boxSide_this) ;
		//check if dipl type is selected
		if(type_this === 'dipl') {			
			//insert full text data in DOM	
			insertFullText(boxSide_this) ;
			//change trans to full text
			setTransType(boxSide_this,'full') ;			
		}
		//insert compare text data in DOM
		//get opposite file name
		let fileName_opp = workTitle_opp + '_dipl_html.txt' ;
		//get opposite text data
		let filepath_opp = './data/txt/' + fileName_opp ;
		//insert dipl text data in DOM
		insertDiplText(filepath_opp, boxSide_opp) ;
		//insert full text data in DOM
		insertFullText(boxSide_opp) ;
		//set work
		setWork(boxSide_opp,workTitle_opp) ;
		//set page number
		setPagenr(boxSide_opp,'T1') ;
		//change trans to full text
		setTransType(boxSide_opp,'full') ;
		//hide dropdown
		click.parents('ul.dropdown-menu').removeClass('show') ;
		//show compare buttons
		$( 'div.compare-buttons' ).show() ;
		console.log( "text comp clicked!" ) ;		
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
	//anchor comp-not
	$( 'a.anchor.comp-span-equal' ).show();
	$( 'a.anchor.comp-span-inequal' ).hide();
	$( 'a.anchor.comp-span-not' ).hide();
	//highlight equal elements
	$( 'span.comp-span-equal' ).css( "background-color", "#f7e0c7" );
	$( 'span.comp-span-inequal' ).css( "background-color", "transparent" );
	$( 'span.comp-span-not' ).css( "background-color", "transparent" );
}) ;		
$( 'div.compare-buttons .comp-inequal' ).click(function() {
	console.log( this );
	let click = $( this );
	click.addClass('comp-selected');
	$( 'div.compare-buttons .comp-equal' ).removeClass('comp-selected');
	$( 'div.compare-buttons .comp-not' ).removeClass('comp-selected');
	//show not equal elements	
	$( 'a.anchor.comp-span-inequal' ).show();
	$( 'a.anchor.comp-span-equal' ).hide();
	$( 'a.anchor.comp-span-not' ).hide();	
	//highlight not equal elements
	$( 'span.comp-span-inequal' ).css( "background-color", "#f7e0c7" );
	$( 'span.comp-span-equal' ).css( "background-color", "transparent" );
	$( 'span.comp-span-not' ).css( "background-color", "transparent" );
}) ;
$( 'div.compare-buttons .comp-not' ).click(function() {
	console.log( this );
	let click = $( this );
	click.addClass('comp-selected');			
	$( 'div.compare-buttons .comp-equal' ).removeClass('comp-selected');
	$( 'div.compare-buttons .comp-inequal' ).removeClass('comp-selected');
	//show missing elements
	$( 'a.anchor.comp-span-not' ).show();
	$( 'a.anchor.comp-span-equal' ).hide();
	$( 'a.anchor.comp-span-inequal' ).hide();
	//highlight missing elements
	$( 'span.comp-span-not' ).css( "background-color", "#f7e0c7" );
	$( 'span.comp-span-equal' ).css( "background-color", "transparent" );
	$( 'span.comp-span-inequal' ).css( "background-color", "transparent" );

}) ;		
//}) ;


// DOMContentLoaded  end