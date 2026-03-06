import Navbar from "@/components/navbar";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router"
import { useSigninCheck, useUser } from "reactfire";

const AdminLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  if (status === "loading" || !hasEmitted) {
    return <div>Loading...</div>;
  }

  //Redirigir si el usuario no está autenticado
  if (status === "success" && !signInCheckResult.signedIn) {
    return (
      <Navigate
        to="/auth/login"
        replace
      />
    )
  }

  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <AuthenticatedLayout/>
    </Suspense>
  )
}
export default AdminLayout

const AuthenticatedLayout = () => {
  useUser({
    suspense: true
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Navbar/>
      <main className="flex-1 flex flex-col container mx-auto p-4">
        <Outlet/>
      </main>
    </div>
  )
}