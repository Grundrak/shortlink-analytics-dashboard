import { useAuthStore } from '../stores/authStore';
import { User, Mail, Shield, Key } from 'lucide-react';

export const SettingsPage = () => {
    const { user } = useAuthStore();

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>

            <div className="space-y-6">
                {/* Profile Information */}
                <div className="bg-white rounded-lg border shadow-sm">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                            <User className="h-5 w-5 text-gray-500" />
                            Profile Information
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                    <input 
                                        type="email" 
                                        value={user.email || ''} 
                                        disabled 
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <p className="text-xs text-gray-500">Email cannot be changed directly.</p>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Account Role</label>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                    <input 
                                        type="text" 
                                        value={user.role || 'USER'} 
                                        disabled 
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-md text-gray-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subscription & Plan */}
                <div className="bg-white rounded-lg border shadow-sm">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                            <Shield className="h-5 w-5 text-gray-500" />
                            Subscription Plan
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                            <div>
                                <p className="font-semibold text-gray-900">Current Plan: {user.subscription || 'FREE'}</p>
                                <p className="text-sm text-gray-500">Active since account creation</p>
                            </div>
                            <button disabled className="px-4 py-2 text-sm text-gray-400 border border-gray-200 rounded bg-gray-100 cursor-not-allowed">
                                Manage Subscription
                            </button>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white rounded-lg border shadow-sm">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                            <Key className="h-5 w-5 text-gray-500" />
                            Security
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 border rounded-lg hover:border-gray-300 transition-colors">
                            <div>
                                <h4 className="font-medium text-gray-900">Change Password</h4>
                                <p className="text-sm text-gray-500">Ensure your account uses a long, random password to stay secure.</p>
                            </div>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary/90 transition-colors">
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
