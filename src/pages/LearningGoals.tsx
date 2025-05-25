
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Target, 
  Plus, 
  ArrowLeft,
  Calendar,
  Trophy,
  Edit,
  Trash2
} from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

const LearningGoals = () => {
  const navigate = useNavigate();
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
    category: ''
  });

  // Mock data for learning goals
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Complete Full Stack Bootcamp",
      description: "Finish the entire full stack web development course",
      progress: 75,
      targetDate: "2024-06-30",
      category: "Programming",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Learn React Advanced Patterns",
      description: "Master advanced React concepts and patterns",
      progress: 45,
      targetDate: "2024-07-15",
      category: "Programming",
      status: "In Progress"
    },
    {
      id: 3,
      title: "Earn JavaScript Certification",
      description: "Complete JavaScript fundamentals and earn certificate",
      progress: 100,
      targetDate: "2024-05-15",
      category: "Certification",
      status: "Completed"
    }
  ]);

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.targetDate) {
      const goal = {
        id: Date.now(),
        ...newGoal,
        progress: 0,
        status: "Not Started"
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', description: '', targetDate: '', category: '' });
      setShowAddGoal(false);
    }
  };

  const handleDeleteGoal = (goalId: number) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleBack = () => {
    navigate('/student-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Goals</h1>
            <p className="text-gray-600">Set and track your learning objectives</p>
          </div>
          <Button onClick={() => setShowAddGoal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>

        {/* Add Goal Form */}
        {showAddGoal && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Learning Goal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Goal Title</label>
                  <Input
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    placeholder="Enter your learning goal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                    placeholder="e.g., Programming, Design"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  placeholder="Describe your goal in detail"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Target Date</label>
                <Input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddGoal}>Add Goal</Button>
                <Button variant="outline" onClick={() => setShowAddGoal(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Goals List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <Card key={goal.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{goal.title}</CardTitle>
                    <Badge className={getStatusColor(goal.status)}>
                      {goal.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{goal.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-600">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
                  </div>
                  <Badge variant="outline">{goal.category}</Badge>
                </div>
                
                {goal.status === "Completed" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Trophy className="h-4 w-4" />
                    <span className="text-sm font-medium">Goal Achieved!</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {goals.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No goals set yet</h2>
            <p className="text-gray-600 mb-6">Start by setting your first learning goal.</p>
            <Button onClick={() => setShowAddGoal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Goal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningGoals;
