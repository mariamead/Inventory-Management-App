import './profilePage.css';
import { useUser } from '@clerk/clerk-react';
import { useUserProfileEdit } from '../../hooks/useUserProfileEdit';

export default function ProfilePage() {
  const { user } = useUser();

  const {
    isEditing,
    data,
    tempData,
    handleEdit,
    handleSave,
    handleCancel,
    onChange
  } = useUserProfileEdit(user?.id || '');

  return (
    <section className="profile-section">
      <div className="profile-container">
        <div className="profile-layout">
          <div className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="profile-avatar"
                />
                <p className="text-muted mb-1">{data.name}</p>
              </div>
            </div>
          </div>
          <div className="profile-main">
            <div className="profile-card">
              <div className="profile-card-body">
                <div className="profile-header">
                  <h2>Profile Information</h2>
                  {!isEditing ? (
                    <button onClick={handleEdit} className="btn-edit">Edit</button>
                  ) : (
                    <div className="btn-group">
                      <button onClick={handleSave} className="btn-save">Save</button>
                      <button onClick={handleCancel} className="btn-cancel">Cancel</button>
                    </div>
                  )}
                </div>

                <div className="profile-row">
                  <div className="profile-label">Full Name</div>
                  <div className="profile-value">
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.name}
                        onChange={(e) => onChange('name', e.target.value)}
                        className="profile-input"
                      />
                    ) : (
                      data.name
                    )}
                  </div>
                </div>
                <hr />
                <div className="profile-row">
                  <div className="profile-label">Email</div>
                  <div className="profile-value">
                    {isEditing ? (
                      <input
                        type="email"
                        value={tempData.email}
                        onChange={(e) => onChange('email', e.target.value)}
                        className="profile-input"
                      />
                    ) : (
                      data.email
                    )}
                  </div>
                </div>
                <hr />
                <div className="profile-row">
                  <div className="profile-label">Phone</div>
                  <div className="profile-value">
                    {isEditing ? (
                      <input
                        type="tel"
                        value={tempData.phone}
                        onChange={(e) => onChange('phone', e.target.value)}
                        className="profile-input"
                      />
                    ) : (
                      data.phone
                    )}
                  </div>
                </div>
                <hr />
                <div className="profile-row">
                  <div className="profile-label">Address</div>
                  <div className="profile-value">
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.address}
                        onChange={(e) => onChange('address', e.target.value)}
                        className="profile-input"
                      />
                    ) : (
                      data.address
                    )}
                  </div>
                </div>
                <hr />
                <div className="profile-row">
                  <div className="profile-label">Location</div>
                  <div className="profile-value">
                    {isEditing ? (
                      <select 
                        className="profile-input"
                        value={tempData.locationId ?? ""}
                        onChange={(e) => onChange('locationId', e.target.value)}
                        >
                        <option value="">Select a location</option>
                        <option value="1">Warehouse A</option>
                        <option value="2">Warehouse B</option>
                        <option value="3">Warehouse C</option>
                        <option value="4">Warehouse D</option>

                      </select>
                    ) : (
                      "Not set"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Source: https://mdbootstrap.com/docs/react/extended/profiles/