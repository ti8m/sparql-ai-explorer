export const sparqlCompletions = (context) => {
// const word = context.matchBefore(/\w*/);
    const word = context.matchBefore(/[\w-]*/);
    if (!word || word.from === word.to) return null;

    if (word) {
        const pastInputs = context.state.doc.sliceString(0, word.from);

        if (/SELECT\b/i.test(pastInputs)) {
            if (/WHERE\b/i.test(pastInputs)) {    // SELECT ... WHERE
                if (/FILTER\b/i.test(pastInputs)) {
                    return {
                        from: word.from,
                        options: afterSelectFilter
                    };
                }
                return {
                    from: word.from,
                    options: afterSelectWhere
                };
            } else if (/DISTINCT\b/i.test(pastInputs)) {
                return {
                    from: word.from,
                    options: afterSelectDistinct
                };
            } else if (/REDUCED\b/i.test(pastInputs)) {
                return {
                    from: word.from,
                    options: afterSelectReduced
                };
            }
            return {    // Nach Select, aber (noch) kein WHERE
                from: word.from,
                options: afterSelect
            };
        } else if (/PREFIX\b/i.test(pastInputs)) {
            return {
                from: word.from,
                options: afterPrefix
            }
        }
    }

    return {
        from: word.from,
        options: startOptions
    };
};

const startOptions = [
    {label: "PREFIX", type: "keyword"},
    {label: "SELECT", type: "keyword"},
    {label: "ASK", type: "keyword"},
    {label: "CONSTRUCT", type: "keyword"},
    {label: "DESCRIBE", type: "keyword"},
]

const endOptions = [
    {label: "LIMIT", type: "keyword"},
    {label: "OFFSET", type: "keyword"},
    {label: "ORDER BY", type: "keyword"},
    {label: "GROUP BY", type: "keyword"},
    {label: "HAVING", type: "keyword"},
]

const aggregates = [
    {label: "AVG", type: "keyword"},
    {label: "COUNT", type: "keyword"},
    {label: "SUM", type: "keyword"},
    {label: "MAX", type: "keyword"},
    {label: "MIN", type: "keyword"},
]

const buildInCall = [
    {label: "STR", type: "keyword"},
    {label: "LANG", type: "keyword"},
    {label: "DATATYPE", type: "keyword"},
    {label: "IRI", type: "keyword"},
    {label: "URI", type: "keyword"},
    {label: "ROUND", type: "keyword"},
    {label: "CEIL", type: "keyword"},
    {label: "FLOOR", type: "keyword"},
    {label: "RAND", type: "keyword"},
    {label: "CONCAT", type: "keyword"},
    {label: "STRLEN", type: "keyword"},
    {label: "UCASE", type: "keyword"},
    {label: "LCASE", type: "keyword"},
    {label: "CONTAINS", type: "keyword"},
    {label: "YEAR", type: "keyword"},
    {label: "MONT", type: "keyword"},
    {label: "DAY", type: "keyword"},
    {label: "HOURS", type: "keyword"},
    {label: "MINUTES", type: "keyword"},
    {label: "SECONDS", type: "keyword"},
    {label: "TIMEZONE", type: "keyword"},
    {label: "NOW", type: "keyword"},
    {label: "isIRI", type: "keyword"},
    {label: "isURI", type: "keyword"},
    {label: "TRIPLE", type: "keyword"},
    {label: "SUBJECT", type: "keyword"},
    {label: "PREDICATE", type: "keyword"},
    {label: "OBJECT", type: "keyword"},

]

const fachliche = [
    {label: "?item", type: "variable"},
    {label: "?name", type: "variable"},
    {label: "parl", type: "property"},
    {label: "wdt:", type: "property"},
    {label: "wd:", type: "entity"},
    {label: "person", type: "entity"},
    {label: "Address", type: "entity"},
    {label: "Committee", type: "entity"},
    {label: "Election", type: "entity"},
    {label: "Faction", type: "entity"},
    {label: "Group", type: "entity"},
    {label: "GroupMembership", type: "entity"},
    {label: "GroupName", type: "entity"},
    {label: "Occupation", type: "entity"},
    {label: "Party", type: "entity"},
    {label: "Person", type: "entity"},
    {label: "TimeConstraintEntity", type: "entity"},
    {label: "objectProperty", type: "entity"},
    {label: "ontology", type: "entity"},
    {label: "isNameOf", type: "variableName"},
    {label: "isNamed", type: "variableName"},
    {label: "electedAs", type: "variableName"},
    {label: "isMemberOf", type: "variableName"},
    {label: "isParlGroupPresidentOf", type: "variableName"},
    {label: "isPresidentOf", type: "variableName"},
    {label: "isVicePresidentOf", type: "variableName"},
    {label: "livesAt", type: "variableName"},
    {label: "worksAs", type: "variableName"},
    {label: "worksAt", type: "variableName"},
]

const afterSelect = [
    ...fachliche,
    {label: "WHERE", type: "keyword"},
    {label: "DISTINCT", type: "keyword"},
    {label: "REDUCED", type: "keyword"},
    ...aggregates,
    ...endOptions
]

const afterSelectDistinct = [
    ...fachliche,
    {label: "WHERE", type: "keyword"},
    ...aggregates,
    ...endOptions
]

const afterSelectReduced = [
    ...fachliche,
    {label: "WHERE", type: "keyword"},
    ...aggregates,
    ...endOptions
]

const afterSelectWhere = [
    ...fachliche,
    {label: "SELECT", type: "keyword"},
    {label: "FILTER", type: "keyword"},
    ...endOptions
]

const afterSelectFilter = [
    ...fachliche,
    ...buildInCall,
    ...endOptions
]

const afterPrefix = [
    ...startOptions,
    {label: "dc", type: "variable", apply: "dc: <http://purl.org/dc/elements/1.1/>"},
    {label: "dbo", type: "variable", apply: "dbo: <http://dbpedia.org/ontology/>"},
    {label: "owl", type: "variable", apply: "owl: <http://www.w3.org/2002/07/owl#>"},
    {label: "rdf", type: "variable", apply: "rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"},
    {label: "xml", type: "variable", apply: "xml: <http://www.w3.org/XML/1998/namespace>"},
    {label: "xsd", type: "variable", apply: "xsd: <http://www.w3.org/2001/XMLSchema#>"},
    {label: "foaf", type: "variable", apply: "foaf: <http://xmlns.com/foaf/0.1/>"},
    {label: "obda", type: "variable", apply: "obda: <https://w3id.org/obda/vocabulary#>"},
    {label: "schema", type: "variable", apply: "schema: <https://schema.org/>"},
    {label: "rdfs", type: "variable", apply: "rdfs: <http://www.w3.org/2000/01/rdf-schema#>"},
    {label: "parl", type: "variable", apply: "parl: <http://opendata.parlament.ch/>"},
    {label: "parl-group", type: "variable", apply: "parl-group: <http://opendata.parlament.ch/Group#>"},
    {label: "parl-person", type: "variable", apply: "parl-person: <http://opendata.parlament.ch/Person#>"},
    {label: "parl-address", type: "variable", apply: "parl-address: <http://opendata.parlament.ch/Address#>"},
    {label: "parl-election", type: "variable", apply: "parl-election: <http://opendata.parlament.ch/Election#>"},
    {label: "parl-groupName", type: "variable", apply: "parl-groupName: <http://opendata.parlament.ch/GroupName#>"},
]
