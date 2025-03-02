# Service mysql

```yaml
apiVersion: v1
kind: Service
metadata:
  name: vite-dev
spec:
  selector:
    app: vite-dev
  ports:
  - port: 5173 # The Service's port that other pods will use to connect
    targetPort: 5173 # The port on the Vite container where the server is listening
  type: ClusterIP # Exposes the Service only within the cluster, providing an internal IP
```

# Explain

In summary, this Service makes your Vite dev server available at port 5173 to other components in your Kubernetes cluster