import HQButton from "@/components/ui/Button";
import Logo from "@/assets/images/logo-hapbee.svg";
import HeroImage from "@/assets/images/hapbee-lifestyle-hero.webp";
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
    <>
      <div className="quiz-hero" aria-hidden="true">
        <img
          src={HeroImage}
          alt=""
          className="quiz-hero__image"
          draggable="false"
        />
        <div className="quiz-hero__overlay" />
        <div className="quiz-hero__badge">Made for calmer days</div>
        <div className="quiz-hero__copy">
          <span>Calmer pets.</span>
          <span>Happier homes.</span>
        </div>
      </div>

      <div className="quiz-panel quiz-panel--intro">
        <div className="brand-kicker">
          <img src={Logo} alt="Hapbee Pets" className="brand-kicker__logo" />
          <span>Personalized Pet Quiz</span>
        </div>

        <div className="intro-copy">
          <h1 id="intro-title">Find the right calming routine for your pet</h1>
          <p>
            Share your email and answer 2 quick questions to receive a personalized
            recommendation and <strong>$30 OFF</strong> your first order.
          </p>
        </div>

        <div className="benefit-list" aria-label="Quiz benefits">
          {benefits.map((benefit) => (
            <div className="benefit-item" key={benefit.text}>
              <span className="benefit-item__icon" aria-hidden="true">
                <img src={benefit.icon} alt="" className="benefit-item__icon-image" />
              </span>
              <span>{benefit.text}</span>
            </div>
          ))}
        </div>

        <div className="intro-actions">
          <HQButton type="button" size="lg" fullWidth onClick={onStart}>
            <span>Start My Quiz</span>
            <span aria-hidden="true">→</span>
          </HQButton>
          <button className="text-link" type="button" onClick={onClose}>
            Not right now
          </button>
        </div>

        <p className="privacy-note">
          <span className="privacy-note__lock" aria-hidden="true">⌁</span>
          Your information stays private.
        </p>
      </div>
    </>
  );
}

export default IntroScreen;
