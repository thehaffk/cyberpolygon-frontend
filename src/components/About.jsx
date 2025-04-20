import React from 'react';

const About = () => {
  const polytechLogo = 'https://mospolytech.ru/upload/iblock/7ea/logo.svg';
  
  const advantages = [
    {
      title: 'Реалистичные сценарии кибератак',
      description: 'Практические задания основаны на актуальных киберугрозах, что позволяет участникам погружаться в реальные ситуации.'
    },
    {
      title: 'Обучение от экспертов',
      description: 'Наши тренеры — профессионалы с многолетним опытом в области кибербезопасности, которые делятся практическими знаниями и последними тенденциями в отрасли.'
    },
    {
      title: 'Интерактивная платформа',
      description: 'Удобный интерфейс и геймифицированные элементы обучения помогают сделать процесс обучения увлекательным и продуктивным.'
    },
    {
      title: 'Адаптивные программы',
      description: 'Мы предлагаем курсы как для новичков, так и для опытных специалистов, что позволяет каждому обучающемуся расти в своем темпе.'
    }
  ];

  return (
    <section className="about-section">
      <div className="container">
        <img 
          src={polytechLogo} 
          alt="Логотип Московского Политехнического Университета" 
          style={{
            maxWidth: '550px',
            width: '100%',
            height: 'auto',
            marginBottom: '40px',
            filter: 'brightness(0) invert(1)'
          }}
        />
        
        <h2 style={{
          marginBottom: '30px',
          fontSize: '2.2rem',
          background: 'linear-gradient(90deg, #6a00ff, #00f0ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}>
          О нас
        </h2>
        
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          maxWidth: '800px',
          margin: '0 auto 60px',
          color: 'var(--text-gray)'
        }}>
          Мы — команда Московского Политехнического Университета.
          Мы создаем площадку для обеспечения практического обучения и подготовки специалистов
          в области кибербезопасности, проведения исследований и разработок, повышения безопасности систем и сетей, улучшения навыков преподавателей, 
          сотрудничества с отраслью, повышения осведомленности и подготовки киберспециалистов.
        </p>
        
        <h2 style={{
          marginBottom: '40px',
          fontSize: '2.2rem',
          background: 'linear-gradient(90deg, #6a00ff, #00f0ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}>
          Наши преимущества
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '30px',
          padding: '20px 0'
        }}>
          {advantages.map((advantage, index) => (
            <div key={index} className="advantages-card">
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '15px'
              }}>
                {advantage.title}
              </h3>
              <p style={{
                color: 'var(--text-gray)',
                fontSize: '0.95rem',
                lineHeight: '1.6'
              }}>
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About; 