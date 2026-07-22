import HQButton from "@/components/ui/Button";
import QuizProgress from "@/components/ui/QuizProgress";

function ErrorScreen({ onRetry, onBack }) {
  return (
    <div className="quiz-panel quiz-panel--status">
      <QuizProgress currentStep={3} />
      <div className="error-mark" aria-hidden="true">!</div>
      <div className="status-copy">
        <p className="status-copy__eyebrow">Almost there</p>
        <h1 id="error-screen-title">We couldn’t save your results</h1>
        <p>Your answers are safe. Check your connection and try once more.</p>
      </div>
      <div className="status-actions">
        <HQButton type="button" size="lg" fullWidth onClick={onRetry}>Try Again</HQButton>
        <button className="text-link" type="button" onClick={onBack}>Review my answers</button>
      </div>
    </div>
  );
}

export default ErrorScreen;
