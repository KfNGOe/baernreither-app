var html_str = '' ;

window.contextBefore = function(source, sourceFile, result_path) {
    //get start pos    
    let flagStart = result_path[0].instances[0].pos !== undefined ? true : false ;
    let startNr = flagStart ? result_path[0].instances[0].pos : result_path[0].instances[0].pos_pr ;
    if (startNr === undefined) {
        console.log('error: pos and pos_pr undefined in first result token') ;         
    }
    //find index of start pos in sourceFile
    let index_source = 0 ;
    let contextBefore = '' ;
    let context_arr = [] ;    
    context_arr[1] = ''; //placeholder for search string
    if (sourceFile !== undefined) {
        //find index of start pos in sourceFile
        let item_hit = sourceFile.results.bindings.find((item, index) => {           
           index_source = index ; 
           return startNr === item.pos_txt_nr.value ;
        }) ;
        if (item_hit !== undefined) {
            //get offset of start token 
            let offset = 0 ;
            let chN_pr = 0 ;
            if (flagStart && startNr !== undefined) {
                offset = result_path[0].instances[0].index ;
            } else {
                if (!flagStart && startNr !== undefined) {                
                    chN_pr = sourceFile.results.bindings[index_source].o_txt.value.length ;
                    offset = chN_pr + result_path[0].instances[0].index - 2 ;
                }        
            }
            //get context before start token        
            contextBefore =  sourceFile.results.bindings[index_source].o_txt.value.substring(0,offset) ;
            let countSpace = (contextBefore.match(/\s/g) || []).length ; //count spaces in contextBefore
            let item_before = {} ;
            let index_before = index_source - 1 ;
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
        } else {
            console.log('item of pos ' + pos + ' not found') ;
            contextBefore = '' ;
        }        
    } else {
        console.log('sourceFile undefined') ;
        contextBefore = '' ;
    }
    return contextBefore ;           
}

window.contextAfter = function(source, sourceFile, result_path) {
    //get end pos
    let flagEnd = result_path[result_path.length-1].instances[0].pos !== undefined ? true : false ;
    let endNr = flagEnd ? result_path[result_path.length - 1].instances[0].pos : result_path[result_path.length - 1].instances[0].pos_next ;
    if (endNr === undefined) {
        console.log('error: pos and pos_pr undefined in last result token') ;
    }
    //find index of end pos in sourceFile
    let index_source = 0 ;
    let contextAfter = '' ;
    let context_arr = [] ;
    context_arr[1] = ''; //placeholder for search string
    if (sourceFile !== undefined) {
        let source_indexMax = sourceFile.results.bindings.length - 1 ;
        //find index of end pos in sourceFile
        let item_hit = sourceFile.results.bindings.find((item, index) => {          
           index_source = index ; 
           return endNr === item.pos_txt_nr.value ;
        }) ;
        if (item_hit !== undefined) {   
            //get offset of end token
            let offset = 0 ; 
            let chN_nxt = sourceFile.results.bindings[index_source].o_txt.value.length ;
            if (flagEnd && endNr !== undefined) {
                offset = result_path[result_path.length-1].instances[0].index + tokenOffset ;
            } else {
                if (!flagStart && startNr !== undefined) {                                    
                    offset = result_path[result_path.length-1].instances[0].index + 1 ;
                }        
            }
            //get context after end token
            contextAfter =  sourceFile.results.bindings[index_source].o_txt.value.substring(offset,chN_nxt) ; 
            let countSpace = (contextAfter.match(/\s/g) || []).length ; //count spaces in contextBefore
            let item_after = {} ;
            let index_after = index_source + 1 ;
            let contextAfter_arr = [] ;
            while (countSpace < spaceMax && index_after <= source_indexMax) {
                item_after = sourceFile.results.bindings[index_after] ;
                contextAfter =  contextAfter + item_after.o_txt.value ;
                countSpace = (contextAfter.match(/\s/g) || []).length ;
                index_after++ ;                                
             }
             if (countSpace > spaceMax) {      
                contextAfter_arr = contextAfter.split(" ") ;
                contextAfter_arr = contextAfter_arr.slice(0, spaceMax + 1) ;
                contextAfter = contextAfter_arr.join(" ") ;      
             }
             return contextAfter ;        
        } else {
            console.log('item of pos ' + pos + ' not found') ;            
            contextAfter = '' ;
         }              
     } else {
        console.log('sourceFile undefined') ;
        contextAfter = '' ;
     }

}

window.markedHit = function(source, sourceFile, result_path) {
    let markedTokens_arr = [] ;
    let markedToken = {
        source: '',
        pos: '',
        offset: 0,
        chN: 0,
        txt: ''
    } ;
    //get start pos    
    let flagStart = result_path[0].instances[0].pos !== undefined ? true : false ;
    let startNr = flagStart ? result_path[0].instances[0].pos : result_path[0].instances[0].pos_pr ;
    if (startNr === undefined) {
        console.log('error: pos and pos_pr undefined in first result token') ;         
    }
    //get end pos
    let flagEnd = result_path[result_path.length-1].instances[0].pos !== undefined ? true : false ;
    let endNr = flagEnd ? result_path[result_path.length - 1].instances[0].pos : result_path[result_path.length - 1].instances[0].pos_next ;
    if (endNr === undefined) {
        console.log('error: pos and pos_pr undefined in last result token') ;
    }
    if (startNr === endNr) {
        //start and end pos are the same
        if (result_path[0].instances[0].index === result_path[result_path.length-1].instances[0].index) {
            //start and end index are the same
            markedToken.source = source ;
            markedToken.pos = startNr ;
            markedToken.offset = result_path[0].instances[0].index ;
            markedToken.chN = result_path[0].instances[0].chN ;
            markedToken.txt = result_path[0].token ;
            markedTokens_arr.push(markedToken) ;
        } else {
            //start and end index are different
            markedToken.source = source ;
            markedToken.pos = startNr ;
            markedToken.offset = result_path[0].instances[0].index ;
            markedToken.chN = result_path[0].instances[0].chN ;
            markedToken.txt = input_search ;
            markedTokens_arr.push(markedToken) ;
        }                
    } else {
        //start and end pos are different
        let searchToken = '' ;        
        //get source index of start pos        
        let ind_source_start = 0 ;        
        if (sourceFile !== undefined) {
            //find index of start pos in sourceFile
            let item_hit = sourceFile.results.bindings.find((item, index) => {           
                ind_source_start = index ; 
                return startNr === item.pos_txt_nr.value ;
            }) ;
            if (item_hit !== undefined) {
                //get offset of start token 
                let offset_start = 0 ;
                let chN_start = 0 ;
                if (flagStart && startNr !== undefined) {
                    offset_start = result_path[0].instances[0].index ;
                } else {
                    if (!flagStart && startNr !== undefined) {                
                        chN_start = sourceFile.results.bindings[ind_source_start].o_txt.value.length ;
                        offset_start = chN_start + result_path[0].instances[0].index - 2 ;
                    }        
                }                                         
            } else {
                console.log('item of pos ' + pos + ' not found') ;
                searchToken = '' ;
            }
        }        
        //get source index of end pos
        let ind_source_end = 0 ;
        if (sourceFile !== undefined) {
            //find index of end pos in sourceFile
            let item_hit = sourceFile.results.bindings.find((item, index) => {           
                ind_source_end = index ; 
                return endNr === item.pos_txt_nr.value ;
            }) ;
            if (item_hit !== undefined) {
                //get offset of end token
                let offset_end = 0 ;
                let chN_end = sourceFile.results.bindings[ind_source_end].o_txt.value.length ;
                if (flagEnd && endNr !== undefined) {
                    offset_end = result_path[result_path.length-1].instances[0].index + tokenOffset ;
                } else {
                    if (!flagStart && startNr !== undefined) {                                    
                        offset_end = result_path[result_path.length-1].instances[0].index + 1 ;
                    }        
                }                                         
            } else {
                console.log('item of pos ' + pos + ' not found') ;
                searchToken = '' ;
            }
        }
        //fill markedTokens_arr
        //start token        
        markedToken.pos = startNr ;
        markedToken.offset = offset_start ;
        markedToken.chN = chN_start ;
        markedToken.txt = sourceFile.results.bindings[ind_source_start].o_txt.value.substring(markedToken.offset,markedToken.chN) ;
        markedTokens_arr.push(markedToken) ;
        //tokens between start and end
        let index_source = ind_source_start++ ;
        while (index_source < ind_source_end) {
            markedToken.pos = sourceFile.results.bindings[index_source].pos_txt_nr.value ;
            markedToken.offset = 0 ;
            markedToken.chN = sourceFile.results.bindings[index_source].o_txt.value.length ;
            markedToken.txt = sourceFile.results.bindings[index_source] ;
            markedTokens_arr.push(markedToken) ;            
            index_source++ ;
        }
        //end token
        markedToken.pos = endNr ;
        markedToken.offset = offset_end ;
        markedToken.chN = chN_end ;
        markedToken.txt = sourceFile.results.bindings[ind_source_end].o_txt.value.substring(0,markedToken.offset) ;
        markedTokens_arr.push(markedToken) ;
    }
}

window.showResults = function (source, sourceFile, result_path) {
    (async () => {
        console.log('showResults') ;
        console.log('results: ', result_arr) ;
        if (Array.isArray(result_arr) && result_arr.length) {
            let source_arr = [] ;            
            //get path length
            let searchPathNr = result_arr.length ;
            for (i_path = 0; i_path < searchPathNr; i_path++) {            
                source_arr[i_path] = result_arr[i_path][0].instances[0].docId ; 
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
            //console.log('sourceFile_arr: ', sourceFile_arr) ;            
            //fill table data with source data            
            source_arr.forEach(function(source,index) {                
                html_str = html_str.concat('<tr>') ;
                html_str = html_str.concat('<td>' + source + '</td>') ;
                html_str = html_str.concat('<td>') ;
                //fill table data with search results
                let searchPathNr = result_arr.length ;
                for (i_path = 0; i_path < searchPathNr; i_path++) {            
                    if (result_arr[i_path][0].instances[0].docId === source) {
                        html_str = html_str.concat('<p>') ;
                        let contextBefore_str = contextBefore(source, sourceFile_arr[index], result_arr[i_path]) ; ;
                        //let markedHit = markedHit(source, sourceFile_arr[index], result_arr[i_path]) ;
                        let hit = '<span class="search-highlight">' + '<a href="#">' + input_search + '</a>' + '</span>'
                        let contextAfter_str = contextAfter(source, sourceFile_arr[index], result_arr[i_path]) ;
                        html_str = html_str.concat(threeDots + contextBefore_str + hit + contextAfter_str + threeDots) ;
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

//window.markedHit = function(source, sourceFile_arr[index], result_arr[i_path]) {} 
   
    /**
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
 */ 