import HQButton from "@/components/ui/Button";
import QuizProgress from "@/components/ui/QuizProgress";
import mailSentIcon from "@/assets/icons/mail-sent.svg";

const PET_LABELS = { dog: "dog", cat: "cat", other: "pet" };

function ResultsScreen({ email, petType, recommendation, onClose }) {
  const petLabel = PET_LABELS[petType] ?? "pet";

  return (
    <div className="quiz-panel quiz-panel--success">
      <QuizProgress currentStep={3} complete />
      <div className="success-mark" aria-hidden="true"><span>✓</span><i className="spark spark--one">✦</i><i className="spark spark--two">✦</i><i className="spark spark--three">✦</i></div>
      <div className="success-copy" aria-live="polite">
        <p className="success-copy__eyebrow">Your personalized match</p>
        <h1 id="success-screen-title">A calmer routine starts here</h1>
        <p>Based on your answers, this is the best starting point for your {petLabel}.</p>
      </div>
      <div className="recommendation-card">
        <span className="recommendation-card__icon" aria-hidden="true">♡</span>
        <div><span>Recommended routine</span><strong>{recommendation.label}</strong><p>{recommendation.detail}</p></div>
      </div>
      <div className="offer-reward" aria-live="polite">
        <div className="offer-reward__icon" aria-hidden="true"><img src={mailSentIcon} alt="" /></div>
        <div className="offer-reward__content">
          <span className="offer-reward__eyebrow">Bonus unlocked</span>
          <strong className="offer-reward__amount">$30 OFF</strong>
          <p>Your exclusive offer is on its way{email && <> to <span>{email}</span></>}.</p>
        </div>
      </div>
      <div className="success-actions"><HQButton type="button" size="lg" fullWidth onClick={onClose}>Continue Browsing</HQButton></div>
    </div>
  );
}

export default ResultsScreen;
