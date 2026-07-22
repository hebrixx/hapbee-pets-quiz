import styles from "./QuizProgress.module.css";

function QuizProgress({ currentStep, totalSteps = 3, complete = false }) {
  const activeStep = complete ? totalSteps : currentStep;
  const progressValue = complete ? totalSteps : currentStep;
  const label = complete ? "Quiz complete" : `Step ${currentStep} of ${totalSteps}`;

  return (
    <div className={styles.wrapper} role="progressbar" aria-label={label} aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={progressValue}>
      <div className={styles.track} aria-hidden="true">
        <span className={styles.fill} style={{ width: `${(progressValue / totalSteps) * 100}%` }} />
      </div>
      <span className={styles.label}>{complete ? "Complete" : `${currentStep} / ${totalSteps}`}</span>
    </div>
  );
}

export default QuizProgress;
