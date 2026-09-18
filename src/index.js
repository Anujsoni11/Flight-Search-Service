const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require('./config/serverConfig');
const ApiRoutes = require('./routes/index');

const db = require('./models/index');
// const {Airport, City} = require('./models/index');

const setupAndStartServer = async() => {
      // create the express object
      const app = express();

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended: true}));
      
      app.use('/api', ApiRoutes);
      app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
        if(process.env.SYNC_DB){ 
          db.sequelize.sync({alter: true});
        }
        // const city = await City.findOne({
        //      where: {
        //          id: 9
        //      }
        // });
        // const airports = await city .getAirports();  by this line u dont have to write select * from city join airports on city.id = airport.cityId where cityId = 9 in git bash
        // console.log(city, airports);
      });
}

setupAndStartServer();

// After creating models and synchronisation we have to sync db one time only