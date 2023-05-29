import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import {
  faChevronLeft,
  faTimes,
  faTrash,
  faUserPlus,
} from "@fortawesome/pro-solid-svg-icons";

import ButtonComponent from "../../../theme/button/button.component";
import IconButton from "../../atoms/Button/IconButton.component";
import Checkbox from "../../organisms/Forms/Checkbox.component";
import NumberField from "../../organisms/Forms/NumericField.component";
import Textarea from "../../organisms/Forms/Textarea.component";
import Textfield from "../../organisms/Forms/Textfield.component";

import { INVITE_CHALLENGE } from "../../../graphql/Challenge";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Publish from "../../../helpers/Publish";

import styles from "./Settings.module.scss";
import {
  addDays,
  differenceInDays,
  format,
  isBefore,
  isPast,
  subDays,
} from "date-fns";
import RadioButton from "../../organisms/Forms/RadioButton.component";
import { setChallengeDate } from "../../../redux/slices/Challenge.slice";
import Invite from "../../organisms/Share/Invite.component";
import { SharedUserInfoType } from "../../organisms/Share/Distribute.component";
import {
  useActivateChallenge,
  useAddChallenge,
  useDeleteChallenge,
  useEditChallenge,
} from "../../../hooks/modules/Challenge/useChallengeList";
import { useRouter } from "next/router";
import { UTCDate } from "../../../helpers/Date";

interface SettingsProps {
  showFormState: [boolean, any];
  currentChallenge: string;
  challenges: any;
  elementRef?: any;
  height?: string;
  hideSettings: () => void;
}

const Settings = forwardRef((props: SettingsProps, ref) => {
  const { showFormState, currentChallenge, challenges, elementRef, height } =
    props;
  const [showForm, setShowForm] = showFormState;
  const [challenge, setChallenge] = useState<any>(null);

  const editFormHandler = useCallback(
    (data) => {
      setShowForm(true);
      setChallenge(data);
    },
    [setShowForm],
  );

  return (
    <div ref={elementRef} className={styles.settings} style={{ height }}>
      <div>
        {showForm ? (
          <ChallengeForm
            ref={ref}
            challenge={challenge}
            setChallenge={setChallenge}
            setShowForm={setShowForm}
          />
        ) : (
          <ChallengeList
            currentChallenge={currentChallenge}
            challenges={challenges}
            editFormHandler={editFormHandler}
          />
        )}
      </div>
    </div>
  );
});

Settings.displayName = "Settings";

const ChallengeList = ({ currentChallenge, challenges, editFormHandler }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [challengeInfo, setChallengeInfo] = useState<any>({});

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [activateChallenge, activateState] = useActivateChallenge(userId);
  const [deleteChallenge, deleteState] = useDeleteChallenge(userId);
  const [inviteChallenge, { loading: inviteChallengeLoading }] =
    useMutation(INVITE_CHALLENGE);

  const [emails, setEmails] = useState<SharedUserInfoType[]>([]);

  const handleInvitation = () => {
    if (emails.length === 0) return;
    inviteChallenge({
      variables: {
        shareWithOther: false,
        emails: emails?.map((info) => info?.email),
        user: userId,
        challengeId: challengeInfo?.id,
      },
    }).then((response) => {
      setShow(false);
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/challenge/invited/?id=${response.data.inviteToChallenge}`,
      );
    });
  };

  const resetModal = () => {
    setEmails([]);
    setShow(false);
  };

  const activeHandler = async (challengeId) => {
    await Publish({
      mutate: activateChallenge,
      variables: {
        memberId: userId,
        newChallenge: challengeId,
        prevChallenge: currentChallenge,
      },
      state: activateState,
      success: `Activated Challenge Sucessfully`,
      onSuccess: () => {
        dispatch(setChallengeDate(""));
        setActiveId(challengeId);
        router.replace("/challenge", undefined, { shallow: true });
        // hideSettings();
      },
    });
  };

  const deleteHandler = async (challengeId) => {
    await Publish({
      mutate: deleteChallenge,
      variables: {
        challengeId,
      },
      state: deleteState,
      success: `Deleted Challenge Sucessfully`,
    });
  };

  return (
    <div className={styles.settings}>
      <div className={styles.settings__header}>
        <h2 className={styles.settings__title}>My Challenges</h2>
      </div>
      <div>
        <Invite
          show={show}
          setShow={setShow}
          {...challengeInfo}
          emails={emails}
          setEmails={setEmails}
          handleCancel={resetModal}
          handleInvitation={handleInvitation}
          loading={inviteChallengeLoading}
        />
        <div className="row mb-10 mt-10">
          <div className="col-1" />
          <div className="col-4">
            <h5>Challenge Name</h5>
          </div>
          <div className="col-3">
            <h5>Start Date</h5>
          </div>
          <div className="col-2">
            <h5>Days</h5>
          </div>
          <div className="col-2">&nbsp;</div>
        </div>
        {challenges?.getMyChallengeList?.map((challenge) => {
          const canShareWithOthers = isPast(UTCDate(challenge.startDate));
          return (
            <div className={`row ${styles.challenge}`} key={challenge._id}>
              <div className="col-1">
                <div className={styles.challenge__action}>
                  <RadioButton
                    selected={
                      activeId === "" && challenge.isActive
                        ? ""
                        : activeId === challenge._id
                        ? ""
                        : "unchecked"
                    }
                    options={[""]}
                    onChange={() => activeHandler(challenge._id)}
                    className={styles.challenge__action__radio}
                  />
                </div>
              </div>
              <div className="col-4">
                <div
                  className={styles.challenge__name}
                  style={
                    isPast(UTCDate(challenge.endDate))
                      ? { backgroundColor: "#eee", color: "#333" }
                      : {}
                  }
                >
                  <a onClick={() => editFormHandler(challenge)}>
                    {challenge.challengeName}
                  </a>
                </div>
              </div>
              <div className="col-3">
                <Textfield defaultValue={challenge.startingDate} disabled />
              </div>
              <div className="col-2">
                <Textfield defaultValue={challenge.days} disabled />
              </div>
              <div className="col-2">
                <IconButton
                  fontName={faUserPlus}
                  variant="fade"
                  size="small"
                  disabled={canShareWithOthers}
                  className={`${styles.challenge__action__trash} ml-30`}
                  onClick={() => {
                    setShow(true);
                    setChallengeInfo({
                      id: challenge._id,
                      title: challenge.challengeName,
                    });
                  }}
                />
                <IconButton
                  fontName={faTrash}
                  variant="fade"
                  size="small"
                  className={`${styles.challenge__action__trash} ml-10`}
                  onClick={() => deleteHandler(challenge._id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const defaultValues = {
  challengeName: "",
  startDate: format(new Date(), "yyyy-MM-dd"),
  endDate: format(new Date(), "yyyy-MM-dd"),
  description: "",
  notification: false,
};

const ChallengeForm = forwardRef(
  ({ setShowForm, challenge, setChallenge }: any, ref) => {
    const [days, setDays] = useState(1);
    const [isEditMode, setIsEditMode] = useState(false);
    const methods = useForm({
      defaultValues: useMemo(() => defaultValues, []),
    });

    const memberId = useAppSelector((state) => state.user?.dbUser?._id || "");

    const [addChallenge, addState] = useAddChallenge(memberId);
    const [editChallenge, editState] = useEditChallenge(memberId);

    useEffect(() => {
      if (challenge) {
        const {
          challengeName,
          description,
          endDate,
          startDate,
          notification,
          days,
        } = challenge;
        methods.reset({
          challengeName,
          startDate,
          endDate,
          description,
          notification,
        });
        setDays(days);
        setIsEditMode(true);
      }
    }, [challenge, methods]);

    const resetForm = () => {
      methods.reset(defaultValues);
      setShowForm(false);
      setDays(1);
      setChallenge(null);
    };

    const handleSubmit = async (data) => {
      const challengeData = {
        data: {
          memberId,
          ...data,
          days: days,
          startDate: data.startDate,
          endDate: data.endDate,
        },
      };
      if (isEditMode) challengeData.data.challengeId = challenge._id;

      await Publish({
        mutate: isEditMode ? editChallenge : addChallenge,
        variables: challengeData,
        state: isEditMode ? editState : addState,
        success: `${isEditMode ? "Edited" : "Created"} Challenge Successfully`,
        onSuccess: () => {
          resetForm();
        },
      });
    };

    useImperativeHandle(ref, () => ({
      onChallengeSave() {
        methods.handleSubmit(handleSubmit)();
      },
      onSettingsClose() {
        resetForm();
      },
    }));

    return (
      <div className={styles.settings}>
        <div className={styles.settings__header}>
          <h2 className={styles.settings__title}>
            <IconButton
              size="medium"
              variant="white"
              className="mr-20"
              fontName={faChevronLeft}
              onClick={resetForm}
            />
            {challenge ? "Edit" : "Add"} Challenge
          </h2>
        </div>
        <div>
          <FormProvider {...methods}>
            <div className="row">
              <div className="col-12 mb-30">
                <Textfield label="Challenge Name" name="challengeName" />
              </div>
            </div>
            <ChallengeDate dayState={[days, setDays]} />
            <div className="row mb-10">
              <div className="col-12">
                <Textarea
                  name="description"
                  label="Description"
                  className={styles.textarea}
                />
              </div>
            </div>
            <div className="row mb-20">
              <div className="col-12">
                <Checkbox label="Receive Notifications" name="notification" />
              </div>
            </div>
          </FormProvider>
        </div>
      </div>
    );
  },
);
ChallengeForm.displayName = "Challenge Form";

const ChallengeDate = ({ dayState }) => {
  const [days, setDays] = dayState;
  const { control, setValue } = useFormContext();

  //@ts-ignore
  const startDate = useWatch({
    control,
    name: "startDate",
  });

  const endDate = useWatch({
    control,
    name: "endDate",
  });

  const daysHandler = (e) => {
    if (startDate) {
      setValue(
        "endDate",
        format(addDays(UTCDate(startDate), +e.target.value - 1), "yyyy-MM-dd"),
      );
    }
  };

  const startDateHandler = (e) => {
    const difference = differenceInDays(
      UTCDate(endDate),
      UTCDate(e.target.value),
    );
    if (difference < 0) return;
    setValue("startDate", e.target.value);
    if (endDate) {
      // If enddate is given on change of startDate only day needs to be changed even if day already exists
      setDays(difference + 1);
    } else if (days && !endDate) {
      // If only days is given, endDate is not provided
      setValue(
        "endDate",
        format(addDays(UTCDate(e.target.value), days), "yyyy-MM-dd"),
      );
    }
  };

  const endDateHandler = (e) => {
    const difference = differenceInDays(
      UTCDate(e.target.value),
      UTCDate(startDate),
    );
    if (difference < 0) return;
    setValue("endDate", e.target.value);
    if (startDate) {
      // If startDate is given on change of endDate only day needs to be changed even if day already exists
      setDays(difference + 1);
    } else if (days && !startDate) {
      // If only days is given, startDate is not provided
      setValue(
        "startDate",
        format(subDays(UTCDate(e.target.value), days), "yyyy-MM-dd"),
      );
    }
  };

  return (
    <div className="row mb-30">
      <div className="col-5">
        <Textfield
          label="Start Date"
          name="startDate"
          type="date"
          //@ts-ignore
          value={startDate}
          onChange={startDateHandler}
        />
      </div>
      <div className="col-2">
        <NumberField
          label="End Day"
          minValue={1}
          valueState={[days, setDays]}
          onChange={daysHandler}
        />
      </div>
      <div className="col-5">
        <Textfield
          label="End Date"
          name="endDate"
          type="date"
          //@ts-ignore
          value={endDate}
          onChange={endDateHandler}
        />
      </div>
    </div>
  );
};
export default Settings;
