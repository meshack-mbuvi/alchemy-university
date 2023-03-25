## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Thought process

In this project, the client has a fake wallet having 3 accounts. The wallet keeps both the public key and the private key for each account. This is just an illustration purpose but for a real application, we would use wallet service like metamask to take care of keeping wallet account details and also sign transactions on behalf of the user. In this project, whenever a user selects a wallet address/account and amount to send to another address, we use the sender's private key to sign a transaction and then send both the signature of that transaction and the message. In our case, the message contains the recipient address and amount to be transferred.

On the server side, we have a list of accounts and their amounts. The server determines the sender from the signature and message received from the client.

Note:

- The implementation of the app is limited to the the list of accounts both the server and client has configured.
- Since there is no way to determine public and private keys from a given account, we cannot transfer funds from any other account apart from those that the client has configured but we can transfer funds to any account.

We use the generate script from the server to generate 3 addresses and their private and public keys.The addresses are stored in the server each having a certain value termed the amount while both public and private keys are stored in the client; each mapped to a given user. We use the user's public key to retrieve the user's address which both with the private key is then used generate a transaction signature. The signature is send to the server alongside the transaction message.
On the server side, we use the signature to retrieve the sender's address which is used to effect the funds transfer.

### Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!
