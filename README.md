# LibertyNet

A censorship proof web application development platform built on the IOTA DAG.

Note: This is an early release.  Hopefully changes will be kept to a minimum.

#### Provides

* A user system for signup, login and signature verfication
* An immutable database layer to provide basic CRU (no D) functionality for objects
* Indexes are possible to relate data together

#### How does it work

Users setup an IOTA node locally or remotely that belongs to them.  LibertyNet provides a simple API that can be used to store and retrieve data on the IOTA DAG which is replicated to other nodes which makes your application censorship proof.  If a node is shut down, the data is replicated to many different nodes.

Any data written is signed by the user.  There is no central gatekeeper for adding data so LibertyNet handles checking signatures on the client side.  This is a change in the normal paradigm where security is handled centrally.  In this case, the client can decide what data is valid, and what data is not.  Control of the data is local to the user instead of central.  The user can choose what they want to see.

#### Quickstart

* Install docker and docker-compose

* `cd node`

* Run `docker-compose up`

* Open a browser and go to `http://localhost:8081` wait for 'sync' and 'health to turn green'

* Make sure that node, yarn and lerna are installed on your system

* `cd examples/web-demo`

* `lerna bootstrap`

* `yarn build`

* Open the newly created file in examples/web-demo/lib/index.html in a web browser

  

  

  