import QuizProgress from "@/components/ui/QuizProgress";

function LoadingScreen() {
  return (
    <div className="quiz-panel quiz-panel--status" aria-live="polite" aria-busy="true">
      <QuizProgress currentStep={3} complete />
      <div className="status-orbit" aria-hidden="true">
        <span className="status-orbit__paw">♡</span>
        <i />
        <i />
        <i />
      </div>
      <div className="status-copy">
        <p className="status-copy__eyebrow">Creating your match</p>
        <h1 id="loading-screen-title">Finding the calmest fit for your pet</h1>
        <p>We’re pairing your answers with the best Hapbee Pets routine.</p>
      </div>
      <div className="loading-lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default LoadingScreen;
