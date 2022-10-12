import Agenda from "agenda";
import dotenv from "dotenv";

dotenv.config();

const agenda = new Agenda({
  db: { collection: "agendaJobs", address: process.env.MONGO_URI || "" },
  processEvery: "1 minute",
  maxConcurrency: parseInt(process.env.AGENDA_CONCURRENCY || "2", 10),
});

export default agenda;
