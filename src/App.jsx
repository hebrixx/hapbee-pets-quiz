import { useCallback, useState } from "react";
import "./App.css";

import QuizDialog from "@/components/ui/QuizDialog";
import IntroScreen from "@/pages/IntroScreen";
import EmailScreen from "@/pages/EmailScreen";
import QuestionOneScreen from "@/pages/QuestionOneScreen";
import QuestionTwoScreen from "@/pages/QuestionTwoScreen";
import LoadingScreen from "@/pages/LoadingScreen";
import ErrorScreen from "@/pages/ErrorScreen";
import ResultsScreen from "@/pages/ResultsScreenSuccess";
import teaserIcon from "@/assets/icons/pet-icon.svg";

const QUIZ_STEPS = {
  INTRO: "intro",
  EMAIL: "email",
  QUESTION_ONE: "question-one",
  QUESTION_TWO: "question-two",
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
};

const STEP_CONFIG = {
  [QUIZ_STEPS.INTRO]: { labelledBy: "intro-title", variant: "intro" },
  [QUIZ_STEPS.EMAIL]: { labelledBy: "email-screen-title", variant: "compact" },
  [QUIZ_STEPS.QUESTION_ONE]: { labelledBy: "question-one-title", variant: "compact" },
  [QUIZ_STEPS.QUESTION_TWO]: { labelledBy: "question-two-title", variant: "compact" },
  [QUIZ_STEPS.LOADING]: { labelledBy: "loading-screen-title", variant: "compact" },
  [QUIZ_STEPS.ERROR]: { labelledBy: "error-screen-title", variant: "compact" },
  [QUIZ_STEPS.SUCCESS]: { labelledBy: "success-screen-title", variant: "compact" },
};

const TEASER_DISMISS_KEY = "hapbee-quiz-teaser-dismissed-until";
const TEASER_DISMISS_DAYS = 7;

const RECOMMENDATIONS = {
  "separation-anxiety": { label: "Daily Calm Routine", detail: "A gentle everyday routine for stress and separation moments." },
  sleep: { label: "Bedtime Calm Routine", detail: "A soothing evening routine designed to support deeper rest." },
  "loud-noises": { label: "Comfort & Reassurance Routine", detail: "Extra support for fireworks, storms, and sudden loud sounds." },
  travel: { label: "On-the-Go Calm Routine", detail: "Steady calming support for car rides and new environments." },
  "general-anxiety": { label: "Everyday Balance Routine", detail: "A consistent routine for restlessness and daily overstimulation." },
  other: { label: "Personalized Calm Routine", detail: "A flexible starting routine based on your pet’s individual needs." },
};

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function getInitialTeaserDismissed() {
  try {
    const dismissedUntil = Number(window.localStorage.getItem(TEASER_DISMISS_KEY));
    return Number.isFinite(dismissedUntil) && dismissedUntil > Date.now();
  } catch {
    return false;
  }
}

function App() {
  const [isTeaserDismissed, setIsTeaserDismissed] = useState(getInitialTeaserDismissed);
  const [isOpen, setIsOpen] = useState(() => !getInitialTeaserDismissed());
  const [hasBeenMinimized, setHasBeenMinimized] = useState(false);
  const [step, setStep] = useState(QUIZ_STEPS.INTRO);
  const [email, setEmail] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setHasBeenMinimized(true);
  }, []);

  function handleOpen() {
    try {
      window.localStorage.removeItem(TEASER_DISMISS_KEY);
    } catch {
      // Opening the quiz does not depend on storage access.
    }

    setIsTeaserDismissed(false);
    setIsOpen(true);
    setHasBeenMinimized(false);
  }

  function handleDismissTeaser() {
    const dismissedUntil = Date.now() + TEASER_DISMISS_DAYS * 24 * 60 * 60 * 1000;

    try {
      window.localStorage.setItem(TEASER_DISMISS_KEY, String(dismissedUntil));
    } catch {
      // The teaser still closes when storage is unavailable.
    }

    setIsTeaserDismissed(true);
    setHasBeenMinimized(false);
  }

  function handleEmailContinue(submittedEmail) {
    setEmail(submittedEmail);
    setStep(QUIZ_STEPS.QUESTION_ONE);
  }

  function handleQuestionOneContinue() {
    if (selectedPet) setStep(QUIZ_STEPS.QUESTION_TWO);
  }

  async function submitQuiz() {
    if (!selectedIssue) return;
    setStep(QUIZ_STEPS.LOADING);

    try {
      await wait(1150);
      setStep(QUIZ_STEPS.SUCCESS);
    } catch {
      setStep(QUIZ_STEPS.ERROR);
    }
  }

  const dialogConfig = STEP_CONFIG[step];
  const recommendation = RECOMMENDATIONS[selectedIssue] ?? RECOMMENDATIONS.other;

  return (
    <main className="quiz-app">
      <div className="quiz-demo-content" aria-hidden={isOpen ? "true" : undefined}>
        <p className="quiz-demo-content__eyebrow">Hapbee Pets</p>
        <h1>Calmer pets start with the right routine.</h1>
        <p>This page represents the Shopify storefront behind the popup during development.</p>
        <button className="quiz-launch-button" type="button" onClick={handleOpen}>Open pet quiz</button>
      </div>

      {!isOpen && hasBeenMinimized && !isTeaserDismissed && (
        <aside className="quiz-teaser" aria-label="Pet quiz reminder">
          <button
            className="quiz-teaser__open"
            type="button"
            onClick={handleOpen}
            aria-label="Reopen the pet calm quiz"
          >
            <span className="quiz-teaser__icon" aria-hidden="true">
              <img src={teaserIcon} alt="" />
            </span>
            <span className="quiz-teaser__copy">
              <strong>Find your pet’s calm</strong>
              <small>Continue your 30-second quiz</small>
            </span>
            <span className="quiz-teaser__arrow" aria-hidden="true">→</span>
          </button>
          <button
            className="quiz-teaser__dismiss"
            type="button"
            onClick={handleDismissTeaser}
            aria-label="Dismiss pet quiz reminder for seven days"
          >
            <span aria-hidden="true">×</span>
          </button>
        </aside>
      )}

      {isOpen && (
        <QuizDialog key={step} labelledBy={dialogConfig.labelledBy} variant={dialogConfig.variant} onClose={handleClose}>
          {step === QUIZ_STEPS.INTRO && <IntroScreen onStart={() => setStep(QUIZ_STEPS.EMAIL)} onClose={handleClose} />}
          {step === QUIZ_STEPS.EMAIL && <EmailScreen initialEmail={email} onContinue={handleEmailContinue} onBack={() => setStep(QUIZ_STEPS.INTRO)} />}
          {step === QUIZ_STEPS.QUESTION_ONE && <QuestionOneScreen selectedPet={selectedPet} onSelectPet={setSelectedPet} onBack={() => setStep(QUIZ_STEPS.EMAIL)} onContinue={handleQuestionOneContinue} />}
          {step === QUIZ_STEPS.QUESTION_TWO && <QuestionTwoScreen selectedIssue={selectedIssue} onSelectIssue={setSelectedIssue} onBack={() => setStep(QUIZ_STEPS.QUESTION_ONE)} onContinue={submitQuiz} />}
          {step === QUIZ_STEPS.LOADING && <LoadingScreen />}
          {step === QUIZ_STEPS.ERROR && <ErrorScreen onRetry={submitQuiz} onBack={() => setStep(QUIZ_STEPS.QUESTION_TWO)} />}
          {step === QUIZ_STEPS.SUCCESS && <ResultsScreen email={email} petType={selectedPet} recommendation={recommendation} onClose={handleClose} />}
        </QuizDialog>
      )}
    </main>
  );
}

export default App;
