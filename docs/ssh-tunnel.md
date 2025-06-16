From: https://medium.com/@lukkoro/securely-connect-to-your-coolify-db-using-an-ssh-tunnel-without-exposing-it-to-the-public-2f0ea6827756

# Setup

## 1. Create a user

First, we need to create a new user in our Coolify server that we will be using for the tunnel. Go to the terminal on your Coolify instance, and type the following

```bash
# Creates the user
adduser <your_username>

# Add user to docker group
usermod -aG docker <your_username>
```

Now we have our user created and added to the docker group.

## 2. Add SSH Key

Next, if we want to start a tunnel without always entering a password for the user we created, we need to add an SSH key that we will be using to connect to it.

```bash
# Switch to the newly created user
su - <your_username>

# Open the authorized_keys file, and paste your public SSH key here
vim ~/.ssh/authorized_keys
```

Now we have everything ready to connect to our database!

On your local machine, open up a terminal and check if the ssh connection works; it should go right through without asking for a password.

```bash
ssh -i ~/.ssh/id_rsa <your_username>@<coolify_server_ip>
```

## 3. Find Database’s Local IP

After connecting, we need to find our database's local IP. We can use Docker for this.

```bash
# List our containers, look for database, should be under coolify-db name
docker container ls

# Get Local IP Address of our database
docker inspect <db-container-id> | grep "IPAddress"
```

## 4. Run the SSH tunnel

Now that we have our DB’s IP address, we can finally run an SSH tunnel and connect to it.

Open up a new terminal window, and run the following command

```bash
ssh -L <db-local-port>:<db-ip-address>:<db-port-coolify> -i ~/.ssh/id_rsa <your_username>@<coolify_server_ip>
```

Now that we have our SSH tunnel running, we can minimize this terminal and have it running in the background. 5. Connect to DB

We can then connect to the database using localhost, and the port we specified as the local port.

```bash
psql -h localhost -p <db-local-port> -U postgres -d postgres
```

Of course, we can also use visual tools to represent our database, using the same parameters to connect to the DB!

Et voila, we have our database on our local machine!
Conclusion

Exposing your database to the public might seem like a convenient shortcut during development. Still, it can come back to bite you, especially when organizations like the European Commission start knocking. Setting up an SSH tunnel is a simple, secure way to access your Coolify-hosted database without compromising security. It takes a few extra steps, but once it’s in place, you’ll have peace of mind knowing your data is safe from unwanted eyes. Plus, you have a clean, professional setup you can reuse on future projects. Stay safe out there — and don’t forget to uncheck that public DB box!
