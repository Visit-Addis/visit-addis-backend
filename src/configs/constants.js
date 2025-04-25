const roles = Object.keys({ user: [], admin: [] });
const roleRights = new Map(Object.entries(allRoles));

export { roles, roleRights };
