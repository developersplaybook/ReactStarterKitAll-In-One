import React from 'react';

const InfoMessage = () => {
  const styles = {
    backgroundColor: 'rgb(20, 0, 80)',
    color: 'white',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const redStyles = {
    backgroundColor: 'rgb(20, 0, 80)',
    color: 'red',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <div style={styles}>
      <p>
        Thank you for purchasing <em>The Aspiring Full Stack Developer&apos;s Playbook: From AI to Microservices and Kubernetes</em>. I hope you find the book and the accompanying code both enjoyable and practically useful.
      </p>
      <p style={redStyles}>Don&apos;t forget to leave a review on Amazon!</p>
      <p>
        If you have any questions or feedback, feel free to email me&mdash;my contact information is in the book.
      </p>
      <p>Please check:</p>
      <ul style={{ listStyleImage: 'none', listStyleType: 'disc', paddingLeft: '20px' }}>
        <li>Authorization with JSON WebToken</li>
        <li>File upload with drag & drop</li>
        <li>State Management with React Context API</li>
        <li>Storage of passwords and secret keys</li>
        <li>Unobtrusive validation</li>
        <li>SQLite database</li>
        <li>Webpack 5 for module bundling and minification</li>
      </ul>

    </div>
  );
};

export default InfoMessage;
