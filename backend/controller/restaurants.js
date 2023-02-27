const Restaurants = require('../model/restaurants');

const createRestaurants = async (req, res) => {
    try {
        const { name, email, address, foods, description } = req.body;
        console.log('rq', req.body);

        if(!name || !address || !email || !description ) {
            return res.status(200).json({
                result: false,
                msg: "Mandatory fields are not present",
            });
        }
        let restaurants = await Restaurants.findOne({email: email});
        if(restaurants) {
            return res.status(403).json({
                result: false,
                msg: "An User already exist"
            });
        }
        restaurants = await Restaurants.create({
            name: name,
            address: address,
            email: email,
            description: description,
            foods: foods
        });

        return res.status(200).json({
            result: true,
            msg: "Restaurants registered successfully"
        });
        
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({
            msg: "INTERNAL_SERVER_ERROR",
            err: error.msg
        })
    }
}


const fetchAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurants.find({});

        return res.status(200).json({
            result: true,
            msg: "fetched successfully",
            restaurants: restaurants
        });
        
    } catch (error) {
        return res.status(500).json({
            result: false,
            msg: "Error in fetching all restaurants"
        });
    }
}

const getDetailsOfRestaurants = async (req, res) => {
    try {
        const {id} = req.query;
        if(!id) {
            return res.status(404).json({
                result: false,
                msg: "id not present"
            });
        }
        const restaurants = await Restaurants.findOne({_id: id});
        return res.status(200).json({
            result: true,
            msg: "Restaurants fetched successfully",
            restaurants: restaurants
        });
        
    } catch (error) {
        console.log('error: ', error);
        return res.status(200).json({
            msg: "Error in feching details of restaurants",
            res: true
        })
    }
}

module.exports = {
    createRestaurants,
    fetchAllRestaurants,
    getDetailsOfRestaurants
}