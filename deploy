-#!/bin/sh      
ssh root@68.183.143.68 <  cd /var/www/html/innovaterwanda-backend 
 git pull
 npm install -g       
 pm2 delete
 pm2 start npm --name "app" -- start
 pm2 save
 exit       
EOF
