var textData_in ;
var annoCompData_in ;
var regPersonData_in ;
var regIndexData_in ;
var hash ;
var link ;
var input_left = document.getElementById("page_input_left") ;
var input_right = document.getElementById("page_input_right") ;

let table_snips = ["<table>","<thead><td><b>","</b></td></thead>","<tr><td>","</td></tr>", "</table>"] ;

synFinishedHook = function(num){} ;

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
input_left.addEventListener("keypress", function(event) {	
	if (event.key === "Enter") {	  
		event.preventDefault();
		console.log("Enter pressed") ;
		let pageNr = input_left.value ;
		setPage(pageNr, 'left') ;
	}
});
input_right.addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		console.log("Enter pressed") ;
		let pageNr = input_right.value ;
		setPage(pageNr, 'right') ;
	}
});

window.setPage = function(page, boxSide) {
	var container = document.getElementById("auswahl-content-scroll_" + boxSide) ;
	var anchors = document.getElementsByClassName("pageLocator") ;

	for (var i = 0; i < anchors.length-1; i++) {
		var anchor = anchors[i];
		if (anchor.id == page) {
			container.scrollTop = anchor.offsetTop;			
			//setPageNr(boxSide, page);
			console.log("set page to: ", page);
		}
	}	
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
	type = type === undefined ? 'all' : type.replace('_' + boxSide, '') ;		
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

//function to set download link
window.setDownloadLink = function(workTitle,boxSide) {
	//get file name
	let fileName = workTitle + '.xml' ;	
	//get text data xml
	let filepath = './data/tei_xmlId/' + fileName ;		
	$( 'div#box-' + boxSide + ' div.download-tab a.down-xml' ).attr('href', filepath) ;
	fileName = workTitle + '.ttl' ;	
	//get text data ttl
	filepath = './data/ttl/text/' + fileName ;		//data/ttl/text/Bae_MF_6-1.ttl
	$( 'div#box-' + boxSide + ' div.download-tab a.down-ttl' ).attr('href', filepath) ;
} ;

//function to get work
window.getWork = function(boxSide) {
	let work = $( 'div#box-' + boxSide + ' div.page-skip div#work_' + boxSide +' span').attr('id') ;
	work = work === undefined ? work : work.replace('work_' + boxSide + '_', '') ;	
	return work ; 	
}

//function to set work
window.setWork = function(boxSide,workTitle) {
	//convert short title to display title
	dispTitle = short2DispTitle(workTitle) ;
	//put work title in DOM
	//set id
	$( 'div#box-' + boxSide + ' div.page-skip div#work_' + boxSide +' span').attr('id', 'work_' + boxSide + '_' + workTitle) ;
	//insert title
	$( 'div#box-' + boxSide + ' div.page-skip div#work_' + boxSide +' span').text(dispTitle) ;	
	//set work active
	$( '#works_' + boxSide + 'ul.dropdown-menu').find('a').removeClass('active') ;
	$( '#works_' + boxSide + 'ul.dropdown-menu').find('a#' + workTitle + '_' + boxSide).addClass('active') ;		
}

window.short2DispTitle = function(short) {
	let title = textData_in.results.bindings.find((item, index) => {
		return item.title.short === short ;
	}).title.display ;
	title = title === undefined ? '' : title ;	
	return title ;
}
window.disp2ShortTitle = function(disp) {
	let title = textData_in.results.bindings.find((item, index) => {
		return item.title.display === disp ;
	}
	).title.short ;
	title = title === undefined ? '' : title ;
	return title ;
}

//function to insert work data in DOM
window.insertAllText = function(filepath,boxSide) {
	(async () => {
		//remove old data
		$( 'div#box-' + boxSide + ' div.auswahl-content div.col-12' ).find('*').remove() ;		
		//get text data		
		let content_str = await fetchData(filepath) ;
		let content = $.parseHTML(content_str) ;
		$( 'div#box-' + boxSide + ' div.auswahl-content div.col-12' ).append(content) ;
		//set dipl text style
		displayDiplText(boxSide) ;
	})() ;
}

//function to insert Full text data in DOM
window.insertFullText = function(boxSide) {
	displayFullText(boxSide) ;
	console.log( "insert full text!" ) ;
} ;

window.displayDiplText = function(boxSide) {
	$('div#box-' + boxSide + ' .abbr').show();      //show all elements with abbr class
    $('div#box-' + boxSide + ' .expan').hide();		//hide all elements with expan class

	$('div#box-' + boxSide + ' .add').css( "background-color", "rgb(217, 209, 236)" );

	$('div#box-' + boxSide + ' .addSpan').css( "background-color", "rgba(200, 190, 200, 0.2)" );

	$('div#box-' + boxSide + ' .del').show();		

	console.log( "display Dipl text!" ) ;
} ;

window.displayFullText = function(boxSide) {
	$('div#box-' + boxSide + ' .expan').show();      
    $('div#box-' + boxSide + ' .abbr').hide();
	
	$('div#box-' + boxSide + ' .add').css( "background-color", "transparent" );

	$('div#box-' + boxSide + ' .addSpan').css( "background-color", "transparent" );

	$('div#box-' + boxSide + ' .del').hide();
	
	console.log( "display Full text!" ) ;
} ;

window.displayAnchors = function() {
	//get work title of left box
	let shortTitle_left = getWork('left') ;
	//get work title of right box
	let shortTitle_right = getWork('right') ;	
	//hide all anchors
	$( 'a.anchor' ).hide() ;
	//iterate over all anchors left
	$( 'div#box-left a.anchor' ).each(function() {
		let anchor = $( this ) ;
		//get href of anchor
		let href = anchor.attr('href') ;
		if(href.includes(shortTitle_right)) {
			$(this).show() ;			
		}
	}) ;
	//iterate over all anchors right
	$( 'div#box-right a.anchor' ).each(function() {
		let anchor = $( this ) ;
		//get href of anchor
		let href = anchor.attr('href') ;
		if(href.includes(shortTitle_left)) {
			$(this).show() ;
		}
	}) ;
} ;

//function to highlight search results
window.ssMark = function() {
	//check hash if text included
	if(hash.includes('text_')) {		
		//check localstroage if markedHit
		if(localStorage.getItem('markedHit') !== null) {
			//get markedHit
			let markedHit_str = localStorage.getItem('markedHit') ;			
			let markedHit = JSON.parse(markedHit_str) ;
			let hit_arr_length = markedHit.length ;
			let str2mark = '' ;
			let marked_str = '' ;
			let sub_before = '' ;
			let sub_after = '' ;			
			let hit_id = '' ;
			let hit_html = '' ;
			let hit_class = markedHit[0].pos ;
			markedHit.forEach(function(hit, index) {
				hit_id = $('#text_' + hit.pos) ;
				//check if first part of hit
				if(index === 0) {					
					hit_html = hit_id.text() ;
					//check if hit has a "
					//if (hit_html.includes('"')) {
					//	hit_html = hit_html.replaceAll('"','&quot;') ; //utf8 code for "
					//}					
					let hit_length = hit_html.length ;
					console.log( "hit_length: ", hit_length ) ;
					let hit_offset = hit.chN - hit.offset ;
					let sub_before_tmp = hit_html.slice((-1)*hit_offset) ;
					let lastIndex = hit_html.lastIndexOf(sub_before_tmp) ;
					sub_before = hit_html.slice(0, lastIndex) ;					
					str2mark = hit.txt ;
					marked_str = '<mark class="' + hit_class + '">' + str2mark + '</mark>' ;
					let sub_after = hit_html.slice(lastIndex + hit.txt.length) ;					
					//insert marked text in DOM
					hit_id.html(sub_before + marked_str + sub_after) ;
					//console.log( "hit marked!" ) ;
				}
				//check if middle part of hit
				if(index > 0 && index < hit_arr_length-1) {					
					str2mark = hit.txt ;
					marked_str = '<mark class="' + hit_class + '">' + str2mark + '</mark>' ;
					//insert marked text in DOM
					hit_id.html(marked_str) ;
				}
				//check if last part of hit
				if(index === hit_arr_length-1 && index !== 0) {
					hit_html = hit_id.html() ;
					sub_after = hit_html.slice(hit.offset) ;					
					str2mark = hit.txt ;
					marked_str = '<mark class="' + hit_class + '">' + str2mark + '</mark>' ;
					//insert marked text in DOM
					hit_id.html(marked_str + sub_after) ;
				}
			}) ;			
			console.log( "markedHit: ", markedHit ) ;
		}		
	}
} ;

window.addEventListener('load', function() {
	synFinishedHook = function(num) {
	  //console.log('hook nr: ', num) ;    
	  if (num == 1) {
		(async () => {
			try {
				await sleepUntil(() => document.querySelector('#hashDummy'), 300);				
				document.querySelector('#hashDummy').click();
				synFinishedHook(2);						
			} catch {
				alert('timeout') ;
			}	
			$('a#hashDummy').remove() ;
		})() ;		
	  }
	  if (num == 2) {
		ssMark() ;		
	  }        
	}
  }) ;

$( function() {
    console.log( "ready!" );
	//get location #hash
	hash = window.location.hash ;
	//let anchor = $(location).attr('hash');  //get link anchor (#...)                        
    //    if(anchor.length!=0){  //check if link anchor exists	
	
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
			//check if hash is from uebersicht	
			if(hash.includes('over_')) {
				//get work title
				let workTitle = hash.replace('#', '') ;			
				workTitle = workTitle.substring(workTitle.indexOf('_')+1) ;
				//insert text data in DOM
				insertAllText('./data/txt/' + workTitle + '_all_html.txt','left') ;
			} else {
				//hash is from register or seach
				//set dummy link
				link = $('<a>', {
					id: 'hashDummy',
					href: hash, // Anchor's ID to be scrolled to				
				});
				$('body').append(link);
				//remove old box data
				$( 'div.synoptik-box div.auswahl-content div.col-12' ).find('*').remove() ;		  
				//get work title
				let workTitle = hash.replace('#', '') ;			
				workTitle = workTitle.substring(workTitle.indexOf('_')+1) ;			
				workTitle = workTitle.substring(0,workTitle.lastIndexOf('_')) ;
				//check hash if text included
				if(hash.includes('text_')) {
					setTransType('left','full') ;
				}		
				$( 'div.synoptik-box div.werke-dropdown ul.dropdown-menu li a#' + workTitle + '_left' ).trigger('click') ;				
				//insert text data in DOM
				//insertAllText('./data/txt/' + workTitle + '_all_html.txt','left') ;
				//insertFullText('left') ;
				synFinishedHook(1);
			}			
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
		type = type === undefined ? 'all' : type ;
		//get file name
		let fileName = workTitle + '_all_html.txt' ;	
		//get text data
		let filepath = './data/txt/' + fileName ;		
		//set work
		setWork(boxSide,workTitle) ;
		//set page number				
		let	groupedByTitle = Object.groupBy(textData_in.results.bindings, ({ title }) => title.short) ;
		let pageNr = groupedByTitle[workTitle][0].firstPageNr ;
		setPageNr(boxSide,pageNr) ;
		//set download link
		setDownloadLink(workTitle,boxSide) ;		
		//set transcription type
		setTransType(boxSide,type) ;		
		if(type === 'all') {		
			//insert all text data in DOM	
			insertAllText(filepath,boxSide) ;		
		} else {
			//insert Full text data in DOM
			insertAllText(filepath,boxSide) ;
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
			//check worktitle
			if(workTitle !== undefined && workTitle !== '') {
				if(typeNew === 'dipl') {
					//get file name
					let fileName = workTitle + '_all_html.txt' ;	
					//get text data
					let filepath = './data/txt/' + fileName ;		
					//insert all text data in DOM	
					insertAllText(filepath, boxSide) ;
				} else {
					//insert Full text data in DOM
					insertFullText(boxSide) ;
				}
			} else {
				alert('Please select a work!') ;				
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
		} else {
			alert('Please select a work!') ;
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
		//check if back class is set
		if (!click.hasClass('back')) {
			//set back class
			click.parent('ul').siblings('a').addClass('back') ;
		}		
		//get id
		let id_opp = click.children('a.dropdown-item').attr('id') ;
		//get opposite box side 
		let boxSide_opp = id_opp.includes('_left') ? 'left' : 'right' ;
		//get work title of opposite text
		let workTitle_opp = id_opp.includes('_left') ? id_opp.replace('_left', '') : id_opp.replace('_right', '') ;
		//get actual transcription type
		let type_this = getTransType(boxSide_this) ;
		//check if all type is selected
		if(type_this === 'all') {			
			//insert full text data in DOM	
			insertFullText(boxSide_this) ;
			//change trans to full text
			setTransType(boxSide_this,'full') ;			
		}
		//insert compare text data in DOM
		//get opposite file name
		let fileName_opp = workTitle_opp + '_all_html.txt' ;
		//get opposite text data
		let filepath_opp = './data/txt/' + fileName_opp ;
		//insert all text data in DOM
		insertAllText(filepath_opp, boxSide_opp) ;
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
//check if one of other box buttons is clicked
$( 'div.synoptik-box ul.navbar-nav li.nav-item' ).on('click','a',function() {
	console.log( "button clicked!" ) ;	
	let click = $( this ) ;
	let id = click.attr('id') ;
	let boxSide = id.includes('left') ? 'left' : 'right' ;
	if ($('a#text-comp_' + boxSide + '').hasClass('back')) {
		//remove background
		$('a#text-comp_' + boxSide + '').removeClass('back') ;
		//close dropdown
		$('a#text-comp_' + boxSide + '').siblings('ul.dropdown-menu').removeClass('show') ;
		click.siblings('ul.dropdown-menu').removeClass('show') ;
		//remove compare data
		$( 'div.compare-buttons' ).hide() ;		
		//hide anchors	
		$( 'a.anchor' ).hide();		
		//remove background
		$( 'span' ).css( "background-color", "transparent" );		
	}	
} ) ;

//check if compare button is clicked
$( 'div.compare-buttons .comp-equal' ).on('click',function() {
	console.log( this );
	let click = $( this );
	click.addClass('comp-selected');
	$( 'div.compare-buttons .comp-inequal' ).removeClass('comp-selected');
	$( 'div.compare-buttons .comp-not' ).removeClass('comp-selected');
	//select anchors to show
	displayAnchors() ;
	//show equal elements	
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
	//select anchors to show
	displayAnchors() ;
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
	//select anchors to show
	displayAnchors() ;
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

//check if linked entity in text is clicked
$( 'div.synoptik-box div.auswahl-content' ).on('click','a',function() {
	//find box of clicked element
	let click = $( this ) ;
	//get box side
	let boxSide = click.parents('div.synoptik-box').attr('id').includes('left') ? 'left' : 'right' ;
	//get id of element
	let id = click.attr('id') ;
	//get href of element
	let href = click.attr('href') ;
	//check href
	href = href.includes('#reg_') ? href.replace('#reg_', '') : href ;	
	//reset html string
	let html_str = '' ;
	//check if note is clicked
	if(href.includes('note')) {
		html_str = html_str.concat(table_snips[0] + table_snips[1] + 'Anmerkung' + table_snips[2]) ;					
		let note_text = $( '[href="' + href + '"] ~ span.note' ).text() ;		 
		html_str = html_str.concat(table_snips[3] + note_text + table_snips[4] + table_snips[5]) ;
	}	
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
		let id_reg = regData[0].id ;
		html_str = html_str.concat(table_snips[0] + table_snips[1] + 'Register <a href="register.html#' + id_reg + '"><img src="images/right-arrow.png" title="Register"></a>' + table_snips[2]) ;							
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
		let id_reg = regData[0].id ;
		html_str = html_str.concat(table_snips[0] + table_snips[1] + 'Register <a href="register.html#' + id_reg + '"><img src="images/right-arrow.png" title="Register"></a>' + table_snips[2]) ;							
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
		let id_reg = regData[0].id ;
		html_str = html_str.concat(table_snips[0] + table_snips[1] + 'Register <a href="register.html#' + id_reg + '"><img src="images/right-arrow.png" title="Register"></a>' + table_snips[2]) ;									
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
					//build pid nr
					let pid = regData[0].pid ;         			
         			if(pid.includes('geonames')) {            			
            			pid_nr = pid.replace('https://www.geonames.org/','') ;
            			pid_nr = pid_nr.replace(pid_nr.substring(pid_nr.lastIndexOf('/')),'') ;            
         			} ;
					html_str = html_str.concat(table_snips[0] + table_snips[1] + 'Name' + table_snips[2]) ;
					let name = regData[0].name ;		
					//html_str = html_str.concat(table_snips[3] + name + table_snips[4] + table_snips[5]) ;
					html_str = html_str.concat(table_snips[3] + '<a href="karte.html#' + pid_nr + '">' + name + '</a>' + table_snips[4] + table_snips[5]) ;
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
		let id_reg = regData[0].id ;
		html_str = html_str.concat(table_snips[0] + table_snips[1] + 'Register <a href="register.html#' + id_reg + '"><img src="images/right-arrow.png" title="Register"></a>' + table_snips[2]) ;									
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