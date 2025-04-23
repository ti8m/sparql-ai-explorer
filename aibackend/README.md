# AI Backend

## Run it

This backend can be started using the docker-compose.yml file
of the project.

```bash
  docker-compose up
```

## Rebuild and rerun AI backend
```bash
  docker-compose up aibackend --build
```

## Environment variables and OpenAI API-Key
Create a file with name .env where you paste the GPT API-Token, e.g.
```
OPENAI_API_KEY=sample key
```
Where do I get an API-Key?
* For real and productive software you need an Azure license, please ask your project manager or someone from Azure Cloud team at ti&m.
* For testing purposes (which this app was used for so far), you can create an account in OpenAi and generate a new secret key (https://platform.openai.com/api-keys). This secret key is what you put into the .env file. For testing loads, it's quite cheap, but always keep an eye on the costs at https://platform.openai.com/usage. 

## Add further example commands

Add the additional commands into the file example_commands.txt.
They're separated by semicolon and new line.

## Adjust the ontology

If you have a new or better ontology than the one in the file ontology.txt, paste it in there replacing the old one.

## Further libraries needed

If you require more libraries in the Python project, just add them in the requirements.txt file on a new line. Docker
will install them automatically.
