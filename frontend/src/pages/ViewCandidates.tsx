import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Database, RefreshCw } from 'lucide-react';


export interface UserRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const UserDirectory: React.FC = () => {
  const [data, setData] = useState<UserRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // --- START YOUR DB FETCH LOGIC HERE ---
        // Example: const response = await fetch('https://api.yourdb.com/users');
        // const json = await response.json();
        // setData(json);
        
        // Temporary mock data so you can see the beauty immediately!
        const mockData: UserRecord[] = [
          { id: 1, name: "Rahul Sharma", email: "rahul.s@tech.com", phone: "+91 98765 43210", address: "Visakhapatnam, AP" },
          { id: 2, name: "Sneha Reddy", email: "sneha.r@corp.in", phone: "+91 87654 32109", address: "Hyderabad, TS" },
          { id: 3, name: "Vijay Kumar", email: "v.kumar@dev.net", phone: "+91 76543 21098", address: "Vijayawada, AP" },
        ];
        setData(mockData);
        // --- END YOUR DB FETCH LOGIC HERE ---
      } catch (error) {
        console.error("Database error, Annaya:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Database className="text-blue-600" /> Applicants
            </h1>
            <p className="text-slate-500 text-sm"></p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            <RefreshCw size={16} /> Refresh Records
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2"><User size={14} /> Full Name</div>
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Mail size={14} /> Email</div>
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Phone size={14} /> Phone</div>
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2"><MapPin size={14} /> Address</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  // Loading Shimmer Effect
                  [...Array(3)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={4} className="px-6 py-8 bg-slate-50/50"></td>
                    </tr>
                  ))
                ) : data.length > 0 ? (
                  data.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-slate-900">{user.name}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                        {user.phone}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.address}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                      No records found in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-4 text-right">
          <p className="text-xs text-slate-400">Showing {data.length} active records</p>
        </div>
      </div>
    </div>
  );
};

export default UserDirectory;