# Profile Mapping React App

This React application allows users to view, search, and manage profiles, and interactively explore their addresses on a map. It includes features such as profile CRUD operations, dynamic map display with Leaflet, responsive UI, and smooth user experience enhancements.

---

## Features

- Display a list of profiles with photos, names, and descriptions.
- Search and filter profiles by name or other attributes.
- View profile location on an interactive Leaflet map by clicking the **Summary** button.
- View detailed profile information.
- Add, edit, and delete profiles.
- Responsive design for desktop and mobile devices.
- Loading indicators using a custom spinner.
- Toast notifications for success and error feedback using `react-toastify`.

---

## Tech Stack

- React 18 (with Vite)
- Tailwind CSS for styling
- Leaflet for interactive maps
- React Toastify for notifications
- React Router (if applicable)
- Fetch API for backend calls (currently mock/local data or to be connected with backend later)

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v16 or later recommended)
- npm or yarn package manager

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/SumiBa/Profile-Mapping-App-Bynry.git  
cd Profile-Mapping-App-Bynry/frontend

2. **Install Dependencies**

npm install

3. **Available Scripts**

npm run dev

**Key Dependencies**

- react and react-dom: React framework  
- vite: Development server and build tool  
- tailwindcss: Utility-first CSS framework  
- leaflet and react-leaflet: Interactive maps  
- react-toastify: Toast notifications  
- @vitejs/plugin-react: Vite plugin for React support

**How to Use**

- View profiles: Profiles are listed on the homepage.  
- Search: Use the search bar to filter profiles by name.  
- Summary button: Click to view the selected profile’s location on the map.  
- View Details: Click to see detailed profile information.  
- Add Profile: Use the form to add a new profile.  
- Edit/Delete: Use the respective buttons on each profile card to update or remove profiles.  
- Notifications: Success or error messages appear via toast notifications.  
- Loading: Custom spinner shows during data fetching or map loading.

