const allRoles = { user: [], admin: [] };
const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

const category = {
  attractions: ["historicals", "museums", "parks", "landmarks"],
  events: ["sports", "business", "culture", "festivals"],
  restaurants: ["traditional", "modern", "cafe"],
};

const tokenTypes = {
  ACCESS: "access",
  RESET: "reset",
  REFRESH: "refresh",
  VERIFY: "verify",
};
export { roles, roleRights, category, tokenTypes };
