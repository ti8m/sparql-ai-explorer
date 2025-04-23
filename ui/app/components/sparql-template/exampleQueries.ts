export const exampleQueries = [
    {
        name: "Ratsmitglieder",
        id: 0,
        value: `PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX parl: <http://opendata.parlament.ch/>
PREFIX parl-group: <http://opendata.parlament.ch/Group#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
  
SELECT ?group ?name ?sn ?lan
WHERE {
  ?group a parl:Group;
   parl-group:isNamed ?name .
  ?name parl-group:shortName ?sn;
   dc:language ?lan .
   FILTER(?lan = "de"^^xsd:language)
}`,
    },
    {
        name: "Carlo Sommaruga",
        id: 1,
        value: `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX parl: <http://opendata.parlament.ch/>
  
SELECT ?person ?property ?value
WHERE {
    ?person a parl:Person ;
            foaf:firstName ?firstName ;
            foaf:familyName ?familyName ;
            ?property ?value .
  
    FILTER(?firstName = "Carlo" && ?familyName = "Sommaruga")
}`,
    },
    {
        name: "Alle Parlamentsgruppen",
        id: 2,
        value: `PREFIX parl: <http://opendata.parlament.ch/> 
PREFIX  parl-group: <http://opendata.parlament.ch/Group#> 
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
  
SELECT ?group ?longName ?shortName 
WHERE { 
 ?group a parl:Group . 
 ?group parl-group:isNamed ?groupName . 
 ?groupName  parl-group:longName ?longName . 
 ?groupName  parl-group:shortName ?shortName .
}`,
    },
    {
        name: "Alle Parteien",
        id: 3,
        value: `PREFIX parl: <http://opendata.parlament.ch/> 
PREFIX  parl-group: <http://opendata.parlament.ch/Group#> 
  
SELECT ?longName ?shortName 
WHERE { 
  ?party a parl:Party . 
  ?party  parl-group:isNamed ?partyname . 
  ?partyname  parl-group:longName ?longName . 
  ?partyname  parl-group:shortName ?shortName .
}`,
    },
    {
        name: "Alle SVP-Mitglieder im Parlament",
        id: 4,
        value: `PREFIX parl: <http://opendata.parlament.ch/> 
PREFIX  parl-group: <http://opendata.parlament.ch/Group#> 
PREFIX  parl-person: <http://opendata.parlament.ch/Person#> 
PREFIX foaf: <http://xmlns.com/foaf/0.1/> 
  
SELECT ?group ?memberName ?memberLastName 
WHERE { 
  ?member a parl:Person . 
  ?member  parl-person:isMemberOf ?group . 
  ?group  parl-group:isNamed ?name . 
  ?name  parl-group:shortName 'SVP' . 
  ?member foaf:firstName ?memberName; 
  foaf:familyName ?memberLastName. 
}`,
    },
]
