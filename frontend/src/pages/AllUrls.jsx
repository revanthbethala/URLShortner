import React from "react";
import useFetch from "../useFetch";

function AllUrls({ setShowCard, setStatsUrl }) {
  const { data, isLoading, error } = useFetch("shortUrls");
  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <p className="flex items-center justify-center h-[90vh] text-lg font-semibold text-red-600">
        Error occurred while fetching data
      </p>
    );
  const urlsData = data?.urlsData;

  return (
    <div className="w-full p-5">
      <h2>URLS INFO</h2>
      <table className="min-w-full table-auto border border-gray-400 rounded-xl overflow-hidden shadow-md">
        <thead className="bg-gray-100 text-left">
          <tr className="text-sm text-gray-700">
            <th className="px-4 py-2 border-r">URL</th>
            <th className="px-4 py-2 border-r">Short URL</th>
            <th className="px-4 py-2 border-r">Short Code</th>
            <th className="px-4 py-2 border-r">Validity</th>
            <th className="px-4 py-2">Stats</th>
          </tr>
        </thead>
        <tbody>
          {urlsData?.map((urlInfo, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 max-w-[300px] truncate">
                <a
                  href={urlInfo?.longUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {urlInfo?.longUrl}
                </a>
              </td>
              <td className="px-4 py-2 ">
                <a
                  href={urlInfo?.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {urlInfo?.shortUrl}
                </a>
              </td>
              <td className="px-4 py-2">{urlInfo?.shortCode}</td>
              <td className="px-4 py-2">{urlInfo?.validity}</td>
              <td
                onClick={() => {
                  setShowCard("stats");
                  setStatsUrl(urlInfo?.shortCode);
                }}
                className="px-4 py-2 hover:underline-offset-2 cursor-pointer hover:underline rounded-lg text-purple-600 font-semibold"
              >
                Stats
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllUrls;
