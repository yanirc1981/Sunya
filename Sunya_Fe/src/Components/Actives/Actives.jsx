import  { useState } from 'react';


const Actives = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState('');

  const handleAddActivity = () => {
    if (newActivity.trim() !== '') {
      setActivities([...activities, newActivity]);
      setNewActivity('');
    }
  };

  const handleDeleteActivity = (index) => {
    const updatedActivities = [...activities];
    updatedActivities.splice(index, 1);
    setActivities(updatedActivities);
  };

  return (
    <div className="container mt-4">
      
      <div className="row">
        <div className="col-md-25">
          <h2 className="text-center mb-3">Agenda de actividades pendientes</h2>
          <ul className="list-group activities-list">
            {activities.map((activity, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {activity}
                <button className="btn btn-danger" onClick={() => handleDeleteActivity(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <div className="text-center mt-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Agregar actividad..."
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleAddActivity}>Agregar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actives;
