"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Role } from "@/types/roles";

export default function Home() {
  const [role, setRole] = useState<Role>("super_admin");

  return (
    <div className="min-h-screen">
      <Topbar
        role={role}
        onMenuClick={() => console.log("menu")}
        onDemoRoleChange={setRole}
      />
    </div>
  );
}