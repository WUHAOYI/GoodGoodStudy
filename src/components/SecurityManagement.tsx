
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, Eye, Edit, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SecurityManagement = () => {
  const { toast } = useToast();

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

  const [auditLogs] = useState([
    {
      id: 1,
      action: 'User Login',
      user: 'admin@example.com',
      timestamp: '2024-05-26 10:30:00',
      status: 'success',
      ip: '192.168.1.100',
      details: 'Successful admin login'
    },
    {
      id: 2,
      action: 'Course Deletion',
      user: 'teacher@example.com',
      timestamp: '2024-05-26 09:15:00',
      status: 'warning',
      ip: '192.168.1.105',
      details: 'Course "Old Python Tutorial" deleted'
    },
    {
      id: 3,
      action: 'Permission Change',
      user: 'admin@example.com',
      timestamp: '2024-05-26 08:45:00',
      status: 'info',
      ip: '192.168.1.100',
      details: 'Updated teacher permissions'
    },
    {
      id: 4,
      action: 'Failed Login Attempt',
      user: 'unknown@example.com',
      timestamp: '2024-05-26 07:30:00',
      status: 'error',
      ip: '192.168.1.200',
      details: 'Multiple failed login attempts detected'
    }
  ]);

  const handleEditPermission = (roleId: number) => {
    toast({
      title: "Edit Permissions",
      description: `Editing permissions for role ID: ${roleId}`,
    });
  };

  const handleViewAuditDetails = (logId: number) => {
    toast({
      title: "Audit Log Details",
      description: `Viewing details for log ID: ${logId}`,
    });
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Management</h2>
        <p className="text-gray-600">Manage system security, permissions, and audit logs</p>
      </div>

      <Tabs defaultValue="permissions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
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
                        <Button size="sm" variant="outline" onClick={() => handleEditPermission(role.id)}>
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
                        <Button size="sm" variant="outline" onClick={() => handleViewAuditDetails(log.id)}>
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
    </div>
  );
};

export default SecurityManagement;
