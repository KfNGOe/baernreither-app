// Importing the jsdom module
const jsdom = require("jsdom") ;
const fs = require('fs') ;
const { groupBy } = require('core-js/actual/array/group-by') ;
const { exit } = require("process") ;

var convert = require('xml-js') ;

// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body></body>
`);

// Importing the jquery and providing it
// with the window
const jquery = require("jquery")(dom.window);

var persons_json = {
    "head": {
        "vars": [
            "key", 
            "surname", 
            "forename",
            "addName",
            "birth",
            "death",
            "desc",
            "pid",
            "pos"
        ]
    },    
    "results": {
        "bindings": []
    }
} ;

function buildRegPerson(obj, obj1) {               
    //check if keys exists
    if (jsonJs_in.results.bindings.some(item => item.o_key_person)) {
        //group by key                
        groupedByMain = jsonJs_in.results.bindings.groupBy( item => {  //person.json
        return item.o_key_person.value ;
    }) ;
    } else {
        console.log('error: no keys person json') ;
    }
    //check if keys temp exists
    if (jsonJs_in_xlsx.Tabelle1.some(item => item.H)) {
        //group by key temp
        groupedByMain_tmp = jsonJs_in_xlsx.Tabelle1.groupBy( item => {  //person_xlsx.json
        return item.H ;
        }) ;         
    } else {
        console.log('error: no keys in person xlsx') ;
    }                              
    //iterate over obj
    obj.results.bindings.forEach((item) => { //person.json    
        //console.log('key = ', item.o_key_person.value) ;
        let person = {} ;        
        let key = item.o_key_person.value ;
        let pid = '' ;
        let pos = item.o_pos_person.value ;
        //check if pid exists
        if (!item.o_pid_person) {
            console.log('warning: no pid '+ key + ' in person.json') ;
            pid = '' ;
        } else {
            pid = item.o_pid_person.value ;
        }
        //check if key in xlsx exists
        if (!groupedByMain_tmp[key]) { //person_xlsx.json
            console.log('warning: no key ' + key + ' in person_xlsx.json') ;
            person = {
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
            let item1 = groupedByMain_tmp[key][0] ;
            person = {
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

//read person json file
let json_in = fs.readFileSync('./data/json/person.json', 'utf8'); //./data/json/person.json
console.log('json data read: ', json_in.length, ' bytes') ;

//convert json to js object
var jsonJs_in = JSON.parse(json_in) ;

//read person xlsx json file
json_in = fs.readFileSync('./data/json_xlsx/person_xlsx.json', 'utf8'); //./data/json_xlsx/person_xlsx.json
console.log('json data read: ', json_in.length, ' bytes') ;

//convert json to js object
var jsonJs_in_xlsx = JSON.parse(json_in) ;

buildRegPerson(jsonJs_in, jsonJs_in_xlsx) ;

//console.log('persons_json = ', persons_json) ;

//write json file
let persons_str = JSON.stringify(persons_json);
fs.writeFileSync('data/json/register/register_person.json', persons_str ) ; //data/json/register/register_person.json
console.log('json data written: ', persons_str.length, ' bytes')