// Importing the jsdom module
const fs = require('fs');
const { groupBy } = require('core-js/actual/array/group-by');

function pos2xmlId(pos, groupedAll_files) {
    let xmlId = '' ;
    Object.keys(groupedAll_files).forEach((key) => {
        if (groupedAll_files[key][pos]) {
            let pos_array = groupedAll_files[key][pos] ;
            //group by xmlId
            let groupedByXmlId = pos_array.groupBy(item => {
                return item.attr.value;
            });
            xmlId = groupedByXmlId['xml:id'][0].val.value ;
            console.log('xmlId = ', xmlId) ;            
        }
    });
    return xmlId ;
} ;

function buildReg(jsonJs_reg_files, groupedAll_files) {    
    //build register templates
    //persons
    let persons_json = {
        "head": {
            "vars": [
                "surname",
                "addName",
                "forename",
                "birth",
                "death",
                "birthPlace",
                "deathPlace",
                "desc",
                "pid",
                "key",
                "pos"
            ]
        },
        "results": {
            "bindings": []
        }
    };
    let places_json = {
        "head": {
            "vars": [
                "name",
                "name_today",
                "pid",
                "key",
                "lat",
                "long",
                "pos"
            ]
        },
        "results": {
            "bindings": []
        }
    };
    let orgs_json = {
        "head": {
            "vars": [
                "name",
                "pid",
                "key",
                "pos"
            ]
        },
        "results": {
            "bindings": []
        }
    };
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
    };

    //* person *//
    //read person json files
    let jsonJs_in = jsonJs_reg_files['register_person_text']; //person.json
    let jsonJs_in_xlsx = jsonJs_reg_files['register_person_xlsx']; //person_xlsx.json    

    //group by key                
    groupedByKey = jsonJs_in.results.bindings.groupBy(item => {  //person_text.json
        return item.o_key_person.value;
    });
    groupedByKey_xlsx = jsonJs_in_xlsx.Tabelle1.groupBy(item => {  //person_xlsx.json
        return item.J;
    });

    //create log data
    let logData_person = '';

    //iterate over text file
    jsonJs_in.results.bindings.forEach((item) => { //person.json    
        console.log('key = ', item.o_key_person.value);
        //check if key exists in person_text.json
        if (item.o_key_person) {
            let person = {};
            //let id = generateId() ;        
            let key = item.o_key_person.value;
            let pid = '';
            let pos = item.o_pos_person.value;            
            //check if pid exists
            if (!item.o_pid_person) {
                console.log('warning: no pid ' + key + ' in person_text.json');
                logData_person = logData_person + 'warning: key ' + key + ' with no pid at xmlId ' + pos2xmlId(pos, groupedAll_files) + ' in teixml file' + '\n';
                pid = '';
            } else {
                pid = item.o_pid_person.value;
            }
            //check if key in xlsx exists
            if (!groupedByKey_xlsx[key]) { //person_xlsx.json
                console.log('error: no key ' + key + ' in person_xlsx.json');
                logData_person = logData_person + 'error: no key ' + key + ' at xmlId ' + pos2xmlId(pos, groupedAll_files) + ' in xlsx file' + '\n';
                //loop over persons_json array
                for (let i = 0; i < persons_json.head.vars.length; i++) {
                    switch (persons_json.head.vars[i]) {
                        case 'key':
                            person[persons_json.head.vars[i]] = key;
                            break;
                        case 'pid':
                            person[persons_json.head.vars[i]] = pid;
                            break;
                        default:
                            person[persons_json.head.vars[i]] = '';
                            break;
                    };
                };
            } else {
                let item_xlsx = groupedByKey_xlsx[key][0];
                //surname
                item_xlsx.A = item_xlsx.A === undefined ? '' : item_xlsx.A;
                person.surname = item_xlsx.A;
                //addName
                item_xlsx.B = item_xlsx.B === undefined ? '' : item_xlsx.B;
                person.addName = item_xlsx.B;
                //forename
                item_xlsx.C = item_xlsx.C === undefined ? '' : item_xlsx.C;
                person.forename = item_xlsx.C;
                //birth
                item_xlsx.D = item_xlsx.D === undefined ? '' : item_xlsx.D;
                person.birth = item_xlsx.D;
                //death
                item_xlsx.E = item_xlsx.E === undefined ? '' : item_xlsx.E;
                person.death = item_xlsx.E;
                //birthPlace
                item_xlsx.F = item_xlsx.F === undefined ? '' : item_xlsx.F;
                person.birthPlace = item_xlsx.F;
                //deathPlace
                item_xlsx.G = item_xlsx.G === undefined ? '' : item_xlsx.G;
                person.deathPlace = item_xlsx.G;
                //desc
                item_xlsx.H = item_xlsx.H === undefined ? '' : item_xlsx.H;
                person.desc = item_xlsx.H;
                //pid
                person.pid = pid;
                //key
                person.key = key;
            };
            //pos
            person.pos = pos;
            //console.log('person = ', person) ;
            persons_json.results.bindings.push(person);
        } else {
            console.log('error: no key in person_text.json');
            logData_person = logData_person + 'error: no key at xmlId ' + pos2xmlId(pos, groupedAll_files) + ' in teixml file' + '\n';
        }
    });

    //* place *//
    //read place json files
    jsonJs_in = jsonJs_reg_files['register_place_text']; //place.json
    jsonJs_in_xlsx = jsonJs_reg_files['register_place_xlsx']; //place_xlsx.json
    jsonJs_in_geo = jsonJs_reg_files['register_place_geo']; //place_geo.json

    //group by key                
    groupedByKey = jsonJs_in.results.bindings.groupBy(item => {  //place_text.json
        return item.o_key_place.value;
    });
    groupedByKey_xlsx = jsonJs_in_xlsx.Tabelle1.groupBy(item => {  //place_xlsx.json
        return item.D;
    });
    //group by key geo
    groupedByKey_geo = jsonJs_in_geo.results.bindings.groupBy(item => {  //place_geo.json
        return item.B;
    });
    //create log data
    let logData_place = '';

    //iterate over text file
    jsonJs_in.results.bindings.forEach((item) => { //place.json 
        console.log('key = ', item.o_key_place.value);
        //check if key exists in place_text.json
        if (item.o_key_place) {
            let place = {};
            //let id = generateId() ;        
            let key = item.o_key_place.value;
            let pid = '';
            let pos = item.o_pos_place.value;
            //check if pid exists
            if (!item.o_pid_place) {
                console.log('warning: no pid ' + key + ' in place_text.json');
                logData_place = logData_place + 'warning: key ' + key + ' with no pid at xmlId ' + pos2xmlId(pos, groupedAll_files) + ' in teixml file' + '\n';
                pid = '';
            } else {
                pid = item.o_pid_place.value;
            }
            //check if key in xlsx exists
            if (!groupedByKey_xlsx[key]) { //place_xlsx.json
                console.log('error: no key ' + key + ' in place_xlsx.json');
                logData_place = logData_place + 'error: no key ' + key + ' at xmlId ' + pos2xmlId(pos, groupedAll_files) + ' in xlsx file' + '\n';
                //loop over persons_json array
                for (let i = 0; i < places_json.head.vars.length; i++) {
                    switch (places_json.head.vars[i]) {
                        case 'key':
                            place[places_json.head.vars[i]] = key;
                            break;
                        case 'pid':
                            place[places_json.head.vars[i]] = pid;
                            break;
                        default:
                            place[places_json.head.vars[i]] = '';
                            break;
                    };
                };
            } else {
                let item_xlsx = groupedByKey_xlsx[key][0];
                //name
                item_xlsx.A = item_xlsx.A === undefined ? '' : item_xlsx.A;
                place.name = item_xlsx.A;
                //name_today
                item_xlsx.B = item_xlsx.B === undefined ? '' : item_xlsx.B;
                place.name_today = item_xlsx.B;
                //pid
                place.pid = pid;
                //key
                place.key = key;
            };
            //check if key in geo file exists
            if (!groupedByKey_geo[key]) { //place_geo.json
                console.log('error: no key ' + key + ' in place_geo.json');
                logData_place = logData_place + 'error: no key ' + key + ' at xmlId ' + pos2xmlId(pos, groupedAll_files) + ' in place_geo.json file' + '\n';
                place.lat = '';
                place.long = '';
            } else {
                let item_geo = groupedByKey_geo[key][0];
                item_geo.Lat = item_geo.Lat === undefined ? '' : item_geo.Lat;
                place.lat = item_geo.Lat;
                item_geo.Long = item_geo.Long === undefined ? '' : item_geo.Long;
                place.long = item_geo.Long;
            }
            place.pos = pos;
            //console.log('place = ', place) ;
            places_json.results.bindings.push(place);
        } else {
            console.log('error: no key in place_text.json');
            logData_place = logData_place + 'error: no key at xmlId ' + pos2xmlId(pos, groupedAll_files) + ' in teixml file' + '\n';
        }
    });
    
    //* org *//
    //read org json files
    jsonJs_in = jsonJs_reg_files['register_org_text']; //org.json
    jsonJs_in_xlsx = jsonJs_reg_files['register_org_xlsx']; //org_xlsx.json

    //group by key
    groupedByKey = jsonJs_in.results.bindings.groupBy(item => {  //org_text.json
        return item.o_key_org.value;
    });
    groupedByKey_xlsx = jsonJs_in_xlsx.Tabelle1.groupBy(item => {  //org_xlsx.json
        return item.C;
    });
    //create log data
    let logData_org = '';

    //iterate over text file
    jsonJs_in.results.bindings.forEach((item) => { //org.json 
        console.log('key = ', item.o_key_org.value);
        if (item.o_key_org) {
            let org = {};
            //let id = generateId() ;        
            let key = item.o_key_org.value;
            let pid = '';
            let pos = item.o_pos_org.value;
            //check if pid exists
            if (!item.o_pid_org) {
                console.log('warning: no pid ' + key + ' in org_text.json');
                logData_org = logData_org + 'warning: key ' + key + ' with no pid at xmlId ' + pos2xmlId(pos, groupedAll_files) + ' in teixml file' + '\n';
                pid = '';
            } else {
                pid = item.o_pid_org.value;
            }
            //check if key in xlsx exists
            if (!groupedByKey_xlsx[key]) { //org_xlsx.json
                console.log('error: no key ' + key + ' in org_xlsx.json');
                logData_org = logData_org + 'error: no key ' + key + ' at xmlId ' + pos2xmlId(pos, groupedAll_files) + ' in xlsx file' + '\n';
                //loop over orgs_json array
                for (let i = 0; i < orgs_json.head.vars.length; i++) {
                    switch (orgs_json.head.vars[i]) {
                        case 'key':
                            org[orgs_json.head.vars[i]] = key;
                            break;
                        case 'pid':
                            org[orgs_json.head.vars[i]] = pid;
                            break;
                        default:
                            org[orgs_json.head.vars[i]] = '';
                            break;
                    };
                };
            } else {
                let item_xlsx = groupedByKey_xlsx[key][0];
                //name
                item_xlsx.A = item_xlsx.A === undefined ? '' : item_xlsx.A;
                org.name = item_xlsx.A;
                //pid
                item_xlsx.B = item_xlsx.B === undefined ? '' : item_xlsx.B;
                if (pid === item_xlsx.B) {
                    org.pid = pid;
                } else {
                    console.log('warning: pid mismatch in org_xlsx.json');
                    logData_org = logData_org + 'warning: pid mismatch at xmlId ' + pos2xmlId(pos, groupedAll_files) + ' in xlsx file' + '\n';
                }
                //key                
                org.key = key;
                
            } ;
            //pos
            org.pos = pos;
            //console.log('org = ', org) ;
            orgs_json.results.bindings.push(org);
        } else {
            console.log('error: no key in org_text.json');
            logData_org = logData_org + 'error: no key at xmlId ' + pos2xmlId(pos, groupedAll_files) + ' in teixml file' + '\n';
        }
    });

    //* index *//
    //read index json files
    jsonJs_in = jsonJs_reg_files['register_index_text']; //index.json
    jsonJs_in_xlsx = jsonJs_reg_files['register_index_xlsx']; //index_xlsx.json

    //group by key                
    groupedByKey = jsonJs_in.results.bindings.groupBy(item => {  //index_text.json
        return item.o_main_index.value;
    });
    groupedByKey_xlsx = jsonJs_in_xlsx.Tabelle1.groupBy(item => {  //index_xlsx.json
        return item.A;
    });
    //create log data
    let logData_index = '';

    //iterate over text file
    jsonJs_in.results.bindings.forEach((item) => { //index.json 
        console.log('key = ', item.o_main_index.value);
        //check if main exists in index_text.json
        if (item.o_main_index) {
            let index = {};
            let main = item.o_main_index.value;
            let sub = '';
            let pos = item.o_pos_index.value;
            //check if sub exists
            if (item.o_sub_index) {
                sub = item.o_sub_index.value;
            }
            //check if main in xlsx exists
            if (!groupedByKey_xlsx[main]) { //index_xlsx.json   
                console.log('error: no main term ' + main + ' in index_xlsx.json');
                logData_index = logData_index + 'error: no main term ' + main + ' at xmlId ' + pos2xmlId(pos, groupedAll_files) + ' in xlsx file' + '\n';
            } else {
                //main
                let items_xlsx = groupedByKey_xlsx[main];
                let item_xlsx = items_xlsx[0];
                item_xlsx.A = item_xlsx.A === undefined ? '' : item_xlsx.A;
                if (main === item_xlsx.A) {
                    index.main = main;
                } else {
                    console.log('error: main term ' + main + ' not in index_xlsx.json');
                    logData_index = logData_index + 'error: main term ' + main + ' at xmlId ' + pos2xmlId(pos, groupedAll_files) + ' not in xlsx file' + '\n';
                }
                //sub                
                //find item_xlsx.B in items_xlsx                
                item_xlsx = items_xlsx.find(item => {
                    item.B = item.B === undefined ? '' : item.B;
                    return item.B === sub ;
                });
                if (!item_xlsx) {
                    let item_xlsx = items_xlsx[0];
                    item_xlsx.B = '' ;                    
                    console.log('error: sub term ' + sub + ' not in index_xlsx.json');
                    logData_index = logData_index + 'error: sub term ' + sub + ' at xmlId ' + pos2xmlId(pos, groupedAll_files) + ' not in xlsx file' + '\n';
                }
                index.sub = sub;                
            } ;            
            //pos
            index.pos = pos;
            indexes_json.results.bindings.push(index);
        } else {
            console.log('error: no main term in index_text.json');
            logData_index = logData_index + 'error: no main term at xmlId ' + pos2xmlId(pos, groupedAll_files) + ' in teixml file' + '\n';
        }
    });

    //write log files    
    fs.writeFileSync('data/txt/register/log/log_person.txt', logData_person);
    fs.writeFileSync('data/txt/register/log/log_place.txt', logData_place);
    fs.writeFileSync('data/txt/register/log/log_org.txt', logData_org);
    fs.writeFileSync('data/txt/register/log/log_index.txt', logData_index);

    //return json register files
    let json_reg_files = {};
    json_reg_files['register_person'] = persons_json;
    json_reg_files['register_place'] = places_json;
    json_reg_files['register_org'] = orgs_json;
    json_reg_files['register_index'] = indexes_json;
    return json_reg_files;
};

//get texts all
//read json all directory
let jsonFiles = fs.readdirSync('data/json/all/') ;
console.log('json files: ', jsonFiles) ;
let groupedAll_files = {} ;
//iterate over dipl files
jsonFiles.forEach((file) => {   
   //read text all json files   
    let fileNamePath = 'data/json/all/' + file ;   
    let json_in = fs.readFileSync(fileNamePath, 'utf8') ;
    console.log('json data read: ', json_in.length, ' bytes') ;
    let jsonJs_in_all = JSON.parse(json_in) ;
    //group by pos
    let groupedByPos = jsonJs_in_all.results.bindings.groupBy(item => {
        return item.pos.value ;
    }) ;
    //read full text to files
    let fileName = file.replace('.json','') ;
    groupedAll_files[fileName] = groupedByPos ;      
}) ;

//read json register directory
jsonFiles = fs.readdirSync('data/json/register/');
console.log('json files: ', jsonFiles);
//iterate over register files
let jsonJs_reg_files = {};
jsonFiles.forEach((file) => {
    //read register *_text or *_xlsx file   
    if (file.includes('_text.json') || file.includes('_xlsx.json') || file.includes('_geo.json')) {
        let fileNamePath = 'data/json/register/' + file;
        let json_in = fs.readFileSync(fileNamePath, 'utf8');
        var jsonJs_in_reg = JSON.parse(json_in);
        jsonJs_reg_files[file.replace('.json', '')] = jsonJs_in_reg;
    }
});
console.log('jsonJs_reg_files = ', jsonJs_reg_files);
//build register json files
let json_reg_files = buildReg(jsonJs_reg_files, groupedAll_files);
//iterate over register json tmp files
for (let key in json_reg_files) {
    let jsonStr = JSON.stringify(json_reg_files[key]);
    //write json file
    fs.writeFileSync('data/json/register/' + key + '_tmp.json', jsonStr);
    console.log('json data write: ', jsonStr.length, ' bytes');
}