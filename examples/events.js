import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const now = new Date()
export {eventElements as default};

var myHeaders = new Headers();
    var events = [];
    var eventElements = [];

    myHeaders.append("Authorization", "Bearer fzymfdouxz86erzghmf1fmdxni");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://cors-anywhere.herokuapp.com/https://api.smartsheet.com/2.0/sheets/1382404431603588?Content-Type=application/json", requestOptions)
    .then(response => response.text())
    .then(result => {
      var jsonObject = JSON.parse(result);
      var cols =  jsonObject["columns"];
      var rows = jsonObject["rows"];
      var dict = {};

      var valid_cols = ["Session Title", "Modality / Content Type","Geo","Session Date","Duration (Mins)"];

      for (var j of cols) {
        for (var x of valid_cols) {
          if (j["title"] == x) {
            dict[j["id"]] = x;
          }
        }
      }

      for (var w of rows) {
        var cells = w["cells"];
        var new_event = {};
        for (var p of cells) {
          if (p["columnId"] in dict) {
            new_event[dict[p["columnId"]]] = p["value"];
          }
        }
        events.push(new_event);
      }
      var l = 0;

      for (var i of events) {
        eventElements.push({
          id: l,
          title: i["Session Title"],
          allDay: true,
          start: moment(i["Session Date"]).toDate(),
          end: moment(i["Session Date"]).add(parseInt(i["Duration (Mins)"]), 'm').toDate()
        });
        l++;
      }
    })
    .catch(error => console.log('error', error));
