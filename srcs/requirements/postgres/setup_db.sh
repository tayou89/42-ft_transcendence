#!/bin/sh

# echo "listen_addresses = '*'" >> /etc/postgresql/15/main/postgresql.conf

# service postgresql start

psql -U postgres << END
create database user_data;
create user django with password 'django1234';
ALTER DATABASE user_data OWNER TO django;
GRANT ALL ON DATABASE user_data TO django;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO django;
END

# service postgresql stop

# su -c '/usr/lib/postgresql/15/bin/postgres -D /var/lib/postgresql/15/main -c config_file=/etc/postgresql/15/main/postgresql.conf' postgres

# postgres