import { useProfileStore } from '@/stores/ProfileStore';

export function usePermissions() {
  const store = useProfileStore();

  const hasPermission = (permissionName, actionName) => {
    return store.profile.permissions.some(
      (item) =>
        item.name === permissionName &&
        item.actions &&
        item.actions[actionName] === true
    );
  };

  return { hasPermission };
}
