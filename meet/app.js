Sentry.init({ dsn: 'https://f2dbcb74963c44b18f93c1a02f374191@o395868.ingest.sentry.io/5266513' });
var targetDate = "20200608"
var prospective_date = moment().add("days",1)
targetDate = prospective_date.format("YYYYMMDD")
function updateTargetDate(){
    console.log("chg");

    var inputval = document.getElementById("targetDate").value.replace("-","").replace("-","");
    targetDate = inputval;
    timeanddate_url = "https://www.timetemperature.com/time-tools/meeting-"+targetDate+"-us-california--us-texas-central--us-new+york--france--india--singapore-12.html";
    $.ajax(generateSettings()).done(handle_html_response);
}
var timeanddate_url = "https://www.timetemperature.com/time-tools/meeting-"+targetDate+"-us-california--us-texas-central--us-new+york--france--india--singapore-12.html";
function extract_table(result) {
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(result, "text/html");
    htmlDocument.querySelector("#Banner > div > div.div_row > div:nth-child(4)").remove()
    const container = htmlDocument.querySelector("#Banner > div > div.div_row");
    return container;
}

//puts it in UTC format like 20200609T030600Z
function moment_to_gcal_format(test1) {
    var cal_flattened = test1.format("YYYYMMDD_HHmmss");
    var gcal = cal_flattened.replace("_", "T") + "Z";
    return gcal;
}

function date_parse_bcustom(utc_text) {
    var input_rawdate = utc_text.substr(utc_text.indexOf(" ") + 1) + " 0";
    var timeStampMoment = moment.utc(input_rawdate, "Do MMMM YYYY HH:mm:ss Z");
    return timeStampMoment;
}

function add_to_calendar(timeStampMoment, meeting_length_min=50) {
    var startTime = moment_to_gcal_format(timeStampMoment);
    var title = "Meeting: ";
    timeStampMoment.add('minutes',meeting_length_min);
    var endTime = moment_to_gcal_format(timeStampMoment);
    var date_parameter = startTime + "/" + endTime;
    var gcal_link = "http://www.google.com/calendar/event?action=TEMPLATE&dates="+date_parameter+"&text="+title;
    location.replace(gcal_link)
}

function add_row_rollover(tableDom){
    var rows = tableDom.querySelectorAll("tr")

    rows.forEach(x => {
        var a_element = x.querySelector("a");
        if(a_element!=null){

            var date_text = a_element.innerText;
            x.addEventListener('mousedown', e => {
                add_to_calendar(
                    date_parse_bcustom(date_text)
                );
            });
            x.querySelector("a").removeAttribute("href")
        }
    })
    return "len was " + rows.length.toString();
}


function generateSettings()
{
    return {
        "url": "https://cors-anywhere.herokuapp.com/" + timeanddate_url,
        "method": "GET",
        "timeout": 0,
    }
}
;
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function handle_html_response(response) {
    table_dom = document.getElementById("tableContainer")
    var table_exists = table_dom.children.length>0;
    if (table_exists){
        removeAllChildNodes(table_dom)
        console.log('rm old table');
    }
    console.log(add_row_rollover(
        table_dom.appendChild(
            extract_table(response)
        )
        )
    );
}

$.ajax(generateSettings()).done(handle_html_response);

jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.location = $(this).data("href");
    });
});