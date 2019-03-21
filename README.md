# contact-notebook

### Setup ZeppelinOS
```
zos init contact-notebook
zos add ContactNotebook
zos session --network development --expires 3600
zos push --deploy-dependencies
zos create ContactNotebook
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


### Frontend
- For the first time
```
$ cd client
$ npm install
$ npm run start
```

- For the second time 〜
```
$ cd client && npm run start
```