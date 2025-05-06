const allRoles = {
  user: ["manage-profile", "review", "favorite"],
  admin: ["manage-profile", "manage-items"],
};
const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

const category = {
  attractions: ["historicals", "museums", "parks", "landmarks"],
  events: ["sports", "business", "culture", "festivals", "technology"],
  restaurants: ["traditional", "modern", "cafe"],
};

const tokenTypes = {
  ACCESS: "access",
  RESET: "reset",
  REFRESH: "refresh",
  VERIFY: "verify",
};
export { roles, roleRights, category, tokenTypes };
