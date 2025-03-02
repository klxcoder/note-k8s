# Service mysql

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: express-backend # deployment's name
spec:
  replicas: 1 # Runs one instance of pod
  selector:
    matchLabels:
      app: express-backend
  template:
    metadata:
      labels:
        app: express-backend
    spec:
      containers:
      - name: express-backend
        image: express-backend:latest  # Build this image locally
        ports:
        - containerPort: 3000
        env:
        - name: DB_HOST
          value: "mysql"
        - name: DB_USER
          value: "user"
        - name: DB_PASSWORD
          value: "password"
        - name: DB_NAME
          value: "mydatabase"
        volumeMounts:
        - name: express-code
          mountPath: /usr/src/app   # adjust according to your Dockerfile
      volumes:
      - name: express-code
        hostPath:
          path: /path/to/your/express/code  # update this path to your local code
```

# Explain

This setup lets your Express.js app connect to the MySQL service and dynamically load your local code for development