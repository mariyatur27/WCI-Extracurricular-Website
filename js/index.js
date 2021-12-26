async function searchMainPage(value) {
    if (!dataFetched) {
        await fetchData();
    }
    clearList();

    // Checking if there's any input inside the search bar
    var smLinks = document.getElementsByClassName("main_sm_links");
    if (value && value.trim().length > 0){
        for (const link of smLinks ) {link.style.display = "none";};
        value = value.trim().toLowerCase();

        // Only returning those results of the showResults that match the user input in the search bar     
        showResults(value, topResults(value));
    } else {
        for (const link of smLinks ) {link.style.display = "inline";};
        hideResults();
    }
}

function generateMatchScore(value, name, originalName) {
    // generate a score based on how good the match is
    // 1. search value matches the beginning of the string
    // 2. search value matches a substring beginning with an uppercase 
    var score = -1;
    var start, end;
    for (var idx = 0; idx < name.length - value.length + 1; idx++) {
        var tmpScore = 0;
        var nameSubstring = name.substring(idx, idx + value.length).toLowerCase();
        if (nameSubstring == value) {
            if (idx == 0) tmpScore++;
            if (originalName[idx] == originalName[idx].toUpperCase()) tmpScore++;
            if (tmpScore > score) {
                score = tmpScore;
                start = idx;
                end = idx + value.length;
            }
        }
    }
    return {score, start, end};
}

function filterResults(value, activities, redirectPage, urlParamName) {
    // filters results that contain the search value
    // information is attached to each activity
    var resultsList = [];
    for (var activity of activities) {
        var name = activity.name.toLowerCase()
        if (name.includes(value)) {
            var {score, start, end} = generateMatchScore(value, name, activity.name);
            activity.score = score;
            activity.start = start;
            activity.end = end;

            activity.redirectPage = redirectPage;
            activity.urlParamName = urlParamName;
            
            resultsList.push(activity);
        }
    }
    return resultsList;
}

function topResults(value) {
    // sorts results based on scores
    // shows a maximum of 6 results
    var filteredResults = filterResults(value, clubs, "clubs.html", "box");
    filteredResults = filteredResults.concat(filterResults(value, athletics, "sport_info.html", "sport"));
    filteredResults = filteredResults.concat(filterResults(value, music));
    filteredResults.sort(function(a, b) {
        return - (a.score - b.score);
    });
    
    if (filteredResults.length > 6) {
        filteredResults = filteredResults.slice(0, 6);
    }
    return filteredResults;
}

function createSearchResult(value, resultItem) {
    // substring that matches the search value is bolded
    value = value.toLowerCase();
    var name = resultItem.name;

    var resultName = document.createElement('div');

    var resultPrefix = document.createElement('span');
    resultPrefix.innerText = name.substring(0, resultItem.start);

    var resultSuffix = document.createElement('span');
    resultSuffix.innerText = name.substring(resultItem.end, name.length);
    
    var matchingText = document.createElement('b');
    matchingText.innerText = name.substring(resultItem.start, resultItem.end);
    
    resultName.appendChild(resultPrefix);
    resultName.appendChild(matchingText);
    resultName.appendChild(resultSuffix);
    return resultName;
} 

// Showing results from the search
function showResults(value, resultsList) {
    var results = document.getElementById("list");
    results.style.opacity = "1";

    for (const result of resultsList) {
        const resultItem = document.createElement('a');
        var resultName = createSearchResult(value, result);
        
        resultItem.appendChild(resultName)
        
        resultItem.classList.add('result-item');
        if (result.redirectPage && result.urlParamName) {
            resultItem.href = result.redirectPage + "?" + result.urlParamName + "=" + result.id;
        }
        var results = document.getElementById("list");
        results.appendChild(resultItem);
    }

    if (resultsList.length == 0) {
        hideResults();
    }
}

// Showing no results
function hideResults() {
    var results = document.getElementById("list");
    results.style.opacity = "0";
}

// Clearing results from the page 
function clearList(){
    list.innerHTML = "";
}

// Code for the quiz
document.one.onclick = function() {
    window.question1 = document.one.op1.value;
}

document.two.onclick = function() {
    window.question2 = document.two.op2.value;
}

document.three.onclick = function() {
    window.question3 = document.three.op3.value;
}

document.four.onclick = function() {
    window.question4 = document.four.op4.value;
}

document.five.onclick = function() {
    window.question5 = document.five.op5.value;
}

function results() {
    var user_answers = [window.question1, window.question2, window.question3, window.question4, window.question5];
    var stem_answers = ["math", "science", "reading", "coding", "hard-working", "no", "yes"];
    var academics_answers = ["math", "science", "business", "english", "reading", "hard-working", "passionate" ,"yes", "yes"];
    var recreational_answers = ["art", "gym", "friends", "be on my phone", "artistic", "thoughtful", "no", "no"];
    var business_answers = [];
    var social_justice_answers = [];
    var leadership_answers = [];

    var stem_l_2 = [];
    var academics_l_2 = [];
    var recreational_l_2 = [];
    var business_l_2 = [];
    var social_l_2 = [];
    var leadership_l_2 = [];
    var final_list = [];
    let empty_dictionary = [];

    for (let i = 0; i < user_answers.length; i++) {
        if (stem_answers.includes(user_answers[i])) {
            stem_l_2.push(1);
        };
        if (academics_answers.includes(user_answers[i])) {
            academics_l_2.push(1);
        };
        if (recreational_answers.includes(user_answers[i])) {
            recreational_l_2.push(1);
        };
    };
    let all_lists = [stem_l_2, academics_l_2, recreational_l_2]
    for (let i = 0; i < all_lists.length; i++){
        if (all_lists[i].length != 0) {
            var sum = parseInt(all_lists[i].reduce((partial_sum, a) => partial_sum + a));
        } else {
            var sum = 0;
        }
        empty_dictionary.push({ key: all_lists[i], value: sum });
        final_list.push(sum);
    }

    let max_value = Math.max(... final_list);
    console.log(max_value);
    console.log(empty_dictionary);
    console.log(empty_dictionary[1, 1, 1, 1, 1]);


    // if (empty_dictionary[stem_l_2] = max_value) {
    //     console.log("STEM");
    //     document.getElementById('output').innerHTML = "You should join STEM category clubs";
    // }else if (empty_dictionary[academics_l_2] = max_value) {
    //     console.log("ACADEMICS");
    //     document.getElementById('output').innerHTML = "You should join Academic category clubs";
    // }else if (empty_dictionary[recreational_l_2] = max_value) {
    //     console.log("RECREATIONAL");
    //     document.getElementById('output').innerHTML = "You should join Recreational category clubs";
    // }

}

async function createCalendar(daysAhead) {
    if (!dataFetched) {
        await fetchData();
    }
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    let maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + daysAhead);

    let eventDates = {};

    for (const event of events) {
        let eventdate = new Date(event.start_time*1000);
        if (eventdate <= maxDate && eventdate >= today) {
            let distance = eventdate.getDate()-today.getDate();
            if (distance in eventDates) {
                eventDates[distance].push(event);
            } else {
                eventDates[distance] = [event];
            }
        }
    }

    let table = document.getElementById("calendar");
    table.innerHTML = "";
    let date = new Date();
    let maxHeight = 0;
    let overrides = {0: "Today", 1: "Tomorrow"};
    let row = document.createElement("tr");
    for (let i = 0; i<daysAhead; i++) {
        let col = document.createElement("td");
        col.classList.add("calendar_col", "calendar_header");
        if (i in overrides) {
            col.innerText = overrides[i];
        } else {
            col.innerText = date.toLocaleDateString("en-CA", {weekday: 'long'});
        }
        row.appendChild(col);
        date.setDate(date.getDate() + 1);
    }
    table.appendChild(row);
    row = document.createElement("tr");
    for (let c = 0; c<daysAhead; c++){
        let col = document.createElement("td");
        col.classList.add("calendar_col");
        row.appendChild(col);
    };
    for (const date in eventDates) {
        eventDates[date].sort((a, b) => a.start_time - b.start_time);
        let col = row.getElementsByTagName("td")[date];
        for (const event of eventDates[date]) {
            let start_date = new Date(events[0].start_time*1000);
            let start_date_string = start_date.toISOString().replaceAll(/[-:]/g, "").split(".")[0] + "Z";
            let end_date = new Date(events[0].end_time*1000);
            let end_date_string = end_date.toISOString().replaceAll(/[-:]/g, "").split(".")[0] + "Z";
            let google_calendar_href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${event.title}&dates=${start_date_string}/${end_date_string}&details=${event.description}`;
            let ics_file_href = `data/events/${event.id}.ics`
            let main_div = document.createElement("div"); main_div.classList.add("calendar_event")
                let expand_link = document.createElement("button");
                    expand_link.classList.add("calendar_expand_button");
                    expand_link.addEventListener("click", () => {hidden_div.classList.toggle("expanded"); return false;});
                    let time_p = document.createElement("p");
                        time_p.classList.add("calendar_time");
                        time_p.innerText = start_date.toLocaleTimeString("en-CA", {timeStyle: "short"}).replaceAll(".", "") + " - " + end_date.toLocaleTimeString("en-CA", {timeStyle: "short"}).replaceAll(".", "");
                    expand_link.appendChild(time_p);
                    let title_p = document.createElement("p");
                        title_p.classList.add("calendar_time");
                        title_p.innerText = event.title;
                    expand_link.appendChild(title_p);
                main_div.appendChild(expand_link);
                let hidden_div = document.createElement("div");
                    hidden_div.classList.add("calendar_event_expand");
                    hidden_div.innerText = event.description;
                    hidden_div.appendChild(document.createElement("br"));
                    let add_to_calendar_link = document.createElement("a");
                        add_to_calendar_link.target = "_blank";
                        add_to_calendar_link.href = google_calendar_href;
                        let add_to_calendar_icon = document.createElement("img");
                            add_to_calendar_icon.classList.add("icons");
                            add_to_calendar_icon.src = "assets/icons/google_calendar.png";
                            add_to_calendar_icon.title = "Add to Google Calendar";
                            add_to_calendar_icon.alt = "Add to Google Calendar";
                        add_to_calendar_link.appendChild(add_to_calendar_icon);
                    hidden_div.appendChild(add_to_calendar_link);
                    let download_ics_link = document.createElement("a");
                    download_ics_link.href = ics_file_href;
                        let download_ics_icon = document.createElement("img");
                            download_ics_icon.classList.add("icons");
                            download_ics_icon.src = "assets/icons/download.png";
                            download_ics_icon.title = "Download ICS file";
                            download_ics_icon.alt = "Download ICS file";
                        download_ics_link.appendChild(download_ics_icon);
                    hidden_div.appendChild(download_ics_link);
                main_div.appendChild(hidden_div);
            col.appendChild(main_div);
        }
        table.appendChild(row);
    }
}
createCalendar(Math.floor(window.innerWidth/290));
window.onresize = () => {createCalendar(Math.floor(window.innerWidth/290))}

async function createPopup() {
    if (!dataFetched) {
        await fetchData();
    }
    let event = events[0];
    var div = document.getElementById("event-popup");
	var txt = document.getElementById("event-popup-text");
	var icon = document.getElementById("event-popup-icon");
	div.style.display = "flex";
	txt.innerHTML = event.title;
	div.style.backgroundColor = "#00F";
	icon.src = "";
	icon.style.display = "none";
	txt.style.left = "8px";
}
createPopup();