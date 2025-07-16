import { useState, useEffect } from 'react';
import axios from 'axios';

export const useLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLeaveRequests = async (filterType = "all") => {
    setLoading(true);
    try {
      const url = filterType === "all" 
        ? "http://localhost:5202/api/leaverequests"
        : `http://localhost:5202/api/leaverequests?type=${filterType}`;
      
      const response = await axios.get(url);
      setLeaveRequests(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5202/api/leaverequests/${id}/${status.toLowerCase()}`);
      fetchLeaveRequests(); 
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchLeaveRequests, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return { 
    leaveRequests, 
    loading, 
    error, 
    fetchLeaveRequests, 
    updateRequestStatus 
  };
};