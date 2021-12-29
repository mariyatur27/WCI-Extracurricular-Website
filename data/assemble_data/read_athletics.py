from json import load as json_load

with open("data/athletics.json") as f:
    athletics = json_load(f)

# TODO: Make this program read all the data from athletics.json and convert each entry into a .yml file