import { useState } from "react";
import HQButton from "@/components/ui/Button";
import HQInput from "@/components/ui/Input";

function EmailScreen({ initialEmail = "", onContinue, onBack, onClose }) {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const normalizedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isValidEmail) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    onContinue?.(normalizedEmail);
  }

  return (
    <main className="quiz-preview-page">
      <section className="quiz-shell quiz-shell--compact" aria-labelledby="email-screen-title">
        <button className="quiz-close" type="button" aria-label="Close quiz" onClick={onClose}>
          <span aria-hidden="true">×</span>
        </button>

        <div className="quiz-panel quiz-panel--step">
          <div className="step-header">
            <button className="back-button" type="button" onClick={onBack}>← <span>Back</span></button>
            <span>1 of 3</span>
          </div>
          <div className="step-dots" aria-label="Step 1 of 3">
            <span className="is-active" /><span /><span />
          </div>

          <div className="step-icon" aria-hidden="true">✉</div>
          <div className="step-copy step-copy--center">
            <h1 id="email-screen-title" style={{ letterSpacing: "0.02em" }}>Where should we send your results?</h1>
            <p>Enter your email to receive:</p>
          </div>

          <ul className="check-list">
            <li>Your personalized recommendation</li>
            <li>$30 OFF your first order</li>
            <li>Expert calming tips for your pet</li>
          </ul>

          <form className="step-form" onSubmit={handleSubmit} noValidate>
            <HQInput
              id="quiz-email"
              name="email"
              label="Email address"
              type="email"
              value={email}
              onChange={(event) => { setEmail(event.target.value); if (error) setError(""); }}
              placeholder="Enter your email"
              autoComplete="email"
              inputMode="email"
              error={error}
              required
            />
            <HQButton type="submit" size="lg" fullWidth>Get My Recommendation</HQButton>
          </form>

          <p className="privacy-note"><span aria-hidden="true">▣</span> We never share your email. Unsubscribe anytime.</p>
        </div>
      </section>
    </main>
  );
}

export default EmailScreen;
