import Role from "../schemas/role_schemas.js";

export async function createrole(roles) {
  try {
    const role = new Role({
      role_name: roles.role_name,
      role_id: roles.role_id,
      status: roles.status,
      created_at: Date.now(),
    });
    const newrole = await role.save();
    return newrole;
  } catch (err) {
    throw new Error(err.message);
  }
}
