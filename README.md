# Sparql AI Explorer
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shields)](http://makeapullrequest.com)

This project is a proof of concept for a SPARQL AI Explorer. It is designed to be used with the [ontop](https://ontop-vkg.org/) and [Fuseki](https://jena.apache.org/documentation/fuseki2/) containers. The goal is to provide a web application that allows users to explore SPARQL queries and their results in a user-friendly way. Using an LLM based AI backend to help formulate valid SPARQL queries.

# Table of contents

- [Materialize tuples via ontop](#Materialize-tuples-with-ontop)
- [Fuseki Password](#Fuseki-Password)
- [Importing data into Fuseki](#Importing-data-into-Fuseki)
  - [Populate the dataset with data](#Populate-the-dataset-with-data)
- [Web application and AI backend setup](#Web-application-and-AI-backend-setup)
- [Contributing](#contributing)
- [License](#license)


# Materialize tuples with ontop

[(Back to top)](#table-of-contents)

To generate your own materialized tuples, you can use the ontop container. You will have to provide your own SQL database. The files in this repo can be used as a guide to start your own mapping. Once you have your own mapping, you can use the following command (substituting your own filenames) to generate the materialized tuples.
```bash
docker exec -it sparql-ai-explorer-ontop-1  /bin/bash -c 'ontop materialize --mapping=/tmp/ontop/odws.obda -t /tmp/ontop/odws.ttl --properties=/opt/ontop/configuration.properties -f turtle -o /tmp/ontop/odws-materialized.ttl'
```

Afterward, you can load the materialized tuples into the fuseki container.To prepare the date for loading move the file
to the `fuseki/staging` folder.

# Fuseki Password

[(Back to top)](#table-of-contents)

Fuseki writes the generated Passwort to the console at  first startup (of the container)

```bash
2025-01-16 16:58:58 ###################################
2025-01-16 16:58:58 Initializing Apache Jena Fuseki
2025-01-16 16:58:58 
2025-01-16 16:58:58 Randomly generated admin password:
2025-01-16 16:58:58 
2025-01-16 16:58:58 admin=password
2025-01-16 16:58:58 
2025-01-16 16:58:58 ###################################
```

# Importing data into Fuseki

[(Back to top)](#table-of-contents)


Usually it runs at http://localhost:3030/ .
1. enter admin / password
2. Add new Dataset
3. Dataset name = odws
4. Type = Persistent
5. Execute "create dataset"


## Populate the dataset with data

[(Back to top)](#table-of-contents)

To load the data into the running fuseki container, you can use the following command:
```bash
docker exec -it sparql-ai-explorer-fuseki-1  /bin/bash -c './tdbloader2 --loc /fuseki/databases/odws /staging/odws-materialized.ttl'
```
Next add the dataset via the web interface, as persistent dataset.

SPARQL Queries:

```sparql
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX parl: <http://opendata.parlament.ch/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?group ?name ?sn ?lan
WHERE {
  ?group a parl:group;
   parl:wasNamed ?name.
  ?name parl:ShortName ?sn;
   dc:language ?lan.
   FILTER(?lan = "de"^^xsd:language)
}
```

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX parl: <http://opendata.parlament.ch/>

SELECT ?person ?property ?value
WHERE {
    ?person a parl:person ;
            foaf:firstName ?firstName ;
            foaf:familyName ?familyName ;
            ?property ?value .
  
    FILTER(?firstName = "Carlo" && ?familyName = "Sommaruga")
}
```

# Web application and AI backend setup

[(Back to top)](#table-of-contents)

Please read the corresponding README.md files under /ui and /aibackend

# Contributing

[(Back to top)](#table-of-contents)

Your contributions are always welcome! Feel free to fork the repository and submit a pull request. If you have any questions or suggestions, please open an issue.

# License

[(Back to top)](#table-of-contents)

The Apache License Version 2.0, January 2004 - [TI&M AG](https://www.ti8m.com/). Please have a look at the [LICENSE](LICENSE) for more details.


