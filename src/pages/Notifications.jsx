import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Layout from '../components/layout/Layout';
import NotificationCenter from '../components/notifications/NotificationCenter';
import { 
  BellIcon, 
  MailIcon, 
  MessageSquareIcon, 
  CalendarIcon,
  SettingsIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  ClockIcon
} from 'lucide-react';
import '../styles/notifications-theme.css';

// Mock notification analytics
const NOTIFICATION_ANALYTICS = {
  totalSent: 15847,
  delivered: 15234,
  opened: 12456,
  clicked: 8923,
  deliveryRate: 96.1,
  openRate: 81.8,
  clickRate: 71.7
};

// Mock recent activity
const RECENT_ACTIVITY = [
  {
    id: 1,
    type: 'session_reminder',
    message: 'Session reminder sent to 45 students',
    timestamp: new Date(Date.now() - 300000),
    status: 'delivered'
  },
  {
    id: 2,
    type: 'payment_alert',
    message: 'Payment due reminders sent to 12 students',
    timestamp: new Date(Date.now() - 1800000),
    status: 'delivered'
  },
  {
    id: 3,
    type: 'system_update',
    message: 'Maintenance notification sent to all users',
    timestamp: new Date(Date.now() - 3600000),
    status: 'delivered'
  }
];

const Notifications = () => {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('center');

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <Layout>
      <div className="notifications-container">
        <div className="notifications-overlay"></div>
        <div className="notifications-content">
          {/* Header */}
          <div className="notifications-header">
            <div className="notifications-header-content">
              <div className="notifications-title">
                <div className="notifications-title-icon">
                  <BellIcon className="h-8 w-8" />
                </div>
                <div>
                  <h1>Notification Management</h1>
                  <p className="notifications-subtitle">
                    Manage your notifications and communication preferences
                  </p>
                </div>
              </div>
              
              <div className="notifications-quick-stats">
                <div className="notifications-stat-card">
                  <div className="notifications-stat-header">
                    <MailIcon className="h-5 w-5" />
                    <span className="notifications-stat-title">Email Notifications</span>
                  </div>
                  <p className="notifications-stat-description">Enabled for all types</p>
                </div>
                <div className="notifications-stat-card">
                  <div className="notifications-stat-header">
                    <MessageSquareIcon className="h-5 w-5" />
                    <span className="notifications-stat-title">SMS Alerts</span>
                  </div>
                  <p className="notifications-stat-description">High priority only</p>
                </div>
                <div className="notifications-stat-card">
                  <div className="notifications-stat-header">
                    <CalendarIcon className="h-5 w-5" />
                    <span className="notifications-stat-title">Session Reminders</span>
                  </div>
                  <p className="notifications-stat-description">30 mins before</p>
                </div>
                <div className="notifications-stat-card">
                  <div className="notifications-stat-header">
                    <CheckCircleIcon className="h-5 w-5" />
                    <span className="notifications-stat-title">Auto-responses</span>
                  </div>
                  <p className="notifications-stat-description">Active templates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="notifications-main-card">
            <div className="notifications-tabs">
              <nav className="notifications-tabs-nav">
                <button
                  onClick={() => setActiveTab('center')}
                  className={`notifications-tab-button ${activeTab === 'center' ? 'active' : ''}`}
                >
                  <BellIcon className="h-4 w-4" />
                  <span>Notification Center</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`notifications-tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
                >
                  <TrendingUpIcon className="h-4 w-4" />
                  <span>Analytics</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`notifications-tab-button ${activeTab === 'settings' ? 'active' : ''}`}
                >
                  <SettingsIcon className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>

            <div className="notifications-tab-content">
              {activeTab === 'center' && <NotificationCenter />}
              
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <h3 className="notifications-section-title">Notification Analytics</h3>
                  
                  {/* Analytics Overview */}
                  <div className="notifications-analytics-grid">
                    <div className="notifications-analytics-card">
                      <div className="notifications-analytics-header">
                        <span className="notifications-analytics-label">Total Sent</span>
                        <div className="notifications-analytics-icon">
                          <MailIcon className="h-4 w-4 text-blue-500" />
                        </div>
                      </div>
                      <p className="notifications-analytics-value">{NOTIFICATION_ANALYTICS.totalSent.toLocaleString()}</p>
                    </div>
                    
                    <div className="notifications-analytics-card">
                      <div className="notifications-analytics-header">
                        <span className="notifications-analytics-label">Delivered</span>
                        <div className="notifications-analytics-icon">
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                      <p className="notifications-analytics-value">{NOTIFICATION_ANALYTICS.delivered.toLocaleString()}</p>
                      <p className="notifications-analytics-metric positive">{NOTIFICATION_ANALYTICS.deliveryRate}% delivery rate</p>
                    </div>
                    
                    <div className="notifications-analytics-card">
                      <div className="notifications-analytics-header">
                        <span className="notifications-analytics-label">Opened</span>
                        <div className="notifications-analytics-icon">
                          <TrendingUpIcon className="h-4 w-4 text-orange-500" />
                        </div>
                      </div>
                      <p className="notifications-analytics-value">{NOTIFICATION_ANALYTICS.opened.toLocaleString()}</p>
                      <p className="notifications-analytics-metric neutral">{NOTIFICATION_ANALYTICS.openRate}% open rate</p>
                    </div>
                    
                    <div className="notifications-analytics-card">
                      <div className="notifications-analytics-header">
                        <span className="notifications-analytics-label">Clicked</span>
                        <div className="notifications-analytics-icon">
                          <MessageSquareIcon className="h-4 w-4 text-purple-500" />
                        </div>
                      </div>
                      <p className="notifications-analytics-value">{NOTIFICATION_ANALYTICS.clicked.toLocaleString()}</p>
                      <p className="notifications-analytics-metric neutral">{NOTIFICATION_ANALYTICS.clickRate}% click rate</p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="notifications-activity-feed">
                    <h4 className="notifications-activity-title">Recent Activity</h4>
                    <div className="notifications-activity-list">
                      {RECENT_ACTIVITY.map((activity) => (
                        <div key={activity.id} className="notifications-activity-item">
                          <div className="notifications-activity-content">
                            <div className="notifications-activity-icon">
                              <BellIcon className="h-4 w-4" />
                            </div>
                            <div className="notifications-activity-details">
                              <h4>{activity.message}</h4>
                              <p className="notifications-activity-time">
                                <ClockIcon className="h-3 w-3" />
                                {formatTimeAgo(activity.timestamp)}
                              </p>
                            </div>
                          </div>
                          <span className={`notifications-activity-status ${activity.status}`}>
                            {activity.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Chart Placeholder */}
                  <div className="notifications-chart-placeholder">
                    <div className="notifications-chart-content">
                      <div className="notifications-chart-icon">
                        <TrendingUpIcon className="h-12 w-12" />
                      </div>
                      <h4 className="notifications-chart-title">Notification Performance Trends</h4>
                      <p className="notifications-chart-description">Performance chart would be displayed here</p>
                      <p className="notifications-chart-description">Integration with analytics service required</p>
                    </div>
                  </div>
                </div>
              )}
            
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="notifications-section-title">Notification Preferences</h3>
                  
                  {/* General Settings */}
                  <div className="notifications-settings-section">
                    <h4 className="notifications-settings-title">General Settings</h4>
                    <div className="notifications-settings-list">
                      <div className="notifications-setting-item">
                        <div className="notifications-setting-content">
                          <div>
                            <h4>Enable All Notifications</h4>
                            <p>Master toggle for all notification types</p>
                          </div>
                        </div>
                        <label className="notifications-toggle">
                          <input type="checkbox" defaultChecked />
                          <span className="notifications-toggle-slider"></span>
                        </label>
                      </div>
                      
                      <div className="notifications-setting-item">
                        <div className="notifications-setting-content">
                          <div>
                            <h4>Do Not Disturb Mode</h4>
                            <p>Pause non-urgent notifications during study hours</p>
                          </div>
                        </div>
                        <label className="notifications-toggle">
                          <input type="checkbox" />
                          <span className="notifications-toggle-slider"></span>
                        </label>
                      </div>
                      
                      <div className="notifications-setting-item">
                        <div className="notifications-setting-content">
                          <div>
                            <h4>Smart Grouping</h4>
                            <p>Group similar notifications to reduce clutter</p>
                          </div>
                        </div>
                        <label className="notifications-toggle">
                          <input type="checkbox" defaultChecked />
                          <span className="notifications-toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Channel Settings */}
                  <div className="notifications-settings-section">
                    <h4 className="notifications-settings-title">Notification Channels</h4>
                    <div className="notifications-settings-list">
                      <div className="notifications-setting-item">
                        <div className="notifications-setting-content">
                          <div className="notifications-setting-icon">
                            <MailIcon className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="notifications-setting-details">
                            <h4>Email Notifications</h4>
                            <p>Receive notifications via email</p>
                          </div>
                        </div>
                        <label className="notifications-toggle">
                          <input type="checkbox" defaultChecked />
                          <span className="notifications-toggle-slider"></span>
                        </label>
                      </div>
                      
                      <div className="notifications-setting-item">
                        <div className="notifications-setting-content">
                          <div className="notifications-setting-icon">
                            <MessageSquareIcon className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="notifications-setting-details">
                            <h4>SMS Alerts</h4>
                            <p>Receive urgent notifications via SMS</p>
                          </div>
                        </div>
                        <label className="notifications-toggle">
                          <input type="checkbox" defaultChecked />
                          <span className="notifications-toggle-slider"></span>
                        </label>
                      </div>
                      
                      <div className="notifications-setting-item">
                        <div className="notifications-setting-content">
                          <div className="notifications-setting-icon">
                            <BellIcon className="h-5 w-5 text-purple-500" />
                          </div>
                          <div className="notifications-setting-details">
                            <h4>Push Notifications</h4>
                            <p>Browser and mobile push notifications</p>
                          </div>
                        </div>
                        <label className="notifications-toggle">
                          <input type="checkbox" defaultChecked />
                          <span className="notifications-toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Timing Settings */}
                  <div className="notifications-settings-section">
                    <h4 className="notifications-settings-title">Timing Preferences</h4>
                    <div className="notifications-form-group">
                      <div className="notifications-form-field">
                        <label className="notifications-form-label">Session Reminder Time</label>
                        <select className="notifications-form-select">
                          <option value="15">15 minutes before</option>
                          <option value="30" selected>30 minutes before</option>
                          <option value="60">1 hour before</option>
                          <option value="120">2 hours before</option>
                        </select>
                      </div>
                      
                      <div className="notifications-form-field">
                        <label className="notifications-form-label">Quiet Hours</label>
                        <select className="notifications-form-select">
                          <option value="none">No quiet hours</option>
                          <option value="22-08">10 PM - 8 AM</option>
                          <option value="23-07">11 PM - 7 AM</option>
                          <option value="00-06">12 AM - 6 AM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="notifications-actions">
                    <button className="notifications-btn notifications-btn-primary">
                      Save Preferences
                    </button>
                    <button className="notifications-btn notifications-btn-secondary">
                      Reset to Defaults
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
