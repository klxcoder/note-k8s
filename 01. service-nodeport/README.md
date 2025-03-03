# What is NodePort?

A NodePort service is the most basic way to get external traffic directly to your service.
NodePort, as the name implies, opens a specific port, and any traffic that is sent to this port is forwarded to the service.

# Example

```bash
(base) ┌──(klx㉿kali)-[~]
└─$ kubectl create deployment hello-minikube1 --image=kicbase/echo-server:1.0
deployment.apps/hello-minikube1 created

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl expose deployment hello-minikube1 --type=NodePort --port=8080
service/hello-minikube1 exposed

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl get svc                                                      
NAME              TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
hello-minikube1   NodePort    10.108.181.83   <none>        8080:30106/TCP   8s
kubernetes        ClusterIP   10.96.0.1       <none>        443/TCP          77m

(base) ┌──(klx㉿kali)-[~]
└─$ minikube service list
|----------------------|---------------------------|--------------|---------------------------|
|      NAMESPACE       |           NAME            | TARGET PORT  |            URL            |
|----------------------|---------------------------|--------------|---------------------------|
| default              | hello-minikube1           |         8080 | http://192.168.49.2:30106 |
| default              | kubernetes                | No node port |                           |
| kube-system          | kube-dns                  | No node port |                           |
| kubernetes-dashboard | dashboard-metrics-scraper | No node port |                           |
| kubernetes-dashboard | kubernetes-dashboard      | No node port |                           |
|----------------------|---------------------------|--------------|---------------------------|

(base) ┌──(klx㉿kali)-[~]
└─$ curl http://192.168.49.2:30106
Request served by hello-minikube1-767ff5f6bf-bj2rp

HTTP/1.1 GET /

Host: 192.168.49.2:30106
Accept: */*
User-Agent: curl/8.12.1

(base) ┌──(klx㉿kali)-[~]
```

# Clean up
```
(base) ┌──(klx㉿kali)-[~]
└─$ kubectl get deployments                 
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
hello-minikube1   1/1     1            1           8m57s

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl get services                    
NAME              TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
hello-minikube1   NodePort    10.108.181.83   <none>        8080:30106/TCP   8m13s
kubernetes        ClusterIP   10.96.0.1       <none>        443/TCP          85m

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl delete deployment hello-minikube1
deployment.apps "hello-minikube1" deleted

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl delete service hello-minikube1 
service "hello-minikube1" deleted

(base) ┌──(klx㉿kali)-[~]
└─$
```