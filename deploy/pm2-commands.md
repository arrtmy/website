PM2 commands

Install pm2 globally:

```bash
sudo npm i -g pm2
```

Start app with pm2:

```bash
cd /var/www/website/frontend
pm2 start server.js --name website --env production
pm2 save
pm2 startup
# follow the printed instructions from pm2 startup
```
