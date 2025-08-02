import useFetch from "../useFetch";

function Stats({ statsUrl }) {
  const { data, isLoading, error } = useFetch(`${statsUrl}/stats`);

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center text-lg font-medium">
        Loading...
      </div>
    );

  if (error)
    return (
      <p className="flex items-center justify-center h-[90vh] text-lg font-semibold text-red-600">
        Error occurred while fetching data
      </p>
    );

  const { url, clicks, location } = data?.stats || {};

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-300">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">URL Stats</h2>

      <div className="space-y-3 text-gray-700 text-sm">
        <div>
          <span className="font-semibold">Short URL: </span>
          <a
            href={url?.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-words"
          >
            {url?.shortUrl}
          </a>
        </div>
        <div>
          <span className="font-semibold">Long URL: </span>
          <a
            href={url?.longUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-words"
          >
            {url?.longUrl}
          </a>
        </div>
        <div>
          <span className="font-semibold">Short Code: </span>
          {url?.shortCode}
        </div>
        <div>
          <span className="font-semibold">Validity: </span>
          {url?.validity}
        </div>
        <div>
          <span className="font-semibold">Total Clicks: </span>
          {clicks}
        </div>
        <div>
          <span className="font-semibold">Visitor Location: </span>
          {location === "::1" ? "Localhost (Developer)" : location}
        </div>
      </div>
    </div>
  );
}

export default Stats;
