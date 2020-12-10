# Music App

This app is using React, Sequelize and MySql.
In order to use it you must have MySql installed on youre machine, and relevant schemas in the DataBase(Dev, Test, Prod).

## How to use: 
* Clone the repository
* Run ```npm install``` both in client and server folders.
* Creeate ```.env``` file in ```server``` folder and fill with youre details. See format bellow: 

```javascript
    DB_USERNAME=""
    DB_PASSWORD=""
    DEV_DB_DATABASE="" //development schema name
    TEST_DB_DATABASE="" //tests schema name
    PROD_DB_DATABASE="" //production schema name
    DB_HOST=""
    JWT_SECRET="" // secret for JWT authentication
```
* usefull ```server``` scripts :
---
| script        | Decreption                                   |
| ------------- |:-------------:                               |
| strat         | run server in production evironment          |
| dev           | run server in development evironment          |
| mig:dev       | run all migrations in development evironment |
| mig:prod      | run all migrations in production evironment  |
| seed:dev      | run all seed files in development evironment |
| seed:prod     | run all seed files in production evironment  |
| all:dev       | run migrations and seed files                |
| all:prod      | run migrations and seed files                |

---
* After running migrations and seeds you can strat react server by running ```npm strat``` in client folder.


# Docker :

if you want to run the application with docker, just run ```docker-compose up``` in root folder.

when the the container is ready just access it on http://localhost:3000