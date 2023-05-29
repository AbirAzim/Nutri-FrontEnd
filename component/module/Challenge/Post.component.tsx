import React, {
  forwardRef,
  Fragment,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";
import { format } from "date-fns";
import { faCircle, faEllipsisVertical } from "@fortawesome/pro-solid-svg-icons";
import {
  faClone,
  faTrash,
  faTrophy,
  faUpDownLeftRight,
  faChartSimple,
} from "@fortawesome/pro-light-svg-icons";
import DatePicker from "react-datepicker";
import { useMutation } from "@apollo/client";

import SplitImageCard from "../../../theme/card/splitImageCard/splitImageCard.component";
import IconHeading from "../../../theme/iconHeading/iconHeading.component";
import IconButton from "../../atoms/Button/IconButton.component";
import Icon from "../../atoms/Icon/Icon.component";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  IPostIngredient,
  setChallengePost,
  setShowPostForm,
} from "../../../redux/slices/Challenge.slice";

import { RECIPE_CATEGORY_COLOR } from "../../../data/Recipe";
import { setShowPanel } from "../../../redux/slices/Ui.slice";

import useHideOnClickOutside from "../../../hooks/useHideOnClickOutside";
import {
  COPY_CHALLENGE_POST,
  DELETE_CHALLENGE_POST,
  MOVE_CHALLENGE_POST,
} from "../../../graphql/Challenge";

import Publish from "../../../helpers/Publish";
import styles from "./Post.module.scss";

interface IPost {
  _id: string;
  name: string;
  recipeBlendCategory: {
    _id: string;
    name: string;
  };
  ingredients: IPostIngredient[];
  images: Image[];
  rxScore: number;
  calories: number;
  gl: number;
  note: string;
}

interface IChallengePosts {
  _id: string;
  date: string;
  posts: IPost[];
}

interface ChallengePanelProps {
  height?: string;
  challenges: any[];
}

const ChallengePanel: React.FC<ChallengePanelProps> = (props) => {
  const { height, challenges } = props;

  const dispatch = useAppDispatch();
  const activeDate = useAppSelector((state) => state.challenge.activeDate);
  const panelList = useAppSelector((state) => state.ui.panel);
  const panel = panelList.find((panel) => panel.name === "RXPanel");

  const blends = useRef<HTMLDivElement[]>([]);
  const lastPostChartId = useRef("");
  const [showChart, setShowChart] = useState("");

  const [deletePost, deleteState] = useMutation(DELETE_CHALLENGE_POST, {
    refetchQueries: ["Get30DaysChallenge"],
  });
  const [copyPost, copyState] = useMutation(COPY_CHALLENGE_POST, {
    refetchQueries: ["Get30DaysChallenge"],
  });
  const [movePost, moveState] = useMutation(MOVE_CHALLENGE_POST, {
    refetchQueries: ["Get30DaysChallenge"],
  });

  const addToBlendsRef = (element: HTMLDivElement) => {
    if (element && !blends.current.includes(element)) {
      blends.current.push(element);
    }
  };

  useEffect(() => {
    if (!activeDate) return;
    blends.current.forEach((element) => {
      if (element && activeDate === element?.dataset?.date) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
    return;
  }, [activeDate]);

  const editHandler = useCallback(
    (challengeId, date, post: IPost) => {
      dispatch(setShowPostForm(true));
      dispatch(
        setChallengePost({
          isEditMode: true,
          id: post._id,
          docId: challengeId,
          startDate: date,
          title: post.name,
          category: post?.recipeBlendCategory?._id,
          images: post.images,
          ingredients: post.ingredients,
          notes: post.note,
          serving: 0,
        }),
      );
    },
    [dispatch],
  );

  const challengePosts = useMemo(() => {
    const challengPosts = [];
    const challengeImages = [];
    const copyHandler = async (memberId, date, challengeId, postId) => {
      await Publish({
        mutate: copyPost,
        variables: {
          memberId,
          date: format(new Date(date), "yyyy-MM-dd"),
          postId,
          challengeId,
        },
        state: copyState,
        success: `Duplicated Challenge Post sucessfully`,
      });
    };

    const moveHandler = async (memberId, date, challengeId, postId) => {
      await Publish({
        mutate: movePost,
        variables: {
          memberId,
          date: format(new Date(date), "yyyy-MM-dd"),
          postId,
          challengeId,
        },
        state: moveState,
        success: `Moved Challenge Post sucessfully`,
      });
    };

    const deleteHandler = async (challengeId, postId) => {
      await Publish({
        mutate: deletePost,
        variables: {
          postId,
          challengeId,
        },
        state: deleteState,
        success: `Deleted Challenge Post sucessfully`,
      });
    };

    const nutrientPanelHandler = (ingredients, id) => {
      if (panel && panel?.show && lastPostChartId.current === id) {
        dispatch(setShowPanel({ name: "RXPanel", show: false }));
      } else {
        dispatch(
          setShowPanel({
            name: "RXPanel",
            show: true,
            payload: ingredients.map((ing) => ({
              ingredientId: ing?.ingredientId?._id,
              value: ing?.selectedPortion?.gram,
            })),
          }),
        );
        lastPostChartId.current = id;
      }
    };

    //Handling Each Challenge
    challenges?.forEach((challenge: IChallengePosts) => {
      if (challenge.posts.length === 0) return;
      let images = [];
      const postsEl = [];
      //Handling Each Post
      challenge.posts.forEach((post) => {
        images = [...images, ...post?.images];
        challengeImages.push({ assignDate: challenge?.date, images });
        postsEl.push(
          <Post
            key={post._id}
            id={challenge?._id}
            date={challenge?.date}
            showPanel={panel?.show}
            showChartState={[showChart, setShowChart]}
            post={post}
            onEdit={editHandler}
            onCopy={copyHandler}
            onMove={moveHandler}
            onDelete={deleteHandler}
            onShowNutrient={nutrientPanelHandler}
          />,
        );
      });
      challengPosts.push(
        <BlendCard
          ref={addToBlendsRef}
          key={challenge?._id}
          date={challenge?.date}
          images={images}
          postsEl={postsEl}
          challengeImages={challengeImages}
        />,
      );
    });
    return challengPosts;
  }, [
    challenges,
    copyPost,
    copyState,
    deletePost,
    deleteState,
    dispatch,
    editHandler,
    movePost,
    moveState,
    panel,
    showChart,
  ]);

  return (
    <Fragment>
      <IconHeading
        icon={faTrophy}
        title={"Challenge Post"}
        iconStyle={{ fontSize: "18px" }}
      />
      <div style={{ maxHeight: height }} className={styles.card__wrapper}>
        {challengePosts.reverse()}
      </div>
    </Fragment>
  );
};

ChallengePanel.defaultProps = {
  challenges: [],
};

interface BlendCardProps {
  date: string;
  images: string[];
  postsEl: React.ReactNode[];
  challengeImages: any[];
}
const BlendCard = forwardRef((props: BlendCardProps, ref: any) => {
  const { date, postsEl, images, challengeImages } = props;

  return (
    <div className={styles.card} data-date={date} ref={ref}>
      <div className={styles.card__headline}>
        <h5>{format(date ? new Date(date) : new Date(), "EEEE, MMMM d")}</h5>
      </div>
      <div className={styles.card__content}>
        {images.length > 0 && (
          <div className={styles.space}>
            <SplitImageCard
              challengeImages={challengeImages}
              images={images}
              date={date ? new Date(date) : new Date()}
            />
          </div>
        )}
        {postsEl}
      </div>
    </div>
  );
});
BlendCard.displayName = "BlendCard";

interface PostProps {
  id: string;
  date: string;
  post: IPost;
  showPanel: boolean;
  showChartState: any;
  onEdit: any;
  onCopy: any;
  onMove: any;
  onDelete: any;
  onShowNutrient: any;
}

const Post = (props: PostProps) => {
  const {
    id,
    date,
    showPanel,
    showChartState,
    post,
    onEdit,
    onCopy,
    onMove,
    onDelete,
    onShowNutrient,
  } = props;

  const [showChart, setShowChart] = showChartState;
  const [showMenu, setShowMenu] = useState(false);

  const viewOnly = useAppSelector((state) => state.challenge.viewOnly);

  let ingredients = "";
  post.ingredients.forEach((ingredient, index) => {
    ingredients +=
      ingredient?.ingredientId?.ingredientName +
      `${index + 1 !== post.ingredients.length ? ", " : ""}`;
  });

  const menuRef = useHideOnClickOutside(() => setShowMenu(false));
  // console.log({ showChart, id: post._id, showPanel });

  return (
    <div className="mb-10">
      <div className={styles.recipe}>
        <div className={styles.space}>
          <h3
            className={styles.recipe__title}
            onClick={() => onEdit(id, date, post)}
          >
            <Icon
              fontName={faCircle}
              size="2rem"
              style={{
                color: RECIPE_CATEGORY_COLOR[post?.recipeBlendCategory?.name],
              }}
            />
            {post.name}
          </h3>
          <div className={styles.recipe__buttons}>
            <span className={styles.recipe__category}>
              {post?.recipeBlendCategory?.name}
            </span>
            <div className="flex ai-center">
              <IconButton
                fontName={faChartSimple}
                variant="hover"
                color="primary"
                style={{ fontSize: "1.6rem" }}
                active={showChart === post._id && showPanel}
                onClick={() => {
                  setShowChart(showChart === post._id ? "" : post._id);
                  onShowNutrient(post.ingredients, post._id);
                }}
              />
              {!viewOnly && (
                <div ref={menuRef}>
                  <IconButton
                    variant="hover"
                    color="primary"
                    style={{ fontSize: "1.6rem" }}
                    fontName={faEllipsisVertical}
                    onClick={() => setShowMenu((prev) => !prev)}
                  />
                  <div
                    className={styles.recipe__optionTray}
                    style={
                      showMenu
                        ? { display: "block", zIndex: "1" }
                        : { zIndex: "-1" }
                    }
                  >
                    <div className={styles.recipe__optionTray__pointingDiv} />
                    {/* <div
                    className={styles.option}
                    onClick={() => onEdit(id, date, post)}
                  >
                    <span>Edit</span>
                    <span className={styles.option__icon}>
                      <Icon fontName={faPenToSquare} size="1.5rem" />
                    </span>
                  </div> */}
                    <div
                      className={styles.option}
                      onClick={() => {
                        setShowMenu(false);
                        onDelete(id, post?._id);
                      }}
                    >
                      <span>Remove</span>
                      <span className={styles.option__icon}>
                        <Icon fontName={faTrash} size="1.5rem" />
                      </span>
                    </div>
                    <DateSelector
                      type="Copy"
                      postId={post?._id}
                      challengeId={id}
                      setShowMenu={setShowMenu}
                      dateHandler={onCopy}
                    />
                    <DateSelector
                      type="Move"
                      postId={post?._id}
                      challengeId={id}
                      setShowMenu={setShowMenu}
                      dateHandler={onMove}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className={styles.recipe__ingredients}>{ingredients}</p>
        </div>
        <div className={styles.recipe__summary}>
          <span>
            RX Score <b>240</b>
          </span>
          <span>
            Calories <b>275</b>
          </span>
          <span>
            GL <b>240</b>
          </span>
        </div>
      </div>
      {post.note && (
        <div className={styles.note}>
          <h5 className={styles.note__headline}>Blend Notes</h5>
          <p className={styles.note__content}>{post.note}</p>
        </div>
      )}
    </div>
  );
};

const DatePickerButton = forwardRef(({ type, onClick }: any, ref: any) => {
  return (
    <div className={styles.option} onClick={onClick} ref={ref}>
      <span>{type}</span>
      <span className={styles.option__icon}>
        <Icon
          fontName={type === "Move" ? faUpDownLeftRight : faClone}
          size="1.5rem"
        />
      </span>
    </div>
  );
});
DatePickerButton.displayName = "DatePickerButton";

interface DateSelectorProps {
  type: "Move" | "Copy";
  postId: string;
  challengeId: string;
  dateHandler: any;
  setShowMenu: any;
}
const DateSelector = (props: DateSelectorProps) => {
  const { setShowMenu, type, postId, challengeId, dateHandler } = props;
  const startDate = useAppSelector((state) => state.challenge.startDate);
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  return (
    <DatePicker
      selected={new Date()}
      minDate={new Date(startDate)}
      maxDate={new Date()}
      onChange={(date) => {
        setShowMenu(false);
        dateHandler(userId, date, challengeId, postId);
      }}
      customInput={<DatePickerButton type={type} />}
    />
  );
};

export default ChallengePanel;
