var textData_in ;
var annoCompData_in ;
var annoTextCompData_in ;
var regPersonData_in ;
var regIndexData_in ;
var textsAllData = {};
var hash ;
var markedHit ;
var link ;
var input_left = document.getElementById("page_input_left") ;
var input_right = document.getElementById("page_input_right") ;
var pageNrFacs ;

let table_snips = ["<table>","<thead><td><b>","</b></td></thead>","<tr><td>","</td></tr>", "</table>"] ;
let groupedByStartTarget = {} ;

const arrow_left_left = document.getElementById("arrow-left_left") ;
const arrow_right_left = document.getElementById("arrow-right_left") ;
const arrow_left_right = document.getElementById("arrow-left_right") ;
const arrow_right_right = document.getElementById("arrow-right_right") ;

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

synFinishedHook = function(num){} ;

//page scroll event
function onContainerScroll(boxSide) {
	let container = document.getElementById("auswahl-content-scroll_" + boxSide);
  
	//Scroll vars (not needed for page-position but can be usefull in the future)
	let scroll = container.scrollTop;
	let totalHeight = container.scrollHeight;
	let visibleHeight = container.offsetHeight;
	let hiddenHeight = totalHeight - visibleHeight;
	let percentage = (scroll / hiddenHeight) * 100;
  
	//get all page-locator
	let anchors = document.getElementsByClassName("pageLocator " + boxSide);

	//check if facs is active
	let facs = $('#auswahl-content-scroll_' + boxSide + ' div.facs').html() ;
	if(facs == undefined) {	
		//get current page	
		var currentPage = 0;
		for (var i = 0; i < anchors.length; i++) {
			let anchor = anchors[i];
			if (scroll >= anchor.offsetTop) {
				currentPage = anchor.id;
			}
		}
		if(currentPage === 0) {
			currentPage = getPageNr(boxSide) ;
		}
		setPageNr(boxSide, currentPage);	
	}
}

//input page number event left box
input_left.addEventListener("keypress", function(event) {		
	if (event.key === "Enter") {	  
		event.preventDefault();
		console.log("Enter pressed") ;
		//check if facs is active
		let facs = $('#auswahl-content-scroll_left div.facs').html() ;
		if(facs == undefined) {
			let pageNr = input_left.value ;
			setPage(pageNr, 'left') ;
		} else {
			//get pageNr of facs
			let pageNr = pageNrFacs ;
			//set pageNr
			setPageNr('left', pageNr) ;
		}		
	}
});
//input page number event right box
input_right.addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		console.log("Enter pressed") ;
		//check if facs is active
		let facs = $('#auswahl-content-scroll_right div.facs').html() ;
		if(facs == undefined) {
			let pageNr = input_right.value ;
			setPage(pageNr, 'right') ;
		} else {
			//get pageNr of facs
			let pageNr = pageNrFacs ;
			//set pageNr
			setPageNr('right', pageNr) ;
		}		
	}
});

//left arrow click event left box
arrow_left_left.addEventListener("click", function() {
	console.log("left arrow of left box clicked") ;
	stepPage('left','left') ;
}) ;
//right arrow click event left box
arrow_right_left.addEventListener("click", function() {	
	console.log("right arrow of left box clicked") ;
	stepPage('right','left') ;
}) ;
//left arrow click event right box
arrow_left_right.addEventListener("click", function() {
	console.log("left arrow of right box clicked") ;
	stepPage('left','right') ;			
}) ;
//right arrow click event right box
arrow_right_right.addEventListener("click", function() {
	console.log("right arrow of right box clicked") ;
	stepPage('right','right') ;	
}) ;

//step page
window.stepPage = function(arrowDir, boxSide) {
	let facs = $('#auswahl-content-scroll_' + boxSide + ' div.facs').html() ;
	if(facs == undefined) {
		//get all page-locator
		let anchors = document.getElementsByClassName("pageLocator " + boxSide);
		let pageNr = getPageNr(boxSide) ;
		//check if pagenr is undefined
		if(pageNr === '' || pageNr === undefined) {
			return ;
		} else {
			//find index of pageNr in anchors
			let index = 0 ;
			for (var i = 0; i < anchors.length; i++) {
				let anchor = anchors[i];
				if (anchor.id == pageNr) {
					index = i ;
				}
			}
			//get next page
			if(arrowDir === 'left') {
				if(index === 0) {
					return ;
				} else {
					let prevPage = anchors[index-1].id ;
					setPage(prevPage, boxSide) ;	
				}
			} else {
				if(index === anchors.length-1) {
					return ;
				} else {
					let nextPage = anchors[index+1].id ;
					setPage(nextPage, boxSide) ;	
				}
			}	
		}
	}		
}
//set page
window.setPage = function(page, boxSide) {
	let container = document.getElementById("auswahl-content-scroll_" + boxSide) ;
	let anchors = document.getElementsByClassName("pageLocator " + boxSide) ;

	for (var i = 0; i < anchors.length-1; i++) {
		let anchor = anchors[i];
		if (anchor.id == page) {
			container.scrollTop = anchor.offsetTop;			
			//setPageNr(boxSide, page);
			console.log("set page to: ", page);
		}
	}	
}
//get page number
window.getPageNr = function(boxSide) {
	let pageNr = $( '#page_input_' + boxSide ).val() ;
	return pageNr ;
} ;
//set page number
window.setPageNr = function(boxSide,pageNr) {
	$( '#page_input_' + boxSide ).val(pageNr) ;
} ;
//get page count
window.getPageCount = function(boxSide) {
	let pageCount = $( 'div#box-' + boxSide + ' div.page-skip span#page_nr_' + boxSide ).text() ;
	return pageCount ;
} ;
//set page count
window.setPageCount = function(boxSide,pageCount) {
	$( 'div#box-' + boxSide + ' div.page-skip span#page_nr_' + boxSide ).text(pageCount) ;
} ;

//fetch file
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

//set box nav bar years items
window.boxNavItems = function(li,date,groupedByTitle) {	
	//get title
	let dispTitle = li.text() ;		
	let title = disp2ShortTitle(dispTitle) ;
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

//get transcription type
window.getTransType = function(boxSide) {
	let type = $( '#trans_' + boxSide).siblings('ul.dropdown-menu').find('a.active').attr('id') ;
	type = type === undefined ? 'dipl' : type.replace('_' + boxSide, '') ;		
	return type ;
} ;
//set transcription type
window.setTransType = function(boxSide,type) {	
	$( '#trans_' + boxSide).siblings('ul.dropdown-menu').find('a').removeClass('active') ;
	$( '#trans_' + boxSide).siblings('ul.dropdown-menu').find('a#' + type + '_' + boxSide).addClass('active') ;
} ;

//set download link
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

//get work
window.getWork = function(boxSide) {
	let work = $( 'div#box-' + boxSide + ' div.page-skip div#work_' + boxSide +' span').attr('id') ;
	work = work === undefined ? work : work.replace('work_' + boxSide + '_', '') ;	
	return work ; 	
}
//set work
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

//convert short title to display title
window.short2DispTitle = function(short) {
	let title = textData_in.results.bindings.find((item, index) => {
		return item.title.short === short ;
	}).title.display ;
	title = title === undefined ? '' : title ;	
	return title ;
}
//convert display title to short title
window.disp2ShortTitle = function(disp) {
	let title = textData_in.results.bindings.find((item, index) => {
		return item.title.display === disp ;
	}
	).title.short ;
	title = title === undefined ? '' : title ;
	return title ;
}

//insert work data in DOM
window.insertAllText = function(filepath,boxSide) {
	(async () => {
		//remove old data
		$( 'div#box-' + boxSide + ' div.auswahl-content div.col-12' ).find('*').remove() ;		
		//get text data			
		let content_str = textsAllData[filepath] ;
		let content = $.parseHTML(content_str) ;
		$( 'div#box-' + boxSide + ' div.auswahl-content div.col-12' ).html(content) ;		
		//add class boxside to class pageLocator
		$( 'div#box-' + boxSide + ' div.auswahl-content div.col-12' ).find('span.pageLocator').addClass(boxSide) ;
	})() ;
}
//insert Full text data in DOM
window.insertFullText = function(boxSide) {
	displayFullText(boxSide) ;
	console.log( "insert full text!" ) ;
} ;

//get text data
window.getText = function(boxSide, workTitle, pageNr, pageCount, transType) {
    //set work title
	setWork(boxSide,workTitle) ;
	//set page number
	setPageNr(boxSide, pageNr);
	//set page count
	setPageCount(boxSide, pageCount);
	//set transcription type
	setTransType(boxSide, transType);
    try {
        //insert all text data in DOM
		let filePath = workTitle;
		insertAllText(filePath, boxSide);        
        console.log(`Content for ${workTitle} loaded into ${boxSide} box.`);
    } catch (error) {
        console.error('Error fetching text data:', error);
    }
}

//display Dipl text
window.displayDiplText = function(boxSide) {
	$('div#box-' + boxSide + ' .abbr').show();      //show all elements with abbr class
    $('div#box-' + boxSide + ' .expan').hide();		//hide all elements with expan class

	$('div#box-' + boxSide + ' .add').css( "background-color", "rgb(217, 209, 236)" );

	$('div#box-' + boxSide + ' .addSpan').css( "background-color", "rgba(200, 190, 200, 0.2)" ).show();

	$('div#box-' + boxSide + ' .del').show();

	$('div#box-' + boxSide + ' span[id*="note"].note').hide();

	console.log( "display Dipl text!" ) ;
} ;
//display Full text
window.displayFullText = function(boxSide) {
	$('div#box-' + boxSide + ' .expan').show();      
    $('div#box-' + boxSide + ' .abbr').hide();
	
	$('div#box-' + boxSide + ' .add').css( "background-color", "transparent" );

	$('div#box-' + boxSide + ' .addSpan').css( "background-color", "transparent" ).hide();

	$('div#box-' + boxSide + ' .del').hide();

	$('div#box-' + boxSide + ' span[id*="note"].note').hide();
	
	console.log( "display Full text!" ) ;
} ;
//display spans
window.displaySpans = function(anchor, shortTitle_box, classname) {	
	//get href of anchor
	let href = anchor.attr('href') ;
	if(href.includes(shortTitle_box) && anchor.hasClass(classname)) {		
		//get id of anchor
		let id = anchor.attr('id') ;
		//extract pos from id
		let pos_anch = id.substring(id.lastIndexOf('_')+1) ;
		//extract short title from id
		let shortTitle = (id.substring(0, id.lastIndexOf('_'))).replace('comp_', '') ;
		//get start + end target pos in annoTextCompData
		let itemTarget = {} ; 
		groupedByStartTarget[pos_anch].forEach(function(item, index) {
			if(item.source_target.value === shortTitle) {
				itemTarget = item ;
			}
		}) ;
		let startTarget = itemTarget.start_target.value ;
		let endTarget = itemTarget.end_target.value ;
		//get span elements between start and end target
		let idTitle = 'text_' + shortTitle + '_' ;
		let i_nxt = 0 ;
		for (let i = startTarget; i < endTarget; i++) {
			i_nxt = i + 1 ;
			if(!(i_nxt === endTarget && i === startTarget)) {				
				if(i === '386') {
					console.log( "i: ", i ) ;
				}					
				let span = 'span.' + classname + '[id="' + idTitle + i + '"]' ;
				let span_hit = $( span ) ;	
				if(span_hit !== undefined) {
					//highlight span
					$( span ).css( "background-color", "#f7e0c7" ) ;						
				}
			}
		}
		//show anchor
		let anchor_sel = $( 'a#' + id ) ;
		$( anchor_sel ).show() ;
	}	
}
window.displayAnchorsSpans = function(classname) {
	//get work title of left box
	let shortTitle_left = getWork('left') ;
	//get work title of right box
	let shortTitle_right = getWork('right') ;		
	//iterate over all anchors left
	$( 'div#box-left a.anchor' ).each(function() {		
		let anchor = $( this ) ;		
		//display spans			
		displaySpans(anchor, shortTitle_right, classname) ;			
	}) ;
	console.log( "display anchors and spans left done" ) ;
	//iterate over all anchors right	
	$( 'div#box-right a.anchor' ).each(function() {
		let anchor = $( this ) ;		
		//display spans			
		displaySpans(anchor, shortTitle_left, classname) ;		
	}) ;
	console.log( "display anchors and spans right done" ) ;	
} ;
//highlight search results
window.ssMark = function() {
	//check hash if text included
	if(hash.includes('text_')) {		
		//check localstroage if markedHit
		if(markedHit !== null) {
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
			//remove markedHit from localstorage
			localStorage.removeItem('markedHit') ;
		}		
	}
} ;

//load event
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

//document ready
$( function() {
    console.log( "ready!" );
	//get location #hash
	hash = window.location.hash ;
	//get local storage
	markedHit = localStorage.getItem('markedHit') ;
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
		//get anno text compare data
		filepath = './data/json/anno/annoTextComp.json' ;
		annoTextCompData_in = await fetchData(filepath) ;
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
		
		//get text all data		
		filepath = './data/txt/Bae_MF_6-1_all_html.txt' ; 
		let file_txt = await fetchData(filepath) ;		
		textsAllData['Bae_MF_6-1'] = file_txt ;

		filepath = './data/txt/Bae_MF_6-2_all_html.txt' ;
		file_txt = await fetchData(filepath) ;		
		textsAllData['Bae_MF_6-2'] = file_txt ;

		filepath = './data/txt/Bae_TB_7_all_html.txt' ;
		file_txt = await fetchData(filepath) ;		
		textsAllData['Bae_TB_7'] = file_txt ;

		filepath = './data/txt/Bae_TB_8_all_html.txt' ;
		file_txt = await fetchData(filepath) ;		
		textsAllData['Bae_TB_8'] = file_txt ;

		//get dates of textData
		let textData_arr = textData_in.results.bindings ;		
		let dateFile ;		
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
			let li_left = '<li><a class="dropdown-item" href="#" id="' + result.title.short + '_left">' + result.title.display + '</a></li>' ;
			let li_right = '<li><a class="dropdown-item" href="#" id="' + result.title.short + '_right">' + result.title.display + '</a></li>' ;			
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
			//remove meta box content
			$( 'div.meta-box' ).find('*').remove() ;
		}) ;

		//check if hash exists
		if(hash.length!=0){
			//check if hash is from uebersicht	
			if(hash.includes('over_')) {
				//get work title
				let workTitle = hash.replace('#', '') ;			
				workTitle = workTitle.substring(workTitle.indexOf('_')+1) ;				
				setTransType('left','dipl') ;
				//insert text data in DOM				
				$( 'div.synoptik-box div.werke-dropdown ul.dropdown-menu li a#' + workTitle + '_left' ).trigger('click') ;
			} else {
				//hash is from register or search
				//set dummy link
				link = $('<a>', {
					id: 'hashDummy',
					href: hash, // Anchor's ID to be scrolled to				
					//href: '#text_Bae_MF_6-1_447', 
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
				//insert text data in DOM		
				$( 'div.synoptik-box div.werke-dropdown ul.dropdown-menu li a#' + workTitle + '_left' ).trigger('click') ;				
				console.log( "hashDummy clicked!" ) ;				
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
	$( 'div#box-' + boxSide + ' a#MF_' + boxSide ).siblings('ul.dropdown-menu').children('li').each(function() {
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
		//get page number				
		let	groupedByTitle = Object.groupBy(textData_in.results.bindings, ({ title }) => title.short) ;
		let pageNr = groupedByTitle[workTitle][0].firstPageNr ;		
		//get number of pages
		let pageCount = textData_in.results.bindings.find((item, index) => {
			return item.title.short === workTitle ;
		}).pageCount ;		
		//get transcription type in nav-werke
		let transType = getTransType(boxSide) ;
		transType = transType === undefined ? 'dipl' : transType ;
		//get text data
		getText(boxSide, workTitle, pageNr, pageCount, transType) ;
		//check transcription type
		if(transType === 'dipl') {
			//set dipl text style
			displayDiplText(boxSide) ;			
		} else {
			//set full text style
			displayFullText(boxSide) ;
		}
		//set download link
		setDownloadLink(workTitle,boxSide) ;		
	}
	//hide dropdown
	click.parents('ul.dropdown-menu').removeClass('show') ;
}) ;

//transcription box click event
$( 'div.synoptik-box div.nav-werke li.nav-item' ).on('click','a',function() {
	//find box of clicked element
	let click = $( this ) ;
	//get id of parents a element
	let id_trans = click.attr('id') ;
	//check if clicked element is a transcription
	if(id_trans.includes('trans')) {
		//get boxside
		let boxSide = id_trans.includes('_left') ? 'left' : 'right' ;
		let facs = $('#auswahl-content-scroll_' + boxSide + ' div.facs').html() ;
		if(facs !== undefined) {
			//remove facs
			$('#auswahl-content-scroll_' + boxSide + ' div.facs').remove() ;
			//show old text data content			
			$( 'div#box-' + boxSide + ' div.auswahl-content div.col-12' ).find('*').show() ;
			//get transcription type
			let transType = getTransType(boxSide) ;
			//check if transcription type is dipl
			if(transType === 'dipl') {
				//display dipl text
				displayDiplText(boxSide) ;
			} else {
				//display full text
				displayFullText(boxSide) ;
			}			
			//get page number
			let pageNr = getPageNr(boxSide) ;
			//set page
			setPage(pageNr, boxSide) ;
			
		}
		$('a.anchor').hide() ;
	}
}) ;

//transcription type click event
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
					//display dipl text
					displayDiplText(boxSide) ;						
				} else {
					//display full text
					displayFullText(boxSide) ;					
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
			//save page number
			pageNrFacs = pageNr ;
			//get id of pb element
			let facsId = $( 'div#box-' + boxSide + ' div.auswahl-content' ).find('span.pb#' + pageNr).children('a').attr('href') ;
			//remove #
			facsId = facsId.replace('#', '') ;
			//hide old text data content			
			$( 'div#box-' + boxSide + ' div.auswahl-content div.col-12' ).find('*').hide() ;
			//insert facs data in DOM
			let div = '<div class="facs"><img src="./data/img/' + workTitle + '/' + facsId + '.jpg" alt="facs"></div>' ;
			$( 'div#box-' + boxSide + ' div.auswahl-content div.col-12' ).append(div) ;			
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
			//check facs
			let facs = $('#auswahl-content-scroll_' + boxSide + ' div.facs').html() ;
			if(facs !== undefined) {
				//remove facs
				$('#auswahl-content-scroll_' + boxSide + ' div.facs').remove() ;
				//show old text data content			
				$( 'div#box-' + boxSide + ' div.auswahl-content div.col-12' ).find('*').show() ;				
			}			
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
		//get actual transcription type
		let type_this = getTransType(boxSide_this) ;
		//check if dipl type is selected
		if(type_this === 'dipl') {			
			//display full text data
			displayFullText(boxSide_this) ;			
			//change trans to full text
			setTransType(boxSide_this,'full') ;			
		}				
		//get id
		let id_opp = click.children('a.dropdown-item').attr('id') ;
		//get opposite box side 
		let boxSide_opp = id_opp.includes('_left') ? 'left' : 'right' ;
		//get work title of opposite text
		let workTitle_opp = id_opp.includes('_left') ? id_opp.replace('_left', '') : id_opp.replace('_right', '') ;
		//get opposite page number
		let	groupedByTitle = Object.groupBy(textData_in.results.bindings, ({ title }) => title.short) ;
		let pageNr_opp = groupedByTitle[workTitle_opp][0].firstPageNr ;
		//get number of opposite pages
		let pageCount_opp = textData_in.results.bindings.find((item, index) => {
			return item.title.short === workTitle_opp ;
		}).pageCount ;
		//get opposite transcription type
		let transType_opp = 'full' ;
		//get opposite text data
		getText(boxSide_opp, workTitle_opp, pageNr_opp, pageCount_opp, transType_opp) ;
		//display full opposite text data
		displayFullText(boxSide_opp) ;				
		//hide dropdown
		click.parents('ul.dropdown-menu').removeClass('show') ;
		//show compare buttons
		$( 'div.compare-buttons' ).show() ;
		console.log( "text comp clicked!" ) ;
		//prepare compare data	
		//group anno text compare data by start target
		groupedByStartTarget = Object.groupBy(annoTextCompData_in.results.bindings, ({ start_target }) => start_target.value) ;		
	}
}) ;

//check if one of the other box buttons is clicked
$( 'div.synoptik-box ul.navbar-nav li.nav-item' ).on('click','a',function() {
	console.log( "button clicked!" ) ;	
	let click = $( this ) ;
	let id = click.attr('id') ;
	let boxSide = id.includes('left') ? 'left' : 'right' ;
	//check if compare is active
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
	//remove meta box content
	$( 'div.meta-box' ).find('*').remove() ;
} ) ;

//check if compare button is clicked
$( 'div.compare-buttons .comp-equal' ).on('click', function() {
	console.log( this );
	let click = $( this );
	let className = 'comp-span-equal' ;
	//make comp elements transparent
	$( 'span.comp-span-equal' ).css( "background-color", "transparent" );
	$( 'span.comp-span-inequal' ).css( "background-color", "transparent" );
	$( 'span.comp-span-not' ).css( "background-color", "transparent" );
	//hide all anchors
	$( 'a.anchor' ).hide() ;
	//select anchors to show and spans to highlight
	displayAnchorsSpans(className) ;
	//highlight equal button
	click.addClass('comp-selected');
	$( 'div.compare-buttons .comp-inequal' ).removeClass('comp-selected');
	$( 'div.compare-buttons .comp-not' ).removeClass('comp-selected');	
}) ;		
$( 'div.compare-buttons .comp-inequal' ).on('click', function() {
	console.log( this );
	let click = $( this );
	let className = 'comp-span-inequal' ;
	//make comp elements transparent
	$( 'span.comp-span-equal' ).css( "background-color", "transparent" );
	$( 'span.comp-span-inequal' ).css( "background-color", "transparent" );
	$( 'span.comp-span-not' ).css( "background-color", "transparent" );
	//hide all anchors
	$( 'a.anchor' ).hide() ;
	//select anchors to show and spans to highlight
	displayAnchorsSpans(className) ;	
	//highlight inequal button
	click.addClass('comp-selected');
	$( 'div.compare-buttons .comp-equal' ).removeClass('comp-selected');
	$( 'div.compare-buttons .comp-not' ).removeClass('comp-selected');	
}) ;
$( 'div.compare-buttons .comp-not' ).on('click', function() {
	console.log( this );
	let click = $( this );
	let className = 'comp-span-not' ;
	//make comp elements transparent
	$( 'span.comp-span-equal' ).css( "background-color", "transparent" );
	$( 'span.comp-span-inequal' ).css( "background-color", "transparent" );
	$( 'span.comp-span-not' ).css( "background-color", "transparent" );
	//hide all anchors
	$( 'a.anchor' ).hide() ;
	//select anchors to show
	displayAnchorsSpans(className) ;
	//highlight not button
	click.addClass('comp-selected');
	$( 'div.compare-buttons .comp-equal' ).removeClass('comp-selected');
	$( 'div.compare-buttons .comp-inequal' ).removeClass('comp-selected');	
}) ;

//check if anchor is clicked
$( 'div.synoptik-box div.auswahl-content' ).on('click','a.anchor',function() {
	//remove meta box content
	$( 'div.meta-box' ).find('*').remove() ;	
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
	//get page number
	let pageNr_this = id_pb ;	
	//get page count
	let pageCount_this = getPageCount(boxSide_this) ;		
	//get transcription type
	let transType_this = 'dipl' ;	
	//remove old text opposite content
	$( 'div#box-' + boxSide_opp + ' div.auswahl-content div.col-12' ).find('*').remove() ;	
	//get text data
	getText(boxSide_opp,workTitle_this,pageNr_this,pageCount_this,transType_this) ;
	//display dipl text
	displayDiplText(boxSide_opp) ;
	//hide new text data content			
	$( 'div#box-' + boxSide_opp + ' div.auswahl-content div.col-12' ).find('*').hide() ;
	//save page number
	pageNrFacs = pageNr_this ;	
	//get id of pb element
	let facsId = click.children('a').attr('href') ;
	//remove #
	facsId = facsId.replace('#', '') ;
	//insert facs data in DOM
	let div = '<div class="facs"><img src="./data/img/' + workTitle_this + '/' + facsId + '.jpg" alt="facs"></div>' ;
	$( 'div#box-' + boxSide_opp + ' div.auswahl-content div.col-12' ).append(div) ;
	//remove meta box content
	$( 'div.meta-box' ).find('*').remove() ;			
}) ;

//check if linked entity in text is clicked
$( 'div.synoptik-box div.auswahl-content, div.synoptik-box div.meta-box' ).on('click','a',function() {
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
		//let note_text = $( 'span.note[id="' + href.replace('#', '') + '"]' ).text() ;
		//get trans type
		let type = getTransType(boxSide) ;
		if(type === 'dipl') {			
			$( 'span.note[id="' + href.replace('#', '') + '"] span.abbr' ).show() ;
			$( 'span.note[id="' + href.replace('#', '') + '"] span.expan' ).hide() ;
			
		} else {
			//type is full
			$( 'span.note[id="' + href.replace('#', '') + '"] span.abbr' ).hide() ;
			$( 'span.note[id="' + href.replace('#', '') + '"] span.expan' ).show() ;
		}
		let note_text = $( 'span.note[id="' + href.replace('#', '') + '"]' ).html() ;
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
	//remove meta box content
	$( 'div#box-' + boxSide + ' div.meta-box' ).find('*').remove() ;
	//insert meta box in DOM
	$( 'div#box-' + boxSide + ' div.meta-box' ).append(html) ;
	//show meta box
	$( 'div#box-' + boxSide + ' div.meta-box' ).show() ;
	console.log( "register clicked!" ) ;
}) ;

//check if a click inside the text box occurs
$( 'div.synoptik-box div.auswahl-content' ).on('click', function(event) {
	//check if this cklick is not a click on a link
	if (!$(event.target).closest('a').length) {
		//remove meta box content
		$( 'div.meta-box' ).find('*').remove() ;
	}
}) ;