# Build your images locally from their respective folders

```bash
docker build -t express-backend:latest ./backend
docker build -t vite-dev:latest ./frontend
```

# Apply k8s configuration file for fullstack

```bash
kubectl apply -f stack.yaml
```