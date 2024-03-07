const threeDots = '...' ;
var html_str = '' ;

function contextBefore(index_hit,sourceFile) {
    let countSpace = 0 ;
    let contextBefore = '' ;
    let item_before = {} ;
    let index_before = index_hit - 1 ;
    let contextBefore_arr = [] ;   
    while (countSpace < spaceMax && index_before >= 0) {
       item_before = sourceFile.results.bindings[index_before] ;
       contextBefore = item_before.o_txt.value + contextBefore ;
       countSpace = (contextBefore.match(/\s/g) || []).length ;
       index_before-- ;
       //console.log('countSpace = ', countSpace) ;      
    }
    if (countSpace > spaceMax) {      
       contextBefore_arr = contextBefore.split(" ") ;
       contextBefore_arr = contextBefore_arr.slice(-(spaceMax + 1)) ;
       contextBefore = contextBefore_arr.join(" ") ;      
    }
    return contextBefore ;
 }
 
 function contextAfter(index_hit,sourceFile) {
    let countSpace = 0 ;
    let contextAfter = '' ;
    let item_after = {} ;
    let index_after = index_hit + 1 ;
    let contextAfter_arr = [] ;   
    while (countSpace < spaceMax && index_after >= 0) {
       item_after = sourceFile.results.bindings[index_after] ;
       contextAfter =  contextAfter + item_after.o_txt.value ;
       countSpace = (contextAfter.match(/\s/g) || []).length ;
       index_after++ ;
       //console.log('countSpace = ', countSpace) ;      
    }
    if (countSpace > spaceMax) {      
       contextAfter_arr = contextAfter.split(" ") ;
       contextAfter_arr = contextAfter_arr.slice(0, spaceMax + 1) ;
       contextAfter = contextAfter_arr.join(" ") ;      
    }
    return contextAfter ;
 }

window.showResults = function () {
    (async () => {
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
            //fetch source Files
            for (i_source = 0; i_source < source_arr.length; i_source++) {
                let source = source_arr[i_source] ;
                let fileNamePath = 'data/json/' + source + '_full.json' ;    //data/json/Bae_TB_8_full.json
                sourceFile_arr.push(await fetchData(fileNamePath)) ;                
            }            
            //fill table data with source data
            let sourceFile_arr = [] ;            
            source_arr.forEach(function(source,index) {                
                html_str = html_str.concat('<tr>') ;
                html_str = html_str.concat('<td>' + source + '</td>') ;
                html_str = html_str.concat('<td>') ;
                //fill table data with search results
                let searchPathNr = result_arr_test.length ;
                for (i_path = 0; i_path < searchPathNr; i_path++) {            
                    if (result_arr_test[i_path][0].instances[0].docId === source) {
                        html_str = html_str.concat('<p>') ;
                        let contextBefore = contextBefore(source, sourceFile_arr[index], result_arr_test[i_path]) ;
                        let contextAfter = contextAfter(source, sourceFile_arr[index], result_arr_test[i_path]) ;            
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
    })() ;    
} ;