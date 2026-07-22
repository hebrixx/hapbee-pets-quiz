import QuizStepLayout from "@/components/quiz/QuizStepLayout";
import HQButton from "@/components/ui/Button";
import finalIcon from "@/assets/icons/final-icon.svg";
import StressIcon from "@/assets/icons/challenges/stress.svg";
import SleepIcon from "@/assets/icons/challenges/sleep.svg";
import NoiseIcon from "@/assets/icons/challenges/noise.svg";
import TravelIcon from "@/assets/icons/challenges/travel.svg";
import RestlessIcon from "@/assets/icons/challenges/restless.svg";
import OtherIcon from "@/assets/icons/challenges/other.svg";

const issueOptions = [
  { id: "separation-anxiety", title: "Stress & Anxiety", icon: StressIcon },
  { id: "sleep", title: "Better Sleep", icon: SleepIcon },
  { id: "loud-noises", title: "Loud Noises", icon: NoiseIcon },
  { id: "travel", title: "Travel & Car Rides", icon: TravelIcon },
  { id: "general-anxiety", title: "Restlessness", icon: RestlessIcon },
  { id: "other", title: "Something Else", icon: OtherIcon },
];

function QuestionTwoScreen({ selectedIssue, onSelectIssue, onBack, onContinue }) {
  return (
    <QuizStepLayout currentStep={3} onBack={onBack} titleId="question-two-title" title="What does your pet need the most support with?" subtitle="Choose the closest match." icon={<img src={finalIcon} alt="" className="step-icon__image step-icon__image--final" />} iconClassName="step-icon--final">
      <div className="answer-grid" role="radiogroup" aria-labelledby="question-two-title">
        {issueOptions.map((option) => {
          const selected = selectedIssue === option.id;
          return (
            <button key={option.id} className={`challenge-choice${selected ? " is-selected" : ""}`} type="button" role="radio" aria-checked={selected} onClick={() => onSelectIssue?.(option.id)}>
              <span className="challenge-choice__icon" aria-hidden="true"><img src={option.icon} alt="" /></span>
              <strong>{option.title}</strong>
              <span className="challenge-choice__check" aria-hidden="true">{selected ? "✓" : ""}</span>
            </button>
          );
        })}
      </div>
      <div className="step-actions"><HQButton type="button" size="lg" fullWidth disabled={!selectedIssue} onClick={onContinue}>See My Recommendation</HQButton></div>
    </QuizStepLayout>
  );
}

export default QuestionTwoScreen;
