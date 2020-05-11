# mongodb-mongoose-ts

## setup

> npm init

to allow ts-node:

> npm install ts-node typescript

use mongoose:

> npm install mongoose

## implementation

Each collection in mongo is represented by:

1. Dao object, which extends BaseDao.
2. Repo object that extends BaseRepo. All CRUD is already implemented in BaseRepo.

thanks to the fact that each Dao extends BaseDao and passes the schema-name on ctor, the BaseRepo knows the 
Dao type (the schema name of each object) so it helps to log upon item creation.

--------------

# Mongodb connection with mongoose

-	mongo docker is up (requires authentication)
-	connect using demo app (no credentials). Throw error on failure.
-	result: connection passes without error. Error on insert: command insert requires authentication.

-	mongo docker is up (requires authentication)
-	connect using demo app: no credentials, but with option authSource: 'admin'
-	result: as before. connection passes without error. But there was an error on insert: “UnhandledPromiseRejectionWarning: MongoError: command insert requires authentication”

-	mongo docker is up (requires authentication)
-	connect using demo app: BAD credentials.
-	result: after exactly 30 secs (mongoose default) get error “MongooseServerSelectionError: Authentication failed”. (option ‘serverSelectionTimeoutMS‘)
