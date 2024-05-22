const Campaign = require("../models/campaign.model");

// Создание новой кампании
exports.createCampaign = async (req, res) => {
  const { title, description, cost } = req.body;

  // Проверка на наличие всех полей
  if (!title || !description || !cost) {
    return res.status(400).send({ message: "Все поля обязательны для заполнения!" });
  }

  // Создание новой кампании
  const campaign = new Campaign({
    title,
    description,
    cost,
  });

  try {
    const savedCampaign = await campaign.save();
    res.status(201).send(savedCampaign);
  } catch (error) {
    res.status(500).send({ message: error.message || "Произошла ошибка при создании кампании." });
  }
};

// Получение всех кампаний
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).send(campaigns);
  } catch (error) {
    res.status(500).send({ message: error.message || "Произошла ошибка при получении кампаний." });
  }
};

// Получение кампании по ID
exports.getCampaignById = async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).send({ message: "Кампания не найдена." });
    }

    res.status(200).send(campaign);
  } catch (error) {
    res.status(500).send({ message: error.message || "Произошла ошибка при получении кампании." });
  }
};

// Обновление кампании по ID
exports.updateCampaign = async (req, res) => {
  const { id } = req.params;
  const { title, description, cost } = req.body;

  try {
    const campaign = await Campaign.findByIdAndUpdate(
      id,
      { title, description, cost },
      { new: true, runValidators: true }
    );

    if (!campaign) {
      return res.status(404).send({ message: "Кампания не найдена." });
    }

    res.status(200).send(campaign);
  } catch (error) {
    res.status(500).send({ message: error.message || "Произошла ошибка при обновлении кампании." });
  }
};

// Удаление кампании по ID
exports.deleteCampaign = async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await Campaign.findByIdAndDelete(id);

    if (!campaign) {
      return res.status(404).send({ message: "Кампания не найдена." });
    }

    res.status(200).send({ message: "Кампания успешно удалена." });
  } catch (error) {
    res.status(500).send({ message: error.message || "Произошла ошибка при удалении кампании." });
  }
};