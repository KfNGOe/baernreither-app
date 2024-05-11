var textData_in ;
var annoCompData_in ;
var regPersonData_in ;
var regIndexData_in ;
var link ;
var testDOM ;

synFinishedHook = function(num){} ;

let table_snips = ["<table>","<thead><td><b>","</b></td></thead>","<tr><td>","</td></tr>", "</table>"] ;

const sleepUntil = async (f, timeoutMs) => {
	return new Promise((resolve, reject) => {
	  const timeWas = new Date();
	  const wait = setInterval(function() {
		if (f()) {
		  console.log("resolved after", new Date() - timeWas, "ms");
		  clearInterval(wait);
		  resolve();
		} else if (new Date() - timeWas > timeoutMs) { // Timeout
		  console.log("rejected after", new Date() - timeWas, "ms");
		  clearInterval(wait);
		  reject();
		}
	  }, 20);
	});
  }

function onContainerScroll(boxSide) {
	var container = document.getElementById("auswahl-content-scroll_" + boxSide);
  
	//Scroll vars (not needed for page-position but can be usefull in the future)
	var scroll = container.scrollTop;
	var totalHeight = container.scrollHeight;
	var visibleHeight = container.offsetHeight;
	var hiddenHeight = totalHeight - visibleHeight;
	var percentage = (scroll / hiddenHeight) * 100;
  
	//get all page-locator
	var anchors = document.getElementsByClassName("pageLocator");
  
	//get current page
	var currentPage = 0;
	for (var i = 0; i < anchors.length; i++) {
	  var anchor = anchors[i];
	  if (scroll >= anchor.offsetTop) {
		currentPage = anchor.id;
	  }
	}
	if(currentPage === 0) {
		currentPage = getPageNr(boxSide) ;
	}
	setPageNr(boxSide, currentPage);
  }

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

window.getPageNr = function(boxSide) {
	let pageNr = $( '#page_input_' + boxSide ).val() ;
	return pageNr ;
} ;

window.setPageNr = function(boxSide,pageNr) {
	$( '#page_input_' + boxSide ).val(pageNr) ;
} ;

window.getPageCount = function(boxSide) {
	let pageCount = $( 'div#box-' + boxSide + ' div.page-skip span#page_nr_' + boxSide ).text() ;
	return pageCount ;
} ;

window.setPageCount = function(boxSide,pageCount) {
	$( 'div#box-' + boxSide + ' div.page-skip span#page_nr_' + boxSide ).text(pageCount) ;
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

window.addEventListener('load', function() {
	synFinishedHook = function(num) {
	  //console.log('hook nr: ', num) ;    
	  if (num == 1) {
		(async () => {
			try {
				await sleepUntil(() => document.querySelector('#hashDummy'), 100);
				document.querySelector('#hashDummy').click();
			} catch {
				alert('timeout') ;
			}	
			$('a#hashDummy').remove() ;
		})() ;		
	  }
	  if (num == 2) {		
	  }        
	}
  }) ;

$( function() {
    console.log( "ready!" );
	//get location #hash
	let hash = window.location.hash ;
	//let anchor = $(location).attr('hash');  //get link anchor (#...)                        
    //    if(anchor.length!=0){  //check if link anchor exists	

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
		//get anno compare data
		filepath = './data/json/annoCompData.json' ;
		annoCompData_in = await fetchData(filepath) ;		
		//get index register data
		filepath = './data/json/register/register_index.json' ;
		regIndexData_in = await fetchData(filepath) ;		
		//get org register data
		filepath = './data/json/register/register_org.json' ;
		regOrgData_in = await fetchData(filepath) ;
		//get person register data
		filepath = './data/json/register/register_person.json' ;
		regPersonData_in = await fetchData(filepath) ;
		//get place register data
		filepath = './data/json/register/register_place.json' ;
		regPlaceData_in = await fetchData(filepath) ;				

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

		//check if hash exists
		if(hash.length!=0){
			//set dummy link
			link = $('<a>', {
				id: 'hashDummy',
				href: hash, // Anchor's ID to be scrolled to				
			});
			$('body').append(link);		  
			//get work title
			let workTitle = hash.replace('#', '') ;			
			workTitle = workTitle.substring(workTitle.indexOf('_')+1) ;			
			workTitle = workTitle.substring(0,workTitle.lastIndexOf('_')) ;			
			//insert text data in DOM
			insertDiplText('./data/txt/' + workTitle + '_dipl_html.txt','left') ;
			//insertFullText('left') ;
			synFinishedHook(1);		
		}		
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
		let	groupedByTitle = Object.groupBy(textData_in.results.bindings, ({ title }) => title.short) ;
		let pageNr = groupedByTitle[workTitle][0].firstPageNr ;
		setPageNr(boxSide,pageNr) ;
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
	//get id of element
	let id_facs = click.attr('id') ;
	//check if clicked element is a facs type
	if(id_facs.includes('facs')) {
		//get box side
		let boxSide = id_facs.includes('_left') ? 'left' : 'right' ;
		//get work
		let workTitle = getWork(boxSide) ;		
		//check if work is selected
		if(workTitle !== undefined && workTitle !== '') {
			//get page number
			let pageNr = getPageNr(boxSide) ;
			//get id of pb element
			let facsId = $( 'div#box-' + boxSide + ' div.auswahl-content' ).find('span.pb#' + pageNr).children('a').attr('href') ;
			//remove #
			facsId = facsId.replace('#', '') ;
			//remove old text data content			
			$( 'div#box-' + boxSide + ' div.auswahl-content div.col-12' ).find('*').remove() ;
			//insert facs data in DOM
			let div = '<div class="facs"><img src="./data/img/' + workTitle + '/' + facsId + '.jpg" alt="facs"></div>' ;
			$( 'div#box-' + boxSide + ' div.auswahl-content div.col-12' ).append(div) ;
			//scroll to facs element
			//$( 'div#box-' + boxSide + ' div.auswahl-content-scroll' ).animate({
			//	scrollTop: $( 'div#box-' + boxSide + ' div.auswahl-content' ).find('span.pb#' + pageNr).offset().top
			//}, 1000) ;

			
			console.log( "facs clicked!" ) ;
		}		
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
		//get opposite box side 
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
		let	groupedByTitle = Object.groupBy(textData_in.results.bindings, ({ title }) => title.short) ;
		let pageNr_opp = groupedByTitle[workTitle_opp][0].firstPageNr ;
		setPageNr(boxSide_opp,pageNr_opp) ;
		//get number of pages
		let pageCount_opp = textData_in.results.bindings.find((item, index) => {
			return item.title.short === workTitle_opp ;
		}).pageCount ;
		//put number of pages in DOM
		$( 'div#box-' + boxSide_opp + ' div.page-skip span#page_nr_' + boxSide_opp ).text(pageCount_opp) ;
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

//check if page break in text is clicked
$( 'div.synoptik-box div.auswahl-content' ).on('click','span.pb',function() {
	//find box of clicked element
	let click = $( this ) ;
	//get id of element
	let id_pb = click.attr('id') ;
	//get box side
	let boxSide_this = click.parents('div.synoptik-box').attr('id').includes('left') ? 'left' : 'right' ;	
	let boxSide_opp = boxSide_this.includes('left') ? 'right' : 'left' ;
	//get work
	let workTitle_this = getWork(boxSide_this) ;
	setWork(boxSide_opp,workTitle_this) ;
	//get page number
	let pageNr_this = id_pb ;
	setPageNr(boxSide_opp,pageNr_this) ;
	//get page count
	let pageCount_this = getPageCount(boxSide_this) ;
	setPageCount(boxSide_opp,pageCount_this) ;
	//get id of pb element
	let facsId = click.children('a').attr('href') ;
	//remove #
	facsId = facsId.replace('#', '') ;
	//remove old text opposite content
	$( 'div#box-' + boxSide_opp + ' div.auswahl-content div.col-12' ).find('*').remove() ;
	//insert facs data in DOM
	let div = '<div class="facs"><img src="./data/img/' + workTitle_this + '/' + facsId + '.jpg" alt="facs"></div>' ;
	$( 'div#box-' + boxSide_opp + ' div.auswahl-content div.col-12' ).append(div) ;		
}) ;

//check if register in text is clicked
$( 'div.synoptik-box div.auswahl-content' ).on('click','a',function() {
	//find box of clicked element
	let click = $( this ) ;
	//get box side
	let boxSide = click.parents('div.synoptik-box').attr('id').includes('left') ? 'left' : 'right' ;
	//get id of element
	let id = click.attr('id') ;
	//get href of element
	let href = click.attr('href') ;
	//remove reg
	href = href.replace('#reg_', '') ;
	//reset html string
	let html_str = '' ;	
	//check if register index is clicked
	if(click.hasClass('index')) {		
		//group register data by main
		let groupedById = Object.groupBy(regIndexData_in.results.bindings, ({ id }) => id) ;
		//get register data
		let regData = groupedById[href] ;
		//group register data by sub
		let groupedBySub = Object.groupBy(regData, ({ sub }) => sub) ;
		//build html string		
		Object.keys(regData[0]).forEach(function(key) {
			switch(key) {				
				case 'main':
					html_str = html_str.concat(table_snips[0] + table_snips[1] + 'Hauptbegriff' + table_snips[2]) ;					
					let main = regData[0].main ;		
					html_str = html_str.concat(table_snips[3] + main + table_snips[4] + table_snips[5]) ;
					break;				
				case 'sub':
					//check if no sub
					let length = Object.keys(groupedBySub).length ;
					if(length === 1 && groupedBySub[''] !== undefined) {
						console.log( "no sub!" ) ;
					} else {
						//get pos from id
						let pos_id = id.replace('index_', '') ;
						Object.keys(groupedBySub).forEach(function(sub) {
							//group sub by pos
							let groupedByPos = Object.groupBy(groupedBySub[sub], ({ pos }) => pos) ;
							//compare with pos in id of clicked element
							if(groupedByPos[pos_id] !== undefined) {
								//build html string
								html_str = html_str.concat(table_snips[0] + table_snips[1] + 'Unterbegriff' + table_snips[2]) ;
								html_str = html_str.concat(table_snips[3] + sub + table_snips[4]) ;
								html_str = html_str.concat(table_snips[5]) ;
							} ;
						});
					}
					break;				
				default:
					break;
			}			
		}) ;		
	}
	//check if register org is clicked
	if(click.hasClass('org')) {
		//group register data by id
		let groupedById = Object.groupBy(regOrgData_in.results.bindings, ({ id }) => id) ;
		//get register data
		let regData = groupedById[href] ;		
		//build html string				
		Object.keys(regData[0]).forEach(function(key) {
			switch(key) {				
				case 'name':
					html_str = html_str.concat(table_snips[0] + table_snips[1] + 'Name' + table_snips[2]) ;
					let name = regData[0].name ;		
					html_str = html_str.concat(table_snips[3] + name + table_snips[4] + table_snips[5]) ;
					break;				
				case 'pid':
					if(regData[0].pid.includes("gnd")) {
						html_str = html_str.concat(table_snips[0] + table_snips[1] + 'PID' + table_snips[2]) ;
						let pid = '<a href="' + regData[0].pid + '" target="blank">'+ regData[0].pid +'</a>' ;						
						html_str = html_str.concat(table_snips[3] + pid + table_snips[4] + table_snips[5]) ;
					}					
					break;				
				default:
					break;
			}			
		}) ;		
	}
	//check if register person is clicked
	if(click.hasClass('person')) {				
		//group register data by id
		let groupedById = Object.groupBy(regPersonData_in.results.bindings, ({ id }) => id) ;
		//get register data
		let regData = groupedById[href] ;		
		//build html string				
		Object.keys(regData[0]).forEach(function(key) {
			switch(key) {				
				case 'surname':
					html_str = html_str.concat(table_snips[0] + table_snips[1] + 'Name' + table_snips[2]) ;
					let name = regData[0].surname + ', ' + regData[0].forename + ' ' + regData[0].addName ;		
					html_str = html_str.concat(table_snips[3] + name + table_snips[4] + table_snips[5]) ;
					break;				
				case 'birth':
					html_str = html_str.concat(table_snips[0] + table_snips[1] + 'Lebensdaten' + table_snips[2]) ;					
					let birth = regData[0].birth ;
         			let death = regData[0].death ;
         			let birthPlace = regData[0].birthPlace ;
         			let deathPlace = regData[0].deathPlace ;         			
					let lifeData = '∗ ' + birth +', ' + birthPlace +'<br>' + '† ' + death + ', ' + deathPlace ;
					html_str = html_str.concat(table_snips[3] + lifeData + table_snips[4] + table_snips[5]) ;
					break;				
				case 'desc':
					html_str = html_str.concat(table_snips[0] + table_snips[1] + 'Kurzbio/Berufliche Funktionen' + table_snips[2]) ;					
					let desc = regData[0].desc ;
					html_str = html_str.concat(table_snips[3] + desc + table_snips[4] + table_snips[5]) ;
					break;
				case 'pid':
					if(regData[0].pid.includes("gnd")) {
						html_str = html_str.concat(table_snips[0] + table_snips[1] + 'PID' + table_snips[2]) ;
						let pid = '<a href="' + regData[0].pid + '" target="blank">'+ regData[0].pid +'</a>' ;						
						html_str = html_str.concat(table_snips[3] + pid + table_snips[4] + table_snips[5]) ;
					}					
					break;				
				default:
					break;
			}			
		}) ;		
	}
	//check if register place is clicked
	if(click.hasClass('place')) {				
		//group register data by id
		let groupedById = Object.groupBy(regPlaceData_in.results.bindings, ({ id }) => id) ;
		//get register data
		let regData = groupedById[href] ;		
		//build html string				
		Object.keys(regData[0]).forEach(function(key) {
			switch(key) {				
				case 'name':
					html_str = html_str.concat(table_snips[0] + table_snips[1] + 'Name' + table_snips[2]) ;
					let name = regData[0].name ;		
					html_str = html_str.concat(table_snips[3] + name + table_snips[4] + table_snips[5]) ;
					break;
				case 'name_today':
					html_str = html_str.concat(table_snips[0] + table_snips[1] + 'heute' + table_snips[2]) ;
					name_today = regData[0].name_today ;		
					html_str = html_str.concat(table_snips[3] + name_today + table_snips[4] + table_snips[5]) ;
					break;				
				case 'pid':
					if(regData[0].pid.includes("geonames")) {
						html_str = html_str.concat(table_snips[0] + table_snips[1] + 'PID' + table_snips[2]) ;
						let pid = '<a href="' + regData[0].pid + '" target="blank">'+ regData[0].pid +'</a>' ;						
						html_str = html_str.concat(table_snips[3] + pid + table_snips[4] + table_snips[5]) ;
					}					
					break;				
				default:
					break;
			}			
		}) ;		
	}
	//parse html string
	let html = $.parseHTML(html_str) ;
	//remove meta box
	$( 'div#box-' + boxSide + ' div.meta-box' ).find('*').remove() ;
	//insert meta box in DOM
	$( 'div#box-' + boxSide + ' div.meta-box' ).append(html) ;
	//show meta box
	$( 'div#box-' + boxSide + ' div.meta-box' ).show() ;
	console.log( "register clicked!" ) ;
}) ;