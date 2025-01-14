//graphdb server client
const {GraphDBServerClient, ServerClientConfig, AppSettings} = require('graphdb').server ;

//config
const serverConfig = new ServerClientConfig('http://localhost:7200') ;
    
//client
const serverClient = new GraphDBServerClient(serverConfig) ;

const settings = new AppSettings()
    .setDefaultSameas(false) //sameas
;

serverClient.updateUserData('admin', '', settings) ;
