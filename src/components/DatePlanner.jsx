import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

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
    { id: 'jantar', label: 'Jantar', icon: '🍽️' },
    { id: 'parque', label: 'Parque', icon: '🌳' },
    { id: 'museu', label: 'Museu', icon: '🏛️' },
  ];

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    setCurrentStep(3);
    // Aqui você pode implementar a lógica para notificar você sobre a escolha dela
    localStorage.setItem('dateChoice', JSON.stringify({
      date: selectedDate,
      time: selectedTime,
      activity: activity
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-pink-600">Oi meu amor, vamos marcar nosso date? 💕</h2>
            <div className="space-x-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
              >
                Sim! 😊
              </button>
              <button
                style={{
                  position: 'absolute',
                  left: `${noButtonPosition.x}%`,
                  top: `${noButtonPosition.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={moveNoButton}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
              >
                Não
              </button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Escolha uma data especial ✨</h2>
            <div className="max-w-md mx-auto">
              <input
                type="date"
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <div className="mt-4">
                <input
                  type="time"
                  className="w-full p-3 border rounded-lg"
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!selectedDate || !selectedTime}
                className="mt-4 w-full bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">O que você quer fazer? 🤔</h2>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {activities.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => handleActivitySelect(activity.id)}
                  className="p-6 border rounded-lg hover:bg-pink-50 transition text-center"
                >
                  <div className="text-4xl mb-2">{activity.icon}</div>
                  <div>{activity.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-pink-600">Combinado! 🎉</h2>
            <p className="text-xl">
              Mal posso esperar pelo nosso encontro em {new Date(selectedDate).toLocaleDateString('pt-BR')} às {selectedTime}!
            </p>
            <div className="text-6xl animate-bounce">❤️</div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {renderStep()}
      </div>
    </div>
  );
};

export default DatePlanner;