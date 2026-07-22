import { useState } from "react";
import QuizStepLayout from "@/components/quiz/QuizStepLayout";
import HQButton from "@/components/ui/Button";
import HQInput from "@/components/ui/Input";
import emailIcon from "@/assets/icons/email-icon.svg";

function EmailScreen({ initialEmail = "", onContinue, onBack }) {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const normalizedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isValidEmail) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    onContinue?.(normalizedEmail);
  }

  return (
    <QuizStepLayout currentStep={1} onBack={onBack} titleId="email-screen-title" title="Where should we send your results?" subtitle="Your recommendation will be ready in a minute." icon={<img className="step-icon__image step-icon__image--email" src={emailIcon} alt="" />} iconClassName="step-icon--email">
      <ul className="check-list">
        <li>Your personalized calm & happiness plan</li>
        <li>$30 OFF your first order</li>
        <li>Expert tips tailored to your pet</li>
      </ul>

      <form className="step-form" onSubmit={handleSubmit} noValidate>
        <HQInput id="quiz-email" name="email" label="Email address" type="email" value={email} onChange={(event) => { setEmail(event.target.value); if (error) setError(""); }} placeholder="you@example.com" autoComplete="email" inputMode="email" error={error} required />
        <HQButton type="submit" size="lg" fullWidth>Continue</HQButton>
      </form>

      <p className="privacy-note">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </QuizStepLayout>
  );
}

export default EmailScreen;
