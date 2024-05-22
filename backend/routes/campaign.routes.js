const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaign.controller");

// Создание новой кампании
router.post("/", campaignController.createCampaign);

// Получение всех кампаний
router.get("/", campaignController.getAllCampaigns);

// Получение кампании по ID
router.get("/:id", campaignController.getCampaignById);

// Обновление кампании по ID
router.put("/:id", campaignController.updateCampaign);

// Удаление кампании по ID
router.delete("/:id", campaignController.deleteCampaign);

module.exports = router;