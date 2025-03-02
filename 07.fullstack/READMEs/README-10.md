# Service mysql

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-static
spec:
  selector:
    app: nginx-static
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP
```

# Explain

This Service exposes your Nginx deployment within the cluster.
In summary, this configuration allows internal cluster components to reach your static Nginx server on port 80.