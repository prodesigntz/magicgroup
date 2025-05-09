'use client';

import React, { useState, useEffect } from 'react';
import { fetchDocuments, updateDocument } from '@/firebase/databaseOperations';
import { format } from 'date-fns';
import useFetchAll from '@/lib/hooks/useFetchAll';

const MessageStatus = {
  PENDING: 'Pending',
  WORKING: 'Working',
  SOLVED: 'Solved',
  DECLINED: 'Declined'
};

function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

   //fetch messages...............
   const { data, didSucceed, isLoading } = useFetchAll("Contactus");

   console.log("Contactus: ", data);

   useEffect(() => {
    if (data && data.length > 0) {
      const sortedMessages = [...data].sort((a, b) => {
        return b.createdAt?.toDate() - a.createdAt?.toDate();
      });
      setMessages(sortedMessages);
    }
    setLoading(false);
  }, [data]);

  const handleStatusChange = async (messageId, newStatus) => {
    try {
      setLoading(true);
      const result = await updateDocument('Contactus', messageId, { status: newStatus });
      if (result.didSucceed) {
        const updatedData = data.map(msg => 
          msg.id === messageId ? { ...msg, status: newStatus } : msg
        );
        setMessages(updatedData);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case MessageStatus.WORKING: return 'bg-yellow-100 text-yellow-800';
      case MessageStatus.SOLVED: return 'bg-green-100 text-green-800';
      case MessageStatus.DECLINED: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Messages Dashboard</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {messages.map((message) => (
              <tr key={message.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(message.createdAt?.toDate() || new Date(), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{message.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={message.status || MessageStatus.PENDING}
                    onChange={(e) => handleStatusChange(message.id, e.target.value)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(message.status)}`}
                  >
                    {Object.values(MessageStatus).map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => {
                      setSelectedMessage(message);
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
      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Message Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="font-medium">From:</label>
                <p>{selectedMessage.name} ({selectedMessage.email})</p>
              </div>
              <div>
                <label className="font-medium">Subject:</label>
                <p>{selectedMessage.subject}</p>
              </div>
              <div>
                <label className="font-medium">Message:</label>
                <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div>
                <label className="font-medium">Status:</label>
                <p className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(selectedMessage.status)}`}>
                  {selectedMessage.status || MessageStatus.PENDING}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessagesPage;