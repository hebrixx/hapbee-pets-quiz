import HQButton from "@/components/ui/Button";
import QuizProgress from "@/components/ui/QuizProgress";
import mailSentIcon from "@/assets/icons/mail-sent.svg";

const PET_LABELS = { dog: "dog", cat: "cat", other: "pet" };

function ResultsScreen({ email, petType, recommendation, isReturningCustomer, onClose }) {
  const petLabel = PET_LABELS[petType] ?? "pet";

  return (
    <div className="quiz-panel quiz-panel--success">
      <QuizProgress currentStep={3} complete />
      <div className="success-mark" aria-hidden="true"><span>✓</span><i className="spark spark--one">✦</i><i className="spark spark--two">✦</i><i className="spark spark--three">✦</i></div>
      <div className="success-copy" aria-live="polite">
        <p className="success-copy__eyebrow">{isReturningCustomer ? "Welcome back" : "Your personalized match"}</p>
        <h1 id="success-screen-title">
          {isReturningCustomer
            ? "Your pet’s recommendation has been updated"
            : "Your pet's calmer, happier days start here"}
        </h1>
        <p>
          {isReturningCustomer
            ? `We found your email and refreshed the routine using your latest answers for your ${petLabel}.`
            : `Based on your answers, this is the best place to begin for your ${petLabel}.`}
        </p>
      </div>
      <div className="recommendation-card">
        <span className="recommendation-card__icon" aria-hidden="true">♡</span>
        <div><span>Recommended routine</span><strong>{recommendation.label}</strong><p>{recommendation.detail}</p></div>
      </div>

      {isReturningCustomer ? (
        <div className="offer-reward offer-reward--returning" aria-live="polite">
          <div className="offer-reward__icon" aria-hidden="true"><img src={mailSentIcon} alt="" /></div>
          <div className="offer-reward__content">
            <span className="offer-reward__eyebrow">Already claimed</span>
            <strong className="offer-reward__returning-title">Your welcome offer is already saved</strong>
            <p>We updated your latest quiz answers{email && <> for <span>{email}</span></>}, but the $30 welcome offer is available only once per customer.</p>
          </div>
        </div>
      ) : (
        <div className="offer-reward" aria-live="polite">
          <div className="offer-reward__icon" aria-hidden="true"><img src={mailSentIcon} alt="" /></div>
          <div className="offer-reward__content">
            <span className="offer-reward__eyebrow">Bonus unlocked</span>
            <strong className="offer-reward__amount">$30 OFF</strong>
            <p>Your exclusive offer is on its way{email && <> to <span>{email}</span></>}.</p>
          </div>
        </div>
      )}

      <div className="success-actions"><HQButton type="button" size="lg" fullWidth onClick={onClose}>Continue Browsing</HQButton></div>
    </div>
  );
}

export default ResultsScreen;
