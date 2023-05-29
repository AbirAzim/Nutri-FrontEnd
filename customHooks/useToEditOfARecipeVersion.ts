import { useMutation } from "@apollo/client";
import notification from "../components/utility/reactToastifyNotification";
import EDIT_A_VERSION_OF_RECIPE from "../gqlLib/versions/mutation/editAVersionOfRecipe";

export interface VersionEditAbleData {
  description: string;
  postfixTitle: string;
  recipeInstructions?: string[];
  servingSize?: number;
  ingredients?: {
    ingredientId: string;
    selectedPortionName: string;
    weightInGram: number;
  }[];
  selectedImage?: string;
}

const useToEditOfARecipeVersion = () => {
  const [editAVersionOfRecipe, { ...rest }] = useMutation(
    EDIT_A_VERSION_OF_RECIPE,
  );

  const handleToEditARecipeVersion = async (
    userId: string,
    recipeId: string,
    versionId: string,
    turnedOn: boolean,
    editableObject: VersionEditAbleData = {
      description: "",
      postfixTitle: "",
      ingredients: [],
      recipeInstructions: [],
      selectedImage: "",
      servingSize: 0,
    },
    isOriginalVersion: boolean = false,
    namesList: string[] = [],
  ) => {
    if (namesList?.includes(editableObject?.postfixTitle)) {
      notification("info", `This name is already exist !!!`);
      return;
    }

    try {
      const { data } = await editAVersionOfRecipe({
        variables: {
          data: {
            editId: versionId,
            recipeId,
            turnedOn,
            userId,
            editableObject,
          },
        },
      });

      return data?.editAVersionOfRecipe;
    } catch (error) {
      notification("error", "Version update failed");
    }
  };

  return { handleToEditARecipeVersion, ...rest };
};

export default useToEditOfARecipeVersion;
