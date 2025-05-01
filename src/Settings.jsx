import { useState, useEffect, useRef } from 'react';
import { FiBell, FiUser, FiLogOut, FiCalendar, FiAward, FiEdit, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
  const [userProfile, setUserProfile] = useState(null);
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
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);
  const blobUrlRef = useRef(null);
  const navItems = ["Employee", "Projects", "LeaveManagement", "Feedback", "Settings"];

  const employeeId = userProfile?.employeeID || '';

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:5202/api/userprofile');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        const userData = data[0];
        const profileImage = userData.profileImage 
          ? `http://localhost:5202${userData.profileImage}`
          : '/images/profile.png';
        
        setUserProfile({ ...userData, profileImage });
        setImagePreview(profileImage);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    setError('');
    
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }

    try {
      const previewUrl = URL.createObjectURL(file);
      blobUrlRef.current = previewUrl;
      setImagePreview(previewUrl);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `http://localhost:5202/api/userprofile/updateprofilepicture/employee/${employeeId}`,
        { method: 'PUT', body: formData }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const { profileImage } = await response.json();
      const permanentUrl = `http://localhost:5202${profileImage}`;
      
      setImagePreview(permanentUrl);
      setUserProfile(prev => ({ 
        ...prev, 
        profileImage: permanentUrl 
      }));
      setSuccess('Profile image updated successfully');
      
      URL.revokeObjectURL(previewUrl);
      blobUrlRef.current = null;
    } catch (err) {
      setError(err.message);
      setImagePreview(userProfile?.profileImage || '/images/profile.png');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
  
    try {
      
      const currentPassword = passwordData.currentPassword.trim();
      const newPassword = passwordData.newPassword.trim();
      const confirmPassword = passwordData.confirmPassword.trim();
  
      if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error("All fields are required");
      }
  
      if (newPassword !== confirmPassword) {
        throw new Error("New passwords don't match");
      }
  
     
      console.log("Submitting:", { 
        currentPassword, 
        newPassword,
        employeeId
      });
  
      const response = await fetch(
        `http://localhost:5202/api/userprofile/changepassword/employee/${employeeId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentPassword,
            newPassword
          })
        }
      );
  
      const data = await response.json();
      
      if (!response.ok) {
        console.error("Server Error:", data);
        throw new Error(data.message || "Password change failed");
      }
  
      setSuccess("Password changed!");
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  
    } catch (err) {
      setError(err.message);
      console.error("Full Error:", {
        error: err,
        input: passwordData.currentPassword,
        storedHash: userProfile?.passwordHash
      });
    } finally {
      setLoading(false);
    }
  };
  
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };

  if (!userProfile) return <div className="loading">Loading...</div>;

  return (
    <div className="workforce-container">
      <nav className="workforce-navbar">
        <div className="brand-section">
          <img 
            src="/images/wp-logo.png" 
            alt="Company Logo" 
            className="company-logo"
          />
          <div className="nav-menu">
            {navItems.map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="nav-item"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div className="nav-controls">
          <FiBell className="nav-icon" />
          <FiUser className="nav-icon" />
          <FiLogOut className="nav-icon" />
        </div>
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
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
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
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
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
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
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
              <button type="button" className="btn-secondary">Cancel</button>
              <button type="submit" className="btn-primary" disabled={loading}>
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