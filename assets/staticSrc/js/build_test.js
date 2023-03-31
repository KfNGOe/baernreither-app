// Importing the jsdom module
const jsdom = require("jsdom") ;

// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body>
<h1 class="heading">
   GeeksforGeeks
</h1>
</body>
`);

// Importing the jquery and providing it
// with the window
const jquery = require("jquery")(dom.window);
// Appending a paragraph tag to the body

var xml = "<rss version='2.0'><channel><title>RSS Title</title></channel></rss>",
  xmlDoc = jquery.parseXML( xml ),
  $xml = jquery( xmlDoc ),
  $title = $xml.find( "title" );

  $title.text( "XML Title" );

  console.log($title.text());
/*
const jsonFile = require('../../data/json/map.json');

for (let item of jsonFile) {
    if (item.key == "Wien") {
        console.log(item.mappedTo.id);    
    }
    
}
*/

// now you can use jquery
//var xml = $.parseXML( "<xml><test>test</test></xml>" );
//console.log(xml);	// prints the xml object