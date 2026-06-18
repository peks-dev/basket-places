'use client';

import StepIndicator from './components/StepIndicator';
import NavigationControls from './components/NavigationControls';
import StepRenderer from './components/StepRenderer';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import RedirectionStep from './components/steps/RedirectionStep';
import type { CommunityFormData } from '@/comunidad/types';
import { useContributionForm } from '../../hooks/useContributionForm';

interface Props {
  initialData?: CommunityFormData;
}

export default function ContributionForm({ initialData }: Props) {
  const {
    isLoading,
    isSuccess,
    currentStep,
    handleSubmit,
    nextStep,
    prevStep,
  } = useContributionForm({ initialData });

  return (
    <div className="m-auto flex h-full w-full max-w-[700px] flex-col items-stretch gap-5 pb-10">
      <StepIndicator currentStep={currentStep} />

      <form
        className={`transparent-container h-full max-h-full w-full grow overflow-y-auto ${
          currentStep === 3 ? '' : 'p-3'
        }`}
        onSubmit={handleSubmit}
        id="contribution-form"
      >
        {isSuccess ? (
          <RedirectionStep />
        ) : isLoading ? (
          <LoadingSpinner message="procesando los datos" size="xl" />
        ) : (
          <StepRenderer currentStep={currentStep} />
        )}
      </form>

      <NavigationControls
        prevStep={prevStep}
        nextStep={nextStep}
        currentStep={currentStep}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </div>
  );
}
