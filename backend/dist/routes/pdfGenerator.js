"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const puppeteer_1 = __importDefault(require("puppeteer"));
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    const { name, about, skills, experience, education, projects } = req.body;
    const htmlContent = `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .header { text-align: center; }
        .two-column { display: flex; }
        .column { flex: 1; padding: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${name}</h1>
      </div>
      <div class="two-column">
        <div class="column">
          <h2>Experience</h2>
          <p>${experience}</p>
          <h2>Projects</h2>
          <p>${projects}</p>
        </div>
        <div class="column">
          <h2>About Me</h2>
          <p>${about}</p>
          <h2>Skills</h2>
          <p>${skills}</p>
          <h2>Education</h2>
          <p>${education}</p>
        </div>
      </div>
    </body>
    </html>
  `;
    try {
        const browser = await puppeteer_1.default.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdf = await page.pdf({ format: 'A4' });
        await browser.close();
        res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length });
        res.send(pdf);
    }
    catch (err) {
        res.status(500).send('Error generating PDF');
    }
});
exports.default = router;
