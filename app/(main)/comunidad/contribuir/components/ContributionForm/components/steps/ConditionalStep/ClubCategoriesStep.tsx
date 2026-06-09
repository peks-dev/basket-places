import { POSSIBLE_CATEGORIES } from './constants';
import { useCategoriesLogic } from './useCategoriesLogic';
import CategoryCardSelector from './CategoryCardSelector';
import { StepHelp } from '../../StepHelp';
import { STEP_HELP } from '../../stepHelpContent';

export default function ClubCategoriesStep() {
  const { categories, toggleCategory, handleGenderChange } =
    useCategoriesLogic();

  return (
    <div className="gap-md flex h-full max-h-full flex-col">
      <StepHelp {...STEP_HELP.clubCategories} />
      <div className="max-h-full w-full overflow-auto pt-10">
        <div className="gap-md flex flex-col justify-around">
          {POSSIBLE_CATEGORIES.map((cat) => {
            const isSelected = (categories || []).some(
              (c) => c.category === cat.category
            );
            const selectedCat = (categories || []).find(
              (c) => c.category === cat.category
            );

            return (
              <CategoryCardSelector
                key={cat.category}
                category={cat}
                isSelected={isSelected}
                selectedCat={selectedCat}
                onToggle={toggleCategory}
                onGenderChange={handleGenderChange}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
