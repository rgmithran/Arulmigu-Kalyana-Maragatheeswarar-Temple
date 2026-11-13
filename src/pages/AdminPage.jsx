import { useState, useEffect } from 'react';
import {
  Shield,
  Database,
  Flame,
  MessageSquare,
  Megaphone,
  Settings,
  Search,
  Plus,
  Trash2,
  Save,
  Check,
  RefreshCw,
} from 'lucide-react';
import {
  poojaApi,
  contactApi,
  announcementApi,
  settingApi,
  healthApi,
} from '../services/api';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'contacts', 'announcements', 'settings', 'health'
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Health state
  const [healthInfo, setHealthInfo] = useState(null);

  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [bookingFilter, setBookingFilter] = useState('all');
  const [bookingSearch, setBookingSearch] = useState('');

  // Contacts state
  const [contacts, setContacts] = useState([]);
  const [contactFilter, setContactFilter] = useState('all');

  // Announcements state
  const [announcements, setAnnouncements] = useState([]);
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    titleTa: '',
    titleEn: '',
    contentTa: '',
    contentEn: '',
    badgeTa: 'அறிவிப்பு',
    badgeEn: 'Notice',
    category: 'general',
    priority: 'normal',
    eventDate: '',
  });

  // Settings state
  const [settings, setSettings] = useState({
    annualFestivalDateTa: '',
    annualFestivalDateEn: '',
    darshanTimingsTa: '',
    darshanTimingsEn: '',
    contactPhone: '',
    contactEmail: '',
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Load data based on tab
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Always load health info
        const health = await healthApi.checkHealth().catch(() => null);
        setHealthInfo(health);

        if (activeTab === 'bookings') {
          const res = await poojaApi.getBookings({
            status: bookingFilter !== 'all' ? bookingFilter : undefined,
            search: bookingSearch || undefined,
          });
          if (res.success) setBookings(res.data);
        } else if (activeTab === 'contacts') {
          const res = await contactApi.getContacts({
            status: contactFilter !== 'all' ? contactFilter : undefined,
          });
          if (res.success) setContacts(res.data);
        } else if (activeTab === 'announcements') {
          const res = await announcementApi.getAll();
          if (res.success) setAnnouncements(res.data);
        } else if (activeTab === 'settings') {
          const res = await settingApi.getSettings();
          if (res.success && res.data) setSettings(res.data);
        }
      } catch (err) {
        console.error('Admin loading error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [activeTab, bookingFilter, bookingSearch, contactFilter, refreshKey]);

  // Update Booking Status
  const handleUpdateBookingStatus = async (id, newStatus, currentNotes) => {
    try {
      await poojaApi.updateStatus(id, newStatus, currentNotes);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      alert('Failed to update booking status: ' + err.message);
    }
  };

  // Delete Booking
  const handleDeleteBooking = async (id) => {
    if (!window.confirm('இந்த பூஜை பதிவை நீக்க விரும்புகிறீர்களா? / Are you sure you want to delete this booking?')) return;
    try {
      await poojaApi.deleteBooking(id);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // Update Contact Status
  const handleUpdateContactStatus = async (id, newStatus) => {
    try {
      await contactApi.updateStatus(id, newStatus);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      alert('Failed to update message status: ' + err.message);
    }
  };

  // Delete Contact
  const handleDeleteContact = async (id) => {
    if (!window.confirm('இந்த செய்தியை நீக்க விரும்புகிறீர்களா? / Delete this inquiry?')) return;
    try {
      await contactApi.deleteContact(id);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // Create Announcement
  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await announcementApi.create(newAnnouncement);
      setShowAddAnnouncement(false);
      setNewAnnouncement({
        titleTa: '',
        titleEn: '',
        contentTa: '',
        contentEn: '',
        badgeTa: 'அறிவிப்பு',
        badgeEn: 'Notice',
        category: 'general',
        priority: 'normal',
        eventDate: '',
      });
      setRefreshKey((k) => k + 1);
    } catch (err) {
      alert('Failed to create announcement: ' + err.message);
    }
  };

  // Delete Announcement
  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm('இந்த அறிவிப்பை நீக்க விரும்புகிறீர்களா? / Delete this announcement?')) return;
    try {
      await announcementApi.delete(id);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await settingApi.updateSettings(settings);
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch (err) {
      alert('Failed to save settings: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header & Status Bar */}
        <div className="bg-white rounded-2xl border-2 border-gold/40 p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-maroon text-gold flex items-center justify-center font-bold text-xl shadow-md">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="font-tamil-serif text-xl sm:text-2xl font-bold text-maroon-dark">
                திருக்கோயில் நிர்வாகப் பலகை (Admin Portal)
              </h1>
              <p className="font-tamil-sans text-xs sm:text-sm text-maroon/70">
                அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில் – உள்ளூர் MongoDB தரவுத்தளம்
              </p>
            </div>
          </div>

          {/* Database Health Badge */}
          <div className="flex items-center gap-3 bg-cream rounded-xl p-3 border border-gold/30">
            <Database size={20} className={healthInfo?.database?.connected ? 'text-green-600' : 'text-sacred-red'} />
            <div className="text-xs font-tamil-sans leading-tight">
              <span className="font-bold text-maroon-dark block">
                {healthInfo?.database?.connected ? 'Local MongoDB: இணைக்கப்பட்டது' : 'Local MongoDB: துண்டிக்கப்பட்டது'}
              </span>
              <span className="text-[11px] text-maroon/60">
                DB: {healthInfo?.database?.name || 'temple_db'} ({healthInfo?.database?.host || 'localhost:27017'})
              </span>
            </div>
            <button
              onClick={() => setRefreshKey((k) => k + 1)}
              className="p-1.5 rounded-lg text-maroon hover:bg-gold/20 transition-colors ml-1 cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none font-tamil-sans text-sm font-semibold">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'bookings'
                ? 'bg-maroon text-gold border-maroon shadow-md'
                : 'bg-white text-maroon-dark border-gold/30 hover:border-gold'
            }`}
          >
            <Flame size={16} />
            பூஜை பதிவுகள் ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'contacts'
                ? 'bg-maroon text-gold border-maroon shadow-md'
                : 'bg-white text-maroon-dark border-gold/30 hover:border-gold'
            }`}
          >
            <MessageSquare size={16} />
            பக்தர் வினவல்கள் ({contacts.length})
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'announcements'
                ? 'bg-maroon text-gold border-maroon shadow-md'
                : 'bg-white text-maroon-dark border-gold/30 hover:border-gold'
            }`}
          >
            <Megaphone size={16} />
            அறிவிப்புப் பலகை ({announcements.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'settings'
                ? 'bg-maroon text-gold border-maroon shadow-md'
                : 'bg-white text-maroon-dark border-gold/30 hover:border-gold'
            }`}
          >
            <Settings size={16} />
            கோயில் அமைப்புகள்
          </button>
        </div>

        {/* TAB 1: POOJA BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl border-2 border-gold/40 p-6 shadow-md space-y-4">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="relative w-full sm:w-72">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-maroon/50" />
                <input
                  type="text"
                  placeholder="பக்தர் பெயர் / போன்..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gold/40 rounded-lg outline-none font-tamil-sans"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto font-tamil-sans text-xs">
                <span className="text-maroon/70">வடிகட்டு:</span>
                {['all', 'Pending', 'Confirmed', 'Completed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setBookingFilter(st)}
                    className={`px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
                      bookingFilter === st
                        ? 'bg-maroon text-gold border-maroon font-bold'
                        : 'bg-cream text-maroon-dark border-gold/30 hover:bg-gold/15'
                    }`}
                  >
                    {st === 'all' ? 'அனைத்தும்' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings List (Responsive Cards for Phone/Tablet + Table for Desktop) */}
            {bookings.length === 0 ? (
              <div className="text-center py-12 text-maroon/60 font-tamil-sans">
                பூஜை பதிவுகள் எதுவும் இல்லை.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookings.map((b) => (
                  <div
                    key={b._id}
                    className="bg-cream/40 rounded-xl border border-gold/30 p-5 shadow-sm hover:border-gold transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-gold/20 pb-2 mb-3">
                        <span className="font-mono text-xs font-bold text-maroon-dark">
                          {b.bookingId}
                        </span>
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateBookingStatus(b._id, e.target.value, b.adminNotes)}
                          className={`text-xs font-bold px-2 py-0.5 rounded-full border outline-none cursor-pointer ${
                            b.status === 'Confirmed'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : b.status === 'Completed'
                              ? 'bg-blue-100 text-blue-800 border-blue-300'
                              : b.status === 'Cancelled'
                              ? 'bg-red-100 text-red-800 border-red-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <h3 className="font-tamil-serif text-base font-bold text-maroon-dark mb-1">
                        {b.devoteeName}
                      </h3>

                      <div className="space-y-1 text-xs font-tamil-sans text-maroon/80">
                        <p>
                          <span className="text-maroon/50">தொலைபேசி: </span>
                          <a href={`tel:${b.phone}`} className="font-semibold text-maroon underline">
                            {b.phone}
                          </a>
                        </p>
                        <p>
                          <span className="text-maroon/50">பூஜை: </span>
                          <span className="font-semibold">{b.poojaNameTa || b.poojaType}</span>
                        </p>
                        {b.date && (
                          <p>
                            <span className="text-maroon/50">தேதி: </span>
                            <span className="font-semibold">{b.date}</span>
                          </p>
                        )}
                        {(b.rasi || b.nakshatra) && (
                          <p>
                            <span className="text-maroon/50">ராசி / நட்சத்திரம்: </span>
                            <span>{b.rasi || '-'} / {b.nakshatra || '-'}</span>
                          </p>
                        )}
                        {b.message && (
                          <p className="mt-2 text-xs italic bg-white p-2 rounded border border-gold/20 text-maroon/90">
                            "{b.message}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gold/15 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-maroon/50">
                        {new Date(b.createdAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleDeleteBooking(b._id)}
                        className="text-sacred-red hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Booking"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DEVOTEE MESSAGES / CONTACTS */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-2xl border-2 border-gold/40 p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-tamil-serif text-lg font-bold text-maroon-dark">
                பக்தர்கள் அனுப்பிய செய்திகள் & வினவல்கள்
              </h2>
              <div className="flex gap-2 text-xs font-tamil-sans">
                {['all', 'New', 'In Review', 'Resolved'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setContactFilter(st)}
                    className={`px-3 py-1.5 rounded-lg border cursor-pointer ${
                      contactFilter === st
                        ? 'bg-maroon text-gold border-maroon font-bold'
                        : 'bg-cream text-maroon-dark border-gold/30 hover:bg-gold/15'
                    }`}
                  >
                    {st === 'all' ? 'அனைத்தும்' : st}
                  </button>
                ))}
              </div>
            </div>

            {contacts.length === 0 ? (
              <div className="text-center py-12 text-maroon/60 font-tamil-sans">
                செய்திகள் எதுவும் இல்லை.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contacts.map((c) => (
                  <div
                    key={c._id}
                    className="bg-cream/40 rounded-xl border border-gold/30 p-5 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-gold/20 pb-2 mb-3">
                        <span className="font-mono text-xs font-bold text-maroon-dark">
                          {c.inquiryId}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] uppercase tracking-wider font-bold bg-gold/20 text-maroon-dark px-2 py-0.5 rounded">
                            {c.purpose}
                          </span>
                          <select
                            value={c.status}
                            onChange={(e) => handleUpdateContactStatus(c._id, e.target.value)}
                            className="text-xs font-bold px-2 py-0.5 rounded-full border border-gold/40 bg-white cursor-pointer"
                          >
                            <option value="New">New</option>
                            <option value="In Review">In Review</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </div>
                      </div>

                      <h3 className="font-tamil-serif text-base font-bold text-maroon-dark">
                        {c.name}
                      </h3>

                      <div className="flex items-center gap-3 text-xs font-tamil-sans mt-1 text-maroon/70">
                        <a href={`tel:${c.phone}`} className="font-semibold text-maroon underline">
                          📞 {c.phone}
                        </a>
                        {c.email && <span>✉️ {c.email}</span>}
                      </div>

                      <p className="mt-3 text-xs bg-white p-3 rounded-lg border border-gold/20 text-maroon-dark leading-relaxed font-tamil-sans">
                        {c.message}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gold/15 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-maroon/50">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleDeleteContact(c._id)}
                        className="text-sacred-red hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Inquiry"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ANNOUNCEMENTS MANAGEMENT */}
        {activeTab === 'announcements' && (
          <div className="bg-white rounded-2xl border-2 border-gold/40 p-6 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-tamil-serif text-lg font-bold text-maroon-dark">
                  திருக்கோயில் நேரடி அறிவிப்புகள் (Live Notices)
                </h2>
                <p className="font-tamil-sans text-xs text-maroon/70">
                  இங்கு சேர்க்கப்படும் அறிவிப்புகள் முகப்புப் பக்கத்திலும் (HomePage) உடனுக்குடன் தோன்றும்.
                </p>
              </div>

              <button
                onClick={() => setShowAddAnnouncement(!showAddAnnouncement)}
                className="px-4 py-2 bg-maroon text-gold font-bold text-xs rounded-lg hover:bg-maroon-dark transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus size={16} />
                {showAddAnnouncement ? 'படிவத்தை மூடு' : 'புதிய அறிவிப்பு சேர்க்க'}
              </button>
            </div>

            {/* Create Announcement Form */}
            {showAddAnnouncement && (
              <form onSubmit={handleCreateAnnouncement} className="bg-cream/60 rounded-xl border-2 border-gold/40 p-5 space-y-4 animate-fade-in-up font-tamil-sans">
                <h3 className="font-tamil-serif text-base font-bold text-maroon-dark">
                  புதிய திருக்கோயில் அறிவிப்பு
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-maroon-dark mb-1">
                      தலைப்பு (தமிழ்) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="எ.கா. மாசி மகம் தேரோட்ட நாள் அறிவிப்பு"
                      value={newAnnouncement.titleTa}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, titleTa: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gold/40 rounded-lg outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-maroon-dark mb-1">
                      Title (English)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Masi Magam Chariot Festival Announcement"
                      value={newAnnouncement.titleEn}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, titleEn: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gold/40 rounded-lg outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-maroon-dark mb-1">
                      முக்கிய அறிவிப்பு விவரம் (தமிழ்) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="பக்தர்களுக்கு தெரிவிக்க வேண்டிய விவரங்கள்..."
                      value={newAnnouncement.contentTa}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, contentTa: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gold/40 rounded-lg outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-maroon-dark mb-1">
                      Content (English)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Announcement description in English..."
                      value={newAnnouncement.contentEn}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, contentEn: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gold/40 rounded-lg outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-maroon-dark mb-1">
                      வகை (Category)
                    </label>
                    <select
                      value={newAnnouncement.category}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gold/40 rounded-lg outline-none bg-white"
                    >
                      <option value="festival">திருவிழா (Festival)</option>
                      <option value="pooja">சிறப்பு பூஜை (Pooja)</option>
                      <option value="general">பொது அறிவிப்பு (General)</option>
                      <option value="alert">அவசர செய்தி (Alert)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-maroon-dark mb-1">
                      முன்னுரிமை (Priority)
                    </label>
                    <select
                      value={newAnnouncement.priority}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gold/40 rounded-lg outline-none bg-white"
                    >
                      <option value="normal">இயல்பான (Normal)</option>
                      <option value="high">முக்கியமானது (High)</option>
                      <option value="urgent">அவசரமானது (Urgent)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-maroon-dark mb-1">
                      நிகழ்வு நாள் / Event Date
                    </label>
                    <input
                      type="text"
                      placeholder="எ.கா. 2026 மாசி மகம்"
                      value={newAnnouncement.eventDate}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, eventDate: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gold/40 rounded-lg outline-none bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-maroon text-gold font-bold text-xs rounded-lg hover:bg-maroon-dark transition-all cursor-pointer shadow-md"
                >
                  வெளியிடுக / Publish Notice
                </button>
              </form>
            )}

            {/* List */}
            <div className="space-y-3">
              {announcements.map((a) => (
                <div
                  key={a._id}
                  className="bg-cream/40 rounded-xl border border-gold/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-tamil-sans"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold/20 text-maroon-dark">
                        {a.badgeTa || a.category}
                      </span>
                      {a.priority === 'urgent' && (
                        <span className="text-[10px] font-bold bg-sacred-red text-white px-2 py-0.5 rounded-full">
                          Urgent
                        </span>
                      )}
                      <span className="text-xs text-maroon/60 font-semibold">{a.eventDate}</span>
                    </div>
                    <h4 className="font-tamil-serif font-bold text-maroon-dark text-base">
                      {a.titleTa}
                    </h4>
                    <p className="text-xs text-maroon/80 mt-1 leading-relaxed">
                      {a.contentTa}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteAnnouncement(a._id)}
                    className="text-sacred-red hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                    title="Delete Announcement"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TEMPLE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border-2 border-gold/40 p-6 shadow-md">
            <form onSubmit={handleSaveSettings} className="space-y-6 font-tamil-sans">
              <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                <div>
                  <h2 className="font-tamil-serif text-lg font-bold text-maroon-dark">
                    திருக்கோயில் பொது அமைப்புகள் (Temple Master Settings)
                  </h2>
                  <p className="text-xs text-maroon/70">
                    இங்கு மாற்றப்படும் தகவல்கள் முழு இணையதளத்திலும் நேரடியாக பிரதிபலிக்கும்.
                  </p>
                </div>

                {settingsSaved && (
                  <div className="flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1.5 rounded-lg text-xs font-bold">
                    <Check size={16} /> சேமிக்கப்பட்டது!
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-maroon-dark mb-1">
                    வருடாந்திர மாசி மகம் தேர்த்திருவிழா நாள் (தமிழ்)
                  </label>
                  <input
                    type="text"
                    value={settings.annualFestivalDateTa}
                    onChange={(e) => setSettings({ ...settings, annualFestivalDateTa: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-gold/40 rounded-lg outline-none bg-cream/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-maroon-dark mb-1">
                    Annual Festival Date (English)
                  </label>
                  <input
                    type="text"
                    value={settings.annualFestivalDateEn}
                    onChange={(e) => setSettings({ ...settings, annualFestivalDateEn: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-gold/40 rounded-lg outline-none bg-cream/30"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-maroon-dark mb-1">
                    தினசரி தரிசன நேரங்கள் (Tamil)
                  </label>
                  <input
                    type="text"
                    value={settings.darshanTimingsTa}
                    onChange={(e) => setSettings({ ...settings, darshanTimingsTa: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-gold/40 rounded-lg outline-none bg-cream/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-maroon-dark mb-1">
                    Darshan Timings (English)
                  </label>
                  <input
                    type="text"
                    value={settings.darshanTimingsEn}
                    onChange={(e) => setSettings({ ...settings, darshanTimingsEn: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-gold/40 rounded-lg outline-none bg-cream/30"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-maroon-dark mb-1">
                    தொடர்பு தொலைபேசி எண் (Phone Number)
                  </label>
                  <input
                    type="text"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-gold/40 rounded-lg outline-none bg-cream/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-maroon-dark mb-1">
                    மின்னஞ்சல் முகவரி (Email Address)
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-gold/40 rounded-lg outline-none bg-cream/30"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-maroon text-gold font-bold text-sm rounded-lg hover:bg-maroon-dark transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Save size={16} />
                அமைப்புகளைச் சேமிக்க / Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
