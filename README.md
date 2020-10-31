# EFutures Node.JS test


## Change [.env.example] to [.env] and run the APP 
MongoDB credencials can be find it on 
```
.env.example
```
## To run the APP without Docker
```
npm start
```
--> Listening on  http://localhost:3000

## To run the APP with Docker
```
docker build -t node_app .
docker run --name node_app -d -p 9000:3000 node_app
```
--> Listening on  http://localhost:9000
