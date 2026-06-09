import Input from '@/app/components/ui/inputs/Text';
import Textarea from '@/app/components/ui/inputs/Textarea';

import { useContributionStore } from '@/contribuir/stores/useContributionStore';
import { StepHelp } from '../StepHelp';
import { STEP_HELP } from '../stepHelpContent';

export default function BasicInfoStep() {
  const { name, description, updateFormField } = useContributionStore();

  return (
    <div className="gap-xl flex h-full flex-col">
      <StepHelp {...STEP_HELP.basicInfo} />
      <label>
        <Input
          type="text"
          placeholder="Nombre de la cancha"
          value={name}
          onChange={(e) => updateFormField('name', e.target.value)}
        />
      </label>
      <label className="grow">
        <Textarea
          placeholder="Descripción de la comunidad, como es, cual es su distintivo?"
          maxLength={500}
          required
          className="h-full"
          value={description}
          onChange={(e) => updateFormField('description', e.target.value)}
        />
      </label>
    </div>
  );
}
