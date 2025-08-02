import { Log } from "../middleware/logger.js";
import { generateShortCode } from "../utils/validateUrl.js";
import Url from "../models/url.model.js";
import Stats from "../models/stats.model.js";

export const shortUrl = async (req, res) => {
  try {
    let { shortCode, url: longUrl, validity } = req.body;
    if (!longUrl) {
      res.status(400).json({ message: "Url missing" });
      Log("backend", "error", "service", "Url missing");
    }
    if (!validity) validity = Date.now() + 30 * 60 * 1000;
    if (!shortCode) shortCode = generateShortCode();
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
    const isShortCodeExists = await Url.findOne({ shortCode: shortCode });
    if (isShortCodeExists)
      return res.status(400).json({ message: "Short code already exists" });
    const new_url = new Url({
      longUrl,
      shortUrl,
      shortCode,
      validity,
    });
    await new_url.save();
    if (new_url) {
      return res.status(201).json({
        message: "Url created successfully",
        shortUrl: new_url.shortUrl,
      });
    }
  } catch (err) {
    Log(
      "backend",
      (level = "error"),
      (pkg = "service"),
      "Internal server error"
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUrls = async (req, res) => {
  try {
    const urlsData = await Url.find();
    console.log(urlsData);
    if (urlsData) {
      Log("backend", "info", "service", "Found Urls");
      return res.status(200).json({ message: "Found urls", urlsData });
    }
    return res.status(400).json({ message: "no urls found" });
  } catch (err) {
    Log(
      "backend",
      (level = "error"),
      (pkg = "service"),
      "Internal server error"
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    if (!shortCode) {
      Log("backend", "error", "service", "url missing");
      return res.status(400).json({ message: "Url missing" });
    }
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
    const url_info = await Url.findOne({ shortUrl: shortUrl });
    if (!url_info) {
      ``;
      Log("backend", "error", "service", "url not found");
      return res.status(404).json({ message: "Url not found" });
    }
    const isExpired = Date.now() <= url_info.validity;
    if (isExpired) {
      Log("backend", "error", "service", "url expired");
      return res.status(403).json({ message: "Url expired" });
    }
    const stats = await Stats.findOne({ url: url_info._id });
    if (stats) {
      const updateStats = await Stats.findByIdAndUpdate(
        { _id: stats._id },
        {
          clicks: stats.clicks + 1,
        },
        { new: true, runValidators: true }
      );
      console.log("updated stats", updateStats);
    }
    const new_stats = new Stats({
      click: 1,
      location: req.ip,
      url: url_info._id,
    });
    await new_stats.save();
    res.redirect(302, url_info.longUrl);
  } catch (err) {
    Log("backend", "error", "service", "Internal server error");
    return res.status(500).json({ message: "Internal server error" });
  }
};
