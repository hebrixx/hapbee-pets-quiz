import HQButton from "@/components/ui/Button";
import HQInput from "@/components/ui/Input";

function UIPlayground() {
  return (
    <main className="page">
      <h1>HQ UI</h1>

      <p>
        Every reusable component will be built and tested here before it is used
        inside the Hapbee Pets quiz.
      </p>

      <section className="section">
        <h2>Buttons</h2>

        <div className="component-row">
          <HQButton>Continue</HQButton>

          <HQButton variant="secondary">Secondary</HQButton>

          <HQButton variant="ghost">Learn more</HQButton>

          <HQButton size="sm">Small</HQButton>

          <HQButton size="lg">Get My Recommendation</HQButton>

          <HQButton loading>Continue</HQButton>

          <HQButton disabled>Disabled</HQButton>
        </div>
      </section>

      <section className="section">
        <h2>Full-width button</h2>

        <div className="playground-button-width">
          <HQButton size="lg" fullWidth>
            Find My Pet’s Solution
          </HQButton>
        </div>
      </section>

      <section className="section">
        <h2>Inputs</h2>

        <div className="input-showcase">
          <HQInput
            id="email-default"
            name="email-default"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
            helperText="We’ll send your personalized recommendation here."
          />

          <HQInput
            id="email-error"
            name="email-error"
            label="Email address"
            type="email"
            value="wrong-email"
            readOnly
            error="Enter a valid email address."
          />

          <HQInput
            id="email-disabled"
            name="email-disabled"
            label="Email address"
            type="email"
            value="hello@example.com"
            disabled
          />
        </div>
      </section>

      <section className="section">
        <h2>Cards</h2>

        <div className="component-row">Coming next...</div>
      </section>

      <section className="section">
        <h2>Progress</h2>

        <div className="component-row">Coming next...</div>
      </section>
    </main>
  );
}

export default UIPlayground;