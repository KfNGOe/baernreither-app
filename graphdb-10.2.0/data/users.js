{
  "users" : {
    "admin" : {
      "username" : "admin",
      "password" : "*",
      "grantedAuthorities" : [ "ROLE_ADMIN" ],
      "appSettings" : {
        "DEFAULT_SAMEAS" : false,
        "DEFAULT_VIS_GRAPH_SCHEMA" : true,
        "IGNORE_SHARED_QUERIES" : true,
        "EXECUTE_COUNT" : true
      },
      "dateCreated" : 1679936069996
    }
  },
  "user_queries" : {
    "admin" : {
      "SPARQL Select template" : {
        "name" : "SPARQL Select template",
        "body" : "SELECT ?s ?p ?o\nWHERE {\n\t?s ?p ?o .\n} LIMIT 100",
        "shared" : false
      },
      "Clear graph" : {
        "name" : "Clear graph",
        "body" : "CLEAR GRAPH <http://example>",
        "shared" : false
      },
      "Add statements" : {
        "name" : "Add statements",
        "body" : "PREFIX dc: <http://purl.org/dc/elements/1.1/>\nINSERT DATA\n      {\n      GRAPH <http://example> {\n          <http://example/book1> dc:title \"A new book\" ;\n                                 dc:creator \"A.N.Other\" .\n          }\n      }",
        "shared" : false
      },
      "Remove statements" : {
        "name" : "Remove statements",
        "body" : "PREFIX dc: <http://purl.org/dc/elements/1.1/>\nDELETE DATA\n{\nGRAPH <http://example> {\n    <http://example/book1> dc:title \"A new book\" ;\n                           dc:creator \"A.N.Other\" .\n    }\n}",
        "shared" : false
      },
      "test.rq" : {
        "name" : "test.rq",
        "body" : "PREFIX kfngoeo: <https://github.com/KfNGOe/kfngoeo#>\nPREFIX tei: <http://www.tei-c.org/ns/1.0/>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX kfngoei: <https://github.com/KfNGOe/kfngoei/>\nPREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n\nCONSTRUCT {\n    kfngoei:n3\n        a kfngoeo:Text ;\n        kfngoeo:hasContent ?term_main ;\n        kfngoeo:elementPos rdf:nnnn ;\n    .    \n}\nWHERE {\n    #get element position of tei:TEI\n\t?s_tei kfngoeo:elementName tei:TEI ;\n           kfngoeo:elementPos ?pos_tei ;\n \t.        \n    #get short title from element position of tei:TEI\n    BIND(substr(?pos_tei,1,strlen(?pos_tei)-1) AS ?title_short)\n    #get tei:index\n    ?s_start a kfngoeo:StartTag ;\n          kfngoeo:elementName tei:index ;          \n          kfngoeo:elementPos ?pos_start ;\n\t.\n    #get numeric value of element position of tei:index\n    BIND(xsd:decimal(substr(?pos_start,strlen(?title_short)+1)) AS ?pos_start_nr)\n    #get element position of tei:term\n    BIND(concat(?title_short, str(?pos_start_nr+1)) AS ?pos_start_1)\n    #get main term of index\n   \tOPTIONAL {\n        ?s_term a kfngoeo:StartTag ;\n            kfngoeo:elementName tei:term ;\n            kfngoeo:hasAttr [\n               kfngoeo:attrName \"key\" ;\n               kfngoeo:attrValue ?term_main ;\n            ] ;\t\t\t\n            kfngoeo:elementPos ?pos_start_1 ;\n    \t.\n    }       \n} ORDER BY ?term_main",
        "shared" : false
      }
    }
  }
}