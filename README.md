# Advent calendar

## What is this?

This is a simple demo of an advent calendar website:

* the site is available before Dec 1st
* every day a new door can be opened
* already opened door can be opened again
* by providing a secret in the url any door can be opened

## How to use?

### Setup

Install nginx and fcgiwrap

```bash
apt install nginx fcgiwrap
```

/etc/nginx/sites-available/adventskalender

```
server {
	# SSL configuration
	#
	listen 443 ssl;
	listen [::]:443 ssl;
	ssl_certificate     /var/www/mydomain.de.crt;
    ssl_certificate_key /var/www/mydomain.de.key;

	root /var/www/html/adventskalender;

	# Add index.php to the list if you are using PHP
	index index.html index.htm index.nginx-debian.html;

	server_name mydomain.de www.mydomain.de;

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri $uri/ =404;
	}

	# fast cgi support
    include /etc/nginx/fcgiwrap.conf;

    location /secret {
            deny all;
    }
}
```

### Server interface

Whenever a door is opened the following request is sent to fetch the content of a door:

https://mydomain.de/cgi-bin/adventskalender?day=17

If a secret was provided when openening the index page it is forwareded as query parameter to the cgi script:

https://advriendskalender.de/cgi-bin/adventskalender?day=9&santa=2021-12-24

A door's content is defined by putting a file of each day in /var/www/html/adventskalender/secret e.g. 1.json:

```json
{
    "text: "Welcome, this is content of door 1!",
    "img": "day1.jpg"
}
```

(Note that day1.jpg will be expected in /var/www/html/adventskalender/img/days)
