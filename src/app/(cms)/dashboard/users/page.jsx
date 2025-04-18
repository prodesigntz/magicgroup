'use client';

import React, { useState, useEffect } from 'react';
import { fetchDocuments, updateDocument } from '@/firebase/databaseOperations';
import { format } from 'date-fns';
import useFetchAll from '@/lib/hooks/useFetchAll';

const UserStatus = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  DECLINED: 'Declined'
};

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch users
  const { data, didSucceed, isLoading } = useFetchAll("users");

  useEffect(() => {
    if (data && data.length > 0) {
      const sortedUsers = [...data].sort((a, b) => {
        return b.createdAt?.toDate() - a.createdAt?.toDate();
      });
      setUsers(sortedUsers);
    }
    setLoading(false);
  }, [data]);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      setLoading(true);
      const result = await updateDocument('users', userId, { isVerified: newStatus === UserStatus.APPROVED });
      if (result.didSucceed) {
        const updatedData = data.map(user => 
          user.id === userId ? { ...user, isVerified: newStatus === UserStatus.APPROVED } : user
        );
        setUsers(updatedData);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (isVerified) => {
    if (isVerified === true) return 'bg-green-100 text-green-800';
    if (isVerified === false) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getUserStatus = (isVerified) => {
    if (isVerified === true) return UserStatus.APPROVED;
    if (isVerified === false) return UserStatus.DECLINED;
    return UserStatus.PENDING;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(user.createdAt?.toDate() || new Date(), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={getUserStatus(user.isVerified)}
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(user.isVerified)}`}
                  >
                    {Object.values(UserStatus).map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">User Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="font-medium">Name:</label>
                <p>{selectedUser.firstName} {selectedUser.lastName}</p>
              </div>
              <div>
                <label className="font-medium">Email:</label>
                <p>{selectedUser.email}</p>
              </div>
              <div>
                <label className="font-medium">Role:</label>
                <p>{selectedUser.role}</p>
              </div>
              <div>
                <label className="font-medium">Status:</label>
                <p className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(selectedUser.isVerified)}`}>
                  {getUserStatus(selectedUser.isVerified)}
                </p>
              </div>
              <div>
                <label className="font-medium">Created At:</label>
                <p>{format(selectedUser.createdAt?.toDate() || new Date(), 'MMM dd, yyyy')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;