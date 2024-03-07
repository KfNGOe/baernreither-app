var html_str = '' ;

window.showResults = function () {
    console.log('showResults') ;
    //start new row
    html_str = html_str.concat('<tr>') ;
    //end row
    html_str = html_str.concat('</tr>') ;
    //insert html_str into table
    //var register = $.parseHTML(register_str) ;
    $('html').find('tbody').append("<tr><td>test</td></tr>") ;    
    console.log('html: ', $('html').find('tbody').html() ) ;      
} ;