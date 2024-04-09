const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://manvitha_m:umes%401234@cluster0.bvfldq6.mongodb.net/umes1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
    console.log("Connected to MongoDB database.");
});
db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['event_organizer', 'admin'],
        required: true
    }
});

const User = mongoose.model('User', userSchema);

// Route to handle user login
app.post("/login", async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ username, password });
        if (existingUser) {
            res.status(200).json({ valid: true, username: existingUser.username, role: existingUser.role });
        } else {
            res.status(200).json({ valid: false });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    participants: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeIn: {
        type: String,
        required: true
    },
    timeOut: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    refreshments: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    approved: {
        type: Boolean,
        default: null
    }
});


const Event = mongoose.model('Event', eventSchema);

app.post("/events", async (req, res) => {
    try {
        const eventData = req.body;
        const newEvent = new Event(eventData);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/events", async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.patch("/events/:id/approve", async (req, res) => {
    const eventId = req.params.id;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, { approved: true }, { new: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.patch("/events/:id/decline", async (req, res) => {
    const eventId = req.params.id;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, { approved: false }, { new: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/events/approved", async (req, res) => {
    try {
        const approvedEvents = await Event.find({ approved: true });
        res.status(200).json(approvedEvents);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/events/declined", async (req, res) => {
    try {
        const approvedEvents = await Event.find({ approved: false });
        res.status(200).json(approvedEvents);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/events/search", async (req, res) => {
    const { searchTerm } = req.query;
    try {
        const events = await Event.find({ name: { $eq: searchTerm } });
        res.status(200).json(events);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});