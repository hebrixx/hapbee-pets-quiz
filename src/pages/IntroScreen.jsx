import HQButton from "@/components/ui/Button";
import Logo from "@/assets/images/logo-hapbee.svg";

import TimeIcon from "@/assets/icons/time.svg";
import PetIcon from "@/assets/icons/pet.svg";
import AwardIcon from "@/assets/icons/award.svg";

const benefits = [
  { icon: TimeIcon, text: "Takes less than 30 seconds" },
  { icon: PetIcon, text: "Personalized for your pet" },
  { icon: AwardIcon, text: "Exclusive $30 OFF" },
];

function IntroScreen({ onStart, onClose }) {
  return (
    <main className="quiz-preview-page">
      <section className="quiz-shell quiz-shell--intro" aria-labelledby="intro-title">
        <button className="quiz-close" type="button" aria-label="Close quiz" onClick={onClose}>
          <span aria-hidden="true">×</span>
        </button>

        <div className="quiz-hero" aria-hidden="true">
          <div className="quiz-hero__copy">
            <span>Calmer pets.</span>
            <span>Happier life.</span>
            <span className="quiz-hero__heart">♡</span>
          </div>
          <div className="quiz-hero__pet-mark">🐾</div>
        </div>

        <div className="quiz-panel quiz-panel--intro">
         <div className="brand-kicker">
            <img
              src={Logo}
              alt="Hapbee Pets"
              className="brand-kicker__logo"
            />
            <span>Personalized Pet Quiz</span>
          </div>

          <div className="intro-copy">
            <h1 id="intro-title" style={{ letterSpacing: "0.02em" }}>Find the best calming solution for your pet</h1>
            <p>
              Answer 2 quick questions to receive your personalized recommendation and
              <strong> $30 OFF</strong> your first order.
            </p>
          </div>

          <div className="benefit-list" aria-label="Quiz benefits">
            {benefits.map((benefit) => (
              <div className="benefit-item" key={benefit.text}>
               <span className="benefit-item__icon" aria-hidden="true">
                  <img
                    src={benefit.icon}
                    alt=""
                    className="benefit-item__icon-image"
                  />
                </span>
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>

          <div className="intro-actions">
            <HQButton type="button" size="lg" fullWidth onClick={onStart}>
              <span>Start Quiz</span><span aria-hidden="true">→</span>
            </HQButton>
            <button className="text-link" type="button" onClick={onClose}>Not right now</button>
          </div>

          <p className="privacy-note"><span aria-hidden="true">▣</span> We respect your privacy.</p>
        </div>
      </section>
    </main>
  );
}

export default IntroScreen;
