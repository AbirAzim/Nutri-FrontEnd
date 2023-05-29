import { useMutation } from "@apollo/client";
import notification from "../components/utility/reactToastifyNotification";
import ADD_VERSION from "../gqlLib/versions/mutation/addVersion";
import { VersionAddDataType } from "../type/versionAddDataType";

const useToAddARecipeVersion = () => {
  const [addVersion, { ...rest }] = useMutation(ADD_VERSION);

  const handleToAddRecipeVersion = async (
    versionAddData: VersionAddDataType,
    namesList: string[] = [],
  ) => {
    const {
      description = "",
      postfixTitle = "",
      recipeId,
      ingredients = [],
      errorIngredients = [],
      recipeInstructions = [],
      servingSize = 0,
      userId = "",
      selectedImage = "",
    } = versionAddData;

    if (!postfixTitle) {
      notification("info", `Please enter a title`);
      return;
    }
    if (namesList?.includes(postfixTitle)) {
      notification("info", `This name is already exist !!!`);
      return;
    }

    try {
      const { data } = await addVersion({
        variables: {
          data: {
            recipeId,
            postfixTitle,
            description,
            userId,
            ingredients,
            errorIngredients,
            recipeInstructions,
            servingSize,
            selectedImage,
          },
        },
      });
      return data?.addVersion;
    } catch (error) {
      notification("error", `Recipe version create failed`);
    }
  };

  return { handleToAddRecipeVersion, ...rest };
};

export default useToAddARecipeVersion;
