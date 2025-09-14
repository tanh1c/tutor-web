import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { 
  MessageCircleIcon, 
  UsersIcon, 
  ThumbsUpIcon, 
  ThumbsDownIcon,
  ReplyIcon,
  PinIcon,
  StarIcon,
  TrendingUpIcon,
  BookOpenIcon,
  HelpCircleIcon,
  LightbulbIcon,
  SearchIcon,
  PlusIcon,
  TagIcon
} from 'lucide-react';

// Mock forum data
const FORUM_CATEGORIES = [
  {
    id: 1,
    name: 'Programming Help',
    description: 'Get help with coding problems and programming concepts',
    icon: BookOpenIcon,
    posts: 1247,
    members: 856,
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 2,
    name: 'Study Groups',
    description: 'Find and form study groups for various subjects',
    icon: UsersIcon,
    posts: 328,
    members: 432,
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 3,
    name: 'Tutor Q&A',
    description: 'Ask questions and get answers from experienced tutors',
    icon: HelpCircleIcon,
    posts: 892,
    members: 234,
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 4,
    name: 'Success Stories',
    description: 'Share your learning achievements and inspire others',
    icon: StarIcon,
    posts: 156,
    members: 678,
    color: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: 5,
    name: 'Resource Sharing',
    description: 'Share useful learning materials and resources',
    icon: LightbulbIcon,
    posts: 445,
    members: 523,
    color: 'bg-indigo-100 text-indigo-800'
  }
];

const FORUM_POSTS = [
  {
    id: 1,
    title: 'Need help with React Hooks - useEffect dependency array',
    content: 'I\'m struggling with understanding when to include dependencies in useEffect. Can someone explain the best practices?',
    author: 'Nguyễn Văn A',
    authorRole: 'student',
    category: 'Programming Help',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    likes: 12,
    replies: 8,
    isPinned: false,
    tags: ['React', 'JavaScript', 'Hooks'],
    solved: false
  },
  {
    id: 2,
    title: 'Forming a study group for Database Design - Fall 2024',
    content: 'Looking for 3-4 students to form a study group for Database Design. We can meet twice a week and help each other with assignments.',
    author: 'Trần Thị B',
    authorRole: 'student',
    category: 'Study Groups',
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    likes: 5,
    replies: 12,
    isPinned: true,
    tags: ['Database', 'Study Group', 'Fall 2024'],
    solved: false
  },
  {
    id: 3,
    title: 'How I improved my programming skills by 200% in 6 months',
    content: 'Sharing my journey from struggling with basic concepts to landing an internship at a tech company. Here are the strategies that worked for me...',
    author: 'Lê Minh C',
    authorRole: 'student',
    category: 'Success Stories',
    timestamp: new Date(Date.now() - 14400000), // 4 hours ago
    likes: 45,
    replies: 23,
    isPinned: true,
    tags: ['Success', 'Programming', 'Career'],
    solved: false
  },
  {
    id: 4,
    title: 'Best practices for algorithm problem solving?',
    content: 'What are the most effective strategies for approaching algorithm problems? Looking for tips from experienced tutors.',
    author: 'Phạm Văn D',
    authorRole: 'student',
    category: 'Tutor Q&A',
    timestamp: new Date(Date.now() - 21600000), // 6 hours ago
    likes: 8,
    replies: 15,
    isPinned: false,
    tags: ['Algorithms', 'Problem Solving', 'Tips'],
    solved: true
  },
  {
    id: 5,
    title: 'Free Programming Resources Collection - Updated 2024',
    content: 'Curated list of free programming resources including tutorials, books, and practice platforms. Updated with latest materials.',
    author: 'Dr. Nguyễn Hoàng',
    authorRole: 'tutor',
    category: 'Resource Sharing',
    timestamp: new Date(Date.now() - 43200000), // 12 hours ago
    likes: 67,
    replies: 34,
    isPinned: true,
    tags: ['Resources', 'Free', 'Programming', 'Tutorial'],
    solved: false
  }
];

const CommunityForum = () => {
  const { user } = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [sortBy, setSortBy] = useState('recent'); // recent, popular, solved

  const filteredPosts = FORUM_POSTS.filter(post => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'solved':
        return b.solved - a.solved;
      default: // recent
        return b.timestamp - a.timestamp;
    }
  });

  const getAuthorBadgeColor = (role) => {
    switch (role) {
      case 'tutor': return 'bg-green-100 text-green-800';
      case 'coordinator': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <MessageCircleIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Community Forum</h3>
            <p className="text-sm text-gray-600">Connect, learn, and share with the HCMUT community</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowNewPostModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <PlusIcon className="h-4 w-4" />
          <span>New Post</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <div className="relative flex-1 md:max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search posts, topics, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="solved">Solved First</option>
          </select>
          
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              !selectedCategory ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {FORUM_CATEGORIES.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`p-4 rounded-lg border text-left hover:shadow-md transition-shadow ${
                selectedCategory === category.name ? 'ring-2 ring-indigo-500 border-indigo-300' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className={`p-1 rounded ${category.color.replace('text-', 'bg-').replace('800', '100')}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <span className="font-medium text-gray-900 text-sm">{category.name}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{category.description}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{category.posts} posts</span>
                <span>{category.members} members</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div 
            key={post.id} 
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {post.isPinned && <PinIcon className="h-4 w-4 text-yellow-500" />}
                  {post.solved && <StarIcon className="h-4 w-4 text-green-500 fill-current" />}
                  <h4 className="font-medium text-gray-900 hover:text-indigo-600">{post.title}</h4>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <ThumbsUpIcon className="h-4 w-4" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ReplyIcon className="h-4 w-4" />
                  <span>{post.replies}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">{post.author}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAuthorBadgeColor(post.authorRole)}`}>
                  {post.authorRole}
                </span>
                <span className="text-xs text-gray-500">{formatTimeAgo(post.timestamp)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700`}>
                  {post.category}
                </span>
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">
                      <TagIcon className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="text-xs text-gray-500">+{post.tags.length - 2} more</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-8">
          <MessageCircleIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No posts found matching your criteria.</p>
          <button
            onClick={() => setShowNewPostModal(true)}
            className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Be the first to post!
          </button>
        </div>
      )}

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Create New Post</h3>
              <button 
                onClick={() => setShowNewPostModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                  {FORUM_CATEGORIES.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Enter a descriptive title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  rows={6}
                  placeholder="Share your thoughts, questions, or knowledge..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  placeholder="Add tags separated by commas (e.g., React, JavaScript, Help)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Create Post
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {selectedPost.isPinned && <PinIcon className="h-5 w-5 text-yellow-500" />}
                {selectedPost.solved && <StarIcon className="h-5 w-5 text-green-500 fill-current" />}
                <h3 className="text-xl font-semibold text-gray-900">{selectedPost.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedPost(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-900">{selectedPost.author}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAuthorBadgeColor(selectedPost.authorRole)}`}>
                    {selectedPost.authorRole}
                  </span>
                  <span className="text-sm text-gray-500">{formatTimeAgo(selectedPost.timestamp)}</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                    <ThumbsUpIcon className="h-4 w-4" />
                    <span>{selectedPost.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
                    <ReplyIcon className="h-4 w-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700">{selectedPost.content}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 text-sm bg-indigo-100 text-indigo-800 rounded">
                    <TagIcon className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Mock replies section */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">{selectedPost.replies} Replies</h4>
                <div className="space-y-4">
                  {/* Mock reply */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">Dr. Lê Hoàng</span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">tutor</span>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </div>
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                        <ThumbsUpIcon className="h-4 w-4" />
                        <span>5</span>
                      </button>
                    </div>
                    <p className="text-gray-700">Great question! The key is to understand that the dependency array tells React when to re-run the effect...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityForum;
