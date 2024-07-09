'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CustomScripts = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [scriptType, setScriptType] = useState<string>('');
  const [csrfToken, setCsrfToken] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:8000/filehandler/csrf-token/', { withCredentials: true })
      .then(response => setCsrfToken(response.data.csrfToken))
      .catch(error => console.error('Error fetching CSRF token:', error));
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const handleScriptChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setScriptType(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!files) {
      console.error('No files selected');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file_field', files[i]);
    }
    formData.append('script_type', scriptType);

    try {
      const response = await axios.post('http://localhost:8000/filehandler/upload/', formData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      });

      if (response.data.download_available) {
        router.push('/display');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Custom Scripts</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          required
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          onChange={handleScriptChange}
          required
          className="block w-full text-black text-sm border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Script</option>
          <option value="test">Test</option>
          <option value="analysis_yemk_phl_live">Analysis Yemk PHL Live</option>
          <option value="analysis_flip700_phl_live">Analysis Flip700 PHL Live</option>
          <option value="compile_flip700">Compile Flip700</option>
          <option value="compile_yemk">Compile Yemk</option>
          <option value="compile_phl">Compile PHL</option>
          <option value="compile_live">Compile Live</option>
          <option value="concatenate_analysis">Concatenate Analysis</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default CustomScripts;
