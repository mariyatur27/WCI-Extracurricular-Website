from yaml import safe_load as yaml_load
from datetime import datetime
from os import listdir
from os.path import join as path_join
from hashlib import sha1
from json import dump as json_dump

events = []
eventDirectory = "data/events"

# TODO: make resilient to typos
for eventFilename in listdir(eventDirectory):
    if not (eventFilename[-4:] == ".yml" or eventFilename[-5:] == ".yaml"):
        continue
    with open(path_join(eventDirectory, eventFilename)) as eventFile:
        event = yaml_load(eventFile)

    startDate = datetime.strptime(event["start-date"] + "." + event["start-time"], "%d/%m/%Y.%H:%M:%S")
    endDate = datetime.strptime(event["end-date"] + "." + event["end-time"], "%d/%m/%Y.%H:%M:%S")
    startTime = int(startDate.timestamp())
    endTime = int(endDate.timestamp())

    events.append({
        "start_time": startTime,
        "end_time": endTime,
        "title": event["name"],
        "description": event["description"],
        "id": eventFilename.split(".")[-2]
        })

with open("data/events.json", "w") as eventJSON:
    json_dump(events, eventJSON, indent=4)
