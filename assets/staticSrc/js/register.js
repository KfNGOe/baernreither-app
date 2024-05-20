var regPersonData_in ;
var regIndexData_in ;
var regOrgData_in ;
var regPlaceData_in ;
var hash ;

regFinishedHook = function(num){} ;

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

window.addEventListener('load', function() {
regFinishedHook = function(num) {
    //console.log('hook nr: ', num) ;    
    if (num == 1) {
    (async () => {
        try {
            await sleepUntil(() => document.querySelector('#hashDummy'), 300);				
            document.querySelector('#hashDummy').click();
            //hide hash
            //let hash_tmp = hash.replace('#','') ;
            //$('span#' + hash_tmp +'').parent('td').hide() ;            
        } catch {
            alert('timeout') ;
        }	
        $('a#hashDummy').remove() ;
    })() ;		
    }
    if (num == 2) {}        
}
}) ;

$( function() {
    //get location #hash
	hash = window.location.hash ;
    //set default radio button
    document.getElementById("search-person").checked = true;
    (async () => {				
		//get register person data
        let filepath = './data/txt/register/register_table_person.txt' ;
        regPersonData_in = await fetchData(filepath) ;
        //get register index data
        filepath = './data/txt/register/register_table_index.txt' ;
        regIndexData_in = await fetchData(filepath) ;
        //get register org data
        filepath = './data/txt/register/register_table_org.txt' ;
        regOrgData_in = await fetchData(filepath) ;
        //get register place data
        filepath = './data/txt/register/register_table_place.txt' ;
        regPlaceData_in = await fetchData(filepath) ;
		
		console.log( "data loaded!" ) ;

        //check if hash exists
		if(hash.length!=0){			
			if(hash.toLowerCase().includes('reg')) {
                //remove old register data
                $('div.table-register#org table.table tbody').empty() ;
                //trigger
                $( 'input#search-index' ).trigger('click') ;
				console.log('register index selected!') ;			
				//set dummy link
				link = $('<a>', {
					id: 'hashDummy',
					href: hash, // Anchor's ID to be scrolled to				
				});
				$('body').append(link);
                //show hash
                let hash_tmp = hash.replace('#','') ;
                $('span#' + hash_tmp +'').parent('td').show() ;
				regFinishedHook(1);
            
			}			
		}
	})() ;		
}) ;

//register person click event
$( 'input#search-person' ).on('click',function() {
	let click = $( this );
    //get register person data
    let registerPersonData_str = regPersonData_in ;
    //parse register person data
    let regPersonData = $.parseHTML(registerPersonData_str) ;
    //remove old register data
    $('div.table-register#person table.table tbody').empty() ;
    //insert register person data
    $('div.table-register#person table.table tbody').append(regPersonData) ;

    //hide all tables
    $('div.table-register').hide() ;
    //show person table
    $('div.table-register#person').show() ;

	console.log('register person selected!') ;
}) ;

//register org click event
$( 'input#search-institution' ).on('click',function() {	
	let click = $( this );
    //get register org data
    let registerOrgData_str = regOrgData_in ;
    //parse register org data
    let regOrgData = $.parseHTML(registerOrgData_str) ;
    //remove old register data
    $('div.table-register#org table.table tbody').empty() ;
    //insert register org data
    $('div.table-register#org table.table tbody').append(regOrgData) ;

    //hide all tables
    $('div.table-register').hide() ;
    //show person table
    $('div.table-register#org').show() ;

	console.log('register org selected!') ;
}) ;

//register place click event
$( 'input#search-place' ).on('click',function() {	
    let click = $( this );
    //get register place data
    let registerPlaceData_str = regPlaceData_in ;
    //parse register place data
    let regPlaceData = $.parseHTML(registerPlaceData_str) ;
    //remove old register data
    $('div.table-register#place table.table tbody').empty() ;
    //insert register place data
    $('div.table-register#place table.table tbody').append(regPlaceData) ;

    //hide all tables
    $('div.table-register').hide() ;
    //show place table
    $('div.table-register#place').show() ;

    console.log('register place selected!') ;	
}) ;

//register index click event
$( 'input#search-index' ).on('click',function() {
    let click = $( this );
    //get register index data
    let registerIndexData_str = regIndexData_in ;
    //parse register index data
    let regIndexData = $.parseHTML(registerIndexData_str) ;
    //remove old register data
    $('div.table-register#index table.table tbody').empty() ;
    //insert register index data
    $('div.table-register#index table.table tbody').append(regIndexData) ;

    //hide all tables
    $('div.table-register').hide() ;
    //show index table
    $('div.table-register#index').show() ;

    console.log('register index selected!') ;
	
}) ;

//check if accordion is clicked
$( 'button.accordion-button' ).on('click',function() {
    //find box of clicked element
    let click = $( this );
    console.log('register accordion selected!') ;
}) ;