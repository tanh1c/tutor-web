import { useState } from 'react';
import { 
  Upload, Download, FileText, Image, Video, Link as LinkIcon,
  Search, Filter, Star, Eye, Trash2, Share2, BookOpen,
  ExternalLink, Plus, Folder, File
} from 'lucide-react';
import { libraryResources } from '../../data/mockData';
import { useUser } from '../../context/UserContext';

const ResourceSharing = ({ sessionId, subject }) => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('session'); // 'session', 'library', 'upload'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sessionResources, setSessionResources] = useState([
    {
      id: 1,
      name: "Bài tập Đạo hàm.pdf",
      type: "pdf",
      size: "1.2 MB",
      uploadedBy: "Nguyễn Văn Tutor",
      uploadedAt: "2025-09-09T10:30:00Z",
      downloadCount: 15,
      isShared: true,
      url: "/mock-files/dao-ham-exercises.pdf"
    },
    {
      id: 2,
      name: "Slide bài giảng.pptx",
      type: "presentation",
      size: "8.5 MB",
      uploadedBy: "Nguyễn Văn Tutor",
      uploadedAt: "2025-09-09T09:15:00Z",
      downloadCount: 23,
      isShared: true,
      url: "/mock-files/dao-ham-slides.pptx"
    }
  ]);

  // Filter library resources by subject
  const filteredLibraryResources = libraryResources.filter(resource => {
    let subjectMatch = true;
    if (subject && resource.subject) {
      subjectMatch = resource.subject.toLowerCase().includes(subject.toLowerCase());
    }

    let searchMatch = true;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      searchMatch = 
        resource.title.toLowerCase().includes(searchLower) ||
        resource.author.toLowerCase().includes(searchLower) ||
        (resource.subject && resource.subject.toLowerCase().includes(searchLower));
    }

    let typeMatch = true;
    if (selectedType !== 'all') {
      typeMatch = resource.type === selectedType;
    }

    return subjectMatch && searchMatch && typeMatch;
  });

  const getFileIcon = (type) => {
    const iconMap = {
      'pdf': FileText,
      'doc': FileText,
      'docx': FileText,
      'ppt': FileText,
      'pptx': FileText,
      'presentation': FileText,
      'image': Image,
      'jpg': Image,
      'png': Image,
      'video': Video,
      'mp4': Video,
      'avi': Video,
      'link': LinkIcon
    };
    return iconMap[type] || File;
  };

  const getFileTypeColor = (type) => {
    const colorMap = {
      'pdf': 'text-red-600 bg-red-100',
      'doc': 'text-blue-600 bg-blue-100',
      'docx': 'text-blue-600 bg-blue-100',
      'ppt': 'text-orange-600 bg-orange-100',
      'pptx': 'text-orange-600 bg-orange-100',
      'presentation': 'text-orange-600 bg-orange-100',
      'image': 'text-green-600 bg-green-100',
      'video': 'text-purple-600 bg-purple-100',
      'link': 'text-indigo-600 bg-indigo-100'
    };
    return colorMap[type] || 'text-gray-600 bg-gray-100';
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const newResource = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.type.includes('pdf') ? 'pdf' : 
              file.type.includes('presentation') || file.name.includes('.ppt') ? 'presentation' :
              file.type.includes('image') ? 'image' :
              file.type.includes('video') ? 'video' : 'file',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedBy: user?.name || 'You',
        uploadedAt: new Date().toISOString(),
        downloadCount: 0,
        isShared: false,
        url: URL.createObjectURL(file)
      };
      setSessionResources(prev => [...prev, newResource]);
    });
  };

  const handleShareResource = (resourceId) => {
    setSessionResources(prev => 
      prev.map(resource => 
        resource.id === resourceId 
          ? { ...resource, isShared: !resource.isShared }
          : resource
      )
    );
  };

  const handleDeleteResource = (resourceId) => {
    setSessionResources(prev => prev.filter(resource => resource.id !== resourceId));
  };

  const handleAddToSession = (libraryResource) => {
    const newResource = {
      id: Date.now() + Math.random(),
      name: libraryResource.title + '.pdf',
      type: libraryResource.type,
      size: libraryResource.size,
      uploadedBy: 'HCMUT Library',
      uploadedAt: new Date().toISOString(),
      downloadCount: libraryResource.downloads,
      isShared: true,
      url: libraryResource.url,
      isFromLibrary: true
    };
    setSessionResources(prev => [...prev, newResource]);
  };

  return (
    <div className="space-y-6">
      {/* Header with Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('session')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'session'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Folder className="w-4 h-4 inline mr-2" />
            Tài liệu Session ({sessionResources.length})
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'library'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Thư viện HCMUT
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'upload'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Tải lên
          </button>
        </nav>
      </div>

      {/* Session Resources */}
      {activeTab === 'session' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Tài liệu của Session này
            </h3>
            <label className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              <span>Thêm tài liệu</span>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.png,.mp4,.avi"
              />
            </label>
          </div>

          {sessionResources.length > 0 ? (
            <div className="grid gap-4">
              {sessionResources.map(resource => {
                const FileIcon = getFileIcon(resource.type);
                const fileTypeColor = getFileTypeColor(resource.type);
                
                return (
                  <div key={resource.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${fileTypeColor}`}>
                        <FileIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{resource.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Tải lên bởi {resource.uploadedBy}</span>
                          <span>{resource.size}</span>
                          <span>{resource.downloadCount} lượt tải</span>
                          {resource.isFromLibrary && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              Từ thư viện
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleShareResource(resource.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          resource.isShared 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        title={resource.isShared ? 'Đã chia sẻ' : 'Chia sẻ với học sinh'}
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => window.open(resource.url, '_blank')}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                        title="Xem/Tải xuống"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteResource(resource.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Chưa có tài liệu nào
              </h3>
              <p className="text-gray-600 mb-4">
                Hãy tải lên tài liệu hoặc thêm từ thư viện HCMUT
              </p>
              <label className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
                <Upload className="w-4 h-4" />
                <span>Tải lên tài liệu đầu tiên</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.png,.mp4,.avi"
                />
              </label>
            </div>
          )}
        </div>
      )}

      {/* HCMUT Library Resources */}
      {activeTab === 'library' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Thư viện Tạ Quang Bửu - HCMUT
            </h3>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm tài liệu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả loại</option>
                <option value="pdf">PDF</option>
                <option value="doc">Document</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>

          {filteredLibraryResources.length > 0 ? (
            <div className="grid gap-4">
              {filteredLibraryResources.map(resource => (
                <div key={resource.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{resource.title}</h4>
                      <p className="text-sm text-gray-600">Tác giả: {resource.author}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{resource.rating}</span>
                        </span>
                        <span>{resource.downloads} lượt tải</span>
                        <span>{resource.size}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs uppercase">
                          {resource.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => window.open(resource.url, '_blank')}
                      className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Xem</span>
                    </button>
                    <button
                      onClick={() => handleAddToSession(resource)}
                      className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Thêm vào Session</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy tài liệu
              </h3>
              <p className="text-gray-600">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
              </p>
            </div>
          )}
        </div>
      )}

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Tải lên tài liệu mới
            </h3>
            
            {/* Drag & Drop Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Kéo thả tài liệu vào đây
              </h4>
              <p className="text-gray-600 mb-4">
                hoặc
              </p>
              <label className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
                <Upload className="w-5 h-5" />
                <span>Chọn tài liệu</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.png,.mp4,.avi"
                />
              </label>
              <p className="text-xs text-gray-500 mt-4">
                Hỗ trợ: PDF, DOC, DOCX, PPT, PPTX, JPG, PNG, MP4, AVI (tối đa 50MB mỗi file)
              </p>
            </div>
          </div>

          {/* Upload Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">
              Hướng dẫn tải lên tài liệu
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Đặt tên file rõ ràng, dễ hiểu</li>
              <li>• Chỉ tải lên tài liệu có liên quan đến session</li>
              <li>• Đảm bảo tài liệu không vi phạm bản quyền</li>
              <li>• File được chia sẻ tự động với học sinh sau khi tải lên</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceSharing;
