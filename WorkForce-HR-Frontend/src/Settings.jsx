import { useState, useEffect, useRef } from 'react';
import { FiBell, FiUser, FiLogOut, FiCalendar, FiAward, FiEdit, FiEye, FiEyeOff, FiSave, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
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
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);
  const blobUrlRef = useRef(null);
  const navItems = ["Employee", "Projects", "LeaveManagement", "Feedback", "Settings"];

  // Get userId from localStorage. Ensure this is set correctly on login.
  const userId = localStorage.getItem('userId') || '1'; // Default to '1' for testing

  // Helper function to safely parse JSON responses
  const safeJsonParse = async (response) => {
    const text = await response.text();
    if (!text) return null; // Handle empty responses
    try {
      return JSON.parse(text);
    } catch (parseError) {
      // If parsing fails, the original text might still be useful (e.g., a plain error message)
      throw new Error(text || `Invalid JSON response: ${parseError.message}`);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        setError("User not identified. Please log in again.");
        setProfileLoading(false);
        return;
      }
      try {
        setProfileLoading(true);
        const response = await fetch(`http://localhost:5202/api/userprofile/${userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Failed to fetch profile`);
        }
        
        const data = await safeJsonParse(response);
        
        if (!data) {
          throw new Error('No profile data received from server');
        }
        
        const profileImage = data.profileImage 
          ? `http://localhost:5202${data.profileImage}`
          : '/images/profile.png'; // A default image path
        
        setUserProfile({ ...data, profileImage });
        setImagePreview(profileImage);
        
        // Initialize edit data with current profile data
        setEditData({
          department: data.department || '',
          skillLevel: data.skillLevel || 'Junior',
          startDate: data.startDate ? data.startDate.split('T')[0] : '',
          projectsCompleted: data.projectsCompleted || 0
        });
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError(`Failed to load profile: ${err.message}`);
      } finally {
        setProfileLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [userId]);

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
    setSuccess('');
    
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
        `http://localhost:5202/api/userprofile/updateprofilepicture/${userId}`,
        { method: 'PUT', body: formData }
      );

      if (!response.ok) {
        throw new Error(`Failed to update profile image`);
      }

      const result = await safeJsonParse(response);
      const permanentUrl = `http://localhost:5202${result.profileImage}`;
      
      setImagePreview(permanentUrl);
      setUserProfile(prev => ({ ...prev, profileImage: permanentUrl }));
      setSuccess('Profile image updated successfully');
      
      URL.revokeObjectURL(previewUrl);
      blobUrlRef.current = null;
    } catch (err) {
      console.error('Image upload error:', err);
      setError(err.message);
      // Revert to original image on error
      setImagePreview(userProfile?.profileImage || '/images/profile.png');
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (editMode) {
      // Reset edit data to current profile data when canceling
      setEditData({
        department: userProfile.department || '',
        skillLevel: userProfile.skillLevel || 'Junior',
        startDate: userProfile.startDate ? userProfile.startDate.split('T')[0] : '',
        projectsCompleted: userProfile.projectsCompleted || 0
      });
    }
    setEditMode(!editMode);
    setError('');
    setSuccess('');
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatePayload = {
        department: editData.department,
        skillLevel: editData.skillLevel,
        startDate: editData.startDate,
        projectsCompleted: parseInt(editData.projectsCompleted, 10) || 0,
        // Send the non-editable fields to ensure the backend model is satisfied
        fullName: userProfile.fullName,
        email: userProfile.email,
      };

      const response = await fetch(
        `http://localhost:5202/api/userprofile/updateprofile/${userId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatePayload)
        }
      );

      if (!response.ok) {
        const errorData = await safeJsonParse(response);
        throw new Error(errorData || `HTTP ${response.status}: Profile update failed`);
      }

      setUserProfile(prev => ({
        ...prev,
        department: editData.department,
        skillLevel: editData.skillLevel,
        startDate: editData.startDate,
        projectsCompleted: parseInt(editData.projectsCompleted, 10) || 0
      }));

      setEditMode(false);
      setSuccess("Profile updated successfully!");

    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message);
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
  
    try {
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            throw new Error("All password fields are required.");
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            throw new Error("New passwords don't match.");
        }

      const response = await fetch(
        `http://localhost:5202/api/userprofile/changepassword/${userId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword
          })
        }
      );
  
      if (!response.ok) {
        const errorData = await safeJsonParse(response);
        throw new Error(errorData || `HTTP ${response.status}: Password change failed`);
      }
  
      setSuccess("Password changed successfully!");
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  
    } catch (err) {
      console.error('Password change error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };

  if (profileLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error && !userProfile) {
    return <div className="error-container">Error: {error}</div>;
  }
  
  if (!userProfile) {
    return <div className="error-container">Could not load user profile. Please try logging in again.</div>;
  }


  return (
    <div className="workforce-container">
      <nav className="workforce-navbar">
        <div className="brand-section">
          <img src="/images/wp-logo.png" alt="Company Logo" className="company-logo"/>
          <div className="nav-menu">
            {navItems.map((item) => (
              <Link key={item} to={`/${item.toLowerCase()}`} className="nav-item">{item}</Link>
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
              className="profile-image"
              onError={(e) => { e.target.src = '/images/profile.png'; }}
            />
            <button 
              className="edit-avatar-btn"
              onClick={() => fileInputRef.current.click()}
              disabled={loading}
              title="Change Profile Picture"
            >
              <FiEdit />
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
            <div className="profile-header">
                <h1 className="user-name">{userProfile.fullName}</h1>
                {!editMode && (
                  <button className="edit-profile-btn" onClick={handleEditToggle} title="Edit Profile">
                    <FiEdit className="edit-icon" />
                  </button>
                )}
            </div>

            <div className="user-meta">
                <span className="employee-id">EMP-ID: {userProfile.employeeID}</span>
                <span className="user-email">{userProfile.email}</span>
            </div>
            
            <form onSubmit={handleProfileUpdate}>
              <div className="user-stats">
                 <div className="stat-card">
                  <FiAward className="stat-icon" />
                  <div>
                    <span className="stat-label">Department</span>
                    {editMode ? (
                      <input type="text" value={editData.department} onChange={(e) => handleEditChange('department', e.target.value)} className="stat-input" required />
                    ) : (
                      <span className="stat-value">{userProfile.department || 'Not set'}</span>
                    )}
                  </div>
                </div>

                <div className="stat-card">
                  <FiAward className="stat-icon" />
                  <div>
                    <span className="stat-label">Skill Level</span>
                    {editMode ? (
                      <select value={editData.skillLevel} onChange={(e) => handleEditChange('skillLevel', e.target.value)} className="stat-select">
                        <option value="Junior">Junior</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Senior">Senior</option>
                        <option value="Expert">Expert</option>
                      </select>
                    ) : (
                      <span className="stat-value pro-badge">{userProfile.skillLevel}</span>
                    )}
                  </div>
                </div>
                
                <div className="stat-card">
                  <FiCalendar className="stat-icon" />
                  <div>
                    <span className="stat-label">Start Date</span>
                    {editMode ? (
                      <input type="date" value={editData.startDate} onChange={(e) => handleEditChange('startDate', e.target.value)} className="stat-input" />
                    ) : (
                      <span className="stat-value">{userProfile.startDate ? new Date(userProfile.startDate).toLocaleDateString() : 'Not set'}</span>
                    )}
                  </div>
                </div>
                
                <div className="stat-card">
                  <FiEdit className="stat-icon" />
                  <div>
                    <span className="stat-label">Projects Completed</span>
                    {editMode ? (
                      <input type="number" value={editData.projectsCompleted} onChange={(e) => handleEditChange('projectsCompleted', e.target.value)} className="stat-input" min="0" />
                    ) : (
                      <span className="stat-value">{userProfile.projectsCompleted}</span>
                    )}
                  </div>
                </div>
              </div>
              
              {editMode && (
                <div className="form-actions-inline">
                  <button type="submit" className="btn btn-save" disabled={profileLoading}>
                    <FiSave className="btn-icon" />
                    {profileLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button type="button" className="btn btn-cancel" onClick={handleEditToggle} disabled={profileLoading}>
                    <FiX className="btn-icon" />
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </section>

        <div className="password-form-container">
          <h2 className="form-title">Change Password</h2>
          <form className="password-form" onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="input-wrapper">
                <input type={passwordVisibility.current ? "text" : "password"} id="currentPassword" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} required />
                <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('current')}>
                  {passwordVisibility.current ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="input-wrapper">
                <input type={passwordVisibility.new ? "text" : "password"} id="newPassword" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} required />
                <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('new')}>
                  {passwordVisibility.new ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <input type={passwordVisibility.confirm ? "text" : "password"} id="confirmPassword" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} required />
                <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('confirm')}>
                  {passwordVisibility.confirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
        
        {error && <div className="message error-message">{error}</div>}
        {success && <div className="message success-message">{success}</div>}
      </div>

      <button className="logout-btn">
        <FiLogOut className="logout-icon" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Settings;