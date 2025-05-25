import React from "react";

function ProfileDetails({ profile, onBack }) {
  if (!profile) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <button
        onClick={onBack}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to list
      </button>

      <img
        src={profile.photo}
        alt={profile.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
      <p className="text-gray-700 mb-2">{profile.description}</p>
      <p className="text-gray-500 text-sm">
        <strong>Address:</strong> {profile.address}
      </p>

      {/* I'll add more fields like email, interests, etc. later */}
    </div>
  );
}

export default ProfileDetails;