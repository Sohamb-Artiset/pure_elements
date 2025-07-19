import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { profile, user, loading } = useAuth();

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        <Card className="w-full max-w-md bg-white rounded shadow">
          <CardHeader>
            <CardTitle className="text-xl">Account Details</CardTitle>
            <CardDescription>View and manage your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center text-gray-500 py-8">Loading...</div>
            ) : profile ? (
              <div className="space-y-4">
                <div>
                  <span className="block text-gray-600 text-sm">Full Name</span>
                  <span className="block text-lg font-medium text-gray-900">{profile.full_name || "-"}</span>
                </div>
                <div>
                  <span className="block text-gray-600 text-sm">Email</span>
                  <span className="block text-lg font-medium text-gray-900">{profile.email || user?.email || "-"}</span>
                </div>
                <div>
                  <span className="block text-gray-600 text-sm">Phone</span>
                  <span className="block text-lg font-medium text-gray-900">{profile.phone || "-"}</span>
                </div>
                <div>
                  <span className="block text-gray-600 text-sm">Role</span>
                  <span className="block text-lg font-medium text-gray-900 capitalize">{profile.role || "user"}</span>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">No profile data found.</div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Profile; 