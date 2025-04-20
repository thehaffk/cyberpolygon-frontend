import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <div style={{
        backgroundColor: 'rgba(26, 28, 41, 0.7)',
        padding: '30px',
        borderRadius: '8px',
        textAlign: 'center',
        backdropFilter: 'blur(5px)',
        maxWidth: '800px',
        boxShadow: '0 0 30px rgba(106, 0, 255, 0.3)',
        border: '1px solid rgba(106, 0, 255, 0.3)',
        position: 'relative',
        zIndex: 1
      }}>
        <h1 style={{
          marginBottom: '20px',
          fontSize: '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(90deg, #6a00ff, #00f0ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 10px rgba(106, 0, 255, 0.2)'
        }}>
          Добро пожаловать на Киберполигон!
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#ffffff',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.8'
        }}>
          Киберполигон - это место для обучения и тренировки 
          специалистов по кибер-безопасности. Изучайте теорию, 
          решайте практические задачи и развивайте навыки 
          в безопасной среде.
        </p>
      </div>
      
      {/* Градиентные огни */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(106, 0, 255, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        zIndex: 0
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        zIndex: 0
      }} />
    </div>
  );
};

export default Header; 