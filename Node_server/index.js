const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const { getPlace } = require('./apiActions');
const { generateTourAPI } = require('./geoApi')

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();
router.post("/calculate-tour-plan", generateTourAPI);
// router.post("/calculate-tour-plan", getPlace);
const PORT = 8000
app.use("/", router);
app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));

