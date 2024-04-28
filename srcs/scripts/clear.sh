docker rm $(docker ps --filter status=exited -q) 2> /dev/null
docker rmi $(docker images -f "dangling=true" -q) 2> /dev/null