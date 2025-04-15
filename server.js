import "dotenv/config";
import app from "./src/app.js";
import { sequelize, connectDB } from "./src/config/database.js";
import connectMongoDB from "./src/config/mongodb.js";
import "./src/models/postgresql/User.js";  // Import all models here
import "./src/models/Role.js";  // Import Role model
import "./src/models/postgresql/Ambassador.js";
import "./src/models/postgresql/Chapter.js";
import "./src/models/postgresql/Donation.js";
import "./src/models/postgresql/Forum.js";
import "./src/models/postgresql/Judge.js";
import "./src/models/postgresql/Membership.js";
import "./src/models/postgresql/MerchandiseOrder.js";
import "./src/models/postgresql/Nomination.js";
import "./src/models/postgresql/Referral.js";
import "./src/models/postgresql/Staff.js";
import "./src/models/postgresql/Ticket.js";
import "./src/models/postgresql/Volunteer.js";
import "./src/models/postgresql/Voting.js";
import "./src/models/postgresql/Wallet.js";




const PORT = process.env.PORT || 5000;

// Start the server after database connection
const startServer = async () => {

  await connectDB();
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });


};

startServer();
