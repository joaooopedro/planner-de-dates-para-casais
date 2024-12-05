import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import './styles.css'; // Import do CSS reorganizado

const DatePlanner = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 50, y: 50 });

  const moveNoButton = () => {
    setNoButtonPosition({
      x: Math.random() * 80,
      y: Math.random() * 80,
    });
  };

  const activities = [
    { id: 'cinema', label: 'Cinema', icon: '🎬' },
    { id: 'jantar', label: 'Açaí', icon: '🍽️' },
    { id: 'parque', label: 'Praça', icon: '🌳' },
    { id: 'museu', label: 'Esquininha', icon: '🏛️' },
  ];

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    setCurrentStep(3);
    localStorage.setItem(
      'dateChoice',
      JSON.stringify({
        date: selectedDate,
        time: selectedTime,
        activity: activity,
      })
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-container">
            <div className="image-container">
              <img src="/images/vn.png" alt="Imagem VN" className="image" />
              <img src="/images/tropa.png" alt="Imagem Tropa" className="image" />
            </div>
            <h2 className="title">Sair com o vn? </h2>
            <div className="button-group">
              <button onClick={() => setCurrentStep(1)} className="yes-button">
                Sim! 😊
              </button>
              <button
                onMouseEnter={moveNoButton}
                className="no-button"
                style={{
                  left: `${noButtonPosition.x}%`,
                  top: `${noButtonPosition.y}%`,
                }}
              >
                Não
              </button>
            </div>
          </div>
        );
      

      case 1:
        return (
          <div className="step-container">
            <h2 className="title">Que dia?</h2>
            <div className="form-container">
              <input
                type="date"
                className="input"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <input
                type="time"
                className="input"
                onChange={(e) => setSelectedTime(e.target.value)}
              />
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!selectedDate || !selectedTime}
                className="next-button"
              >
                Próximo
              </button>
            </div>
          </div>
        );



      case 2:
        return (
          <div className="step-container">


            <h2 className="title">Pra onde nor vai, diga ai 🤔</h2>
            <div className="activity-grid">
              {activities.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => handleActivitySelect(activity.id)}
                  className="activity-button"
                >
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-label">{activity.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-container">
            <h2 className="title">Jaeh po, até lá nois se fala! 🎉</h2>
            <p className="description">
              se pa que eu vou às{' '}
              {new Date(selectedDate).toLocaleDateString('pt-BR')} às{' '}
              {selectedTime}!
            </p>
            <div className="heart-icon">❤️</div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="planner-container">{renderStep()}</div>;
};

export default DatePlanner;
