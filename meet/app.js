Sentry.init({ dsn: 'https://f2dbcb74963c44b18f93c1a02f374191@o395868.ingest.sentry.io/5266513' });
let targetDate = "20200608";
const prospective_date = moment().add("days", 1);
const date_element = document.querySelector("#targetDate");
date_element.value = prospective_date.format("YYYY-MM-DD");
targetDate = prospective_date.format("YYYYMMDD")

function compose_timezone_url(targetDate) {
    return "https://www.timetemperature.com/time-tools/meeting-" + targetDate + "-us-california--us-texas-central--us-new+york--france--india--singapore-12.html";
}

function updateTargetDate(){
    targetDate = document.getElementById("targetDate").value.replace("-", "").replace("-", "");
    timeanddate_url = compose_timezone_url(targetDate);
    $.ajax(generateSettings()).done(handle_html_response);
}
let timeanddate_url = "https://www.timetemperature.com/time-tools/meeting-"+targetDate+"-us-california--us-texas-central--us-new+york--france--india--singapore-12.html";

function extract_text_from_child_a(htmlDocument,target_element_class_name_that_has_a_link) {
    let header_locations = htmlDocument.getElementsByClassName(target_element_class_name_that_has_a_link)
    Array.from(header_locations).forEach(function (x) {
        x.innerHTML = x.innerText //takes out the <a>
    })
}

//cleans up DOM and extracts the table
function extract_table(result) {
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(result, "text/html");
    htmlDocument.querySelector("#Banner > div > div.div_row > div:nth-child(4)").remove()
    extract_text_from_child_a(htmlDocument, "head");

    Array.from(htmlDocument.querySelectorAll("td:nth-child(1) > a")).map(function(x){
        let newX = htmlDocument.createElement("span")
        $(x).replaceWith(x.innerText)
    });

    return htmlDocument.querySelector("#Banner > div > div.div_row");
}

//puts it in UTC format like 20200609T030600Z
function moment_to_gcal_format(test1) {
    const cal_flattened = test1.format("YYYYMMDD_HHmmss");
    return cal_flattened.replace("_", "T") + "Z";
}

function date_parse_bcustom(utc_text) {
    const input_rawdate = utc_text.substr(utc_text.indexOf(" ") + 1) + " 0";
    return moment.utc(input_rawdate, "Do MMMM YYYY HH:mm:ss Z");
}

function add_to_calendar(timeStampMoment, meeting_length_min=50) {
    const startTime = moment_to_gcal_format(timeStampMoment);
    const title = "Meeting: ";
    timeStampMoment.add('minutes',meeting_length_min);
    const endTime = moment_to_gcal_format(timeStampMoment);
    const date_parameter = startTime + "/" + endTime;
    const gcal_link = "http://www.google.com/calendar/event?action=TEMPLATE&dates=" + date_parameter + "&text=" + title;
    location.replace(gcal_link)
}

function add_row_rollover(tableDom){
    const rows = tableDom.querySelectorAll("tr");
    rows.forEach(x => {
        const dateVal = x.querySelector("td:nth-child(1)");
        let date_text;
        if (dateVal == null) {
            return
        } else {
            date_text = dateVal.innerText
        }


            x.addEventListener('mousedown', e => {
                add_to_calendar(
                    date_parse_bcustom(date_text)
                )
            });
        });
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

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function handle_html_response(response) {
    let table_dom = document.getElementById("tableContainer")

    const table_exists = table_dom.children.length > 0;
    if (table_exists){
        removeAllChildNodes(table_dom)
    }
    var table_div = extract_table(response);
    add_row_rollover(
        table_dom.appendChild(
            table_div
        ));
    $(table_div).hide().fadeIn(1000);
}

$.ajax(generateSettings()).done(handle_html_response);

jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.location = $(this).data("href");
    });
});