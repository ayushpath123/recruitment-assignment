import React, { useState, useEffect } from 'react';
import { authAPI } from '../api';
import { User, Mail, Calendar, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

const Profile = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.getProfile();
      setUser(response.user);
      setLastUpdated(new Date());
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-12">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{user?.name || 'Loading...'}</h1>
              <p className="text-blue-100 text-lg">{user?.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="text-green-100">Verified Account</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
            <button
              onClick={fetchProfile}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-gray-900">{user?.name || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                  <p className="text-gray-900">{user?.email || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">User ID</p>
                  <p className="text-gray-900 font-mono text-sm">{user?.id || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-sm font-medium text-green-800 mb-2">Account Status</h3>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-700">Active & Verified</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Platform Access</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Profile Management</span>
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Job Applications</span>
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Communication</span>
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </div>

              {lastUpdated && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-800 mb-1">Last Updated</h3>
                  <p className="text-sm text-gray-600">
                    {lastUpdated.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-900 mb-2">Edit Profile</h3>
          <p className="text-gray-600 text-sm mb-4">Update your personal information and preferences</p>
          <button className="btn-secondary w-full">Coming Soon</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-900 mb-2">Job Applications</h3>
          <p className="text-gray-600 text-sm mb-4">View and manage your job applications</p>
          <button className="btn-secondary w-full">Coming Soon</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-900 mb-2">Settings</h3>
          <p className="text-gray-600 text-sm mb-4">Manage your account settings and privacy</p>
          <button className="btn-secondary w-full">Coming Soon</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;