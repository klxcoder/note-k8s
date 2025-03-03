# Build your images locally from their respective folders

```bash
docker build -t express-backend:latest ./backend
docker build -t vite-dev:latest ./frontend
```

# Make sure `PersistentVolume` `mysql-pv` is created and have `STATUS=Available`

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl apply -f 01-PersistentVolume-mysql-pv.yaml 
persistentvolume/mysql-pv created

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl get pv 
NAME       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM               STORAGECLASS   VOLUMEATTRIBUTESCLASS   REASON   AGE
mysql-pv   1Gi        RWO            Retain           Available   default/mysql-pvc                  <unset>                          22s

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$
```

# Make sure `PersistentVolumeClaim` `mysql-pvc` is created and have `STATUS=Bound`

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl apply -f 02-PersistentVolumeClaim-mysql-pvc.yaml 
persistentvolumeclaim/mysql-pvc created

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl get pvc                                         
NAME        STATUS   VOLUME     CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
mysql-pvc   Bound    mysql-pv   1Gi        RWO                           <unset>                 4s

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ 
```

# Make sure `PersistentVolume` `mysql-pv` have `STATUS=Bound`

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl get pv 
NAME       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM               STORAGECLASS   VOLUMEATTRIBUTESCLASS   REASON   AGE
mysql-pv   1Gi        RWO            Retain           Bound    default/mysql-pvc                  <unset>                          5m35s

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ 
```

# Make sure `Deployment` `mysql` is create and have `AVAILABLE=1`

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl apply -f 03-Deployment-mysql.yaml               
deployment.apps/mysql created

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl get deployment                   
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
mysql   1/1     1            1           14s

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ 
```

# Make sure `Service` `mysql` is created

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl apply -f 04-Service-mysql.yaml   
service/mysql created

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl get svc                       
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP    32h
mysql        ClusterIP   10.97.249.233   <none>        3306/TCP   5s

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ 
```

# Make sure the image `express-backend:latest` is available in docker

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ docker image ls | awk 'NR==1 || /express-backend/'
REPOSITORY                           TAG            IMAGE ID       CREATED         SIZE
express-backend                      latest         66841bee2f3b   2 hours ago     1.14GB

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ 
```

# Make sure can create container from image `express-backend:latest`

# Make sure to load image `express-backend:latest` to `minikube`

- Note: Will take long time, maybe 30s or more

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ minikube ssh -- docker images | awk 'NR==1 || /express-backend/'
REPOSITORY                                TAG        IMAGE ID       CREATED         SIZE

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ minikube image load express-backend:latest

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ minikube ssh -- docker images | awk 'NR==1 || /express-backend/'
REPOSITORY                                TAG        IMAGE ID       CREATED         SIZE
express-backend                           latest     66841bee2f3b   2 hours ago     1.14GB

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ 
```

# Make sure can run `express-backend:latest` inside minikube

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack] (main)
└─$ minikube ssh -- docker run --rm express-backend:latest
Server is running on http://localhost:3000
^CGot SIGINT (aka ctrl-c in docker). Graceful shutdown  2025-03-02T12:32:05.868Z

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack] (main)
└─$
```

# Make sure to mount your `host backend folder` to `minikube VM` so that minikube can access it

- Note: You have to keep the terminal alive

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack] (main)
└─$ minikube mount /home/klx/Desktop/note-k8s/07.fullstack/backend:/mnt/backend
📁  Mounting host path /home/klx/Desktop/note-k8s/07.fullstack/backend into VM as /mnt/backend ...
    ▪ Mount type:   9p
    ▪ User ID:      docker
    ▪ Group ID:     docker
    ▪ Version:      9p2000.L
    ▪ Message Size: 262144
    ▪ Options:      map[]
    ▪ Bind Address: 192.168.49.1:38263
🚀  Userspace file server: ufs starting
✅  Successfully mounted /home/klx/Desktop/note-k8s/07.fullstack/backend to /mnt/backend

📌  NOTE: This process must stay alive for the mount to be accessible ...
```

# Make sure `Deployment` `express-backend` is created and have `Available=1`

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl apply -f 05-Deployment-express-backend.yaml
deployment.apps/express-backend created

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl get deployment                             
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
express-backend   1/1     1            1           5s
mysql             1/1     1            1           106m

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ 
```

# Make sure `Pod created from Deployment express-backend` show the correct `logs`

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl get pod       
NAME                               READY   STATUS    RESTARTS   AGE
express-backend-698cf555f7-j82mq   1/1     Running   0          46s
mysql-78f6848fdc-scxtr             1/1     Running   0          107m

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl logs express-backend-698cf555f7-j82mq
Server is running on http://localhost:3000

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$
```

# Make sure `Service` `express-backend` is created

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl apply -f 06-Service-express-backend.yaml   
service/express-backend created

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl get svc                                 
NAME              TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
express-backend   ClusterIP   10.101.141.128   <none>        3000/TCP   4s
kubernetes        ClusterIP   10.96.0.1        <none>        443/TCP    34h
mysql             ClusterIP   10.97.249.233    <none>        3306/TCP   104m

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ 
```

# Make sure to mount your `host frontend folder` to `minikube VM` so that minikube can access it

- Note: You have to keep the terminal alive

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ minikube mount /home/klx/Desktop/note-k8s/07.fullstack/frontend:/mnt/frontend
📁  Mounting host path /home/klx/Desktop/note-k8s/07.fullstack/frontend into VM as /mnt/frontend ...
    ▪ Mount type:   9p
    ▪ User ID:      docker
    ▪ Group ID:     docker
    ▪ Version:      9p2000.L
    ▪ Message Size: 262144
    ▪ Options:      map[]
    ▪ Bind Address: 192.168.49.1:40561
🚀  Userspace file server: ufs starting
✅  Successfully mounted /home/klx/Desktop/note-k8s/07.fullstack/frontend to /mnt/frontend

📌  NOTE: This process must stay alive for the mount to be accessible ...
```

# Make sure to load image `vite-dev:latest` to `minikube`

- Note: Will take long time, maybe 30s or more

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ minikube ssh -- docker images | awk 'NR==1 || /vite-dev/'
REPOSITORY                                TAG        IMAGE ID       CREATED         SIZE

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ minikube image load vite-dev:latest

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ minikube ssh -- docker images | awk 'NR==1 || /vite-dev/'
REPOSITORY                                TAG        IMAGE ID       CREATED             SIZE
vite-dev                                  latest     3adcdece3187   37 hours ago        1.69GB

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ 
```

# Make sure `Deployment` `vite-dev` is created and have `Available=1`

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl apply -f 07-Deployment-vite-dev.yaml
deployment.apps/vite-dev created

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl get deployment
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
express-backend   1/1     1            1           19m
mysql             1/1     1            1           126m
vite-dev          1/1     1            1           15s

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ 
```

# Make sure `Service` `vite-dev` is created

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl apply -f 08-Service-vite-dev.yaml   
service/vite-dev created

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl get svc                          
NAME              TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
express-backend   ClusterIP   10.101.141.128   <none>        3000/TCP   16m
kubernetes        ClusterIP   10.96.0.1        <none>        443/TCP    34h
mysql             ClusterIP   10.97.249.233    <none>        3306/TCP   120m
vite-dev          ClusterIP   10.99.240.233    <none>        5173/TCP   5s

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ 
```

# Make sure to mount your `host dist folder` to `minikube VM` so that minikube can access it

- Note: You have to keep the terminal alive

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/frontend] (main)
└─$ minikube mount /home/klx/Desktop/note-k8s/07.fullstack/frontend/vite/dist:/mnt/dist
📁  Mounting host path /home/klx/Desktop/note-k8s/07.fullstack/frontend/vite/dist into VM as /mnt/dist ...
    ▪ Mount type:   9p
    ▪ User ID:      docker
    ▪ Group ID:     docker
    ▪ Version:      9p2000.L
    ▪ Message Size: 262144
    ▪ Options:      map[]
    ▪ Bind Address: 192.168.49.1:40059
🚀  Userspace file server: ufs starting
✅  Successfully mounted /home/klx/Desktop/note-k8s/07.fullstack/frontend/vite/dist to /mnt/dist

📌  NOTE: This process must stay alive for the mount to be accessible ...
```

# Make sure `Deployment` `nginx-static` is created and have `Available=1`

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl apply -f 09-Deployment-nginx-static.yaml     
deployment.apps/nginx-static created

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl get deployment                          
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
express-backend   1/1     1            1           30m
mysql             1/1     1            1           137m
nginx-static      1/1     1            1           8s
vite-dev          1/1     1            1           11m

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ 
```

# Make sure `Service` `nginx-static` is created

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl apply -f 10-Service-nginx-static.yaml   
service/nginx-static created
                                                                                                       
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl get svc                              
NAME              TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
express-backend   ClusterIP   10.101.141.128   <none>        3000/TCP   27m
kubernetes        ClusterIP   10.96.0.1        <none>        443/TCP    34h
mysql             ClusterIP   10.97.249.233    <none>        3306/TCP   132m
nginx-static      ClusterIP   10.105.54.19     <none>        80/TCP     4s
vite-dev          ClusterIP   10.99.240.233    <none>        5173/TCP   11m
                                                                                                       
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ 
```

# Port forward service that you like

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack/yaml] (main)
└─$ kubectl port-forward svc/nginx-static 8080:80
Forwarding from 127.0.0.1:8080 -> 80
Forwarding from [::1]:8080 -> 80
```

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack] (main)
└─$ curl localhost:8080 
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
    <script type="module" crossorigin src="/assets/index-DDdIXdMS.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-n_ryQ3BS.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
                                                                                                       
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s/07.fullstack] (main)
└─$ 
```