var regPersonData_in ;
var regIndexData_in ;
var regOrgData_in ;
var regPlaceData_in ;


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

$( function() {
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