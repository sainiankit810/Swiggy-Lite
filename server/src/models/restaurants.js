const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    banner: {
        type: String,
        required: true
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    phone: {
        type: String,
        required: true
    },

    cuisine: {
        type: Array,
        default: []
    },

    avg_rating: {
        type: Number,
        default: 0
    },

    openingTime: {
        type: String,
        default: ""
    },

    closingTime: {
        type: String,
        default: ""
    },

},
{
    timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;

// {
//     "info": {
//       "id": "63405",
//       "name": "La Pino'z Pizza",
//       "cloudinaryImageId": "wpf4ibmwqehwm9p4bqep",
//       "locality": "Kharar Road",
//       "areaName": "New Sunny Enclave Kharar",
//       "costForTwo": "₹300 for two",
//       "cuisines": [
//         "Pizzas",
//         "Pastas",
//         "Italian",
//         "Desserts",
//         "Beverages"
//       ],
//       "avgRating": 4.3,
//       "parentId": "4961",
//       "avgRatingString": "4.3",
//       "totalRatingsString": "10K+",
//       "sla": {
//         "deliveryTime": 31,
//         "lastMileTravel": 3.8,
//         "serviceability": "SERVICEABLE",
//         "slaString": "30-35 mins",
//         "lastMileTravelString": "3.8 km",
//         "iconType": "ICON_TYPE_EMPTY"
//       },
//       "availability": {
//         "nextCloseTime": "2024-03-01 01:00:00",
//         "opened": true
//       },
//       "badges": {
        
//       },
//       "isOpen": true,
//       "type": "F",
//       "badgesV2": {
//         "entityBadges": {
//           "imageBased": {
            
//           },
//           "textBased": {
            
//           },
//           "textExtendedBadges": {
            
//           }
//         }
//       },
//       "aggregatedDiscountInfoV3": {
//         "header": "ITEMS",
//         "subHeader": "AT ₹199"
//       },
//       "differentiatedUi": {
//         "displayType": "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
//         "differentiatedUiMediaDetails": {
//           "mediaType": "ADS_MEDIA_ENUM_IMAGE",
//           "lottie": {
            
//           },
//           "video": {
            
//           }
//         }
//       },
//       "reviewsSummary": {
        
//       },
//       "displayType": "RESTAURANT_DISPLAY_TYPE_DEFAULT",
//       "restaurantOfferPresentationInfo": {
        
//       }
//     },
//     "analytics": {
      
//     },
//     "cta": {
//       "link": "https://www.swiggy.com/restaurants/la-pinoz-pizza-kharar-road-new-sunny-enclave-kharar-chandigarh-63405",
//       "type": "WEBLINK"
//     }
//   },