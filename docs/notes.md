## 29.04.2025

### Part 1

So I'm at a good point. There's a server hosted at staging.synth.kitchen which is set up to host the synth kitchen react app via nginx. I'm following [instructions](https://dev.to/jackrkelly/create-a-full-stack-web-application-using-react-strapi-nginx-mongodb-and-digitalocean-bkh) to set up this server, and maintaining a file `setup-staging.sh` which can be used to provision a new server in case the current one needs to be wiped.

Next, I want to get my strapi cms deployed alongside the react app. This will involve [installing a MySQL server](https://documentation.ubuntu.com/server/how-to/databases/install-mysql/index.html) and modifying the Nginx configuration to route the /api and /admin paths to the strapi server.

Once that's done, I want to set up an equivalent development environment, so I can start integrating the react app with strapi. This will involve creating routes and pages for things like authentication and profile management, as well as integrating data about the user into the react app's state. I'll create a homepage which lists one's own patches as well as random assorted public patches for perusal.

I want to define the concept of forking a patch, so someone can jump in and edit a patch on the fly without overwriting someone else's work. I also want to add "snapshots". Undo/redo would be fantastic, but in its place I think it makes sense to "auto-save", maintaining a recent history of patch states. One could also manually save a snapshot.

### Part 2

I got the setup-staging.sh working consistently to get the react app built and served by nginx at staging.synth.kitchen. I hit certbot's rate-limiter so I have to wait until tomorrow evenening to request a new certificate. I guess I shouldn't keep rebuilding the servers. In the meantime, I can get the site deployed, I just can't actually use synth kitchen because I can't load the AudioWorkletProcessors without https.

But maybe that's alright. I can proceed

#### Important!

After April 30, 20:22::19 UTC, run the following on the staging server:
`certbot -d staging.synth.kitchen -m rain@synth.kitchen --agree-tos -n --nginx`

### Part 3

I've reworked the basic structure, and have an app/server pair being deployed on a staging server running coolify. Coolify is also hosting the dev and staging databases.

I think I'm getting to a point where I need some shared types defined in their own project, to define the expectations between backend/frontend clearly. I also foresee a need to omit patch JSON data when transmitting a big list of results. That would just be a waste of bandwidth. There's also a need to be able to generate thumbnails for each patch.

### Part 4

Okay, now there's a functional app and server being deployed. The only issue is that the app doesn't get the VITE_API_HOST environment variable from the coolify dashboard. I guess I could code it so that if the host is one of a set of known hosts, we can map that to the known api host.

Once that's working, I'm basically ready to go on with adding the rest of the user account system, then the dashboard.

### Part 5

The api build is failing because I'm importing from /lib/shared in a way that docker isn't happy with. I'll need to figure out another way forward.

### Part 6

I've updated the dockerfile setup to be able to include files from lib/shared. There's now something wrong with the login function which doesn't really make sense.

### Part 7

The setup has come quite far. I now have one Dockerfile which builds and runs both apps (less overhead per deployment, while minimizing the chances of incompatible code being deployed together, in case building the app fails while building the api succeeds).

I set up supervisor to manage the runtime of the node api and nginx. Nginx serves the bundled react app, and proxies any requests with the /api path prefix to the nodejs server. Supervisor is configured to auto-restart both processes when they crash. Nginx seems unlikely to crash very often, but node is more susceptible. I created an /api/crash endpoint which calls `process.exit(1)`, to test how supervisor handles the an unexpected crash from the node server. It restarts the server in ~5ms, which is wild. But, if people are going to be using site, then 5ms is plenty of time for things to get messed up.

So I'm realizing that I need to have some robust wrapping around all api requests. I imagine a higher-order function which accepts some parameters and a transform function as arguments, and returns an async function which can be called to initiate a request, and which returns a Promise\<ResultType\>. The async function should handle retrying when the api server is down (502). Persistent issues should lead the user to a "something is wrong" sort of page. The redirect should include the previous url as a parameter, so the previous page can be loaded once the server is back up.

Of course, we shouldn't redirect from the patch editor when there are unsaved changes. That complicates things a bit.
