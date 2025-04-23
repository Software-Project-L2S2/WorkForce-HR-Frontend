import { useState, useEffect, useRef } from 'react';
import { FiBell, FiUser, FiLogOut, FiCalendar, FiAward, FiEdit, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Settings.css';
import { NavBar } from "./Navbar/NavBar";

export const Settings = () => {
  // Initialize with mock data immediately to prevent null state
  const [userProfile, setUserProfile] = useState({
    fullName: " ",
    employeeID: " ",
    department: " ",
    email: " ",
    skillLevel: " ",
    startDate:new Date().toISOString(),
    projectsCompleted: 5,
    profileImage: "/profile.png"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [imagePreview, setImagePreview] = useState('/profile.png');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);
  const blobUrlRef = useRef(null);
  const navItems = ["Employee", "Projects", "LeaveManagement", "Feedback", "Settings"];

  useEffect(() => {
    // Load mock data immediately without artificial delay
    setUserProfile({
      fullName: "John Doe",
      employeeID: "EMP123",
      department: "Engineering",
      email: "john.doe@example.com",
      skillLevel: "Advanced",
      startDate: "2023-01-15",
      projectsCompleted: 5,
      profileImage: "/profile.png"
    });
  }, []);;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    setError('');
    
    // Clean up previous blob URL if exists
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }

    try {
      // Create and set preview URL immediately
      const previewUrl = URL.createObjectURL(file);
      blobUrlRef.current = previewUrl;
      setImagePreview(previewUrl);

      // Simulate upload process
      setTimeout(() => {
        setUserProfile(prev => ({
          ...prev,
          profileImage: previewUrl
        }));
        setSuccess('Profile image updated successfully');
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to update profile image');
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
  
    try {
      const { currentPassword, newPassword, confirmPassword } = passwordData;
  
      // Validation
      if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error("All fields are required");
      }
  
      if (newPassword !== confirmPassword) {
        throw new Error("New passwords don't match");
      }
  
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success response
      setSuccess("Password changed successfully!");
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="workforce-container">
      <nav className="nav-container">
            <NavBar/>
            </nav>

      <div className="content-container">
        <section className="user-profile-section">
          <div className="avatar-section">
            <img 
              src={imagePreview}
              alt="profile" 
              className="profile"
              onError={(e) => {
                e.target.src = '/images/profile.png';
              }}
            />
            <button 
              className="edit-avatar-btn"
              onClick={() => fileInputRef.current.click()}
              disabled={loading}
            >
              <FiEdit className="edit-icon" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="file-input"
              accept="image/*"
              hidden
            />
          </div>

          <div className="user-info">
            <h1 className="user-name">{userProfile.fullName}</h1>
            <div className="user-meta">
              <span className="department">{userProfile.department}</span>
              <span className="employee-id">EMP-ID: {userProfile.employeeID}</span>
              <span className="user-email">{userProfile.email}</span>
            </div>

            <div className="user-stats">
              <div className="stat-card">
                <FiAward className="stat-icon" />
                <div>
                  <span className="stat-label">Skill Level</span>
                  <span className="stat-value pro-badge">{userProfile.skillLevel}</span>
                </div>
              </div>
              <div className="stat-card">
                <FiCalendar className="stat-icon" />
                <div>
                  <span className="stat-label">Start Date</span>
                  <span className="stat-value">
                    {new Date(userProfile.startDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="stat-card">
                <FiEdit className="stat-icon" />
                <div>
                  <span className="stat-label">Projects Completed</span>
                  <span className="stat-value">{userProfile.projectsCompleted}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="password-form-container">
          <h2 className="form-title">Change Password</h2>
          <form className="password-form" onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="input-wrapper">
                <input
                  type={passwordVisibility.current ? "text" : "password"}
                  id="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value
                  })}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {passwordVisibility.current ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="input-wrapper">
                <input
                  type={passwordVisibility.new ? "text" : "password"}
                  id="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value
                  })}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {passwordVisibility.new ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={passwordVisibility.confirm ? "text" : "password"}
                  id="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value
                  })}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {passwordVisibility.confirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setPasswordData({
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: ''
                })}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </div>
      </div>

      <button className="logout-btn">
        <FiLogOut className="logout-icon" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Settings;