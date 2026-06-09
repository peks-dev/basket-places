import RetasIcon from '@/components/ui/svgs/RetasIcon';
import ClubIcon from '@/components/ui/svgs/ClubIcon';

import { CornerIcon } from '@/app/components/ui/svgs/';
import { useContributionStore } from '@/contribuir/stores/useContributionStore';
import { type CommunityType } from '@/comunidad/types';
import { StepHelp } from '../StepHelp';
import { STEP_HELP } from '../stepHelpContent';

export default function TypeStep() {
  const { type, updateFormField } = useContributionStore();
  const selectedType = type || '';

  const options = [
    { value: 'pickup' as CommunityType, label: 'Reta', Icon: RetasIcon },
    { value: 'club' as CommunityType, label: 'Club', Icon: ClubIcon },
  ];

  return (
    <div className="gap-xl flex h-full flex-col items-stretch">
      <StepHelp {...STEP_HELP.type} />

      <div className="flex grow items-center justify-around">
        {options.map(({ value, label, Icon }) => (
          <label
            key={value}
            className={`group relative p-4 text-center ${
              selectedType === value
                ? 'text-accent-primary neon-effect'
                : 'text-foreground'
            }`}
          >
            <input
              type="radio"
              name="type"
              value={value}
              checked={selectedType === value}
              onChange={() => updateFormField('type', value)}
              className="sr-only"
            />

            <figure className="h-[100px] w-[100px]">
              <Icon />
            </figure>
            <span className="mt-4">{label}</span>
            <CornerIcon
              position="top-left"
              size="small"
              variant="interactive"
            />
            <CornerIcon
              position="top-right"
              size="small"
              variant="interactive"
            />
            <CornerIcon
              position="bottom-left"
              size="small"
              variant="interactive"
            />
            <CornerIcon
              position="bottom-right"
              size="small"
              variant="interactive"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
