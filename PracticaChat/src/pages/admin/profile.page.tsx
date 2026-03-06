import FormProfile from "@/components/profile/form-profile";
import { useUser } from "reactfire";

const ProfilePage = () => {
  const {data: user} = useUser();

  if(!user) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-danger text-xl font-bold">Loading...</div>
  }

  return (
    <div className="container mx-auto max-w-xl mt-10 bg-surface rounded-xl shadow-lg p-8 flex flex-col items-center gap-6">
      <span className="text-accent text-4xl">👤</span>
      <h1 className="text-3xl font-bold text-text">Profile</h1>
      <FormProfile user={user}/>
    </div>
  )
};
export default ProfilePage