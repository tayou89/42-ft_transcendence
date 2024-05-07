create database user_data;
create user django with password 'django1234';
ALTER DATABASE user_data OWNER TO django;
GRANT ALL ON DATABASE user_data TO django;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO django;