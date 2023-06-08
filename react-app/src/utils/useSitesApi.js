import { useState, useEffect, useCallback } from 'react';

export async function fetchSites() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sites`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Sites:', error);
  }
}

export default function useSiteDetails(siteId) {
  const [isLoadingSiteDetails, setIsLoadingSiteDetails] = useState(true);
  const [siteDetails, setSiteDetails] = useState({});

  const fetchSiteDetails = useCallback(async () => {
    try {
      setIsLoadingSiteDetails(true);
      const sites = await fetchSites();
      for (let site of sites) {
        if (site._id === siteId) {
          setSiteDetails(site);
          break;
        }
      }
    } catch (error) {
      console.error('Error fetch Sites:', error);
    } finally {
      setIsLoadingSiteDetails(false);
    }
  }, [siteId]);

  useEffect(() => {
    fetchSiteDetails();
  }, [fetchSiteDetails]);

  return { siteDetails, isLoadingSiteDetails };
}
