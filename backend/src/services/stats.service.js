import { Log } from "../middleware/logger.js";
import Stats from "../models/stats.model.js";
import Url from "../models/url.model.js";

export const urlStats = async (req, res) => {
  try {
    const { shortUrl: shortCode } = req.params;
    Log(
      "backend",
      "info",
      "service",
      `Request received to fetch stats for shortCode: ${shortCode}`
    );

    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
    const url_info = await Url.findOne({ shortUrl: shortUrl });

    if (!url_info) {
      Log("backend", "warn", "service", `Short URL not found: ${shortUrl}`);
      return res.status(404).json({ message: "URL not found" });
    }

    if (Date.now() <= url_info.validity) {
      Log("backend", "info", "service", `Short URL expired: ${shortUrl}`);
      return res.status(403).json({ message: "URL validity expired" });
    }

    const url_stats = await Stats.findOne({ url: url_info._id }).populate(
      "url"
    );

    if (!url_stats) {
      Log(
        "backend",
        "warn",
        "service",
        `No stats found for short URL: ${shortUrl}`
      );
      return res.status(404).json({ message: "Stats not found" });
    }

    Log(
      "backend",
      "info",
      "service",
      `Stats successfully retrieved for ${shortUrl}`
    );
    return res.status(200).json({ message: "Stats found", stats: url_stats });
  } catch (err) {
    Log("backend", "error", "service", `Internal server error: ${err.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};
