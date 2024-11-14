import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-14 items-center">
            <Link to="/" className="flex items-center">
              <span className="font-bold">E-commerce</span>
            </Link>

            <div className="flex items-center gap-4">
              <Button onClick={() => navigate("/auth/login")}>Sign in</Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
