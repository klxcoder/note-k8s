# Multi-container deployment

```yaml
# deployment.yaml
```

# kubectl apply

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl get all
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   8h

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl apply -f deployment.yaml
deployment.apps/multi-container-deployment created

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl get all
NAME                                              READY   STATUS    RESTARTS   AGE
pod/multi-container-deployment-64c884f7df-vknhl   2/2     Running   0          13s

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   8h

NAME                                         READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/multi-container-deployment   1/1     1            1           14s

NAME                                                    DESIRED   CURRENT   READY   AGE
replicaset.apps/multi-container-deployment-64c884f7df   1         1         1       14s

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl logs multi-container-deployment-64c884f7df-vknhl -c busybox-container-1
Hello from BusyBox1
Hello from BusyBox1
Hello from BusyBox1
Hello from BusyBox1
Hello from BusyBox1
Hello from BusyBox1
Hello from BusyBox1
Hello from BusyBox1
Hello from BusyBox1
Hello from BusyBox1
Hello from BusyBox1

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl logs multi-container-deployment-64c884f7df-vknhl -c busybox-container-2 
Hello from BusyBox2
Hello from BusyBox2
Hello from BusyBox2
Hello from BusyBox2
Hello from BusyBox2
Hello from BusyBox2
Hello from BusyBox2
Hello from BusyBox2
Hello from BusyBox2
Hello from BusyBox2
Hello from BusyBox2

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ 
```

# Clean up

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl delete deployment multi-container-deployment                           
deployment.apps "multi-container-deployment" deleted

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl get all
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   8h

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ 
```