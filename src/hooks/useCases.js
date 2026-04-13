import { useState, useEffect, useCallback } from 'react';
import { mockCaseService } from '../services/mockCaseService';

export const useCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCases = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockCaseService.getCases();
      setCases(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const createCase = async (caseData) => {
    setLoading(true);
    try {
      await mockCaseService.createCase(caseData);
      await fetchCases(); // Re-fetch to get updated list
      return true;
    } catch (e) {
      console.error(e);
      setLoading(false);
      throw e;
    }
  };

  const updateCase = async (id, updateData) => {
    setLoading(true);
    try {
      await mockCaseService.updateCase(id, updateData);
      await fetchCases();
      return true;
    } catch (e) {
      console.error(e);
      setLoading(false);
      throw e;
    }
  };

  const bulkUpdateCases = async (ids, updateData) => {
    setLoading(true);
    try {
      await mockCaseService.bulkUpdateCases(ids, updateData);
      await fetchCases();
      return true;
    } catch (e) {
       console.error(e);
       setLoading(false);
       throw e;
    }
  };

  const addCommentToCases = async (ids, commentData) => {
      setLoading(true);
      try {
          await mockCaseService.addCommentToCases(ids, commentData);
          await fetchCases();
          return true;
      } catch (e) {
          console.error(e);
          setLoading(false);
          throw e;
      }
  }

  return {
    cases,
    loading,
    error,
    refreshCases: fetchCases,
    createCase,
    updateCase,
    bulkUpdateCases,
    addCommentToCases
  };
};
