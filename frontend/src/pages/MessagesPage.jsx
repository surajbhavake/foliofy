import { useState } from 'react';
import { useMessages, useMarkAsRead, useDeleteMessage } from '../hooks/useMessages';
import { FiMail, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const MessagesPage = () => {
  const { data: messages, isLoading } = useMessages();
  const markAsReadMutation = useMarkAsRead();
  const deleteMutation = useDeleteMessage();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = async (message) => {
    if (expandedId === message.id) {
      setExpandedId(null);
    } else {
      setExpandedId(message.id);
      if (!message.is_read) {
        await markAsReadMutation.mutateAsync(message.id);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      await deleteMutation.mutateAsync(id);
      if (expandedId === id) setExpandedId(null);
    }
  };

  if (isLoading) return <div className="p-6">Loading messages...</div>;

  const unreadCount = messages?.filter(m => !m.is_read).length || 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500 mt-1">{unreadCount} unread message{unreadCount !== 1 ? 's' : ''}</p>
          )}
        </div>
      </div>

      {messages?.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <FiMail className="mx-auto text-4xl mb-3" />
          <p>No messages yet. Messages from your portfolio visitors will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`bg-white rounded-lg shadow overflow-hidden ${
                !message.is_read ? 'border-l-4 border-indigo-500' : ''
              }`}
            >
              {/* Message header (always visible) */}
              <button
                onClick={() => toggleExpand(message)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className={`font-semibold ${!message.is_read ? 'text-indigo-600' : ''}`}>
                      {message.sender_name}
                    </span>
                    {!message.is_read && (
                      <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">New</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-0.5">{message.subject}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(message.created_at).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(message.id);
                    }}
                    className="text-red-400 hover:text-red-600"
                  >
                    <FiTrash2 />
                  </button>
                  {expandedId === message.id ? <FiChevronUp /> : <FiChevronDown />}
                </div>
              </button>

              {/* Expanded content */}
              {expandedId === message.id && (
                <div className="px-4 pb-4 border-t">
                  <div className="pt-3">
                    <p className="text-sm text-gray-500 mb-1">
                      From: <a href={`mailto:${message.sender_email}`} className="text-indigo-600 hover:underline">{message.sender_email}</a>
                    </p>
                    <p className="font-medium mb-2">{message.subject}</p>
                    <p className="text-gray-700 whitespace-pre-line">{message.message}</p>
                    <div className="mt-4">
                      <a
                        href={`mailto:${message.sender_email}?subject=Re: ${encodeURIComponent(message.subject)}`}
                        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
                      >
                        Reply via Email
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesPage