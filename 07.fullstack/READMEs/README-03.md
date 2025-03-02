# Deployment mysql

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql # deployment’s name
spec:
  replicas: 1 # Specifies that only one pod should run
  selector: # Tells the Deployment which pods to manage
    matchLabels:
      app: mysql
  template: # Defines the pod that will be created
    metadata:
      labels:
        app: mysql 
    spec:
      containers:
      - name: mysql # The container’s name
        image: mysql:9.2.0 # Image from docker hub
        env:
        - name: MYSQL_ROOT_PASSWORD # Root password
          value: "rootpassword"
        - name: MYSQL_DATABASE # Name of the initial database
          value: "mydatabase"
        - name: MYSQL_USER # Username for the database
          value: "user"
        - name: MYSQL_PASSWORD # Password for that user
          value: "password"
        ports: # Documents which port your container intends to use
        - containerPort: 3306
        volumeMounts: # Mounts the volume named `mysql-storage` at `/var/lib/mysql` (where MySQL stores its data)
        - name: mysql-storage
          mountPath: /var/lib/mysql
      volumes: # Defines the volumes available to the pod
      - name: mysql-storage
        persistentVolumeClaim: # Attaches the PVC (which is bound to our PV) so that MySQL data persists even if the pod restarts
          claimName: mysql-pvc
```

# Explain

This configuration ensures that your MySQL deployment uses persistent storage (via the PVC) and is properly configured with environment variables and ports