const Review = require('../model/review');

const createReview = async (req, res) => {
    try {
        const { content, user, restaurants } = req.body;
        console.log(req.body);

        if(!content || !user || !restaurants) {
            return res.status(403).json({
                result: false,
                msg: "madatory fields are not present"
            });
        }

        const review = await Review.create({
            content: content,
            user: user,
            restaurants: restaurants
        });

        return res.status(200).json({
            result: true,
            msg: "Reviews added successfully",
            review: review
        });
        
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({
            result: true,
            msg: "INTERNAL SERVER ERROR: error in creating review"
        });
    }
}

const fetchAllReviewsOfRestaurants = async (req, res) => {
    try {
        console.log('req.query', req.query);
        const { restaurants } = req.query;
        const review = await Review.find({restaurants: restaurants}).populate('restaurants', 'name address').populate('user', 'firstName');

        return res.status(200).json({
            result: true,
            msg: "All review of post here: ",
            review: review
        });
        
    } catch (error) {
        console.log('error: ', error);
        return res.status(200).json({
            result: false,
            msg: "Error in fetching"
        });
    }
}

module.exports = {
    createReview,
    fetchAllReviewsOfRestaurants
}