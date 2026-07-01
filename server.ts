import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.json());

// Proxy for account deletion request
app.post("/api/removeaccount", async (req, res) => {
  try {
    const response = await fetch("https://bareeyapiendpoint.azurewebsites.net/removeaccount/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(502).json({ success: false, message: "Failed to contact verification server" });
  }
});

// Helper to serve template files
const serveTemplate = (res: express.Response, fileName: string) => {
  const filePath = path.join(process.cwd(), "api", "templates", fileName);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Template not found: " + fileName);
  }
};

// Route handlers
app.get("/", (req, res) => serveTemplate(res, "index.html"));
app.get(["/deleteaccount", "/deleteaccount/"], (req, res) => serveTemplate(res, "deleteaccount.html"));
app.get(["/settings/remove", "/settings/remove/"], (req, res) => serveTemplate(res, "deleteaccount.html"));
app.get(["/privacy", "/privacy/"], (req, res) => serveTemplate(res, "privacy.html"));
app.get(["/privacy-policy", "/privacy-policy/"], (req, res) => serveTemplate(res, "privacy.html"));
app.get(["/terms", "/terms/"], (req, res) => serveTemplate(res, "terms.html"));
app.get(["/terms-of-use", "/terms-of-use/"], (req, res) => serveTemplate(res, "terms.html"));
app.get(["/refund-policy", "/refund-policy/"], (req, res) => serveTemplate(res, "refund.html"));
app.get(["/about", "/about/"], (req, res) => serveTemplate(res, "about.html"));
app.get(["/contact", "/contact/"], (req, res) => serveTemplate(res, "contact.html"));
app.get(["/platform", "/platform/"], (req, res) => serveTemplate(res, "platform.html"));

// Fallback 404 handler
app.use((req, res) => {
  const filePath = path.join(process.cwd(), "api", "templates", "404.html");
  if (fs.existsSync(filePath)) {
    res.status(404).sendFile(filePath);
  } else {
    res.status(404).send("Page Not Found");
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Development server running on http://0.0.0.0:${PORT}`);
});
