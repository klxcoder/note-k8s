# What is StatefulSet

`StatefulSet` is useful for stateful applications like `databases` (MySQL, PostgreSQL, MongoDB) or apps that need `stable network identities` and `persistent storage`

# Key Differences: Deployment vs. StatefulSet

| Feature |	Deployment | StatefulSet |
| ------- |	---------- | ----------- |
| Use Case | Stateless apps (e.g., web servers) | Stateful apps (e.g., databases) |
| Pod Naming | Random (`pod-xyz123`) | Sequential (`my-app-0`, `my-app-1`) |
| Scaling	| All Pods are identical | Each Pod has a unique identity |
| Storage |	Shared (optional) | Each Pod gets a stable, persistent volume |

# Example: StatefulSet for MySQL

```yaml
# service.yaml
```

```yaml
# statefulset.yaml
```

# What Happends

- Creates 3 Pods: `mysql-0`, `mysql-1`, `mysql-2`.
- Each Pod gets a **separate**, **persistent storage** (`mysql-storage`).
- Even if a Pod restarts, it keeps the `same identity and storage`.

Use StatefulSet when ordering, stable names, or persistent storage is important! 🚀

# Kubectl

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl get all
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   9h

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl apply -f service.yaml
service/mysql-headless-service created

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl apply -f statefulset.yaml
statefulset.apps/mysql created

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl get all
NAME          READY   STATUS    RESTARTS   AGE
pod/mysql-0   1/1     Running   0          40s
pod/mysql-1   1/1     Running   0          33s
pod/mysql-2   1/1     Running   0          29s

NAME                             TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)    AGE
service/kubernetes               ClusterIP   10.96.0.1    <none>        443/TCP    9h
service/mysql-headless-service   ClusterIP   None         <none>        3306/TCP   53s

NAME                     READY   AGE
statefulset.apps/mysql   3/3     40s

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$
```

# Test

```
kubectl exec -it pod/mysql-0 -- mysql -u root -p
```
Enter the password you set in `MYSQL_ROOT_PASSWORD`

# Check the Current Hostname

Inside MySQL, run:

```sql
SELECT @@hostname;
```

# Example output
```bash
mysql> SELECT @@hostname;
+------------+
| @@hostname |
+------------+
| mysql-0    |
+------------+
1 row in set (0.00 sec)

mysql> 
```

# Create database

```sql
CREATE DATABASE test_db;
SHOW DATABASES;
```

# Example output
```bash
mysql> CREATE DATABASE test_db;
Query OK, 1 row affected (0.02 sec)

mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| test_db            |
+--------------------+
5 rows in set (0.01 sec)

mysql> 
```

# The database test_db is belong to only pod/mysql-0

```bash
(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ kubectl exec -it pod/mysql-1 -- mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 9.2.0 MySQL Community Server - GPL

Copyright (c) 2000, 2025, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)

mysql> exit
Bye

(base) ┌──(klx㉿kali)-[~/Desktop/note-k8s] (main)
└─$ 
```

# Clean up

```bash
(base) ┌──(klx㉿kali)-[~]
└─$ kubectl get all                             
NAME          READY   STATUS    RESTARTS   AGE
pod/mysql-0   1/1     Running   0          63m
pod/mysql-1   1/1     Running   0          63m
pod/mysql-2   1/1     Running   0          63m

NAME                             TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)    AGE
service/kubernetes               ClusterIP   10.96.0.1    <none>        443/TCP    10h
service/mysql-headless-service   ClusterIP   None         <none>        3306/TCP   64m

NAME                     READY   AGE
statefulset.apps/mysql   3/3     63m

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl delete statefulset mysql                    
statefulset.apps "mysql" deleted

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl delete service mysql-headless-service
service "mysql-headless-service" deleted

(base) ┌──(klx㉿kali)-[~]
└─$ kubectl get all                              
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   10h

(base) ┌──(klx㉿kali)-[~]
└─$ 
```