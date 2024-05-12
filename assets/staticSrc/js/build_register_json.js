// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
const { exit } = require("process") ;
const ShortUniqueId = require('short-unique-id');

// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body></body>
`);

// Importing the jquery and providing it
// with the window
const jquery = require("jquery")(dom.window);
//Instantiate ShortUniqueId
const uid = new ShortUniqueId({ length: 10 });

var convert = require('xml-js') ;

function generateId() {
    //random number + pos   
    return uid.rnd() ;
    //return item.pos.value ;
 }

function buildReg(jsonJs_reg_files) { 
    //console.log('jsonJs_reg_files = ', jsonJs_reg_files) ;
    //build register templates
    //persons
    let persons_json = {
        "head": {
            "vars": [            
                "key", 
                "surname", 
                "forename",
                "addName",
                "birth",
                "death",
                "birthPlace",
                "deathPlace",
                "desc",
                "pid",
                "pos"
            ]
        },    
        "results": {
            "bindings": []
        }
    } ;
    let places_json = {
        "head": {
            "vars": [
                "key",
                "name", 
                "name_today",
                 "lat",
                "long",
                "pid",
                "pos"
            ]
        } ,
        "results": {
            "bindings": []
        }        
    } ;
    let orgs_json = {
        "head": {
            "vars": [            
                "key", 
                "name",                                
                "pid",
                "pos"
            ]
        },    
        "results": {
            "bindings": []
        }
    } ;
    let indexes_json = {
        "head": {
            "vars": [            
                "main",
                "sub",                
                "pos"
            ]
        },    
        "results": {
            "bindings": []
        }
    } ;

    //read person json files
    let jsonJs_in = jsonJs_reg_files['register_person_text'] ; //person.json
    let jsonJs_in_xlsx = jsonJs_reg_files['register_person_xlsx'] ; //person_xlsx.json    
    
    //group by key                
    groupedByKey = jsonJs_in.results.bindings.groupBy( item => {  //person_text.json
    return item.o_key_person.value ;    
    }) ;        
    groupedByKey_xlsx = jsonJs_in_xlsx.Tabelle1.groupBy( item => {  //person_xlsx.json
        return item.J ;
    }) ;         
                                  
    //iterate over text file
    jsonJs_in.results.bindings.forEach((item) => { //person.json    
        console.log('key = ', item.o_key_person.value) ;
        if (item.o_key_person) {
            let person = {} ;
            //let id = generateId() ;        
            let key = item.o_key_person.value ;
            let pid = '' ;
            let pos = item.o_pos_person.value ;
            //check if pid exists
            if (!item.o_pid_person) {
                console.log('warning: no pid '+ key + ' in person_text.json') ;
                pid = '' ;
            } else {
                pid = item.o_pid_person.value ;
            }
            //check if key in xlsx exists
            if (!groupedByKey_xlsx[key]) { //person_xlsx.json
                console.log('warning: no key ' + key + ' in person_xlsx.json') ;
                person = {
                    //"id": id,
                    "key": key,
                    "surname": '',
                    "forename": '',
                    "addName": '',
                    "birth": '',
                    "death": '',
                    "birthPlace": '',
                    "deathPlace": '',
                    "desc": '',
                    "pid": pid,
                    "pos": pos
                } ;
            } else {
                let item1 = groupedByKey_xlsx[key][0] ;
                person = {
                   //"id": id,
                    "key": key,
                    "surname": item1.A,
                    "forename": item1.C,
                    "addName": item1.B,
                    "birth": item1.D,
                    "death": item1.E,
                    "birthPlace": item1.F,
                    "deathPlace": item1.G,
                    "desc": item1.H,
                    "pid": pid,
                    "pos": pos
                } ;
            } ;
            //console.log('person = ', person) ;
            persons_json.results.bindings.push(person) ;                
        } else {
            console.log('warning: no key in person_text.json') ;
        }        
    }) ;

    //read place json files
    jsonJs_in = jsonJs_reg_files['register_place_text'] ; //place.json
    jsonJs_in_xlsx = jsonJs_reg_files['register_place_xlsx'] ; //place_xlsx.json
    jsonJs_in_temp = jsonJs_reg_files['register_place_temp'] ; //place_temp.json

    //group by key                
    groupedByKey = jsonJs_in.results.bindings.groupBy( item => {  //place_text.json
        return item.o_key_place.value ;    
    }) ;        
    groupedByKey_xlsx = jsonJs_in_xlsx.Tabelle1.groupBy( item => {  //place_xlsx.json
        return item.D ;
    }) ;
    //group by key temp
    groupedByKey_temp = jsonJs_in_temp.results.groupBy( item => {  //place_temp.json
        return item.B ;
    }) ;

    //iterate over text file
    jsonJs_in.results.bindings.forEach((item) => { //place.json 
        console.log('key = ', item.o_key_place.value) ;
        if (item.o_key_place) {
            let place = {} ;
            //let id = generateId() ;        
            let key = item.o_key_place.value ;
            let pid = '' ;
            let pos = item.o_pos_place.value ;
            //check if pid exists
            if (!item.o_pid_place) {
                console.log('warning: no pid '+ key + ' in place_text.json') ;
                pid = '' ;
            } else {
                pid = item.o_pid_place.value ;
            }
            //check if key in xlsx exists
            if (!groupedByKey_xlsx[key]) { //place_xlsx.json
                console.log('warning: no key ' + key + ' in place_xlsx.json') ;
                place = {
                    //"id": id,
                    "key": key,
                    "name": '', 
                    "name_today": '',
                    "lat": '',
                    "long": '',
                    "pid": pid,
                    "pos": pos
                } ;
            } else {
                let item1 = groupedByKey_xlsx[key][0] ;
                place = {
                    "key": key,
                    "name": item1.A, 
                    "name_today": item1.B,
                    "lat": '',
                    "long": '',
                    "pid": pid,
                    "pos": pos
                } ;
            } ;
            //check if key in temp exists
            if (!groupedByKey_temp[key]) { //place_temp.json
                console.log('warning: no key ' + key + ' in place_temp.json') ;
            } else {
                let item1 = groupedByKey_temp[key][0] ;
                place.lat = item1.Lat ;
                place.long = item1.Long ;
            }        
            //console.log('place = ', place) ;
            places_json.results.bindings.push(place) ;                
        } else {
            console.log('warning: no key in place_text.json') ;
        }  
    }) ;
    
    //read org json files
    jsonJs_in = jsonJs_reg_files['register_org_text'] ; //org.json
    jsonJs_in_xlsx = jsonJs_reg_files['register_org_xlsx'] ; //org_xlsx.json

    //group by key
    groupedByKey = jsonJs_in.results.bindings.groupBy( item => {  //org_text.json
        return item.o_key_org.value ;
    }) ;
    groupedByKey_xlsx = jsonJs_in_xlsx.Tabelle1.groupBy( item => {  //org_xlsx.json
        return item.C ;
    }) ;

    //iterate over text file
    jsonJs_in.results.bindings.forEach((item) => { //org.json 
        console.log('key = ', item.o_key_org.value) ;
        if (item.o_key_org) {
            let org = {} ;
            //let id = generateId() ;        
            let key = item.o_key_org.value ;
            let pid = '' ;
            let pos = item.o_pos_org.value ;
            //check if pid exists
            if (!item.o_pid_org) {
                console.log('warning: no pid '+ key + ' in org_text.json') ;
                pid = '' ;
            } else {
                pid = item.o_pid_org.value ;
            }
            //check if key in xlsx exists
            if (!groupedByKey_xlsx[key]) { //org_xlsx.json
                console.log('warning: no key ' + key + ' in org_xlsx.json') ;
                org = {
                    //"id": id,
                    "key": key,
                    "name": '',                    
                    "pid": pid,
                    "pos": pos
                } ;
            } else {
                let item1 = groupedByKey_xlsx[key][0] ;
                org = {
                    "key": key,
                    "name": item1.A,                    
                    "pid": pid,
                    "pos": pos
                } ;
            } ;
            //console.log('org = ', org) ;
            orgs_json.results.bindings.push(org) ;                
        } else {
            console.log('warning: no key in org_text.json') ;
        } 
    }) ;

    //read index json files
    jsonJs_in = jsonJs_reg_files['register_index_text'] ; //index.json
    jsonJs_in_xlsx = jsonJs_reg_files['register_index_xlsx'] ; //index_xlsx.json

    //group by key                
    groupedByKey = jsonJs_in.results.bindings.groupBy( item => {  //index_text.json
        return item.o_main_index.value ;    
    }) ;        
    groupedByKey_xlsx = jsonJs_in_xlsx.Tabelle1.groupBy( item => {  //index_xlsx.json
        return item.A ;
    }) ;

    //iterate over text file
    jsonJs_in.results.bindings.forEach((item) => { //index.json 
        console.log('key = ', item.o_main_index.value) ;
        if (item.o_main_index) {
            let index = {} ;
            //let id = generateId() ;        
            let main = item.o_main_index.value ;
            let sub = '' ;
            let pos = item.o_pos_index.value ;
            //check if sub exists
            if (item.o_sub_index) {            
                sub = item.o_sub_index.value ;
            }
            //build index object
            index = {
                //"id": id,
                "main": main,
                "sub": sub,                
                "pos": pos
            } ;                    
            indexes_json.results.bindings.push(index) ;                
        } else {
            console.log('warning: no main term in index_text.json') ;
        }
    }) ;

    //return json register files
    let json_reg_files = {} ;
    json_reg_files['register_person'] = persons_json ;
    json_reg_files['register_place'] = places_json ;
    json_reg_files['register_org'] = orgs_json ;
    json_reg_files['register_index'] = indexes_json ;
    return json_reg_files ;     
} ;

//read json register directory
let jsonFiles = fs.readdirSync('data/json/register/') ;
console.log('json files: ', jsonFiles) ;
//iterate over register files
let jsonJs_reg_files = {} ;
jsonFiles.forEach((file) => {
   //read register *_text or *_xlsx file   
   if (file.includes('_text.json') || file.includes('_xlsx.json') || file.includes('_temp.json')) {
    let fileNamePath = 'data/json/register/' + file ;
    let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
    var jsonJs_in_reg = JSON.parse(json_in) ;
    jsonJs_reg_files[file.replace('.json', '')] = jsonJs_in_reg ;    
   }
}) ;
console.log('jsonJs_reg_files = ', jsonJs_reg_files) ;       
//build register json files
let json_reg_files = buildReg(jsonJs_reg_files) ;
//iterate over register json tmp files
for (let key in json_reg_files) {
    let jsonStr = JSON.stringify(json_reg_files[key]) ;
    //write json file
    fs.writeFileSync('data/json/register/' + key + '_tmp.json', jsonStr) ;
    console.log('json file written: ', key + '.json') ;
}