# What is kicbase/echo-server docker image?
`kicbase/echo-server` is a simple Docker container that runs an HTTP server, which echoes back any request it receives. It is commonly used for debugging, testing, and verifying network connectivity. The server responds with details about the request, including headers, method, and body.

# Run `kicbase/echo-server`
```
  docker run --rm -p 8080:8080 kicbase/echo-server
```

# Run `curl`
```
  curl localhost:8080
```

# Example output
```
(base) ┌──(klx㉿kali)-[~]
└─$ curl localhost:8080
Request served by 33a91649be57

HTTP/1.1 GET /

Host: localhost:8080
Accept: */*
User-Agent: curl/8.12.1
                                                                                                                                                                                                                   
(base) ┌──(klx㉿kali)-[~]
└─$ 

```