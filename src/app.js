import express from "express";

import { startupRouter } from "./routes/startup.routes.js";
import { serviceRouter } from "./routes/service.routes.js";
import { testimonialRouter } from "./routes/testimonial.routes.js";
import { faqRouter } from "./routes/faq.routes.js";
import { socialMediaRouter } from "./routes/socialMedia.routes.js";
import { contactRouter } from "./routes/contact.routes.js";

const app = express();

app.use(express.json());

const basePath = "/api/portfolio";

app.use(basePath + "/startup", startupRouter);
app.use(basePath + "/service", serviceRouter);
app.use(basePath + "/testimonial", testimonialRouter);
app.use(basePath + "/faq", faqRouter);
app.use(basePath + "/socialmedia", socialMediaRouter);
app.use(basePath + "/contact", contactRouter);

export { app };
