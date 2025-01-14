//check if xmlId exists or xmlId is empty or xmlId is not unique 
function checkXmlId(xmlId, xmlIdList) {
    if (xmlId == "") {
        return "XmlId is empty";
    } else if (xmlIdList.includes(xmlId)) {
        return "XmlId is not unique";
    } else {
        return "";
    }
}
