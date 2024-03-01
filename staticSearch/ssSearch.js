//constants
const separator = '|' ;
const tokenOffset = 3 ;
const title_short = 'Bae_TB_8' ;

//var searchStr = 'die aus Gründen' ;
//var searchStr = 'WahlreformDie drei' ;
var searchTokens = [] ;
var tokens = [] ;
var json_in = {} ;
var jsonJs_in = {} ;
var hits = {} ;
var hits_start = {} ;
var hit_start_test = {} ;
var hits_end = {} ;
var hits_curr = {
    "token": "",
    "instances": []
} ;

function tokenize (input_search, searchTokens) {
    let searchStrLength = input_search.length ;    
    let tokens_N = searchStrLength - 2 ;    
    let tokens = [] ;
    for (i_char = 0; i_char < tokens_N; i_char++) {
        tokens = input_search.slice(i_char, tokenOffset + i_char) ;        
        searchTokens.push(tokens) ;                
    }
    return searchTokens ;
};

function getHits (hitFileName) {
    (async () => {
        //get         
        text_in = await fetchData(hitFileName) ;        
        searchFinishedHook(2);
    })() ;
} ;

function ssSearch(input_search, text_in) {    
    console.log('input_search =', input_search) ;
    //check input search string
    if (input_search.length < tokenOffset) {        
        alert('Suchbegriff zu kurz! Mindestens 3 Zeichen eingeben!') ;
        return ;        
    }    
    //tokenize search string
    searchTokens = [] ;
    searchTokens = tokenize(input_search, searchTokens) ;    
    console.log('searchTokens =', searchTokens) ;
    //find first token of search string in tokens string
    let searchToken = separator + searchTokens[0] + separator ;
    if (text_in.includes(searchToken)) {
        console.log('search token found') ;
        let searchStrLength = input_search.length ;    
        let tokens_N = searchStrLength - 2 ;        
        for (i_tok = 0; i_tok < tokens_N; i_tok++) {            
            //check if token is first token of tokens string
            if(i_tok === 0) {
                console.log('i_tok = ', i_tok) ;
                let searchTokenFilePath = './staticSearch/stems/' + searchTokens[0] + '.json' ;//staticSearch/stems                
                /*
                (async () => {                    
                    jsonJs_in = await fetchData(searchTokenFilePath) ;        
                    searchFinishedHook(2);                    
                })() ;
                */
                fetchData(searchTokenFilePath).then(jsonJs_in => {
                    hits_start = jsonJs_in ;
                    searchFinishedHook(2) ;
                    //console.log('fetch search token done') ;
                }) ;
                while (flag_search === false) {
                    console.log('fetch search token not ready') ;
                }
                flag_search = false ;
                hits_start = jsonJs_in ;
                console.log('fetch search token done') ;
            } else {
                //check if token is between first and last token of tokens string
                if(0 < i_tok && i_tok < tokens_N-1) {
                    console.log('i_tok = ', i_tok) ;
                } else {
                    //check if token is last token of tokens string
                    if(i_tok === tokens_N-1) {
                        console.log('i_tok = ', i_tok) ;
                    }
                }
            }            
        }
    } else {
        console.log('search token not found') ;
        return ;
    }
}
