import React, { useState, useEffect, useRef } from "react";

function AdminPanel({ onAddProfile, editingProfile, onUpdateProfile, onCancelEdit }) {
  const [form, setForm] = useState({
    name: "",
    photo: null,
    preview: "",
    description: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingProfile) {
      setForm({
        name: editingProfile.name || "",
        photo: null,
        preview: editingProfile.photo || "",
        description: editingProfile.description || "",
        address: editingProfile.address || "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setForm({
        name: "",
        photo: null,
        preview: "",
        description: "",
        address: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [editingProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({
      ...prev,
      photo: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || (!form.photo && !form.preview) || !form.address) {
      return alert("Name, photo, and address are required!");
    }

    setLoading(true);

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(form.address)}`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'BynryProfileApp/1.0',
        },
      });
      const data = await res.json();

      if (!data.length) {
        setLoading(false);
        return alert("Could not find location. Please enter a valid address.");
      }

      const { lat, lon } = data[0];

      const profileToSave = {
        id: editingProfile ? editingProfile.id : Date.now(),
        name: form.name,
        photo: form.preview,
        description: form.description,
        address: form.address,
        lat: parseFloat(lat),
        lng: parseFloat(lon),
      };

      if (editingProfile) {
        onUpdateProfile(profileToSave);
      } else {
        onAddProfile(profileToSave);
      }

      setForm({
        name: "",
        photo: null,
        preview: "",
        description: "",
        address: "",
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (err) {
      alert("Failed to fetch coordinates. Try again later.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingProfile ? "✏️ Edit Profile" : "➕ Add New Profile"}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
          className="border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
          className="border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Enter address"
          value={form.address}
          onChange={handleInputChange}
          className="border px-3 py-2 rounded"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="border px-3 py-2 rounded"
        />

        {form.preview && (
          <img
            src={form.preview}
            alt="Preview"
            className="col-span-1 w-32 h-32 object-cover rounded border"
          />
        )}

        <div className="col-span-full flex space-x-4">
          <button
            type="submit"
            className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex-1 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (editingProfile ? "Updating..." : "Adding...") : (editingProfile ? "Update Profile" : "Add Profile")}
          </button>

          {editingProfile && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex-1"
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AdminPanel;
