const LF = "\n";
const head = "<head>" + LF +
'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' + LF +
'<meta http-equiv="X-UA-Compatible" content="IE=edge" />' + LF +
'<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />' + LF +
'<meta name="mobile-web-app-capable" content="yes" />' + LF +
'<meta name="apple-mobile-web-app-capable" content="yes" />' + LF +
'<meta name="apple-mobile-web-app-title" content="{$html_title}" />' + LF +

"<!-- Bootstrap core CSS --> " + LF +
'<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />' + LF +
'<!-- custom CSS -->' + LF +
'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" referrerpolicy="no-referrer" /> <!--load all styles --> ' + LF +
'<link rel="profile" href="http://gmpg.org/xfn/11"></link> ' + LF +
'<link href="css/mockup/style.css" rel="stylesheet"/> ' + LF +
'<!-- js --> ' + LF +
'<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script> ' + LF +
'<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script> ' + LF +
'<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script> ' + LF +
'<script src="https://cdnjs.cloudflare.com/ajax/libs/openseadragon/2.4.2/openseadragon.min.js"></script> ' + LF +
'<title><xsl:value-of select="$html_title"/></title> ' + LF +
'</head> ' ; 

module.exports = head ;