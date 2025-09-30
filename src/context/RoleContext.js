import React, { createContext, useContext, useState } from 'react';

const RoleCtx = createContext({ role: undefined, setRole: ()=>{} });

export function RoleProvider({ children }) {
  const [role, setRole] = useState(undefined);
  return <RoleCtx.Provider value={{ role, setRole }}>{children}</RoleCtx.Provider>;
}

export function useRole() {
  return useContext(RoleCtx);
}