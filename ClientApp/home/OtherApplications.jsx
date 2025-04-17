import React from 'react';

const OtherApplications = () => {
  const styles = {
    backgroundColor: 'rgb(20, 0, 80)',
    color: 'white',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <div style={styles}>
      <p>
        Other applications:
      </p>
      <ul style={{ listStyleImage: 'none', listStyleType: 'disc', paddingLeft: '20px' }}>
        <li>ServerAPI with Angular, React, Vue and Blazor clients</li>
        <li>Messaging with NServiceBus</li>
        <li>Messaging with RabbitMQ</li>
        <li>Messaging with Kafka</li>
        <li>Messaging with Custom Data Queue</li>
        <li>Add Services to WebAPI</li>
        <li>Hangfire, Postman and Swagger</li>
        <li>Docker, Docker Orchestration and Docker-Compose</li>
        <li>Orchestration with Kubernetes</li>
        <li>Security in Web Applications</li>
        <li>State Machine</li>
        <li>Broadcast Messaging in Angular</li>
        <li>Ramanujan&apos;s Factorial Aproximation</li>
      </ul>
    </div>
  );
};

export default OtherApplications;
