import ProfileMainComponent from "../profile/ProfileMainComponent";
import { ProtectedRoute } from "./ProtectedRoute";

function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileMainComponent />
    </ProtectedRoute>
  );
}

export default ProfilePage;