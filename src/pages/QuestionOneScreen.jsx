import HQButton from "@/components/ui/Button";

import DogIcon from "@/assets/icons/dog-2.svg";
import CatIcon from "@/assets/icons/cat-2.svg";

const petOptions = [
  { id: "dog", title: "Dog", icon: DogIcon, iconType: "image" },
  { id: "cat", title: "Cat", icon: CatIcon, iconType: "image" },
  { id: "other", title: "Other", icon: "🐾", iconType: "emoji" },
];

function QuestionOneScreen({
  selectedPet,
  onSelectPet,
  onBack,
  onContinue,
  onClose,
}) {
  return (
    <main className="quiz-preview-page">
      <section
        className="quiz-shell quiz-shell--compact"
        aria-labelledby="question-one-title"
      >
        <button
          className="quiz-close"
          type="button"
          aria-label="Close quiz"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="quiz-panel quiz-panel--step">
          <div className="step-header">
            <button className="back-button" type="button" onClick={onBack}>
              ← <span>Back</span>
            </button>
            <span>2 of 3</span>
          </div>

          <div className="step-dots" aria-label="Step 2 of 3">
            <span className="is-complete">✓</span>
            <span className="is-active" />
            <span />
          </div>

          <div className="step-icon step-icon--pet" aria-hidden="true">
            <img src={DogIcon} alt="" className="step-icon__image" />
          </div>

          <div className="step-copy step-copy--center">
            <h1
              id="question-one-title"
              style={{ letterSpacing: "0.02em" }}
            >
              Which pet are you shopping for today?
            </h1>
            <p>Select one</p>
          </div>

          <div
            className="answer-list"
            role="radiogroup"
            aria-labelledby="question-one-title"
          >
            {petOptions.map((option) => {
              const selected = selectedPet === option.id;

              return (
                <button
                  key={option.id}
                  className={`answer-choice${selected ? " is-selected" : ""}`}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onSelectPet?.(option.id)}
                >
                  <span className="answer-choice__icon" aria-hidden="true">
                    {option.iconType === "image" ? (
                      <img
                        src={option.icon}
                        alt=""
                        className="answer-choice__icon-image"
                      />
                    ) : (
                      option.icon
                    )}
                  </span>

                  <span className="answer-choice__label">{option.title}</span>

                  <span className="answer-choice__radio" aria-hidden="true">
                    {selected ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="step-actions">
            <HQButton
              type="button"
              size="lg"
              fullWidth
              disabled={!selectedPet}
              onClick={onContinue}
            >
              Continue
            </HQButton>
          </div>
        </div>
      </section>
    </main>
  );
}

export default QuestionOneScreen;
