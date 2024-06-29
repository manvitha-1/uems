// require('dotenv').config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect("mongodb+srv://manvitha_m:umes%401234@cluster0.bvfldq6.mongodb.net/umes1", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.once("open", () => {
//     console.log("Connected to MongoDB database.");
// });
// db.on("error", (error) => {
//     console.error("MongoDB connection error:", error);
// });

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['event_organizer', 'admin'],
//         required: true
//     }
// });

// const User = mongoose.model('User', userSchema);

// // Route to handle user login
// app.post("/login", async (req, res) => {
//     const { username, password, role } = req.body;
//     try {
//         const existingUser = await User.findOne({ username, password });
//         if (existingUser) {
//             res.status(200).json({ valid: true, username: existingUser.username, role: existingUser.role });
//         } else {
//             res.status(200).json({ valid: false });
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// const eventSchema = new mongoose.Schema({
//     eventName: {
//         type: String,
//         required: true
//     },
//     participants: {
//         type: Number,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         required: true
//     },
//     timeIn: {
//         type: String,
//         required: true
//     },
//     timeOut: {
//         type: String,
//         required: true
//     },
//     venue: {
//         type: String,
//         required: true
//     },
//     refreshments: {
//         type: String,
//         enum: ['Yes', 'No'],
//         required: true
//     },
//     approved: {
//         type: Boolean,
//         default: null
//     }
// });

// const Event = mongoose.model('Event', eventSchema);

// app.get('/', (req, res) => {
//     res.send("Hello Manvitha!!");
// });

// app.post("/events", async (req, res) => {
//     try {
//         const eventData = req.body;
//         const newEvent = new Event(eventData);
//         await newEvent.save();
//         res.status(201).json(newEvent);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// app.get("/events", async (req, res) => {
//     try {
//         const events = await Event.find();
//         res.status(200).json(events);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// app.patch("/events/:id/approve", async (req, res) => {
//     const eventId = req.params.id;
//     try {
//         const updatedEvent = await Event.findByIdAndUpdate(eventId, { approved: true }, { new: true });
//         res.status(200).json(updatedEvent);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// app.patch("/events/:id/decline", async (req, res) => {
//     const eventId = req.params.id;
//     try {
//         const updatedEvent = await Event.findByIdAndUpdate(eventId, { approved: false }, { new: true });
//         res.status(200).json(updatedEvent);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// app.get("/events/approved", async (req, res) => {
//     try {
//         const approvedEvents = await Event.find({ approved: true });
//         res.status(200).json(approvedEvents);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// app.get("/events/declined", async (req, res) => {
//     try {
//         const approvedEvents = await Event.find({ approved: false });
//         res.status(200).json(approvedEvents);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// app.get("/events/search", async (req, res) => {
//     const { searchTerm } = req.query;
//     try {
//         const events = await Event.find({ name: { $eq: searchTerm } });
//         res.status(200).json(events);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// app.post('/create-user', async (req, res) => {
//     const { username, password, role } = req.body;
//     if (!username || !password || !role) {
//         return res.status(400).json({ message: 'Username, password, and role are required' });
//     }

//     try {
//         const userExists = await User.findOne({ username });
//         if (userExists) {
//             return res.status(400).json({ message: 'Username is already taken' });
//         }

//         const newUser = new User({ username, password, role });
//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully', user: newUser });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

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

const createToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: "Token is required" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Route to handle user login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username, password });
        if (existingUser) {
            const token = createToken(existingUser);
            res.status(200).json({ valid: true, token : token, username: existingUser.username, role: existingUser.role });
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

app.get('/', (req, res) => {
    res.send("Hello Manvitha!!");
});

app.post("/events", verifyToken, async (req, res) => {
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

app.get("/events", verifyToken, async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.patch("/events/:id/approve", verifyToken, async (req, res) => {
    const eventId = req.params.id;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, { approved: true }, { new: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.patch("/events/:id/decline", verifyToken, async (req, res) => {
    const eventId = req.params.id;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, { approved: false }, { new: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/events/approved", verifyToken, async (req, res) => {
    try {
        const approvedEvents = await Event.find({ approved: true });
        res.status(200).json(approvedEvents);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/events/declined", verifyToken, async (req, res) => {
    try {
        const approvedEvents = await Event.find({ approved: false });
        res.status(200).json(approvedEvents);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/events/search", verifyToken, async (req, res) => {
    const { searchTerm } = req.query;
    try {
        const events = await Event.find({ eventName: { $regex: searchTerm, $options: 'i' } });
        res.status(200).json(events);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/create-user', async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Username, password, and role are required' });
    }

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        const newUser = new User({ username, password, role });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
