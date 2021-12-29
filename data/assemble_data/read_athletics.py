from json import load as json_load
from yaml import dump as yaml_dump

with open("data/athletics.json") as f:
    athletics = json_load(f)

for sport in athletics:
    outputSport = {
        "connection-links": [{"type": link, "value": sport[link]} for link in sport["connection_links"] if link != "more_info"]
    }
    if "members" in sport:
        pendingMemberList = []
        pendingImageList = []
        for member in sport["members"]:
            if "name" in member:
                pendingMemberList.append(member["name"])
            elif "image" in member:
                pendingImageList.append(".".join(member["image"].split("/")[-1].split(".")[:-1]))

            if "image" in member:
                outputSport["team-member-image-folder"] = ("/".join(member["image"].split("/")[:-1])) + "/"
        if len(pendingMemberList) >= len(pendingImageList):
            outputSport["team-members"] = pendingMemberList
        else:
            outputSport["team-images"] = pendingImageList
    for newLabel, originalLabel in {"name": "name", "image": "image", "coach": "coach", "description": "description", "practice-time": "meeting_time", "practice-time-label": "meeting_time_title", "categories": "categories", "extra-info": "extra_info"}.items():
        if originalLabel in sport:
            outputSport[newLabel] = sport[originalLabel]
    with open(f"data/athletics/{sport['id']}.yml", "w") as sportFile:
        yaml_dump(outputSport, sportFile)