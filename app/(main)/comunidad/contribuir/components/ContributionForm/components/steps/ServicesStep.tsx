import { useContributionStore } from '@/contribuir/stores/useContributionStore';
import ToggleInput from '@/app/components/ui/inputs/Toggle';
import { StepHelp } from '../StepHelp';
import { STEP_HELP } from '../stepHelpContent';

const serviceLabels = {
  transport: 'Transporte',
  store: 'Tienda',
  wifi: 'Internet',
  bathroom: 'Baño',
};

export default function ServicesStep() {
  const { services, updateFormField } = useContributionStore();

  const handleServiceChange = (
    service: keyof typeof services,
    checked: boolean
  ) => {
    updateFormField('services', { ...services, [service]: checked });
  };

  return (
    <div className="flex h-full flex-col">
      <StepHelp {...STEP_HELP.services} />
      <div className="gap-lg mt-15 flex h-full grow flex-col">
        {Object.entries(services).map(([key, value]) => {
          const service = key as keyof typeof services;
          return (
            <ToggleInput
              key={service}
              type="checkbox"
              id={`service-${service}`}
              name="services"
              value={service}
              checked={value}
              onChange={(e) => handleServiceChange(service, e.target.checked)}
              text={serviceLabels[service]}
            />
          );
        })}
      </div>
    </div>
  );
}
