import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { StickyNote, Plus, Search, Calendar, Tag, Trash2, Edit } from "lucide-react";
import { useAuth } from "./AuthContext";

export function Dashboard() {
  const { user } = useAuth();

  // Mock notes data
  const notes = [
    {
      id: 1,
      title: "Meeting Notes",
      content: "Discussed Q4 goals and project timeline...",
      date: "Nov 12, 2024",
      tags: ["work", "meeting"]
    },
    {
      id: 2,
      title: "Shopping List",
      content: "Milk, eggs, bread, coffee...",
      date: "Nov 13, 2024",
      tags: ["personal"]
    },
    {
      id: 3,
      title: "Ideas for Blog Post",
      content: "Write about productivity tips and AI tools...",
      date: "Nov 14, 2024",
      tags: ["writing", "ideas"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <StickyNote className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl">Smart Notes</h1>
              <p className="text-xs text-gray-600">Welcome back, {user?.name}!</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.hash = ''}
          >
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search your notes..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700">
            <Plus className="w-4 h-4" />
            New Note
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Notes</p>
                <p className="text-2xl mt-1">24</p>
              </div>
              <StickyNote className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl mt-1">8</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tags</p>
                <p className="text-2xl mt-1">12</p>
              </div>
              <Tag className="w-8 h-8 text-green-600" />
            </div>
          </Card>
        </div>

        {/* Notes Grid */}
        <div>
          <h2 className="text-2xl mb-4">Recent Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <Card key={note.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg">{note.title}</h3>
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{note.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{note.date}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State Message */}
        <div className="mt-12 text-center p-12 border-2 border-dashed rounded-lg">
          <StickyNote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl mb-2">This is a Demo Dashboard</h3>
          <p className="text-gray-600 mb-4">
            Install the Smart Notes browser extension to start creating and managing real notes!
          </p>
          <Button 
            className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700"
            onClick={() => window.location.hash = ''}
          >
            <StickyNote className="w-4 h-4" />
            Get the Extension
          </Button>
        </div>
      </div>
    </div>
  );
}
