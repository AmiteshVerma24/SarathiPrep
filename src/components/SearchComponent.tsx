import React, { useState } from 'react';
import axios from 'axios';

interface SearchResult {
    title: string;
    link: string;
    summary: string;
}

const SearchComponent: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:3000/jobPortal/getJobs', { params: { q: query } });
            setResults(response.data);
        } catch (err) {
            setError('Failed to fetch results');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for fresher job openings..."
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button
                    onClick={handleSearch}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Search
                </button>
            </div>

            {loading && <div className="text-center text-blue-500">Loading...</div>}

            {error && <div className="text-center text-red-500">{error}</div>}

            <div>
                {results.length > 0 && results.map((result, index) => (
                    <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md shadow-md">
                        <h2 className="text-xl font-bold mb-2">{result.title}</h2>
                        <a href={result.link} className="text-blue-500 underline">{result.link}</a>
                        <p className="mt-2">{result.summary}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchComponent;
