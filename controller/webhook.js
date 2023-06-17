const dao = require("../dao/webhook");
const axios = require("axios");
const convert = require('xml-js');

const saveWebhook = async (req) => {
      
    // if (req && req["body"] && req["body"]["url-stats"] && req["body"]["url-stats"]["link"] && req["body"]["url-stats"]["location"]) {

    let title = req["body"]["url-stats"]["link"]["title"];
    let split = title.split('|');
    let campaign_id = split[0];
    let mobile = split[1];
    let shorturl = req["body"]["url-stats"]["link"]["shorturl"];

    let condition = {shorturl,campaign_id,mobile}

        let reqBody = {
            // shorturl: req["body"]["url-stats"]["link"]["shorturl"],
            // url: req["body"]["url-stats"]["link"]["url"],
            // title: req["body"]["url-stats"]["link"]["title"],
            // timestamp: req["body"]["url-stats"]["link"]["timestamp"],
            ip: req["body"]["url-stats"]["link"]["ip"],
            clicks: req["body"]["url-stats"]["link"]["clicks"],
            country: req["body"]["url-stats"]["location"]["country"],
            regionName: req["body"]["url-stats"]["location"]["regionName"],
            city: req["body"]["url-stats"]["location"]["city"],
            district: req["body"]["url-stats"]["location"]["district"],
            zip: req["body"]["url-stats"]["location"]["zip"],
            lat: req["body"]["url-stats"]["location"]["lat"],
            lon: req["body"]["url-stats"]["location"]["lon"],
            currency: req["body"]["url-stats"]["location"]["currency"],
            timezone: req["body"]["url-stats"]["location"]["timezone"]
        }

        return await dao.saveWebhook(reqBody);
    

}

const saveTrackingWebhook = async (req)=>{
    let mobile = req["body"]["mobile"];
    let campaign = req["body"]["campaign"];
    let url = req["body"]["url"];
    let result = {};
    let requrl = `http://103.166.62.154/YOURLS/yourls-api.php?title=${campaign}|${mobile}&action=shorturl&username=username&password=password&url=${url}`;

    let response = await axios.get(requrl);

    if(response && response.data){
        result = convert.xml2js(response.data, {compact: true, spaces: 4});

        console.log(response);
        
        if(result && result["root"] && result["root"]["status"]["_text"] && result["root"]["statusCode"]["_text"] && result["root"]["statusCode"]["_text"]==200){
            let title = result["root"]["url"]["title"]["_text"];
            let split = title.split("|");
            let reqBody = {
                shorturl: result["root"]["shorturl"]["_text"],
                url: result["root"]["url"]["url"]["_text"],
                title: title,
                campaign_id:split[0],
                mobile : split[1],
                timestamp: result["root"]["url"]["date"]["_text"],
                ip: result["root"]["url"]["ip"]["_text"]
            }

            await dao.saveWebhook(reqBody);
            return {url:result["root"]["shorturl"]["_text"]};
        }
    }
    return result;
        
}

module.exports = { saveWebhook,saveTrackingWebhook };