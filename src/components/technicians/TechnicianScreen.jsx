import React, { useEffect, useState } from 'react';
import { TechnicianList } from './TechnicianList';
import techniciansData from '../../mocks/technicians.json';
import { TechnicianForm } from './TechnicianForm';
import { useParams, useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

export const TechnicianScreen = () => {
  const history = useHistory();
  const { action, technicianId } = useParams();
  const [technicians, setTechnicians] = useState(techniciansData);
  const [technicianToModify, setTechnicianToModify] = useState(undefined);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (action === 'update' && !technicianToModify) {
      const technician = technicians.find((x) => x.id === technicianId);

      if (technician) {
        setTechnicianToModify(technician);
        setErrors('');
      } else {
        setErrors('Invalid ID');
        history.replace('/technicians');
      }
    }
    return () => {};
  }, [technicianId]);

  const handleAddClick = () => {
    setErrors('');
    history.push('technicians/create');
  };

  const deleteTechnician = (id) => {
    setErrors('');
    setTechnicians(technicians.filter((technician) => technician.id !== id));
  };
  const addTechnician = (technician) => {
    technician.id = uuidv4();
    setTechnicians([technician, ...technicians]);
    history.push('/technicians');
  };
  const modifyTechnician = (id) => {
    const technician = technicians.find((x) => x.id === id);
    if (technician) {
      setTechnicianToModify(technician);
      setErrors('');
      history.push(`/technicians/update/${id}`);
    } else {
      setErrors('Invalid ID');
      history.replace('/technicians');
    }
  };
  const cancelSubmit = () => {
    setTechnicianToModify(undefined);
    history.push('/technicians');
  };
  const formSubmit = (technician) => {
    if (action === 'create') {
      addTechnician(technician);
      return;
    }
    if (action === 'update') {
      setTechnicians([
        technician,
        ...technicians.filter((x) => x.id !== technician.id),
      ]);
      setTechnicianToModify(undefined);
      history.replace('/technicians');
      return;
    }
  };

  return (
    <div>
      {errors && <p>{errors}</p>}
      {action === 'create' || action === 'update' ? (
        <TechnicianForm
          onSubmit={formSubmit}
          onCancel={cancelSubmit}
          mode={action}
          technicianToModify={technicianToModify}
        />
      ) : (
        <>
          <button onClick={handleAddClick}>New Technician</button>
          <TechnicianList
            technicians={technicians}
            onDelete={deleteTechnician}
            onModify={modifyTechnician}
          />
        </>
      )}
    </div>
  );
};
