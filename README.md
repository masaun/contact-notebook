# contact-notebook

### Frontend
```
$ npm install
```
```
$ cd client && npm run start
```

<br>


### JSON-RPC
```
Use ganache (GUI) which port number is 7545 
```

<br>

### Setup Metamask
```
Set private network (http://127.0.0.1:7545)
```

<br>


### Setup ZeppelinOS
```
zos init
zos add ContactNotebook
zos session --network development --expires 3600
zos push --deploy-dependencies
zos create ContactNotebook
```