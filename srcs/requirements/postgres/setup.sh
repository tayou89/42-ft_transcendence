#!/bin/sh

set -e

psql -U $POSTGRES_USER << EOF
create database $DJANGO_DB_NAME;
create user $DJANGO_DB_USER with password '$DJANGO_DB_PASSWORD';
ALTER DATABASE $DJANGO_DB_NAME OWNER TO $DJANGO_DB_USER;
GRANT ALL ON DATABASE $DJANGO_DB_NAME TO $DJANGO_DB_USER;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DJANGO_DB_USER;
EOF