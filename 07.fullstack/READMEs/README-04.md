# Service mysql

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql # Service's name
spec:
  selector: # Direct traffic from service to pod that match selector
    app: mysql
  ports: # This maps incoming traffic on port 3306 of the Service to port 3306 of the matching pods
  - port: 3306 # The port that the Service exposes within the cluster, you can change `port`
    targetPort: 3306 # The port on the pod where the MySQL container is listening, you can not change `targetPort`, it have to be 3306 for MySQL
  type: ClusterIP # Specifies that the Service is accessible only within the cluster (an internal IP is assigned)
```

# Explain

This configuration file defines a Kubernetes Service.