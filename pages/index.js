import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Send Slack Message</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message here"
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </div>
  );
}
