const threeDots = '...' ;
var html_str = '' ;

window.showResults = function () {
    console.log('showResults') ;
    console.log('results: ', result_arr_test) ;
    if (Array.isArray(result_arr_test) && result_arr_test.length) {
        let source_arr = [] ;
        //get path length
        let searchPathNr = result_arr_test.length ;
        for (i_path = 0; i_path < searchPathNr; i_path++) {            
            source_arr[i_path] = result_arr_test[i_path][0].instances[0].docId ; 
            console.log('i_path = ', i_path) ;        
        }
        //remove duplicates
        source_arr = Array.from(new Set(source_arr)) ;
        console.log('source_arr: ', source_arr) ;
        //fill table data with source data
        source_arr.forEach(function(source) {            
            html_str = html_str.concat('<tr>') ;
            html_str = html_str.concat('<td>' + source + '</td>') ;
            html_str = html_str.concat('<td>') ;
            //fill table data with search results
            let searchPathNr = result_arr_test.length ;
            for (i_path = 0; i_path < searchPathNr; i_path++) {            
                if (result_arr_test[i_path][0].instances[0].docId === source) {
                    html_str = html_str.concat('<p>') ;
                    let contextBefore = contextBefore(result_arr_test[i_path]) ;
                    let contextAfter = contextAfter(result_arr_test[i_path]) ;            
                    html_str = html_str.concat(threeDots + contextBefore + '<span class="search-highlight">' + '<a href="#">' + input_search + '</a>' + '</span>' + contextAfter + threeDots) ;
                    html_str = html_str.concat('</p>') ;                    
               }
            }
            html_str = html_str.concat('</td>') ;
            html_str = html_str.concat('</tr>') ;
        }) ;        
        //insert html_str into table
        let html = $.parseHTML(html_str) ;
        $('html').find('tbody').children().remove() ;
        $('html').find('tbody').append(html) ;        
        html_str = '' ;        
    }
    
    


    /** 
    //start new row
    html_str = html_str.concat('<tr>') ;
    //end row
    html_str = html_str.concat('</tr>') ;
    //insert html_str into table
    //var register = $.parseHTML(register_str) ;
    $('html').find('tbody').append("<tr><td>test</td></tr>") ;    
    console.log('html: ', $('html').find('tbody').html() ) ;      
     */
} ;