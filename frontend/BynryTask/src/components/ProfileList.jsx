import React from "react";
import ProfileCard from "./ProfileCard";

function ProfileList({ profiles, onSummaryClick, onViewDetails, onEditClick, onDeleteClick }) {
  return (
    <div className="space-y-6">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onSummaryClick={onSummaryClick}
          onViewDetails={onViewDetails}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
}

export default ProfileList;