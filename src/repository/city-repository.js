const { Op } = require('sequelize');
const { City } = require('../models/index');

class CityRepository{
    async createCity({ name }){    // by { name } this property we will be easily get direct access of key: name and by this u dont have to use obj.name inside function to access key: name
        try{
            const city = await City.create({ name });
            return city;
        } catch (error){
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async deleteCity(cityId){
        try{
            await City.destory({
                where: {
                    id: cityId
                }
            });
            return true;
        }catch (error){
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
    async updateCity(cityId, data){
        try {
            // This approach will not return updated object
            // if we are using pgsql then returning true can be used else not
            // const city = await City.update(data, {
            //     where: {
            //         id: cityId
            //     }
            // });
            // For returning updated city follow below approach 
            const city = await City.findByPk(cityId);
            city.name = data.name;
            await city.save();
            return city;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getCity(cityId){
        try {
            const city = await City.findByPk(cityId);
            return city;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getAllCities(filter){   // filter can be empty and if it is empty then it will return all the cities
        try {
            if(filter.name){
                const cities = await City.findAll({
                    where: {
                        name: {
                            [Op.startsWith]: filter.name
                        }
                    }
                });
                return cities; 
            }
            const cities = await City.findAll();
            return cities;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
}

module.exports = CityRepository;