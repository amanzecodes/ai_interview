import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <header className="fixed top-0 right-0">
        Hello This would appear everywhere in the auth route
      </header>
      {children}
    </div>
  );
};

export default AuthLayout;
