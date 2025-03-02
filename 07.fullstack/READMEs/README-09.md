# Service mysql

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-static
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx-static
  template:
    metadata:
      labels:
        app: nginx-static
    spec:
      containers:
      - name: nginx
        image: nginx:alpine # Uses a lightweight Nginx image
        ports:
        - containerPort: 80 # Indicates the container listens on port 80
        volumeMounts:
        - name: static-content
          mountPath: /usr/share/nginx/html # Nginx’s default directory for static files
      volumes:
      - name: static-content
        hostPath:
          path: /path/to/your/vite/build  # Uses a directory on your host (where the Vite build output is located) to serve static files. Update this to your local Vite build folder
```

# Explain

This YAML creates a Deployment that runs an Nginx container to serve static content from your Vite build folder.
This setup enables Nginx to serve the static site built by Vite, with the content dynamically updated based on your local build folder.