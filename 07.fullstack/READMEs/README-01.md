# PersistentVolume mysql-pv

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: mysql-pv
spec:
  capacity:
    storage: 1Gi # Allocates 1Gi of storage space
  accessModes:
    - ReadWriteOnce # Only one node can mount the volume in read/write mode at a time
  hostPath:
    path: /tmp/mysql-data # adjust this path as needed
```

# Explain

This snippet defines a `PersistentVolume (PV)` in Kubernetes. It’s used to provide storage that remains intact even if the pods using it are restarted. Here’s the breakdown:

- `hostPath`: Specifies the path (`/tmp/mysql-data`) on the host machine where the data is stored. This is ideal for local development where the data persists on your machine.

In short, this PV gives MySQL a dedicated storage area that won’t be lost if you restart your containers.