# Deployment configuration file with replicas

```yaml
# deployment.yaml
```

# kubectl apply

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl get all
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   8h

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl apply -f deployment.yaml
deployment.apps/nginx-deployment created

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl get all                 
NAME                                    READY   STATUS              RESTARTS   AGE
pod/nginx-deployment-59bb5b4c6c-74xcm   0/1     ContainerCreating   0          4s
pod/nginx-deployment-59bb5b4c6c-wp99j   0/1     ContainerCreating   0          4s
pod/nginx-deployment-59bb5b4c6c-xmnc8   0/1     ContainerCreating   0          4s

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   8h

NAME                               READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/nginx-deployment   0/3     3            0           4s

NAME                                          DESIRED   CURRENT   READY   AGE
replicaset.apps/nginx-deployment-59bb5b4c6c   3         3         0       4s

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ 
```

# Clean up

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl delete deployment nginx-deployment
deployment.apps "nginx-deployment" deleted

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl get all                           
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   8h

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ 
```