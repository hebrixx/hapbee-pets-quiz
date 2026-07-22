import HQButton from "@/components/ui/Button";

const issueOptions = [
  { id: "separation-anxiety", title: "Stress & Anxiety", emoji: "😟" },
  { id: "sleep", title: "Better Sleep", emoji: "💤" },
  { id: "loud-noises", title: "Fear of Loud Noises", emoji: "🎆" },
  { id: "travel", title: "Travel & Car Rides", emoji: "🚗" },
  { id: "general-anxiety", title: "General Restlessness", emoji: "💗" },
  { id: "other", title: "Something Else", emoji: "📝" },
];

function QuestionTwoScreen({ selectedIssue, onSelectIssue, onBack, onContinue, onClose }) {
  return (
    <main className="quiz-preview-page">
      <section className="quiz-shell quiz-shell--compact" aria-labelledby="question-two-title">
        <button className="quiz-close" type="button" aria-label="Close quiz" onClick={onClose}>
          <span aria-hidden="true">×</span>
        </button>

        <div className="quiz-panel quiz-panel--step">
          <div className="step-header">
            <button className="back-button" type="button" onClick={onBack}>← <span>Back</span></button>
            <span>3 of 3</span>
          </div>
          <div className="step-dots" aria-label="Step 3 of 3">
            <span className="is-complete">✓</span><span className="is-complete">✓</span><span className="is-active" />
          </div>

          <div className="step-icon step-icon--pink" aria-hidden="true">♥</div>
          <div className="step-copy step-copy--center">
            <h1 id="question-two-title">What’s your pet’s biggest challenge right now?</h1>
            <p>Select one</p>
          </div>

          <div className="answer-grid" role="radiogroup" aria-labelledby="question-two-title">
            {issueOptions.map((option) => {
              const selected = selectedIssue === option.id;
              return (
                <button
                  key={option.id}
                  className={`challenge-choice${selected ? " is-selected" : ""}`}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onSelectIssue?.(option.id)}
                >
                  <span aria-hidden="true">{option.emoji}</span>
                  <strong>{option.title}</strong>
                  <span className="challenge-choice__check" aria-hidden="true">{selected ? "✓" : ""}</span>
                </button>
              );
            })}
          </div>

          <div className="step-actions">
            <HQButton type="button" size="lg" fullWidth disabled={!selectedIssue} onClick={onContinue}>See My Recommendation</HQButton>
          </div>
        </div>
      </section>
    </main>
  );
}

export default QuestionTwoScreen;
