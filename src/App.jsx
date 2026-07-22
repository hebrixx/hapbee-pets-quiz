import { useState } from "react";
import "./App.css";

import IntroScreen from "@/pages/IntroScreen";
import EmailScreen from "@/pages/EmailScreen";
import QuestionOneScreen from "@/pages/QuestionOneScreen";
import QuestionTwoScreen from "@/pages/QuestionTwoScreen";
import ResultsScreen from "@/pages/ResultsScreenSuccess";

function App() {
  const [step, setStep] = useState("intro");
  const [email, setEmail] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");

  function handleEmailContinue(submittedEmail) {
    setEmail(submittedEmail);
    setStep("question-one");
  }

  function handleQuestionOneContinue() {
    if (selectedPet) setStep("question-two");
  }

  function handleQuestionTwoContinue() {
    if (selectedIssue) setStep("success");
  }

  function handleClose() {
    console.log("Quiz closed");
  }

  return (
    <div className="quiz-app">
      <div className="quiz-stage" key={step}>
        {step === "intro" && (
          <IntroScreen
            onStart={() => setStep("email")}
            onClose={handleClose}
          />
        )}

        {step === "email" && (
          <EmailScreen
            initialEmail={email}
            onContinue={handleEmailContinue}
            onBack={() => setStep("intro")}
            onClose={handleClose}
          />
        )}

        {step === "question-one" && (
          <QuestionOneScreen
            selectedPet={selectedPet}
            onSelectPet={setSelectedPet}
            onBack={() => setStep("email")}
            onContinue={handleQuestionOneContinue}
            onClose={handleClose}
          />
        )}

        {step === "question-two" && (
          <QuestionTwoScreen
            selectedIssue={selectedIssue}
            onSelectIssue={setSelectedIssue}
            onBack={() => setStep("question-one")}
            onContinue={handleQuestionTwoContinue}
            onClose={handleClose}
          />
        )}

        {step === "success" && (
          <ResultsScreen email={email} onClose={handleClose} />
        )}
      </div>
    </div>
  );
}

export default App;
