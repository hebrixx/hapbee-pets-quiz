import QuizProgress from "@/components/ui/QuizProgress";

function QuizStepLayout({
  children,
  currentStep,
  onBack,
  title,
  subtitle,
  titleId,
  icon,
  iconClassName = "",
}) {
  return (
    <div className="quiz-panel quiz-panel--step">
      <header className="step-header">
        <button className="back-button" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span>
          <span>Back</span>
        </button>
        <span>{currentStep} of 3</span>
      </header>

      <QuizProgress currentStep={currentStep} />

      <div className={`step-icon ${iconClassName}`.trim()} aria-hidden="true">
        {icon}
      </div>

      <div className="step-copy step-copy--center">
        <h1 id={titleId}>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      {children}
    </div>
  );
}

export default QuizStepLayout;
