/**
 * Save User Info In Local Storage
 */
const UserStorage = ({userData}) => {
  for (const [key, value] of Object.entries(userData)) {
    localStorage.setItem(`${key}`, `${value}`)
  }
}


export default UserStorage;