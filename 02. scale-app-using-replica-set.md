# Example scale your app using replica set

```bash
(base) ┌──(klx㉿kali)-[~]
└─$ kubectl create deployment hello-minikube1 --image=kicbase/echo-server:1.0
deployment.apps/hello-minikube1 created

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl get deployments                                                  
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
hello-minikube1   1/1     1            1           17s

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl get rs         
NAME                         DESIRED   CURRENT   READY   AGE
hello-minikube1-767ff5f6bf   1         1         1       19s

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl scale deployments/hello-minikube1 --replicas=4
deployment.apps/hello-minikube1 scaled

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl get rs                                        
NAME                         DESIRED   CURRENT   READY   AGE
hello-minikube1-767ff5f6bf   4         4         4       100s

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl get deployments                               
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
hello-minikube1   4/4     4            4           105s

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl get pods       
NAME                               READY   STATUS    RESTARTS   AGE
hello-minikube1-767ff5f6bf-5lxrm   1/1     Running   0          26s
hello-minikube1-767ff5f6bf-5wj9f   1/1     Running   0          119s
hello-minikube1-767ff5f6bf-8vghx   1/1     Running   0          26s
hello-minikube1-767ff5f6bf-9hlnq   1/1     Running   0          26s

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl get pods -o wide
NAME                               READY   STATUS    RESTARTS   AGE    IP            NODE       NOMINATED NODE   READINESS GATES
hello-minikube1-767ff5f6bf-5lxrm   1/1     Running   0          30s    10.244.0.10   minikube   <none>           <none>
hello-minikube1-767ff5f6bf-5wj9f   1/1     Running   0          2m3s   10.244.0.8    minikube   <none>           <none>
hello-minikube1-767ff5f6bf-8vghx   1/1     Running   0          30s    10.244.0.11   minikube   <none>           <none>
hello-minikube1-767ff5f6bf-9hlnq   1/1     Running   0          30s    10.244.0.9    minikube   <none>           <none>

(base) ┌──(klx㉿kali)-[~]
└─$ 
```

# Clean up
```bash
(base) ┌──(klx㉿kali)-[~]
└─$ kubectl delete deployment hello-minikube1
deployment.apps "hello-minikube1" deleted

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl get all                          
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   95m

(base) ┌──(klx㉿kali)-[~]
└─$
```