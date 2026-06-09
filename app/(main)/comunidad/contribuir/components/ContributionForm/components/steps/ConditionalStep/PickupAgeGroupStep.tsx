import ToggleInput from '@/app/components/ui/inputs/Toggle';
import { useContributionStore } from '@/contribuir/stores/useContributionStore';
import { AGE_GROUP_OPTIONS } from './constants';
import type { AgeGroup } from '@/comunidad/types';
import { StepHelp } from '../../StepHelp';
import { STEP_HELP } from '../../stepHelpContent';

export default function PickupAgeGroupStep() {
  const { age_group, updateFormField } = useContributionStore();

  return (
    <div className="flex h-full flex-col">
      <StepHelp {...STEP_HELP.pickupAgeGroup} />

      <div className="gap-lg mt-15 flex grow flex-col">
        {AGE_GROUP_OPTIONS.map((option) => (
          <ToggleInput
            key={option.value}
            type="radio"
            id={`age-group-${option.value}`}
            name="age_group"
            value={option.value}
            checked={age_group === option.value}
            onChange={(e) =>
              updateFormField('age_group', e.target.value as AgeGroup)
            }
            text={option.label}
          />
        ))}
      </div>
    </div>
  );
}
