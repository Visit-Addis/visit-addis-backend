const roles = Object.keys({ user: [], admin: [] });
const roleRights = new Map(Object.entries(allRoles));

const category = {
  attractions: ["historicals", "museums", "parks", "landmarks"],
  events: ["sports", "business", "culture", "festivals"],
  restaurants: ["traditional", "modern", "cafe"],
};

export { roles, roleRights, category };
