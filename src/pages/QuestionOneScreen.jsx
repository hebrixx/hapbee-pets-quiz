import QuizStepLayout from "@/components/quiz/QuizStepLayout";
import HQButton from "@/components/ui/Button";
import DogIcon from "@/assets/icons/dog-2.svg";
import CatIcon from "@/assets/icons/cat-2.svg";
import OtherPetIcon from "@/assets/icons/other-pet.svg";

const petOptions = [
  { id: "dog", title: "Dog", icon: DogIcon },
  { id: "cat", title: "Cat", icon: CatIcon },
  { id: "other", title: "Another pet", icon: OtherPetIcon },
];

function QuestionOneScreen({ selectedPet, onSelectPet, onBack, onContinue }) {
  return (
    <QuizStepLayout currentStep={2} onBack={onBack} titleId="question-one-title" title="Who are we creating a calmer routine for?" subtitle="Choose one pet type." icon={<img src={DogIcon} alt="" className="step-icon__image" />} iconClassName="step-icon--pet">
      <div className="answer-list" role="radiogroup" aria-labelledby="question-one-title">
        {petOptions.map((option) => {
          const selected = selectedPet === option.id;
          return (
            <button key={option.id} className={`answer-choice${selected ? " is-selected" : ""}`} type="button" role="radio" aria-checked={selected} onClick={() => onSelectPet?.(option.id)}>
              <span className="answer-choice__icon" aria-hidden="true"><img src={option.icon} alt="" className="answer-choice__icon-image" /></span>
              <span className="answer-choice__label">{option.title}</span>
              <span className="answer-choice__radio" aria-hidden="true">{selected ? "✓" : ""}</span>
            </button>
          );
        })}
      </div>
      <div className="step-actions"><HQButton type="button" size="lg" fullWidth disabled={!selectedPet} onClick={onContinue}>Continue</HQButton></div>
    </QuizStepLayout>
  );
}

export default QuestionOneScreen;
