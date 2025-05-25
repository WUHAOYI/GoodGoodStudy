
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Target, 
  Calendar, 
  CheckCircle, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Clock
} from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const LearningGoals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [editingGoal, setEditingGoal] = useState<any>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
    category: 'skill'
  });

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Master React Development",
      description: "Complete advanced React patterns and hooks",
      progress: 75,
      targetDate: "2024-06-30",
      category: "skill",
      status: "in-progress"
    },
    {
      id: 2,
      title: "Get AWS Certification",
      description: "Pass AWS Solutions Architect exam",
      progress: 40,
      targetDate: "2024-08-15",
      category: "certification",
      status: "in-progress"
    },
    {
      id: 3,
      title: "Complete Full Stack Course",
      description: "Finish the comprehensive web development bootcamp",
      progress: 100,
      targetDate: "2024-05-01",
      category: "course",
      status: "completed"
    }
  ]);

  const handleEditGoal = (goal: any) => {
    setEditingGoal(goal);
  };

  const handleSaveEdit = () => {
    if (editingGoal) {
      setGoals(goals.map(g => g.id === editingGoal.id ? editingGoal : g));
      setEditingGoal(null);
      toast({
        title: "Goal Updated",
        description: "Your learning goal has been updated successfully.",
      });
    }
  };

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.description) {
      const goal = {
        id: Date.now(),
        ...newGoal,
        progress: 0,
        status: 'in-progress'
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', description: '', targetDate: '', category: 'skill' });
      setShowAddDialog(false);
      toast({
        title: "Goal Added",
        description: "New learning goal has been added successfully.",
      });
    }
  };

  const handleDeleteGoal = (goalId: number) => {
    setGoals(goals.filter(g => g.id !== goalId));
    toast({
      title: "Goal Deleted",
      description: "Learning goal has been removed.",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'skill': return 'bg-blue-100 text-blue-800';
      case 'certification': return 'bg-green-100 text-green-800';
      case 'course': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/student-dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Goals</h1>
            <p className="text-gray-600">Track your learning progress and achievements</p>
          </div>
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Learning Goal</DialogTitle>
                <DialogDescription>
                  Set a new learning objective to track your progress.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Goal title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                />
                <Textarea
                  placeholder="Goal description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                />
                <Input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                />
                <select
                  className="w-full p-2 border rounded-md"
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                >
                  <option value="skill">Skill</option>
                  <option value="certification">Certification</option>
                  <option value="course">Course</option>
                </select>
                <Button onClick={handleAddGoal} className="w-full">
                  Add Goal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <Card key={goal.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{goal.title}</CardTitle>
                    <div className="flex gap-2 mb-2">
                      <Badge className={getCategoryColor(goal.category)}>
                        {goal.category}
                      </Badge>
                      <Badge className={getStatusColor(goal.status)}>
                        {goal.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditGoal(goal)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
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
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Target: {goal.targetDate}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Goal Dialog */}
        {editingGoal && (
          <Dialog open={!!editingGoal} onOpenChange={() => setEditingGoal(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Learning Goal</DialogTitle>
                <DialogDescription>
                  Update your learning objective.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Goal title"
                  value={editingGoal.title}
                  onChange={(e) => setEditingGoal({...editingGoal, title: e.target.value})}
                />
                <Textarea
                  placeholder="Goal description"
                  value={editingGoal.description}
                  onChange={(e) => setEditingGoal({...editingGoal, description: e.target.value})}
                />
                <Input
                  type="date"
                  value={editingGoal.targetDate}
                  onChange={(e) => setEditingGoal({...editingGoal, targetDate: e.target.value})}
                />
                <Input
                  type="number"
                  placeholder="Progress (0-100)"
                  value={editingGoal.progress}
                  onChange={(e) => setEditingGoal({...editingGoal, progress: parseInt(e.target.value) || 0})}
                />
                <Button onClick={handleSaveEdit} className="w-full">
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default LearningGoals;
