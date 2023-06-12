const LF = "\n";
const navbar = 
'<div class="container" id="headnav">' + LF +
    '<div class="row">' + LF +
        '<div class="titelgrafik" style="align-items: baseline; display: flex; flex:0 0 auto; width: 50%;">' + LF +
            '<a href="https://oesterreichische-geschichte.at/" target="_blank" style="flex: 0 0 25%;display: flex; max-width: 50%!important; justify-content: center;">' + LF +
                '<img style=" max-width: 100% !important;max-height: 100% !important;margin: 0;" src="dist/assets/images/mockup/logo-kommission-neuere-geschichte-oesterreichs.svg" title="Kommission für neue Geschichte Österreichs" alt="Kommission für neue Geschichte Österreichs" />' + LF +
            '</a>' + LF +
            '<hr />' + LF +
            '<a href="./" style="flex: 0 0 50%;display: flex; justify-content: center;">' + LF +
                '<img style=" max-width: 100% !important;max-height: 100% !important;margin: 0;" src="dist/assets/images/mockup/schriftzug_de.png" title="Digitale Edition von Tagebüchern und Lebenserinnerungen Josef Maria Baernreithers" />' + LF +
            '</a>' + LF +
            '<hr />' + LF +
        '</div>' + LF +
        '<div class="col-lg-6 pr-0" id="titelmenu">' + LF +
            '<div class="col-lg-12 langmenu">' + LF +
                '<!-- <a class="active" href="#0" lang="de">DE</a> / <a href="#0" lang="en">EN</a> -->' + LF +
            '</div>' + LF +
            '<nav class="navbar navbar-expand-lg navbar-light bg-light static-top flex-column ml-5">' + LF +
                '<div class="container">' + LF +
                    '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">' + LF +
                        '<span class="navbar-toggler-icon"></span>' + LF +
                    '</button>' + LF +
                    '<div class="collapse navbar-collapse" id="navbarResponsive">' + LF +
                        '<ul class="navbar-nav">' + LF +                            
                            '<li class="nav-item">' + LF +
                                '<a class="nav-link" href="register.html">' + LF +
                                    '<span class="de">Register</span>' + LF +
                                    '<span class="en"></span>' + LF +
                                '</a>' + LF +
                            '</li>' + LF +
                        '</ul>' + LF +
                    '</div>' + LF +
                '</div>' + LF +
            '</nav>' + LF +            
        '</div>' + LF +
    '</div>' + LF +
'</div>' + LF ; 

module.exports = navbar ;