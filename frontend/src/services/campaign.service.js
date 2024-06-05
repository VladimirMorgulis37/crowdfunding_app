import axios from 'axios';

const API_URL = 'https://backend-production-730c.up.railway.app/campaigns/';

const createCampaign = (title, description, cost) => {
    return axios.post(API_URL, {
      title,
      description,
      cost
    }, {
      headers: {
        'x-access-token': localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).accessToken : null
      }
    });
  };

const getAllCampaigns = () => {
  return axios.get(API_URL);
};

const getCampaignById = (id) => {
  return axios.get(API_URL + id);
};

const updateCampaign = (id, title, description, cost) => {
  return axios.put(API_URL + id, { title, description, cost }, {
    headers: {
      'x-access-token': localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).accessToken : null
    }
  });
};

const deleteCampaign = (id) => {
  return axios.delete(API_URL + id, {
    headers: {
      'x-access-token': localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).accessToken : null
    }
  });
};

const CampaignService = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign
};

export default CampaignService;