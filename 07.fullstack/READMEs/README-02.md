# PersistentVolumeClaim mysql-pvc

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pvc
spec:
  volumeName: mysql-pv # Explicitly binds to the PersistentVolume mysql-pv
  accessModes:
    - ReadWriteOnce # Allows the volume to be mounted as read/write by a single node
  resources:
    requests:
      storage: 1Gi # Requests 1Gi of storage from the bound volume
```

# Explain

This configuration ensures that the PVC directly binds to the specified PV, providing the defined access and storage requirements.