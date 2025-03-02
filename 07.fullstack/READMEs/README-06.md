# Service mysql

```yaml
apiVersion: v1
kind: Service
metadata:
  name: express-backend
spec:
  selector:
    app: express-backend
  ports:
  - port: 3000
    targetPort: 3000
  type: ClusterIP
```

# Explain

This YAML file defines a Service for your Express.js backend, which lets other components within the cluster reach your backend pod.
In summary, this Service routes internal cluster traffic arriving at port 3000 to the Express.js pods (running on container port 3000) that are labeled with `app: express-backend`