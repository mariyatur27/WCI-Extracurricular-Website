from yaml import safe_load as yaml_load
from os import listdir
from os.path import join as path_join
from json import dump as json_dump, load as json_load

athletics = []
sportDirectory = "data/athletics"

with open("data/connection_links.json") as f:
    connectionLinks = json_load(f)

buttonConnectionLinks = []

for id, data in connectionLinks.items():
    if data["type"] == "button":
        buttonConnectionLinks.append(id)

for sportFilename in listdir(sportDirectory):
    if not (sportFilename[-4:] == ".yml" or sportFilename[-5:] == ".yaml"):
        continue
    with open(path_join(sportDirectory, sportFilename)) as eventFile:
        sport = yaml_load(eventFile)

    connectionLinks = ["more_info"]
    connectionLinkVals = {}
    if "connection-links" in sport:
        for connectionLink in sport["connection-links"]:
            connectionLinks.append(connectionLink["type"])
            connectionLinkVals[connectionLink["type"]] = connectionLink["value"]

    # TODO: Accuire button-type links automatically
    connectionLinks.sort(key=lambda link: (1 if link in buttonConnectionLinks else 0))
    
    final_dict = dict({"connection_links": connectionLinks, "id": ".".join(sportFilename.split(".")[:-1])}, **connectionLinkVals)
    for originalLabel, newLabel in {"name": "name", "image": "image", "coach": "coach", "description": "description", "practice-time": "meeting_time", "practice-time-label": "meeting_time_title", "categories": "categories", "extra-info": "extra_info"}.items():
        if originalLabel in sport:
            final_dict[newLabel] = sport[originalLabel]
    if "team-members" in sport:
        teamMembers = []
        showImages = "team-member-image-folder" in sport
        for teamMemberName in sport["team-members"]:
            teamMember = {"name": teamMemberName}
            if showImages:
                teamMember["image"] = sport["team-member-image-folder"] + teamMemberName + ".png"
            teamMembers.append(teamMember)
        final_dict["members"] = teamMembers
    elif "team-images" in sport and "team-member-image-folder" in sport:
        teamMembers = []
        for image in sport["team-images"]:
            teamMembers.append({"image": sport["team-member-image-folder"] + image + ".png"})
        final_dict["members"] = teamMembers

    athletics.append(final_dict)

with open("data/athletics.json", "w") as sportsJSON:
    json_dump(athletics, sportsJSON, indent=4)
