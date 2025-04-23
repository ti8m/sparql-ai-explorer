with open("fine_tuning_material/example_commands.txt", "r", encoding="utf-8") as cmds_file:
    commands = cmds_file.read()

with open("fine_tuning_material/ontology.txt", "r", encoding="utf-8") as ontology_file:
    ontology = ontology_file.read()

with open("fine_tuning_material/prefixes.txt", "r", encoding="utf-8") as prefixes_file:
    prefixes = prefixes_file.read()

def remove_invalid_syntax_elements(input_string):
    withoutNewLineSymbols = input_string.replace("\n", "")
    withoutTabSymbols = withoutNewLineSymbols.replace("\t", "")
    return withoutTabSymbols