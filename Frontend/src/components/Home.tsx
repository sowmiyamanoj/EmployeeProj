
import { CSSProperties } from 'react';

function Home() {
  const containerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'linear-gradient(to right, lightblue, #ffffff)',
  };

  const textContainerStyle: CSSProperties = {
    textAlign: 'center',
  };

  const imageContainerStyle: CSSProperties = {
    marginRight: '20px',
    maxWidth: '700px',
  };

  const headerStyle: CSSProperties = {
    color: 'black',
    fontSize: '2em',
    fontFamily: 'Garamond, serif',
  };

  const imageStyle: CSSProperties = {
    width: '100%',
    height: 'auto',
  };

  return (
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
        <img
          src="/web-des.svg" 
          alt="Description"
          style={imageStyle}
        />
      </div>
      <div style={textContainerStyle}>
        <h2 style={headerStyle} ><b/>WELCOME TO THAY TECH</h2><br/><br/>
        <p style={{ fontFamily: 'Times New Roman", Times, serif' }}>Thay Technologies is an IT Solutions firm based in Chennai<br/>. With its state-of-the-art infrastructure and amicable location in the heart of the city, 
          Thay Technologies intends to add value to IT companies.</p>
      </div>
    </div>
  );
}

export default Home;
