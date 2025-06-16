## 29.04.2025

### Part 1

So I'm at a good point. There's a server hosted at staging.synth.kitchen which is set up to host the synth kitchen react app via nginx. I'm following [instructions](https://dev.to/jackrkelly/create-a-full-stack-web-application-using-react-strapi-nginx-mongodb-and-digitalocean-bkh) to set up this server, and maintaining a file `setup-staging.sh` which can be used to provision a new server in case the current one needs to be wiped.

Next, I want to get my strapi cms deployed alongside the react app. This will involve [installing a MySQL server](https://documentation.ubuntu.com/server/how-to/databases/install-mysql/index.html) and modifying the Nginx configuration to route the /api and /admin paths to the strapi server.

Once that's done, I want to set up an equivalent development environment, so I can start integrating the react app with strapi. This will involve creating routes and pages for things like authentication and profile management, as well as integrating data about the user into the react app's state. I'll create a homepage which lists one's own patches as well as random assorted public patches for perusal.

I want to define the concept of forking a patch, so someone can jump in and edit a patch on the fly without overwriting someone else's work. I also want to add "snapshots". Undo/redo would be fantastic, but in its place I think it makes sense to "auto-save", maintaining a recent history of patch states. One could also manually save a snapshot.

### Part 2

I got the setup-staging.sh working consistently to get the react app built and served by nginx at staging.synth.kitchen. I hit certbot's rate-limiter so I have to wait until tomorrow evenening to request a new certificate. I guess I shouldn't keep rebuilding the servers. In the meantime, I can get the site deployed, I just can't actually use synth kitchen because I can't load the AudioWorkletProcessors without https.

But maybe that's alright. I can proceed

### Important!

After April 30, 20:22::19 UTC, run the following on the staging server:
`certbot -d staging.synth.kitchen -m rain@synth.kitchen --agree-tos -n --nginx`
