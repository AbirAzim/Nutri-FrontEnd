import { useQuery } from "@apollo/client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  useState,
  useRef,
  useMemo,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import AddCollectionModal, {
  InputValueType,
} from "../../../components/sidetray/common/addCollectionModal/AddCollectionModal";
import slugStringGenerator from "../../../components/utility/slugStringGenerator";
import { GET_ALL_USER_LIST } from "../../../graphql/User";
import formatDate from "../../../helperFunc/date/formatDate";
import CustomAccordion from "../../../theme/accordion/accordion.component";
import CustomCheckbox from "../../../theme/checkbox/CustomCheckbox";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import InputComponent from "../../../theme/input/input.component";
import CircularRotatingLoader from "../../../theme/loader/circularRotatingLoader.component";
import TextArea from "../../../theme/textArea/TextArea";
import Textarea from "../Forms/Textarea.component";
import { SharedUserInfoType } from "./Distribute.component";
import styles from "./Share.module.scss";

interface Props {
  handleInvitation?: () => void;
  handleCancel?: () => void;
  emails?: SharedUserInfoType[];
  setEmails?: Dispatch<SetStateAction<SharedUserInfoType[]>>;
  submitBtnText?: string;
  loading?: boolean;
  isAdditionInfoNeedForPersonalShare?: boolean;
  createCollectionProps?: {
    input: InputValueType;
    setInput: Dispatch<SetStateAction<InputValueType>>;
    showCreateCollectionComponents: boolean;
  };
  message?: string;
  setMessage?: Dispatch<SetStateAction<string>>;
  sharedUserEmail?: string;
}

const InviteUserForm = ({
  emails = [],
  handleCancel = () => {},
  handleInvitation = () => {},
  setEmails = () => {},
  submitBtnText = "Invite",
  loading = false,
  isAdditionInfoNeedForPersonalShare = false,
  createCollectionProps = {
    input: {
      description: "",
      name: "",
      slug: "",
      image: "",
    },
    setInput: () => {},
    showCreateCollectionComponents: false,
  },
  message = "",
  setMessage = () => {},
  sharedUserEmail = "",
}: Props) => {
  const { data } = useQuery(GET_ALL_USER_LIST);
  const inputRef = useRef<HTMLInputElement>(null);
  const collectionNameInputRef = useRef<HTMLInputElement>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [input, setInput] = useState("");
  const hasEmails = emails.length > 0;
  const {
    showCreateCollectionComponents = false,
    input: createCollectionInput,
    setInput: setCreateCollectionInput,
  } = createCollectionProps;

  // create collection input change

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e?.target;

    if (name === "name") {
      const convertToSlug = slugStringGenerator(value);
      setCreateCollectionInput((pre) => ({
        ...pre,
        name: value,
        slug: convertToSlug,
      }));
    } else {
      setCreateCollectionInput((pre) => ({ ...pre, [name]: value }));
    }
  };

  const onInputFocus = () => {
    if (inputRef.current) {
      const inputEl = inputRef.current;
      inputEl.style.borderColor = "#7dbd3b";
      inputEl.style.cursor = "text";
      inputEl.querySelector("input").focus();
    }
  };

  const onInputBlur = () => {
    // setShowSuggestion(false);
    if (inputRef.current) {
      const inputEl = inputRef.current;
      inputEl.style.borderColor = "#e5e5e5";
    }
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onAddEmail = (event) => {
    if (event.key === "Enter") {
      const email = event.target.value;
      if (
        !email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
      )
        return;
      setEmails((prevEmails) => [
        ...prevEmails?.map((info) => ({ ...info, active: false })),
        { email, canCollaborate: false, canShareAgain: false, active: true },
      ]);
      setInput("");
    }
  };

  const suggestions = useMemo(() => {
    let users = [];
    if (data?.getAllusers && input !== "") {
      users =
        data?.getAllusers.filter(
          (user) =>
            !emails?.map((el) => el?.email).includes(user.email) &&
            (user.displayName as string)
              ?.toLowerCase()
              .startsWith(input.toLowerCase()),
        ) || [];
    }
    if (users.length !== 0) setShowSuggestion(true);
    else setShowSuggestion(false);
    return users;
  }, [data?.getAllusers, emails, input]);

  const activeEmailInfo = useMemo(() => {
    return emails.find((info) => info.active);
  }, [emails]);

  const handleFilterEmail = (emailProps: string) => {
    setEmails((emails) => emails.filter((email) => email.email !== emailProps));
  };

  const handleAddNewEmail = (info: SharedUserInfoType) => {
    setEmails((prevEmails) => [
      ...prevEmails?.map((info) => ({ ...info, active: false })),
      info,
    ]);
    setShowSuggestion(false);
    setInput("");
  };

  const toggleActiveEmail = (sharedPersonInfo: SharedUserInfoType) => {
    setEmails((prevEmails) => [
      ...prevEmails?.map((info) =>
        info?.email === sharedPersonInfo.email
          ? { ...info, ...sharedPersonInfo }
          : { ...info, active: false },
      ),
    ]);
  };

  useEffect(() => {
    setEmails([]);
    setInput("");
    collectionNameInputRef?.current && collectionNameInputRef.current.focus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {showCreateCollectionComponents && (
        <div style={{ margin: "10px 0" }}>
          <InputComponent
            borderSecondary={true}
            placeholder="Collection Name"
            value={createCollectionInput?.name}
            name="name"
            onChange={handleChange}
            style={{ fontSize: "12px" }}
            ref={collectionNameInputRef}
          />
        </div>
      )}
      <div
        ref={inputRef}
        className={styles.email}
        style={hasEmails ? {} : { padding: 10 }}
        onClick={onInputFocus}
        onBlur={onInputBlur}
      >
        {emails.map((email) => (
          <span
            className={`${styles.email__address} ${
              isAdditionInfoNeedForPersonalShare && email?.active
                ? styles.activeEmail
                : ""
            } ${
              isAdditionInfoNeedForPersonalShare && email.canCollaborate
                ? styles.collaborationAccessEmail
                : ""
            }`}
            key={email?.email}
            onClick={() =>
              toggleActiveEmail({ ...email, active: !email?.active })
            }
          >
            {email?.email}
            <div className={styles.closeBtn}>
              <IconWarper
                defaultBg="primary"
                style={{
                  width: "16px",
                  height: "16px",
                }}
                iconColor="iconColorWhite"
                handleClick={() => handleFilterEmail(email?.email)}
              >
                <FontAwesomeIcon icon={faXmark} fontSize="10px" />
              </IconWarper>
            </div>
          </span>
        ))}

        <input
          type="email"
          value={input}
          placeholder={!hasEmails ? "Search or enter email" : ""}
          className={styles.email__input}
          onFocus={onInputFocus}
          onChange={onInputChange}
          onKeyDown={onAddEmail}
        />

        {showSuggestion && (
          <div className={styles.email__suggestion}>
            <h6>Select a Person</h6>
            <ul>
              {suggestions.slice(0, 3).map((user) => {
                return (
                  <li
                    key={user?.email}
                    onClick={() =>
                      handleAddNewEmail({
                        email: user?.email,
                        canCollaborate: false,
                        active: true,
                      })
                    }
                    className={
                      user?.email === sharedUserEmail ? styles.disableEmail : ""
                    }
                  >
                    <span>{user?.displayName?.charAt(0)}</span>
                    {user?.displayName}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div
        className={`${styles.activeEmailInfoContainer} ${
          isAdditionInfoNeedForPersonalShare && activeEmailInfo?.active
            ? styles.showInfo
            : ""
        }`}
      >
        <div className={styles.checkBoxContainer}>
          <CustomCheckbox
            checked={activeEmailInfo?.canCollaborate}
            handleChange={(e) =>
              toggleActiveEmail({
                ...activeEmailInfo,
                canCollaborate: !activeEmailInfo?.canCollaborate,
              })
            }
            id="canCollaborate"
          />
          <label className={styles.label} htmlFor="canCollaborate">
            Collaborate
          </label>
        </div>
      </div>

      <Textarea
        name="message"
        placeholder="Enter Message"
        className={styles.share__message}
        value={message}
        onChange={(e) => setMessage(e?.target?.value)}
      />

      <div className={styles.share__button_wraper}>
        <button
          className={`${styles.share__button} ${styles["share__button--save"]} mr-30`}
          onClick={handleInvitation}
        >
          {loading ? (
            <CircularRotatingLoader
              color="white"
              style={{ width: "20px", height: "20px", margin: "0 10px" }}
            />
          ) : (
            submitBtnText
          )}
        </button>
        <button
          className={`${styles.share__button} ${styles["share__button--cancel"]}`}
          onClick={() => {
            handleCancel();
            setInput("");
            setShowSuggestion(false);
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default InviteUserForm;
