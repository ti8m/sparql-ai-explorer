#!/bin/bash
# entrypoint.sh - Erstellt eine Standard-Mapping-Datei und startet den Ontop-Server

./ontop endpoint -m /tmp/ontop/odws.obda \
                   -t /tmp/ontop/odws.ttl \
                   -p /opt/ontop/configuration.properties \
                   --cors-allowed-origins=*
