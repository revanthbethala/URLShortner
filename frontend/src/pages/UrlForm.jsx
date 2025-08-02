import axios from "axios";
import { useState } from "react";

function UrlForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    url: "",
    shortCode: "",
    validity: 30,
  });
  const [urlInfo, setUrlInfo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUrlInfo(null);

    try {
      setIsLoading(true);

      const res = await axios.post(
        "http://localhost:3000/shortUrls",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setUrlInfo(res?.data?.shortUrl);
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-gray-100 shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          URL Shortener
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
              Original URL
            </label>
            <input
              type="url"
              name="url"
              id="url"
              value={formData.url}
              onChange={handleChange}
              required
              placeholder="https://example.com"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="shortCode"
              className="block text-sm font-medium text-gray-700"
            >
              Custom Short Code (optional)
            </label>
            <input
              type="text"
              name="shortCode"
              id="shortCode"
              value={formData.shortCode}
              onChange={handleChange}
              placeholder="e.g., mycode"
              maxLength={6}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="validity"
              className="block text-sm font-medium text-gray-700"
            >
              Validity (in minutes)
            </label>
            <input
              type="number"
              name="validity"
              id="validity"
              value={parseInt(formData.validity)}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min={1}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Shorten URL"}
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-sm mt-4 text-center font-medium">
            {error}
          </p>
        )}

        {urlInfo && (
          <div className="mt-6 p-4 bg-green-100 rounded-md text-center">
            <p className="text-green-700 font-semibold">Short URL:</p>
            <a
              href={urlInfo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-words"
            >
              {urlInfo}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default UrlForm;
