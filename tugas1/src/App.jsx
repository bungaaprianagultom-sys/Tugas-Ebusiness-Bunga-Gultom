import React, { useState, useEffect } from 'react';

const ClickCounter = () => {
  const [count, setCount] = useState(0);
  const [bgColor, setBgColor] = useState('#f0f0f0');

  useEffect(() => {
    // Daftar 15 warna acak
    const colors = [
      '#ffadad', // merah muda lembut
      '#ffd6a5', // oranye pastel
      '#fdffb6', // kuning muda
      '#caffbf', // hijau muda
      '#9bf6ff', // biru muda
      '#a0c4ff', // biru lembut
      '#bdb2ff', // ungu pastel
      '#ffc6ff', // pink pastel
      '#fffffc', // putih hangat
      '#f1c0e8', // magenta muda
      '#e2afff', // ungu muda
      '#ffd8be', // peach
      '#d0f4de', // hijau mint
      '#fef9ef', // krem
      '#c8e7ff', // biru langit
    ];

    // Pilih warna acak dari array
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  }, [count]); // Efek jalan setiap count berubah

  return (
    <div
      style={{
        backgroundColor: bgColor,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins, sans-serif',
        transition: 'background-color 0.5s ease',
      }}
    >
      <h1 style={{ fontSize: '3rem', margin: 0 }}>Kamu klik:</h1>
      <h2 style={{ fontSize: '4rem', margin: '10px 0' }}>{count} kali</h2>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          backgroundColor: '#1e3a8a',
          color: 'white',
          fontSize: '1.2rem',
          padding: '10px 20px',
          borderRadius: '10px',
          border: 'none',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        }}
        onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
        onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
      >
        Klik Aku 😄
      </button>
    </div>
  );
};

export default ClickCounter;
