import { useState, useEffect } from 'react';

const useRepositories = () => {
   const [repositories, setRepositories] = useState();
   const [loading, setLoading] = useState(false);

   const fetchRepositories = async() => {
      const response = await fetch("http://192.168.1.134:5000/api/repositories")
      const json = await response.json();
      setRepositories(json);
      setLoading(false);
   }

   useEffect(() => {
      fetchRepositories();
   }, []);

   return { repositories, loading, refetch: fetchRepositories };
}

export default useRepositories;