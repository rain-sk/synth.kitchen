# Update apt and apt-get
apt-get update

# Init ufw
ufw allow OpenSSH
yes | ufw enable

# Install Nginx and update ufw
apt-get -y install nginx
ufw allow 'Nginx HTTP'
echo "server {
	listen 80 default_server;
	listen [::]:80 default_server;

	root /var/www/html;

	# Add index.php to the list if you are using PHP
	index index.html index.htm index.nginx-debian.html;

	server_name _;

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files \$uri \$uri/ =404;
	}
}" > /etc/nginx/sites-available/default
systemctl enable nginx

# Install certbot and configure Nginx
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot
certbot -d staging.synth.kitchen -m rain@synth.kitchen --agree-tos -n --nginx
echo "server {
	listen 80 default_server;
	listen [::]:80 default_server;

	root /var/www/html;

	# Add index.php to the list if you are using PHP
	index index.html index.htm index.nginx-debian.html;

	server_name _;

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files \$uri \$uri/ =404;
	}
}" > /etc/nginx/sites-available/default
echo "server {
  root /var/www/staging.synth.kitchen/html;

  server_name staging.synth.kitchen; # managed by Certbot

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files \$uri \$uri/ /index.html =404;
	}

  listen 443 ssl; # managed by Certbot
  listen [::]:443 ssl ipv6only=on; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/staging.synth.kitchen/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/staging.synth.kitchen/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
server {
  if (\$host = staging.synth.kitchen) {
    return 301 https://\$host\$request_uri;
  } # managed by Certbot

	listen 80 ;
	listen [::]:80 ;
    server_name staging.synth.kitchen;
    return 404; # managed by Certbot
}" > /etc/nginx/sites-available/staging.synth.kitchen
ln -s /etc/nginx/sites-available/staging.synth.kitchen /etc/nginx/sites-enabled/
systemctl reload nginx

# Update ufw settings to use Nginx Full only
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'

# Clone synth.kitchen.git
mkdir /code
cd /code
git clone https://github.com/rain-sk/synth.kitchen.git
cd synth.kitchen

# Install node, npm, and related dependencies
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
apt-get install -y nodejs

# Build and deploy synth.kitchen/app
apt -y install npm
git checkout strapi-backend # TODO clean this up
npm run build
npm run publish


# Reboot to apply all updates
reboot
