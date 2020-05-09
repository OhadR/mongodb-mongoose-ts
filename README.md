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
