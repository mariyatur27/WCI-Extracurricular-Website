from yaml import safe_load as yaml_load
from datetime import datetime
from os import listdir
from os.path import join as path_join
from hashlib import sha1
from json import dump as json_dump
from string import ascii_lowercase, ascii_uppercase, digits
from secrets import token_bytes

events = []
eventDirectory = "data/events"
usedIcsIDs = set()

# TODO: make resilient to typos and missing data
for eventFilename in listdir(eventDirectory):
    if not (eventFilename[-4:] == ".yml" or eventFilename[-5:] == ".yaml"):
        continue
    with open(path_join(eventDirectory, eventFilename)) as eventFile:
        event = yaml_load(eventFile)

    startDate = datetime.strptime(event["start-date"] + "." + event["start-time"], "%d/%m/%Y.%H:%M:%S")
    endDate = datetime.strptime(event["end-date"] + "." + event["end-time"], "%d/%m/%Y.%H:%M:%S")
    startTime = int(startDate.timestamp())
    endTime = int(endDate.timestamp())

    icsID = "".join([char if char in ascii_lowercase + ascii_uppercase + digits else ("_" if char == " " else "") for char in event["name"]])
    if icsID in usedIcsIDs:
        icsID = eventFilename.split(".")[-2]
    if icsID in usedIcsIDs:
        icsID = sha1(bytes(event["name"] + str(startTime) + str(endTime), 'utf-8')).hexdigest()
    while icsID in usedIcsIDs:
        icsID = sha1(bytes(event["name"] + str(startTime) + str(endTime), 'utf-8') + token_bytes()).hexdigest()
    usedIcsIDs.add(icsID)
    events.append({
        "start_time": startTime,
        "end_time": endTime,
        "title": event["name"],
        "description": event["description"],
        "id": icsID
    })
    startTimestamp = startDate.strftime("%Y%m%dT%H%M%S")
    endTimestamp = endDate.strftime("%Y%m%dT%H%M%S")
    nl = "\n"
    escapednl = "\\n"
    with open(f"data/events/{icsID}.ics", mode="w") as f:
        f.write(f"""BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VTIMEZONE
TZID:America/Toronto
END:VTIMEZONE
BEGIN:VEVENT
DTSTART:{startTimestamp}
DTEND:{endTimestamp}
SUMMARY:{event['name']}
DESCRIPTION:{event['description'].replace(nl, escapednl)}
END:VEVENT
END:VCALENDAR""")

with open("data/events.json", "w") as eventJSON:
    json_dump(events, eventJSON, indent=4)
