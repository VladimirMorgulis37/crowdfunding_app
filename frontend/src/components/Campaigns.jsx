import React, { useState, useEffect } from 'react';
import CampaignService from '../services/campaign.service';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState(null);

  useEffect(() => {
    retrieveCampaigns();
  }, []);

  const retrieveCampaigns = () => {
    CampaignService.getAllCampaigns()
      .then((response) => {
        setCampaigns(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') setTitle(value);
    if (name === 'description') setDescription(value);
    if (name === 'cost') setCost(value);
  };

  const saveCampaign = () => {
    let data = { title, description, cost };

    if (editing) {
      CampaignService.updateCampaign(currentCampaign.id, title, description, cost)
        .then((response) => {
          retrieveCampaigns();
          setEditing(false);
          setCurrentCampaign(null);
          setTitle('');
          setDescription('');
          setCost('');
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      CampaignService.createCampaign(title, description, cost)
        .then((response) => {
          retrieveCampaigns();
          setTitle('');
          setDescription('');
          setCost('');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const editCampaign = (campaign) => {
    setCurrentCampaign(campaign);
    setEditing(true);
    setTitle(campaign.title);
    setDescription(campaign.description);
    setCost(campaign.cost);
  };

  const deleteCampaign = (id) => {
    CampaignService.deleteCampaign(id)
      .then((response) => {
        retrieveCampaigns();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h1>Campaigns</h1>
      <div>
        <h2>{editing ? 'Edit' : 'Add'} Campaign</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveCampaign();
          }}
        >
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cost">Cost</label>
            <input
              type="text"
              className="form-control"
              id="cost"
              required
              value={cost}
              onChange={handleInputChange}
              name="cost"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            {editing ? 'Update' : 'Save'}
          </button>
        </form>
      </div>
      <div>
        <h2>Campaign List</h2>
        <ul className="list-group">
          {campaigns.map((campaign) => (
            <li className="list-group-item" key={campaign._id}>
              {campaign.title}
              <button
                className="btn btn-warning"
                onClick={() => editCampaign(campaign)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteCampaign(campaign._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Campaigns;