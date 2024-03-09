const threeDots = '...' ;
var html_str = '' ;

window.contextBefore = function(source, sourceFile, result_path) {

}

window.contextAfter = function(source, sourceFile, result_path) {

}

window.markedHit = function(source, sourceFile, result_path) {
    //check if start pos is defined
    let flagStart = result_path[0].instances[0].pos !== undefined ? true : false ;
    let startNr = flagStart ? result_path[0].instances[0].pos : result_path[0].instances[0].pos_pr ;
    if (startNr === undefined) {
        console.log('error: pos and pos_pr undefined in first result token') ;         
    }
    //check if end pos is defined
    let flagEnd = result_path[result_path.length].instances[0].pos !== undefined ? true : false ;
    let endNr = flagEnd ? result_path[result_path.length - 1].instances[0].pos : result_path[result_path.length - 1].instances[0].pos_next ;
    if (endNr === undefined) {
        console.log('error: pos and pos_pr undefined in last result token') ;
    }    
    //find pos of hits in result_path
    let markedHit_arr = [] ; //array of strings to mark
    let markedHit =  {} ; //object of string to mark
    result_path.forEach(function(item,i_tok) {
        if (i_tok === 0) {
            markedHit.pos = flagStart ? item.instances[0].pos : item.instances[0].pos_pr ;
            markedHit.offset = flagStart ? item.instances[0].index : item.instances[0].index - 2 ;
            markedHit.chN = item.instances[0].chN ;
            markedHit_arr.push(markedHit) ;             
        }
        if (i_tok > 0 && i_tok < result_path.length - 1) {
            if (item.instances[0].index === 0 && item.instances[0].pos_pr === undefined && item.instances[0].pos_next === undefined) {
                markedHit.pos = item.instances[0].pos ;
                markedHit.offset = item.instances[0].index ;
                markedHit.chN = item.instances[0].chN ;
                markedHit_arr.push(markedHit) ;
            }
        }
        if (i_tok === result_path.length - 1) {
            markedHit.pos = flagEnd ? item.instances[0].pos : item.instances[0].pos_next ;
            markedHit.offset = flagEnd ? item.instances[0].index + tokenOffset : (-1) * (item.instances[0].index + 1) ;
            markedHit.chN = item.instances[0].chN ;
            markedHit_arr.push(markedHit) ;
        }
    } ) ;
    console.log('markedHit_arr: ', markedHit_arr) ;




    let index_hit = 0 ;
    let context_arr = [] ;    
    if (sourceFile !== undefined) {
        let item_hit = sourceFile.results.bindings.find((item, index, array) => {
           //find pos in sourceFile between start and end, return item
           //console.log('index = ', index) ;
           index_hit = index ; 
           return startNr === item.pos_txt_nr.value ;
        }) ;
        if (item_hit !== undefined) {
           context_arr[0] = contextBefore(index_hit,sourceFile) ;
           context_arr[1] = item_hit.o_txt.value;
           context_arr[2] = contextAfter(index_hit,sourceFile) ;         
           return context_arr ;
        } else {
           console.log('item of pos ' + pos + ' not found') ;
           context_arr[0] = '' ;
           context_arr[1] = '' ;
           context_arr[2] = '' ;         
        }      
     }
    
}

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
            let sourceFile_arr = [] ;            
            for (i_source = 0; i_source < source_arr.length; i_source++) {
                let source = source_arr[i_source] ;
                let fileNamePath = 'data/json/' + source + '_full.json' ;    //data/json/Bae_TB_8_full.json
                sourceFile_arr.push(await fetchData(fileNamePath)) ;                
            }            
            //fill table data with source data            
            source_arr.forEach(function(source,index) {                
                html_str = html_str.concat('<tr>') ;
                html_str = html_str.concat('<td>' + source + '</td>') ;
                html_str = html_str.concat('<td>') ;
                //fill table data with search results
                let searchPathNr = result_arr_test.length ;
                for (i_path = 0; i_path < searchPathNr; i_path++) {            
                    if (result_arr_test[i_path][0].instances[0].docId === source) {
                        html_str = html_str.concat('<p>') ;
                        //let contextBefore = contextBefore(source, sourceFile_arr[index], result_arr_test[i_path]) ;
                        let markedHit = markedHit(source, sourceFile_arr[index], result_arr_test[i_path]) ;
                        //let contextAfter = contextAfter(source, sourceFile_arr[index], result_arr_test[i_path]) ;            
                        //html_str = html_str.concat(threeDots + contextBefore + '<span class="search-highlight">' + '<a href="#">' + input_search + '</a>' + '</span>' + contextAfter + threeDots) ;
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