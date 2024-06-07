export const authRoles = {
  // sa: ["SA"], // Only Super Admin has access
  admin: ["ADMIN"], // Only SA & Admin has access
  manager: ["MANAGER", "ADMIN"],
  user: ["MANAGER", "ADMIN", "USER"],
    // editor: ["SA", "ADMIN", "EDITOR"], // Only SA & Admin & Editor has access
  // guest: ["MANAGER", "ADMIN", "USER"] // Everyone has access
};
