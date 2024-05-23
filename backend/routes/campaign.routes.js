const campaigns = require("../controllers/campaign.controller");
const authJwt = require("../middlewares/authjwt");

// Создание новой кампании
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new Campaign
    app.post("/api/campaigns", [authJwt.verifyToken], campaigns.createCampaign);

    // Retrieve all Campaigns
    app.get("/api/campaigns", campaigns.getAllCampaigns);

    // Retrieve a single Campaign with id
    app.get("/api/campaigns/:id", campaigns.getCampaignById);

    // Update a Campaign with id
    app.put("/api/campaigns/:id", [authJwt.verifyToken], campaigns.updateCampaign);

    // Delete a Campaign with id
    app.delete("/api/campaigns/:id", [authJwt.verifyToken], campaigns.deleteCampaign);
};