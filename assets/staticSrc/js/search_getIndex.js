//var result ;

window.fetchData = async function(filepath) {
    try {        
        const response = await fetch(filepath) ;
        if (filepath.includes('.json')) {            
            const json_in = await response.json();
            return json_in ;            
        } else {
            const text_in = await response.text();
            return text_in ;
        }        
    } catch (error) {        
        console.error('Error:', error);        
    }
}