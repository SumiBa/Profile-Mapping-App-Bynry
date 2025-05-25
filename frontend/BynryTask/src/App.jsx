import { useState } from 'react';
import ProfileList from './components/ProfileList';
import Map from './components/Map';
import ProfileDetails from './components/ProfileDetails';
import AdminPanel from './components/AdminPanel';

function App() {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "John Doe",
      photo: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=300&q=80",
      description: "Software Developer from New York",
      address: "New York, NY, USA",
      lat: 40.7128,
      lng: -74.0060,
    },
    {
      id: 2,
      name: "Jane Smith",
      photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
      description: "Product Manager from California",
      address: "California, USA",
      lat: 36.7783,
      lng: -119.4179,
    }
  ]);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [detailedProfile, setDetailedProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');

  const handleSummaryClick = (profile) => {
    setSelectedProfile(profile);
    setDetailedProfile(null);
  };

  const handleViewDetails = (profile) => {
    setDetailedProfile(profile);
    setSelectedProfile(null);
  };

  const handleBackToList = () => {
    setDetailedProfile(null);
  };

  const uniqueLocations = [...new Set(profiles.map(p => p.address))];

  const filteredProfiles = profiles.filter(profile => {
    const matchesName = profile.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter ? profile.address === locationFilter : true;
    const matchesDescription = descriptionFilter
      ? profile.description.toLowerCase().includes(descriptionFilter.toLowerCase())
      : true;
    return matchesName && matchesLocation && matchesDescription;
  });

  const handleAddProfile = (newProfile) => {
    setProfiles(prev => [...prev, newProfile]);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setProfiles(prev =>
      prev.map(p => (p.id === updatedProfile.id ? updatedProfile : p))
    );
    setEditingProfile(null); 
  };

  const handleDeleteProfile = (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      setProfiles(prev => prev.filter(p => p.id !== id));
      if (selectedProfile?.id === id) setSelectedProfile(null);
      if (detailedProfile?.id === id) setDetailedProfile(null);
      if (editingProfile?.id === id) setEditingProfile(null);
    }
  };

  const handleEditProfile = (profile) => {
    setEditingProfile(profile);
  };

  const handleCancelEdit = () => {
    setEditingProfile(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Bynry Profile Mapping App
      </h1>

      {!detailedProfile && (
        <>
          <div className="max-w-md mx-auto mb-6 space-y-4">
            <input
              type="text"
              placeholder="Search profiles by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Filter by description keyword..."
              value={descriptionFilter}
              onChange={(e) => setDescriptionFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <AdminPanel
            onAddProfile={handleAddProfile}
            editingProfile={editingProfile}
            onUpdateProfile={handleUpdateProfile}
            onCancelEdit={handleCancelEdit}
          />
        </>
      )}

      {detailedProfile ? (
        <ProfileDetails profile={detailedProfile} onBack={handleBackToList} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileList
            profiles={filteredProfiles}
            onSummaryClick={handleSummaryClick}
            onViewDetails={handleViewDetails}
            onEditClick={handleEditProfile}        
            onDeleteClick={handleDeleteProfile}   
          />

          <div className="bg-white rounded-lg shadow-md p-4 min-h-[300px]">
            {selectedProfile ? (
              <Map
                key={selectedProfile.id}
                address={selectedProfile.address}
                name={selectedProfile.name}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Click "Summary" on a profile to see the map here.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;