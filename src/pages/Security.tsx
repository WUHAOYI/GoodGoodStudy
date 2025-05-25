
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Shield, 
  Users, 
  Lock, 
  Key, 
  AlertTriangle, 
  CheckCircle,
  ArrowLeft,
  Settings,
  Eye,
  EyeOff,
  UserX,
  UserCheck,
  Crown,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const Security = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showPasswordPolicy, setShowPasswordPolicy] = useState(false);

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorRequired: true,
    passwordRotation: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    autoLockAccounts: true,
    encryptUserData: true,
    auditLogs: true,
    ipWhitelist: false
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "student",
      tier: "premium",
      status: "active",
      lastLogin: "2024-05-25",
      loginAttempts: 0,
      isBlocked: false,
      permissions: ["course_access", "download_resources", "community_access"]
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "sarah@example.com",
      role: "teacher",
      tier: "regular",
      status: "active",
      lastLogin: "2024-05-24",
      loginAttempts: 0,
      isBlocked: false,
      permissions: ["course_access", "course_creation", "student_management", "analytics_view"]
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      role: "student",
      tier: "trial",
      status: "suspended",
      lastLogin: "2024-05-20",
      loginAttempts: 3,
      isBlocked: true,
      permissions: ["limited_course_access"]
    }
  ]);

  const [securityLogs] = useState([
    {
      id: 1,
      action: "Failed login attempt",
      user: "mike@example.com",
      timestamp: "2024-05-25 14:30:00",
      severity: "medium",
      details: "Multiple failed login attempts detected"
    },
    {
      id: 2,
      action: "Password changed",
      user: "john@example.com",
      timestamp: "2024-05-25 10:15:00",
      severity: "low",
      details: "User successfully updated password"
    },
    {
      id: 3,
      action: "Account locked",
      user: "attacker@spam.com",
      timestamp: "2024-05-25 09:45:00",
      severity: "high",
      details: "Automatic account lock after 5 failed attempts"
    }
  ]);

  const handleUserAction = (userId: number, action: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        switch (action) {
          case 'block':
            return { ...user, isBlocked: true, status: 'suspended' };
          case 'unblock':
            return { ...user, isBlocked: false, status: 'active' };
          case 'reset_password':
            // In real app, this would trigger password reset email
            return user;
          default:
            return user;
        }
      }
      return user;
    }));

    toast({
      title: "Action Completed",
      description: `User ${action} action has been executed.`,
    });
  };

  const handleTierChange = (userId: number, newTier: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, tier: newTier } : user
    ));

    toast({
      title: "Tier Updated",
      description: `User tier has been changed to ${newTier}.`,
    });
  };

  const handleSecuritySettingChange = (setting: string, value: boolean | number) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));

    toast({
      title: "Security Setting Updated",
      description: "The security configuration has been saved.",
    });
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'premium': return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'regular': return <Star className="h-4 w-4 text-blue-500" />;
      case 'trial': return <Users className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin-dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Security Management</h1>
            <p className="text-gray-600">Manage platform security, user permissions, and access control</p>
          </div>
        </div>

        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'active').length}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Blocked Users</p>
                  <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.isBlocked).length}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <UserX className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Security Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">{securityLogs.filter(l => l.severity === 'high').length}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Security Score</p>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Security Configuration
              </CardTitle>
              <CardDescription>Global security settings and policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Require 2FA for all users</p>
                </div>
                <Switch 
                  checked={securitySettings.twoFactorRequired}
                  onCheckedChange={(checked) => handleSecuritySettingChange('twoFactorRequired', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Password Rotation</p>
                  <p className="text-sm text-gray-600">Force password changes every 90 days</p>
                </div>
                <Switch 
                  checked={securitySettings.passwordRotation}
                  onCheckedChange={(checked) => handleSecuritySettingChange('passwordRotation', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-lock Accounts</p>
                  <p className="text-sm text-gray-600">Lock after failed login attempts</p>
                </div>
                <Switch 
                  checked={securitySettings.autoLockAccounts}
                  onCheckedChange={(checked) => handleSecuritySettingChange('autoLockAccounts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Audit Logging</p>
                  <p className="text-sm text-gray-600">Log all security events</p>
                </div>
                <Switch 
                  checked={securitySettings.auditLogs}
                  onCheckedChange={(checked) => handleSecuritySettingChange('auditLogs', checked)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Session Timeout (minutes)</label>
                <Input 
                  type="number" 
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => handleSecuritySettingChange('sessionTimeout', parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Max Login Attempts</label>
                <Input 
                  type="number" 
                  value={securitySettings.maxLoginAttempts}
                  onChange={(e) => handleSecuritySettingChange('maxLoginAttempts', parseInt(e.target.value))}
                />
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowPasswordPolicy(true)}
              >
                <Key className="h-4 w-4 mr-2" />
                Configure Password Policy
              </Button>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Access Control
              </CardTitle>
              <CardDescription>Manage user permissions and service tiers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{user.name}</h4>
                          {getTierIcon(user.tier)}
                          <Badge variant="outline">{user.tier}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">Role: {user.role}</p>
                      </div>
                      <Badge className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {user.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <select 
                        className="text-sm border rounded px-2 py-1"
                        value={user.tier}
                        onChange={(e) => handleTierChange(user.id, e.target.value)}
                      >
                        <option value="trial">Trial</option>
                        <option value="regular">Regular</option>
                        <option value="premium">Premium</option>
                      </select>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>

                      {user.isBlocked ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUserAction(user.id, 'unblock')}
                          className="text-green-600"
                        >
                          <UserCheck className="h-4 w-4 mr-1" />
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUserAction(user.id, 'block')}
                          className="text-red-600"
                        >
                          <UserX className="h-4 w-4 mr-1" />
                          Block
                        </Button>
                      )}
                    </div>

                    <div className="text-xs text-gray-500">
                      Last login: {user.lastLogin} • Failed attempts: {user.loginAttempts}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Logs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Security Activity Log
            </CardTitle>
            <CardDescription>Recent security events and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securityLogs.map((log) => (
                <div key={log.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{log.action}</h4>
                      <Badge className={getSeverityColor(log.severity)}>
                        {log.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{log.details}</p>
                    <p className="text-xs text-gray-500">User: {log.user} • {log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Details Modal */}
        {selectedUser && (
          <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>User Details: {selectedUser.name}</DialogTitle>
                <DialogDescription>
                  Detailed information and permissions for this user
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Basic Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Role:</strong> {selectedUser.role}</p>
                    <p><strong>Tier:</strong> {selectedUser.tier}</p>
                    <p><strong>Status:</strong> {selectedUser.status}</p>
                    <p><strong>Last Login:</strong> {selectedUser.lastLogin}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Permissions</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.permissions.map((permission: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {permission.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleUserAction(selectedUser.id, 'reset_password')}
                  >
                    Reset Password
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      handleUserAction(selectedUser.id, selectedUser.isBlocked ? 'unblock' : 'block');
                      setSelectedUser(null);
                    }}
                  >
                    {selectedUser.isBlocked ? 'Unblock User' : 'Block User'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Password Policy Modal */}
        <Dialog open={showPasswordPolicy} onOpenChange={setShowPasswordPolicy}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Password Policy Configuration</DialogTitle>
              <DialogDescription>
                Set requirements for user passwords
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Minimum Length</label>
                <Input type="number" defaultValue="8" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Require uppercase letters</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Require lowercase letters</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Require numbers</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Require special characters</span>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button className="w-full">Save Password Policy</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Security;
