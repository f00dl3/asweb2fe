rm -fr node_modules
sudo docker build -t asweb2fe .
sudo docker run --net=host --restart=always -d -p 80:80 -P asweb2fe
