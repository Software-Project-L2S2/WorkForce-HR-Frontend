import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Feedback() {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const emojis = [
    { emoji: '😊', label: 'Good' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😕', label: 'Bad' },
    { emoji: '😍', label: 'Excellent' },
    { emoji: '😞', label: 'Disappointed' },
  ];

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedEmoji && !feedbackText.trim()) {
      alert('Please select an emoji or provide feedback before submitting.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setSubmittedFeedback([...submittedFeedback, { emoji: selectedEmoji, text: feedbackText }]);
      setSelectedEmoji(null);
      setFeedbackText('');
      setIsSubmitting(false);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }, 1000);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          {!showFeedback ? (
            <Card className="p-4 shadow-lg border-0 rounded-3">
              <h4 className="text-center mb-3">How was your experience?</h4>

              {showSuccessAlert && (
                <Alert variant="success" className="text-center">
                  Feedback submitted successfully! 🎉
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4 text-center">
                  {emojis.map((item) => (
                    <span
                      key={item.emoji}
                      className="mx-2 p-2 rounded-circle border"
                      title={item.label}
                      onClick={() => handleEmojiClick(item.emoji)}
                      style={{
                        fontSize: '24px',
                        cursor: 'pointer',
                        backgroundColor: selectedEmoji === item.emoji ? '#007bff' : 'white',
                        color: selectedEmoji === item.emoji ? 'white' : 'black',
                        transition: '0.3s',
                        border: '1px solid #ccc',
                      }}
                    >
                      {item.emoji}
                    </span>
                  ))}
                </Form.Group>

                <Form.Group controlId="feedbackText" className="mb-4">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write your feedback here..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="p-2 border rounded-3"
                  />
                </Form.Group>

                <div className="text-center">
                  <Button type="submit" variant="primary" disabled={isSubmitting} className="px-4">
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </Button>
                </div>
              </Form>
            </Card>
          ) : (
            <div className="mt-4">
              <h5 className="text-center">User Feedback</h5>
              {submittedFeedback.length > 0 ? (
                submittedFeedback.map((feedback, index) => (
                  <Card key={index} className="mb-2 p-3 shadow-sm rounded-3">
                    <div className="d-flex align-items-center">
                      <span style={{ fontSize: '24px', marginRight: '10px' }}>{feedback.emoji}</span>
                      <span>{feedback.text || 'No additional comments'}</span>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted">No feedback submitted yet.</p>
              )}
            </div>
          )}

          <div className="text-center mt-4">
            <Button variant="info" onClick={() => setShowFeedback(!showFeedback)}>
              {showFeedback ? 'Back to Form' : 'View Feedback'}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Feedback;
