//var result ;

async function fetchData() {
    try {
        const response = await fetch('./staticSearch/ssTokenString.txt') ; //staticSearch/ssTokenString.txt
        let text_in = await response.text();
        //console.log('jsonJS: ', JSON.stringify(jsonJS) ) ;
        return text_in ;
    } catch (error) {
        console.error('Error:', error);
    }
}

//window.github_api = async function( marker_editor_base64 ) {} ;
/*
getSearchIndex = async function() {
    await fetchData().then(value => {
        result = value ;
        console.log("json =", json) ;
        return json ;
      } ) ;

    return result ;
    //console.log('fetchData done') ;
    //return json ;
}


await git_pull_sha().then(value => {
    const latestCommitSHA = value ;
    console.log("Latest commit =", latestCommitSHA) ;    
  }) ;
*/

