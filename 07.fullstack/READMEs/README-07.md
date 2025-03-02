# Service mysql

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vite-dev
spec:
  replicas: 1
  selector:
    matchLabels:
      app: vite-dev
  template:
    metadata:
      labels:
        app: vite-dev
    spec:
      containers:
      - name: vite-dev
        image: vite-dev:latest  # Build this image locally for Vite
        command: ["npm", "run", "dev"] # Overrides the container's default command to start the Vite dev server
        ports:
        - containerPort: 5173   # Indicates that the vite dev server container listens on port 5173
        volumeMounts:
        - name: vite-code
          mountPath: /app   # adjust according to your Dockerfile/workdir
      volumes:
      - name: vite-code
        hostPath:
          path: /path/to/your/vite/code  # update this to your local Vite source directory
```

# Explain

This YAML file defines a Kubernetes Deployment for your Vite development server.
This configuration allows you to run your Vite development server in a Kubernetes pod while binding your local code directory, enabling hot-reloads and immediate code updates during development.