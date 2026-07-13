// Mirrors backend: section 3 of PROJECT_BRIEF.md — role → module access matrix

export type Role =
  | "super_admin"
  | "school_admin"
  | "principal"
  | "teacher"
  | "bursar"
  | "student"
  | "guardian";

export const ROLES: Record<Role, Role> = {
    super_admin: "super_admin",
    school_admin: "school_admin",
    principal: "principal",
    teacher: "teacher",
    bursar: "bursar",
    student: "student",
    guardian: "guardian",
};

// Base path each role lands on after login — matches app/(dashboard)/[role] folders
export const ROLE_DEFAULT_ROUTE: Record<Role, string> = {
    super_admin: "/schools",
    school_admin: "/school-admin/students",
    principal: "/principal/overview",
    teacher: "/teacher/my-classes",
    bursar: "/bursar/fees",
    student: "/student/grades",
    guardian: "/guardian/children",
};