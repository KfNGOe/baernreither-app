var html_str = '' ;

window.short2DispTitle = function(short) {
	let title = textData_in.results.bindings.find((item, index) => {
		return item.title.short === short ;
	}).title.display ;
	title = title === undefined ? '' : title ;	
	return title ;
}

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
           return startNr === item.pos.value ;
        }) ;
        if (item_hit !== undefined) {
            //get offset of start token 
            let offset = 0 ;
            let chN_pr = 0 ;
            if (flagStart && startNr !== undefined) {
                offset = result_path[0].instances[0].index ;
            } else {
                if (!flagStart && startNr !== undefined) {                
                    //check if token has a '&quot;'
                    if (item_hit.cont.value.includes('&quot;')) {
                        item_hit.cont.value = item_hit.cont.value.replaceAll('&quot;','"') ; //utf8 code for "
                    }
                    chN_pr = item_hit.cont.value.length ;
                    offset = chN_pr + result_path[0].instances[0].index - 2 ;
                }        
            }
            //get context before start token        
            contextBefore =  item_hit.cont.value.substring(0,offset) ;
            let countSpace = (contextBefore.match(/\s/g) || []).length ; //count spaces in contextBefore
            let item_before = {} ;
            let index_before = index_source - 1 ;
            let contextBefore_arr = [] ;           
            while (countSpace < spaceMax && index_before >= 0) {
            item_before = sourceFile.results.bindings[index_before] ;
            contextBefore = item_before.cont.value + contextBefore ;
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
            console.log('start nr ' + startNr + ' not found') ;
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
           return endNr === item.pos.value ;
        }) ;
        if (item_hit !== undefined) {   
            //get offset of end token
            let offset = 0 ; 
            //let chN_nxt = sourceFile.results.bindings[index_source].cont.value.length ;
            let chN_nxt = result_path[result_path.length-1].instances[0].chN ;
            if (flagEnd && endNr !== undefined) {
                offset = result_path[result_path.length-1].instances[0].index + tokenOffset ;
            } else {
                if (!flagStart && startNr !== undefined) {                                    
                    offset = result_path[result_path.length-1].instances[0].index + 1 ;
                }        
            }
            //get context after end token
            //check if token has a '&quot;'
            if (item_hit.cont.value.includes('&quot;')) {
                item_hit.cont.value = item_hit.cont.value.replaceAll('&quot;','"') ; //utf8 code for "
            }
            contextAfter =  item_hit.cont.value.substring(offset,chN_nxt) ; 
            //contextAfter =  sourceFile.results.bindings[index_source].cont.value.substring(offset,chN_nxt) ; 
            let countSpace = (contextAfter.match(/\s/g) || []).length ; //count spaces in contextBefore
            let item_after = {} ;
            let index_after = index_source + 1 ;
            let contextAfter_arr = [] ;
            while (countSpace < spaceMax && index_after <= source_indexMax) {
                item_after = sourceFile.results.bindings[index_after] ;
                contextAfter =  contextAfter + item_after.cont.value ;
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
            console.log('end nr ' + endNr + ' not found') ;            
            contextAfter = '' ;
         }              
     } else {
        console.log('sourceFile undefined') ;
        contextAfter = '' ;
     }

}

window.markedHit = function(source, sourceFile, result_path) {
    let markedTokens_arr = [] ;
    let markedToken = {} ;
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
        let offset_start = 0 ;
        let chN_start = 0 ;
        let offset_end = 0 ;
        let chN_end = 0 ;
        //get source index of start pos        
        let ind_source_start = 0 ;        
        if (sourceFile !== undefined) {
            //find index of start pos in sourceFile
            let item_hit = sourceFile.results.bindings.find((item, index) => {           
                ind_source_start = index ; 
                return startNr === item.pos.value ;
            }) ;
            if (item_hit !== undefined) {
                //get offset of start token
                chN_start = sourceFile.results.bindings[ind_source_start].cont.value.length ;
                if (flagStart && startNr !== undefined) {
                    offset_start = result_path[0].instances[0].index ;
                } else {
                    if (!flagStart && startNr !== undefined) {
                        offset_start = chN_start + result_path[0].instances[0].index - 2 ;
                    }        
                }                                         
            } else {
                console.log('start nr ' + startNr + ' not found') ;
                searchToken = '' ;
            }
        }        
        //get source index of end pos
        let ind_source_end = 0 ;
        if (sourceFile !== undefined) {
            //find index of end pos in sourceFile
            let item_hit = sourceFile.results.bindings.find((item, index) => {           
                ind_source_end = index ; 
                return endNr === item.pos.value ;
            }) ;
            if (item_hit !== undefined) {
                //get offset of end token                
                chN_end = sourceFile.results.bindings[ind_source_end].cont.value.length ;
                if (flagEnd && endNr !== undefined) {
                    offset_end = result_path[result_path.length-1].instances[0].index + tokenOffset ;
                } else {
                    if (!flagStart && startNr !== undefined) {                                    
                        offset_end = result_path[result_path.length-1].instances[0].index + 1 ;
                    }        
                }                                         
            } else {
                console.log('end nr ' + endNr + ' not found') ;
                searchToken = '' ;
            }
        }
        //fill markedTokens_arr
        //start token
        markedToken.source = source ;        
        markedToken.pos = startNr ;
        markedToken.offset = offset_start ;
        markedToken.chN = chN_start ;
        markedToken.txt = sourceFile.results.bindings[ind_source_start].cont.value.substring(markedToken.offset,markedToken.chN) ;
        markedTokens_arr.push(markedToken) ;
        //tokens between start and end
        let index_source = ind_source_start + 1 ;
        while (index_source < ind_source_end) {
            markedToken = {} ;
            markedToken.source = source ;
            markedToken.pos = sourceFile.results.bindings[index_source].pos.value ;
            markedToken.offset = 0 ;
            markedToken.chN = sourceFile.results.bindings[index_source].cont.value.length ;
            markedToken.txt = sourceFile.results.bindings[index_source].cont.value ;
            markedTokens_arr.push(markedToken) ;            
            index_source++ ;
        }
        //end token
        markedToken = {} ;
        markedToken.source = source ;
        markedToken.pos = endNr ;
        markedToken.offset = offset_end ;
        markedToken.chN = chN_end ;
        markedToken.txt = sourceFile.results.bindings[ind_source_end].cont.value.substring(0,markedToken.offset) ;
        markedTokens_arr.push(markedToken) ;
    }
    return markedTokens_arr ;
}
//show search results after search
window.showResults = function () {
    (async () => {
        console.log('showResults') ;
        console.log('results: ', result_arr) ;
        console.log('marked Hits ', markedHits_arr) ;
        if (Array.isArray(result_arr) && result_arr.length) {
            let source_arr = [] ;
            let textData_arr = textData_in.results.bindings ;            
            //get path length
            let searchPathNr = result_arr.length ;
            for (i_path = 0; i_path < searchPathNr; i_path++) {
                //check source of result path
                textData_arr.forEach(function(textData, index) {
                    //check which source contains the title
                    result_arr[i_path][0].instances[0].pos.includes(textData.title.short) ? source_arr.push(textData.title.short) : '' ;
                }) ;
                //source_arr[i_path] = result_arr[i_path][0].instances[0].docId ; 
                console.log('source_arr: ', source_arr) ;
            }
            //remove duplicates
            source_arr = Array.from(new Set(source_arr)) ;
            console.log('source_arr: ', source_arr) ;             
            //fetch source Files
            let sourceFile_arr = [] ;            
            let dispSource = '' ;
            for (let i_source = 0; i_source < source_arr.length; i_source++) {
                let source = source_arr[i_source] ;                
                sourceFile_arr.push(fullTexts[source + '_full.json']) ;    
                //let fileNamePath = 'data/json/' + source + '_full.json' ;    //data/json/Bae_TB_8_full.json
                //sourceFile_arr.push(await fetchData(fileNamePath)) ;                
            }
            //console.log('sourceFile_arr: ', sourceFile_arr) ;            
            //fill table data with source data            
            source_arr.forEach(function(source,index) {
                dispSource = short2DispTitle(source) ;                
                html_str = html_str.concat('<tr>') ;
                html_str = html_str.concat('<td>' + dispSource + '</td>') ;
                html_str = html_str.concat('<td>') ;
                //fill table data with search results
                let searchPathNr = result_arr.length ;
                for (i_path = 0; i_path < searchPathNr; i_path++) {            
                    //check if the source of the pos is the same as the source of the title
                    let pos_tmp = result_arr[i_path][0].instances[0].pos ;
                    if (pos_tmp.substring(0, pos_tmp.lastIndexOf('_')) === source) {
                        html_str = html_str.concat('<p>') ;
                        let contextBefore_str = contextBefore(source, sourceFile_arr[index], result_arr[i_path]) ;
                        let markedTokens_arr = markedHit(source, sourceFile_arr[index], result_arr[i_path]) ;
                        markedHits_arr[i_path] = markedTokens_arr ;
                        //href="synoptik.html#search_Bae_MF_6-1_144
                        let hit = '<span class="search-highlight">' + '<a href="synoptik.html#text_' + markedHits_arr[i_path][0].pos + '" id="search_' + i_path + '">' + input_search + '</a>' + '</span>'
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
    })() ;    
} ;