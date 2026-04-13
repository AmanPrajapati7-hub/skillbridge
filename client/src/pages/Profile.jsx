import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { id } = useParams();
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    skills: '',
    profilePic: ''
  });
  const [loading, setLoading] = useState(true);

  const isOwnProfile = !id || id === user?._id;

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      let profileData;
      if (isOwnProfile) {
        const { data } = await API.get('/auth/me');
        profileData = data;
      } else {
        const { data } = await API.get(`/auth/user/${id}`);
        profileData = data;
      }
      setProfile(profileData);
      setForm({
        name: profileData.name || '',
        description: profileData.description || '',
        skills: profileData.skills?.join(', ') || '',
        profilePic: profileData.profilePic || ''
      });
      if (profileData.role === 'seller') {
        const gigRes = await API.get(`/gigs?seller=${profileData._id}`);
        setGigs(gigRes.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const { data } = await API.put('/auth/update', {
        name: form.name,
        description: form.description,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
        profilePic: form.profilePic
      });
      login(data);
      setProfile(data);
      setEditing(false);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error('Update failed!');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen text-gray-400">
      Loading...
    </div>
  );

  if (!profile) return (
    <div className="text-center py-20">Profile not found!</div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">

              {/* Profile Photo */}
              <div className="relative">
                {profile.profilePic ? (
                  <img
                    src={profile.profilePic}
                    alt={profile.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white"
                    style={{ backgroundColor: '#1DBF73' }}
                  >
                    {profile.name?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>

              <div>
                {editing ? (
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-xl font-bold outline-none mb-2"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  profile.role === 'seller'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {profile.role === 'seller' ? 'Seller' : 'Buyer'}
                </span>
                <p className="text-gray-500 text-sm mt-1">{profile.email}</p>
              </div>
            </div>

            {isOwnProfile && (
              <div className="flex gap-2">
                {editing ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      style={{ backgroundColor: '#1DBF73' }}
                      className="text-white px-4 py-2 rounded-lg font-semibold text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="border-2 border-green-500 text-green-600 px-4 py-2 rounded-lg font-semibold text-sm"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            )}
          </div>

          {/* About */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-2">About</h3>
            {editing ? (
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder="Tell us about yourself..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
              />
            ) : (
              <p className="text-gray-600">
                {profile.description || 'No description added yet.'}
              </p>
            )}
          </div>

          {/* Skills */}
          {(profile.role === 'seller' || editing) && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
              {editing ? (
                <input
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  placeholder="React, Node.js, Design (comma separated)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
                />
              ) : (
                <div className="flex gap-2 flex-wrap">
                  {profile.skills?.length > 0 ? (
                    profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No skills added.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Profile Photo URL */}
          {editing && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-2">Profile Photo URL</h3>
              <input
                value={form.profilePic}
                onChange={(e) => setForm({ ...form, profilePic: e.target.value })}
                placeholder="https://example.com/your-photo.jpg"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                Paste any image URL from the internet
              </p>
            </div>
          )}
        </div>

        {/* Seller Gigs */}
        {profile.role === 'seller' && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {isOwnProfile ? 'My Gigs' : `${profile.name}'s Gigs`}
            </h2>
            {gigs.length === 0 ? (
              <p className="text-gray-400">No gigs yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gigs.map((gig) => (
                  <div
                    key={gig._id}
                    onClick={() => navigate(`/gig/${gig._id}`)}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer"
                  >
                    {gig.image && (
                      <img
                        src={gig.image}
                        alt={gig.title}
                        className="w-full h-36 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {gig.title}
                      </h3>
                      <p className="text-green-600 font-bold">₹{gig.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;