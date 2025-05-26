
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Shield, Users, Eye, Edit, Clock, AlertTriangle, Settings, Key, Lock, UserCheck, UserX, Crown, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SecurityManagement = () => {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [editRoleModalOpen, setEditRoleModalOpen] = useState(false);
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [auditDetailsModalOpen, setAuditDetailsModalOpen] = useState(false);
  const [showPasswordPolicy, setShowPasswordPolicy] = useState(false);

  const [permissions] = useState([
    {
      id: 1,
      role: 'Admin',
      permissions: ['All Access', 'User Management', 'Course Management', 'System Settings'],
      users: 3,
      description: 'Full system access'
    },
    {
      id: 2,
      role: 'Teacher',
      permissions: ['Course Creation', 'Student Management', 'Content Upload'],
      users: 45,
      description: 'Course and student management'
    },
    {
      id: 3,
      role: 'Student',
      permissions: ['Course Access', 'Profile Management', 'Community Features'],
      users: 1247,
      description: 'Basic learning access'
    }
  ]);

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
      customPermissions: ["course_access", "download_resources", "community_access"]
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
      customPermissions: ["course_access", "course_creation", "student_management", "analytics_view"]
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
      customPermissions: ["limited_course_access"]
    }
  ]);

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

  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true
  });

  const [auditLogs] = useState([
    {
      id: 1,
      action: 'User Login',
      user: 'admin@example.com',
      timestamp: '2024-05-26 10:30:00',
      status: 'success',
      ip: '192.168.1.100',
      details: 'Successful admin login',
      browser: 'Chrome 125.0',
      location: 'New York, NY'
    },
    {
      id: 2,
      action: 'Course Deletion',
      user: 'teacher@example.com',
      timestamp: '2024-05-26 09:15:00',
      status: 'warning',
      ip: '192.168.1.105',
      details: 'Course "Old Python Tutorial" deleted',
      browser: 'Firefox 124.0',
      location: 'San Francisco, CA'
    },
    {
      id: 3,
      action: 'Permission Change',
      user: 'admin@example.com',
      timestamp: '2024-05-26 08:45:00',
      status: 'info',
      ip: '192.168.1.100',
      details: 'Updated teacher permissions',
      browser: 'Chrome 125.0',
      location: 'New York, NY'
    },
    {
      id: 4,
      action: 'Failed Login Attempt',
      user: 'unknown@example.com',
      timestamp: '2024-05-26 07:30:00',
      status: 'error',
      ip: '192.168.1.200',
      details: 'Multiple failed login attempts detected',
      browser: 'Unknown',
      location: 'Unknown'
    }
  ]);

  const handleEditPermission = (role: any) => {
    setSelectedRole(role);
    setEditRoleModalOpen(true);
  };

  const handleEditUserPermission = (user: any) => {
    setSelectedUser(user);
    setEditUserModalOpen(true);
  };

  const handleViewAuditDetails = (log: any) => {
    setSelectedLog(log);
    setAuditDetailsModalOpen(true);
  };

  const handleSaveRolePermissions = () => {
    toast({
      title: "Permissions Updated",
      description: `Permissions for ${selectedRole?.role} have been updated successfully.`,
    });
    setEditRoleModalOpen(false);
    setSelectedRole(null);
  };

  const handleSaveUserPermissions = () => {
    toast({
      title: "User Permissions Updated",
      description: `Permissions for ${selectedUser?.name} have been updated successfully.`,
    });
    setEditUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserAction = (userId: number, action: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        switch (action) {
          case 'block':
            return { ...user, isBlocked: true, status: 'suspended' };
          case 'unblock':
            return { ...user, isBlocked: false, status: 'active' };
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

  const handleSavePasswordPolicy = () => {
    toast({
      title: "Password Policy Updated",
      description: "New password requirements have been saved and will apply to all future password changes.",
    });
    setShowPasswordPolicy(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <Shield className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      case 'info': return <Eye className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'premium': return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'regular': return <Star className="h-4 w-4 text-blue-500" />;
      case 'trial': return <Users className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Management</h2>
        <p className="text-gray-600">Manage system security, permissions, and audit logs</p>
      </div>

      <Tabs defaultValue="permissions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="users">User Permissions</TabsTrigger>
          <TabsTrigger value="security">Security Settings</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Manage user roles and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {permissions.map((role) => (
                  <div key={role.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{role.role}</h3>
                        <p className="text-sm text-gray-600">{role.description}</p>
                        <p className="text-sm text-gray-500 mt-1">{role.users} users with this role</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditPermission(role)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Individual User Permissions</CardTitle>
              <CardDescription>Configure custom permissions for specific users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{user.name}</h4>
                          {getTierIcon(user.tier)}
                          <Badge variant="outline">{user.tier}</Badge>
                          <Badge className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {user.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">Role: {user.role}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditUserPermission(user)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit Permissions
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
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {user.customPermissions.map((permission, index) => (
                        <Badge key={index} variant="secondary">
                          {permission.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
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
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>System activity and security events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getStatusIcon(log.status)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{log.action}</h3>
                          <p className="text-sm text-gray-600">{log.details}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>User: {log.user}</span>
                            <span>Time: {log.timestamp}</span>
                            <span>IP: {log.ip}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(log.status)}>
                          {log.status}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => handleViewAuditDetails(log)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Role Permissions Modal */}
      <Dialog open={editRoleModalOpen} onOpenChange={setEditRoleModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Role Permissions</DialogTitle>
            <DialogDescription>
              Modify permissions for the {selectedRole?.role} role
            </DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Role Name</label>
                <Input value={selectedRole.role} readOnly className="bg-gray-50" />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea value={selectedRole.description} placeholder="Role description" />
              </div>
              <div>
                <label className="text-sm font-medium">Permissions</label>
                <div className="space-y-2 mt-2">
                  {['All Access', 'User Management', 'Course Management', 'Content Upload', 'Student Management', 'System Settings', 'Analytics View'].map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={permission}
                        defaultChecked={selectedRole.permissions.includes(permission)}
                        className="rounded"
                      />
                      <label htmlFor={permission} className="text-sm">{permission}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditRoleModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveRolePermissions}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Permissions Modal */}
      <Dialog open={editUserModalOpen} onOpenChange={setEditUserModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User Permissions</DialogTitle>
            <DialogDescription>
              Configure custom permissions for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">User</label>
                <Input value={`${selectedUser.name} (${selectedUser.email})`} readOnly className="bg-gray-50" />
              </div>
              <div>
                <label className="text-sm font-medium">Current Role</label>
                <Input value={selectedUser.role} readOnly className="bg-gray-50" />
              </div>
              <div>
                <label className="text-sm font-medium">Custom Permissions</label>
                <div className="space-y-2 mt-2">
                  {['course_access', 'download_resources', 'community_access', 'course_creation', 'student_management', 'analytics_view', 'content_upload', 'system_settings'].map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={permission}
                        defaultChecked={selectedUser.customPermissions.includes(permission)}
                        className="rounded"
                      />
                      <label htmlFor={permission} className="text-sm">{permission.replace('_', ' ')}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditUserModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveUserPermissions}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Audit Log Details Modal */}
      <Dialog open={auditDetailsModalOpen} onOpenChange={setAuditDetailsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Audit Log Details</DialogTitle>
            <DialogDescription>
              Detailed information about this security event
            </DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Action</label>
                  <p className="text-sm">{selectedLog.action}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <Badge className={getStatusColor(selectedLog.status)}>{selectedLog.status}</Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">User</label>
                <p className="text-sm">{selectedLog.user}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Timestamp</label>
                <p className="text-sm">{selectedLog.timestamp}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">IP Address</label>
                  <p className="text-sm">{selectedLog.ip}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Browser</label>
                  <p className="text-sm">{selectedLog.browser}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Location</label>
                <p className="text-sm">{selectedLog.location}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Details</label>
                <p className="text-sm">{selectedLog.details}</p>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setAuditDetailsModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
              <Input 
                type="number" 
                value={passwordPolicy.minLength}
                onChange={(e) => setPasswordPolicy(prev => ({ ...prev, minLength: parseInt(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Require uppercase letters</span>
                <Switch 
                  checked={passwordPolicy.requireUppercase}
                  onCheckedChange={(checked) => setPasswordPolicy(prev => ({ ...prev, requireUppercase: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Require lowercase letters</span>
                <Switch 
                  checked={passwordPolicy.requireLowercase}
                  onCheckedChange={(checked) => setPasswordPolicy(prev => ({ ...prev, requireLowercase: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Require numbers</span>
                <Switch 
                  checked={passwordPolicy.requireNumbers}
                  onCheckedChange={(checked) => setPasswordPolicy(prev => ({ ...prev, requireNumbers: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Require special characters</span>
                <Switch 
                  checked={passwordPolicy.requireSpecialChars}
                  onCheckedChange={(checked) => setPasswordPolicy(prev => ({ ...prev, requireSpecialChars: checked }))}
                />
              </div>
            </div>
            <Button className="w-full" onClick={handleSavePasswordPolicy}>
              Save Password Policy
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecurityManagement;
