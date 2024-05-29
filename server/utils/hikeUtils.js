// const { ObjectId } = require("mongodb");

// const getHikeIdFromPlaceId = async (placeId) => {
//   try {
//     const placeIdToHikeIdMap = {
//       ChIJrbKWjGvCa4cRBxmPU26pPRs: "613fb62d1b546409b523487a", // Example mapping
//       // Add more mappings as needed
//     };

//     const hikeId = placeIdToHikeIdMap[placeId];

//     if (hikeId) {
//       return new ObjectId(hikeId);
//     } else {
//       throw new Error(`No hike found for placeId: ${placeId}`);
//     }
//   } catch (error) {
//     throw new Error(`Error retrieving hike from database: ${error.message}`);
//   }
// };

// module.exports = getHikeIdFromPlaceId;
