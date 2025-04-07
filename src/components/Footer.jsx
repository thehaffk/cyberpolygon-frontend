import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'rgba(15, 17, 24, 0.9)',
      padding: '40px 20px',
      borderTop: '1px solid rgba(106, 0, 255, 0.2)',
      color: 'var(--text-light)',
      marginTop: '80px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '30px'
      }}>
        {/* Копирайт */}
        <div style={{
          margin: '20px 0'
        }}>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-gray)'
          }}>
            © 2024 Киберполигон
          </p>
        </div>

        {/* Контактная информация */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <p style={{
            marginBottom: '15px',
            fontSize: '1.1rem'
          }}>
            Контактная информация
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <a href="tel:+79885024344" style={{
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-gray)',
              textDecoration: 'none'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9C16.3 14.9 16.2 14.9 16.1 14.9C15.8 14.9 15.6 15 15.4 15.2L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9.1 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.5 8 3 7.5 3H4C3.5 3 3 3.5 3 4C3 13.4 10.6 21 20 21C20.5 21 21 20.5 21 20V16.5C21 16 20.5 15.5 20 15.5ZM5 5H6.5C6.6 5.9 6.8 6.8 7 7.6L5.8 8.8C5.4 7.6 5.1 6.3 5 5ZM19 19C17.7 18.9 16.4 18.6 15.2 18.2L16.4 17C17.2 17.2 18.1 17.4 19 17.4V19Z" fill="#b3b3b3"/>
              </svg>
              <span style={{ marginLeft: '5px' }}>+79885024344</span>
            </a>
            <span style={{ color: 'var(--text-gray)' }}>|</span>
            <a href="mailto:cyberpolygon@mospolytech.ru" style={{
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-gray)',
              textDecoration: 'none'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#b3b3b3"/>
              </svg>
              <span style={{ marginLeft: '5px' }}>cyberpolygon@mospolytech.ru</span>
            </a>
          </div>
        </div>

        {/* Социальные сети */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <p style={{
            marginBottom: '15px',
            fontSize: '1.1rem'
          }}>
            Мы в соц. сетях
          </p>
          <div style={{
            display: 'flex',
            gap: '15px'
          }}>
            <a href="https://t.me/beloarte" style={{
              color: 'var(--text-gray)',
              transition: 'all 0.3s ease'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4516 14.006 10.4126 13.9973 10.3747C13.9886 10.3368 13.9724 10.3009 13.95 10.27C13.89 10.2 13.81 10.22 13.74 10.23C13.65 10.24 12.14 11.25 9.21 13.25C8.73 13.58 8.3 13.74 7.92 13.73C7.5 13.72 6.71 13.51 6.12 13.33C5.39 13.12 4.82 13 4.88 12.6C4.91 12.39 5.19 12.18 5.72 11.97C8.89 10.53 11.02 9.58 12.1 9.14C15.17 7.87 15.87 7.65 16.33 7.65C16.44 7.65 16.69 7.68 16.84 7.81C17 7.96 17.03 8.17 17.04 8.31C17.03 8.44 17.04 8.67 16.64 8.8Z" fill="#b3b3b3"/>
              </svg>
            </a>
            <a href="https://vk.com/cyberpolygon" style={{
              color: 'var(--text-gray)',
              transition: 'all 0.3s ease'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.53 16.12C15.38 16.3 15.19 16.36 15 16.36C14.85 16.36 14.7 16.32 14.56 16.23L12.1 14.7L11.3 15.3C11.2 15.38 11.08 15.42 10.96 15.42C10.89 15.42 10.82 15.41 10.76 15.38C10.59 15.32 10.47 15.17 10.44 15L10.06 12.81L7.84 12.16C7.64 12.1 7.49 11.93 7.46 11.72C7.42 11.5 7.52 11.29 7.7 11.17L15.2 6.17C15.42 6.02 15.7 6.06 15.87 6.26C16.05 6.46 16.07 6.75 15.92 6.98L15.53 16.12Z" fill="#b3b3b3"/>
              </svg>
            </a>
            <a href="https://www.youtube.com" style={{
              color: 'var(--text-gray)',
              transition: 'all 0.3s ease'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.582 7.15402C21.352 6.28902 20.674 5.60102 19.81 5.37002C18.254 5.00702 12 5.00702 12 5.00702C12 5.00702 5.746 5.00702 4.19 5.37002C3.326 5.60102 2.648 6.28902 2.418 7.15402C2.055 8.71402 2.055 12.001 2.055 12.001C2.055 12.001 2.055 15.288 2.418 16.848C2.648 17.713 3.326 18.401 4.19 18.631C5.746 18.995 12 18.995 12 18.995C12 18.995 18.254 18.995 19.81 18.631C20.674 18.401 21.352 17.713 21.582 16.848C21.945 15.288 21.945 12.001 21.945 12.001C21.945 12.001 21.945 8.71402 21.582 7.15402ZM9.955 15.001V9.00402L15.182 12.001L9.955 15.001Z" fill="#b3b3b3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 