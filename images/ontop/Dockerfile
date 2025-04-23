FROM ontop/ontop:5.2.1

WORKDIR /opt/ontop

COPY entrypoint.sh /opt/ontop/entrypoint.sh
COPY configuration.properties /opt/ontop/configuration.properties
COPY mssql-jdbc-12.8.1.jre11.jar /opt/ontop/lib/mssql-jdbc-12.8.1.jre11.jar

ENTRYPOINT ["/opt/ontop/entrypoint.sh"]
