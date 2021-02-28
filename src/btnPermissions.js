import store from './store/index'
export function hasPermission (perms) {
  let hasPermission = false
  const permissions = store.state.permissions
  for (var i = 0; i < permissions.length; i++) {
    if (permissions[i] === perms) {
      hasPermission = true
      break
    }
  }
  return hasPermission
}
