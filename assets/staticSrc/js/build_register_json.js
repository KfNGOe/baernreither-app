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
    console.log('jsonJs_reg_files = ', jsonJs_reg_files) ;
    //get persons
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
    let jsonJs_in = jsonJs_reg_files['register_person_text'] ; //person.json
    let jsonJs_in_xlsx = jsonJs_reg_files['register_person_xlsx'] ; //person_xlsx.json
    
    //check if keys exists
    if (jsonJs_in.results.bindings.some(item => item.o_key_person)) {
        //group by key                
        groupedByKey = jsonJs_in.results.bindings.groupBy( item => {  //person_text.json
        return item.o_key_person.value ;
    }) ;
    } else {
        console.log('error: no keys person json') ;
    }
    //check if keys temp exists
    if (jsonJs_in_xlsx.Tabelle1.some(item => item.H)) {
        //group by key temp
        groupedByKey_xlsx = jsonJs_in_xlsx.Tabelle1.groupBy( item => {  //person_xlsx.json
        return item.J ;
        }) ;         
    } else {
        console.log('error: no keys in person xlsx') ;
    }                              
    //iterate over text file
    jsonJs_in.results.bindings.forEach((item) => { //person.json    
        //console.log('key = ', item.o_key_person.value) ;
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
                "desc": '',
                "pid": pid,
                "pos": pos
            } ;
        } else {
            let item1 = groupedByKey_xlsx[key][0] ;
            person = {
                "id": id,
                "key": key,
                "surname": item1.A,
                "forename": item1.C,
                "addName": item1.B,
                "birth": item1.D,
                "death": item1.E,
                "desc": item1.F,
                "pid": pid,
                "pos": pos
            } ;
        } ;
        //console.log('person = ', person) ;
        //add person to persons_json
        persons_json.results.bindings.push(person) ;                
    }) ;
} ; 

//read json register directory
let jsonFiles = fs.readdirSync('data/json/register/') ;
console.log('json files: ', jsonFiles) ;
//iterate over anno files
let jsonJs_reg_files = {} ;
jsonFiles.forEach((file) => {
   //read register *_text or *_xlsx file   
   if (file.includes('_text.json') || file.includes('_xlsx.json')) {
    let fileNamePath = 'data/json/register/' + file ;
    let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
    var jsonJs_in_reg = JSON.parse(json_in) ;
    jsonJs_reg_files[file.replace('.json', '')] = jsonJs_in_reg ;
    //console.log('jsonJs_reg_files = ', jsonJs_reg_files) ;       
   }
}) ;
buildReg(jsonJs_reg_files) ;

//console.log('persons_json = ', persons_json) ;

//write json file
let persons_str = JSON.stringify(persons_json);
fs.writeFileSync('data/json/register/register_person.json', persons_str ) ; //data/json/register/register_person.json
console.log('json data written: ', persons_str.length, ' bytes')