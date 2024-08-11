// Importing the jsdom module
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;


function buildId(jsonJs_reg_files) { 
    console.log('jsonJs_reg_files = ', jsonJs_reg_files) ;
    
    //read id json file
    let jsonJs_in_id = jsonJs_reg_files['register_id'] ; //id.json
    //group by key
    let groupedByKey = jsonJs_in_id.results.bindings.groupBy( item => {  //id.json
        return item.key.value ;
    }) ;
    let json_reg_files = {} ;
    //iterate over register tmp files
    for (let key in jsonJs_reg_files) {
        //exclude id file
        if (key !== 'register_id') {
            let jsonJs_in = jsonJs_reg_files[key] ;
            //push id in header
            jsonJs_in.head.vars.push('id') ;            
            //iterate over register tmp files
            jsonJs_in.results.bindings.forEach((item) => {
                //get id from id file
                //check if register index
                if (key.includes('index')) {
                    let id =  groupedByKey[item.main][0].id.value ;
                    item.id = id ;                    
                } else {                    
                    let id =  groupedByKey[item.key][0].id.value ;
                    item.id = id ;                    
                }                
            }) ;
            //write json file
            json_reg_files[key.replace('_tmp', '')] = jsonJs_in ;            
        }        
    }
    return json_reg_files ;    
}

//read json register directory
let jsonFiles = fs.readdirSync('data/json/register/') ;
console.log('json files: ', jsonFiles) ;
//iterate over register files
let jsonJs_reg_files = {} ;
jsonFiles.forEach((file) => {
   //read register *_tmp.json files   
   if (file.includes('_tmp.json') || file.includes('_id.json')) {
    let fileNamePath = 'data/json/register/' + file ;
    let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
    var jsonJs_in_reg = JSON.parse(json_in) ;
    jsonJs_reg_files[file.replace('.json', '')] = jsonJs_in_reg ;
    //console.log('jsonJs_reg_files = ', jsonJs_reg_files) ;       
   }
}) ;
//build register json files
let json_reg_files = buildId(jsonJs_reg_files) ;
//iterate over register json tmp files
for (let key in json_reg_files) {
    let jsonStr = JSON.stringify(json_reg_files[key]) ;
    //write json file
    fs.writeFileSync('data/json/register/' + key + '.json', jsonStr) ;
    console.log('json file ' + key + ' written: ', jsonStr.length + ' bytes') ;
}