import React, { useState, useEffect } from 'react';
import CampaignService from '../services/campaign.service';
import AuthService from '../services/auth.service';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    retrieveCampaigns();
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      if (user.roles.includes('ROLE_ADMIN')) {
        setIsAdmin(true);
      }
    }
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
    if (name === 'cost') {
      if (!isNaN(value) && Number(value) >= 0) {
        setCost(value);
        setError('');
      } else {
        setError('Некорретный ввод');
      }
    }
  }

  const saveCampaign = () => {
    if (editing) {
      CampaignService.updateCampaign(currentCampaign._id, title, description, cost)
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
  setTitle(campaign?.title || '');
  setDescription(campaign?.description || '');
  setCost(campaign?.cost || '');
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

  const supportCampaign = (campaign) => {
    const newCost = Math.max(0, campaign.cost - 20);
    CampaignService.supportCampaign(campaign._id, newCost)
      .then((response) => {
        retrieveCampaigns();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h1>Кампании</h1>
      {currentUser && (
        <div>
          <h2>{editing ? 'Edit' : 'Add'} Кампания</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveCampaign();
            }}
          >
            <div className="form-group">
              <label htmlFor="title">Название кампании</label>
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
              <label htmlFor="description">Описание кампании</label>
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
              <label htmlFor="cost">Требуемое кол-во денег</label>
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
      )}
      <div>
        <h2>Список кампаний</h2>
        <ul className="list-group">
          {campaigns.map((campaign) => (
            <li className="list-group-item" key={campaign._id}>
              <strong>{campaign.title}</strong>
              <p>{campaign.description}</p>
              <p>Cost: ${campaign.cost}</p>
              <button
                className="btn btn-success"
                onClick={() => supportCampaign(campaign)}
              >
                Поддержать (-$20)
              </button>
              {isAdmin && (
                <>
                  <button
                    className="btn btn-warning"
                    onClick={() => editCampaign(campaign)}
                  >
                    Изменить
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCampaign(campaign._id)}
                  >
                    Удалить
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Campaigns;