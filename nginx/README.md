Instructions to enable nginx config for arrtmy-server-e5de.twc1.net

1. Copy config to /etc/nginx/sites-available and create directory for certbot:

```bash
sudo mkdir -p /var/www/letsencrypt
sudo chown www-data:www-data /var/www/letsencrypt
sudo cp nginx/arrtmy-server-e5de.twc1.net.conf /etc/nginx/sites-available/arrtmy-server-e5de.twc1.net
sudo ln -s /etc/nginx/sites-available/arrtmy-server-e5de.twc1.net /etc/nginx/sites-enabled/
```

2. Point `root` in the config to your actual frontend build path. Example uses `/var/www/website/frontend/dist`.

3. Test nginx config and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

4. Obtain SSL cert with certbot (webroot):

```bash
sudo apt update
sudo apt install certbot
sudo certbot certonly --webroot -w /var/www/letsencrypt -d arrtmy-server-e5de.twc1.net
```

5. After obtaining certs, certbot will create `/etc/letsencrypt/live/arrtmy-server-e5de.twc1.net/` with `fullchain.pem` and `privkey.pem`.

6. Reload nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

7. Run your Node server locally on port 3000 (pm2 recommended):

```bash
cd /path/to/website/frontend
npm install
npm run build
pm2 start server.js --name website
```

Notes:

- Ensure DNS A record for arrtmy-server-e5de.twc1.net points to server IP.
- If you prefer certbot --nginx, you can run `sudo certbot --nginx` instead of the webroot flow.
