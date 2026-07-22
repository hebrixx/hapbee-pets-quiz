import HQButton from "@/components/ui/Button";

function ResultsScreen({ email, onClose }) {
  return (
    <main className="quiz-preview-page">
      <section className="quiz-shell quiz-shell--compact" aria-labelledby="success-screen-title">
        <button className="quiz-close" type="button" aria-label="Close quiz" onClick={onClose}>
          <span aria-hidden="true">×</span>
        </button>

        <div className="quiz-panel quiz-panel--success">
          <div className="step-dots step-dots--success" aria-label="Quiz complete">
            <span className="is-complete">✓</span><span className="is-complete">✓</span><span className="is-complete">✓</span>
          </div>

          <div className="success-mark" aria-hidden="true">
            <span>✓</span>
            <i className="spark spark--one">✦</i>
            <i className="spark spark--two">✦</i>
            <i className="spark spark--three">✦</i>
            <i className="spark spark--four">✦</i>
          </div>

          <div className="success-copy">
            <h1 id="success-screen-title">You’re all set!</h1>
            <p>
              Your personalized recommendation and exclusive <strong>$30 OFF</strong> are on their way to your inbox.
            </p>
            {email && <span>Sent to {email}</span>}
          </div>

          <div className="mail-illustration" aria-hidden="true">
            <div className="mail-illustration__flap">♡</div>
          </div>

          <div className="success-actions">
            <HQButton type="button" size="lg" fullWidth onClick={onClose}>Continue Browsing</HQButton>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ResultsScreen;
