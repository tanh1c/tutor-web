import { useState, useEffect } from 'react';
import { 
  FileText, Save, Edit3, Clock, User, MessageSquare,
  CheckSquare, Square, Plus, Trash2, RotateCcw
} from 'lucide-react';
import { sessionNoteTemplates } from '../../data/mockData';
import { useUser } from '../../context/UserContext';

const SessionNotes = ({ sessionId, sessionType = 'academic' }) => {
  const { user } = useUser();
  const [activeTemplate, setActiveTemplate] = useState(sessionType);
  const [notes, setNotes] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [collaborativeNotes, setCollaborativeNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Get template for current session type
  const template = sessionNoteTemplates.find(t => t.id === activeTemplate) || sessionNoteTemplates[0];

  useEffect(() => {
    // Load existing notes for this session
    const savedNotes = localStorage.getItem(`session-notes-${sessionId}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      // Initialize with empty template
      const initialNotes = {};
      template.sections.forEach(section => {
        initialNotes[section.id] = '';
      });
      setNotes(initialNotes);
    }

    // Load collaborative notes
    const savedColabNotes = localStorage.getItem(`collaborative-notes-${sessionId}`);
    if (savedColabNotes) {
      setCollaborativeNotes(JSON.parse(savedColabNotes));
    }
  }, [sessionId, template]);

  const handleNoteChange = (sectionId, value) => {
    setNotes(prev => ({
      ...prev,
      [sectionId]: value
    }));
  };

  const saveNotes = () => {
    localStorage.setItem(`session-notes-${sessionId}`, JSON.stringify(notes));
    localStorage.setItem(`collaborative-notes-${sessionId}`, JSON.stringify(collaborativeNotes));
    setLastSaved(new Date());
    setIsEditing(false);
  };

  const autoSave = () => {
    localStorage.setItem(`session-notes-${sessionId}`, JSON.stringify(notes));
    setLastSaved(new Date());
  };

  // Auto-save every 30 seconds when editing
  useEffect(() => {
    if (isEditing) {
      const interval = setInterval(autoSave, 30000);
      return () => clearInterval(interval);
    }
  }, [isEditing, notes]);

  const addCollaborativeNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        content: newNote.trim(),
        author: user?.name || 'Anonymous',
        authorRole: user?.role || 'student',
        timestamp: new Date().toISOString(),
        isCompleted: false
      };
      setCollaborativeNotes(prev => [...prev, note]);
      setNewNote('');
    }
  };

  const toggleNoteCompletion = (noteId) => {
    setCollaborativeNotes(prev =>
      prev.map(note =>
        note.id === noteId ? { ...note, isCompleted: !note.isCompleted } : note
      )
    );
  };

  const deleteCollaborativeNote = (noteId) => {
    setCollaborativeNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const exportNotes = () => {
    const exportData = {
      sessionId,
      template: template.name,
      notes,
      collaborativeNotes,
      exportedAt: new Date().toISOString(),
      exportedBy: user?.name
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `session-${sessionId}-notes.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Ghi chú Session</h3>
          <p className="text-sm text-gray-600">
            Template: {template.name}
            {lastSaved && (
              <span className="ml-4 text-green-600">
                • Đã lưu lúc {formatTime(lastSaved)}
              </span>
            )}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Template Selector */}
          <select
            value={activeTemplate}
            onChange={(e) => setActiveTemplate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isEditing}
          >
            {sessionNoteTemplates.map(template => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium ${
              isEditing
                ? 'bg-gray-600 text-white hover:bg-gray-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEditing ? 'Xem' : 'Chỉnh sửa'}</span>
          </button>

          {isEditing && (
            <button
              onClick={saveNotes}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Save className="w-4 h-4" />
              <span>Lưu</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Structured Notes */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Ghi chú có cấu trúc
            </h4>
            
            <div className="space-y-6">
              {template.sections.map(section => (
                <div key={section.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {section.title}
                  </label>
                  {isEditing ? (
                    <textarea
                      value={notes[section.id] || ''}
                      onChange={(e) => handleNoteChange(section.id, e.target.value)}
                      placeholder={section.placeholder}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  ) : (
                    <div className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 min-h-[100px]">
                      {notes[section.id] ? (
                        <p className="text-gray-900 whitespace-pre-wrap">{notes[section.id]}</p>
                      ) : (
                        <p className="text-gray-500 italic">{section.placeholder}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="mt-6 flex items-center space-x-4">
                <button
                  onClick={autoSave}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Lưu tạm</span>
                </button>
                <span className="text-sm text-gray-500">
                  Auto-save mỗi 30 giây khi đang chỉnh sửa
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Collaborative Notes & Quick Actions */}
        <div className="space-y-6">
          {/* Collaborative Notes */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
              Ghi chú tương tác
            </h4>

            {/* Add new note */}
            <div className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Thêm ghi chú nhanh..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && addCollaborativeNote()}
                />
                <button
                  onClick={addCollaborativeNote}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notes list */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {collaborativeNotes.map(note => (
                <div key={note.id} className={`p-3 rounded-lg border ${
                  note.isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2 flex-1">
                      <button
                        onClick={() => toggleNoteCompletion(note.id)}
                        className="mt-1 flex-shrink-0"
                      >
                        {note.isCompleted ? (
                          <CheckSquare className="w-4 h-4 text-green-600" />
                        ) : (
                          <Square className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`text-sm ${
                          note.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
                        }`}>
                          {note.content}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded ${
                            note.authorRole === 'tutor' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {note.author}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatTime(note.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteCollaborativeNote(note.id)}
                      className="ml-2 p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
              
              {collaborativeNotes.length === 0 && (
                <div className="text-center py-6">
                  <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Chưa có ghi chú tương tác nào
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">
              Thao tác nhanh
            </h4>
            
            <div className="space-y-3">
              <button
                onClick={exportNotes}
                className="w-full flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FileText className="w-4 h-4" />
                <span>Xuất ghi chú</span>
              </button>
              
              <button
                onClick={() => window.print()}
                className="w-full flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FileText className="w-4 h-4" />
                <span>In ghi chú</span>
              </button>
              
              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Ghi chú được tự động lưu</p>
                  <p>• Có thể chia sẻ với học sinh</p>
                  <p>• Hỗ trợ xuất file và in ấn</p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Statistics */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">
              Thống kê
            </h4>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tổng từ:</span>
                <span className="font-medium">
                  {Object.values(notes).join(' ').split(' ').filter(word => word.length > 0).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ghi chú tương tác:</span>
                <span className="font-medium">{collaborativeNotes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hoàn thành:</span>
                <span className="font-medium">
                  {collaborativeNotes.filter(n => n.isCompleted).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lần lưu cuối:</span>
                <span className="font-medium">
                  {lastSaved ? formatTime(lastSaved) : 'Chưa lưu'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionNotes;
