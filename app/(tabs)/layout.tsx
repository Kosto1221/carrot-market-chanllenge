import TabBarAdvanced from "@/components/tab-bar-advanced";
import React from "react";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <TabBarAdvanced />
    </div>
  );
}
