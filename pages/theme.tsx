import InputComponent from "../theme/input/input.component";
import styles from "../styles/Theme.module.scss";
import ButtonComponent from "../theme/button/button.component";
import TogglerComponent from "../theme/toggler/toggler.component";
import { useState } from "react";
import CardComponent from "../theme/cards/card.component";
import SpecialcardComponent from "../theme/cards/specialCard.component";
import TitleComponent from "../theme/titles/title.component";
import MenubarComponent from "../theme/menuBar/menuBar.component";
import DatacardComponent from "../theme/cards/dataCard/dataCard.component";
import MembershipCardComponent from "../theme/cards/membership/membershipCard.component";
import HomebannerComponent from "../theme/banners/homebanner.component";
import SectionTitleWithIcon from "../theme/recipe/sectionTitleWithIcon/SectionTitleWithIcon.component";
import RecipeItem from "../theme/recipe/recipeItem/RecipeItem.component";
import SmallcardComponent from "../theme/cards/smallCard/SmallCard.component";
import AContainer from "../containers/A.container";
import { ScaleComponent } from "../theme/scale/scale.component";

export default function Home() {
  const [toggler, setToggler] = useState("The How");
  const [state, setState] = useState({ age: "50" });

  const update = (name: string, value: any) => {
    setState((pre) => ({ ...pre, [name]: value }));
  };
  return (
    <AContainer showCollectionTray={{ show: true, showTagByDeafult: true }}>
      <div className={styles.theme__child}>
        {/* BUTTON THEME COMPONENTS HERE */}
        <div className={styles.theme__box}>
          <h3>BUTTONS</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <div className={styles.button__container}>
              <ButtonComponent
                value="Primary"
                type="primary"
                style={{ height: "45px" }}
                fullWidth={undefined}
                width={undefined}
              />
            </div>
            <div
              className={styles.button__container}
              style={{ padding: "0 15px" }}
            >
              <ButtonComponent
                type="buttonWithIcon"
                value="Icon Button"
                icon="/images/formulate.svg"
                style={{ height: "50px", width: "234px", borderRadius: "54px" }}
              />
            </div>
            <div className={styles.button__container}>
              <ButtonComponent
                value="Transparent"
                type="transparent"
                style={{ height: "45px" }}
                fullWidth={undefined}
                width={undefined}
              />
            </div>
            <div className={styles.button__container}>
              <ButtonComponent
                value="Default"
                type="primary"
                style={{ height: "45px" }}
                fullWidth={undefined}
                width={undefined}
              />
            </div>
            <div className={styles.button__container}>
              <ButtonComponent
                value="Hover Button"
                type="transparentHover"
                style={{ height: "45px" }}
                fullWidth={undefined}
                width={undefined}
              />
            </div>
            <div className={styles.button__container}>
              <ButtonComponent
                value="order"
                type="border"
                style={{ height: "45px" }}
                fullWidth={undefined}
                width={undefined}
              />
            </div>
          </div>
        </div>

        <br />

        {/* TOGGLER THEME COMPONTNT STARTS HERE */}
        <div className={styles.theme__box}>
          <h3>TOGGLER</h3>
          <div className={styles.toggler}>
            <TogglerComponent
              childs={["The Way", "The How", "The Why", "The Will"]}
              childColor="#fff"
              tags={["Part 1", "Part 2", "Part 3", "Part 4"]}
              tagColor="#fff"
              icons={[
                "/icons/tab1.svg",
                "/icons/tab2.svg",
                "/icons/tab3.svg",
                "/icons/tab4.svg",
              ]}
              value={toggler}
              setValue={setToggler}
              style={undefined}
              lineCss={undefined}
            />
          </div>
        </div>

        <br />

        <div className={styles.theme__box}>
          <h3>MENUBAR</h3>
          <MenubarComponent
            childs={undefined}
            setValue={undefined}
            value={undefined}
          />
        </div>

        <br />

        {/* CARDS THEME COMPONENTS HERE */}
        <div className={styles.theme__box}>
          <h3>CARDS</h3>
          <div className={styles.cards}>
            <div className={styles.card}>
              <CardComponent
                title="Banana Mango Smoothie"
                img={undefined}
                icon={undefined}
                rating={undefined}
                noOfRating={undefined}
                price={undefined}
                discountPrice={undefined}
                type={undefined}
                rx={undefined}
                style={undefined}
              />
            </div>
            <div className={styles.card}>
              <CardComponent
                type="second"
                title="Secondary Card"
                img={undefined}
                icon={undefined}
                rating={undefined}
                noOfRating={undefined}
                price={undefined}
                discountPrice={undefined}
                rx={undefined}
                style={undefined}
              />
            </div>
            <div className={styles.card}>
              <SpecialcardComponent
                title="This is an example of card named Special Card."
                img={undefined}
                style={undefined}
                imageHeight={undefined}
                color={undefined}
                type={undefined}
                rx={45}
              />
            </div>
            <div className={styles.card}>
              <SpecialcardComponent
                type="secondary"
                img="/cards/milk.png"
                title="Another Special Card With Secondary Attribute."
                style={undefined}
                imageHeight={undefined}
                color={undefined}
                rx={23}
              />
            </div>
          </div>
        </div>

        <br />

        {/* TITLE COMPONENT STARTS HERE */}
        <div className={styles.theme__box}>
          <h3>TYPOGRAPHY</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={styles.container}>
              <TitleComponent
                type="icon"
                icon="/icons/clock.svg"
                text="Heading With Icon"
                style={undefined}
                textStyle={undefined}
              />
            </div>
            <div className={styles.container}>
              <TitleComponent
                text="Heading No Icon"
                type={undefined}
                style={undefined}
                textStyle={undefined}
                icon={undefined}
              />
            </div>
            <div className={styles.container}>
              <SectionTitleWithIcon
                title="Ingredients"
                icon="/icons/chart-bar-light-green.svg"
              />
            </div>
            <div className={styles.container}>
              <RecipeItem item={{ id: 1, label: "1 Frozen Banana" }} />
            </div>
          </div>
        </div>

        <br />

        {/* INPUT THEME COMPONENTS HERE */}
        <div className={styles.theme__box}>
          <h3>INPUTS</h3>
          <InputComponent
            maxWidth={"300px"}
            style={{ padding: "15px 20px", borderRadius: "7px" }}
            type={undefined}
            value={undefined}
            placeholder={undefined}
            fullWidth={undefined}
            fieldName="input"
          />
        </div>

        <br />
        <div className={styles.theme__box}>
          <h3>DATA CARD</h3>
          <div className={styles.data__cards}>
            <div className={styles.data__card}>
              <DatacardComponent
                title={"Chocolate Avocado Smoothie"}
                ingredients={""}
                category={""}
                ratings={3.2}
                noOfRatings={0}
                carbs={0}
                score={0}
                calorie={0}
                noOfComments={0}
                image={"/cards/avocado.png"}
              />
            </div>
            <div className={styles.data__card}>
              <DatacardComponent
                title={""}
                ingredients={""}
                category={""}
                ratings={3.8}
                noOfRatings={0}
                carbs={0}
                score={0}
                calorie={0}
                noOfComments={0}
                image={"/cards/juice.png"}
              />
            </div>
            <div className={styles.data__card}>
              <DatacardComponent
                title={"Choco Oreo Shake"}
                ingredients={""}
                category={""}
                ratings={4.9}
                noOfRatings={0}
                carbs={0}
                score={0}
                calorie={0}
                noOfComments={0}
                image={"/cards/oreoshake.png"}
              />
            </div>
          </div>
        </div>

        <br />

        <div className={styles.theme__box}>
          <h3>MEMBERSHIP CARD</h3>
          <div className={styles.cards}>
            <div className={styles.data__card}>
              <MembershipCardComponent
                title="Free"
                detailList={[
                  "User can also sign up free without using any credit card",
                  "Basic Support",
                  "Configurable premium features",
                  "5% store discount",
                  "Pricing, percentage discount and features can be manage from admin",
                ]}
                price={0}
                period="mon"
                click={() => {}}
              />
            </div>
            <div className={styles.data__card}>
              <MembershipCardComponent
                title="Apex"
                detailList={[
                  "User can also sign up free without using any credit card",
                  "Basic Support",
                  "Configurable premium features",
                  "5% store discount",
                  "Pricing, percentage discount and features can be manage from admin",
                ]}
                price={19}
                period="mon"
                click={() => {}}
              />
            </div>
            <div className={styles.data__card}>
              <MembershipCardComponent
                title="Standard"
                detailList={[
                  "User can also sign up free without using any credit card",
                  "Basic Support",
                  "Configurable premium features",
                  "5% store discount",
                  "Pricing, percentage discount and features can be manage from admin",
                ]}
                price={5}
                period="mon"
                click={() => {}}
              />
            </div>
          </div>
        </div>

        <br />
        <div className={styles.theme__box}>
          <h3>BANNERS</h3>
          <div className={styles.banners}>
            <HomebannerComponent />
          </div>
        </div>

        <br />
        <div className={styles.theme__box}>
          <h3>RANGE</h3>
          <div className={styles.banners}>
            <ScaleComponent
              value={state.age}
              setValue={update}
              fieldName="age"
              longLineDivider={10}
              shortLineDivider={2}
              max={"100"}
              min={"0"}
            />
          </div>
        </div>

        <br />
        <div className={styles.theme__box}>
          <h3>OTHER CARD</h3>
          <div className={styles.cardsfive}>
            <div className={styles.card__five}>
              <SmallcardComponent
                text={undefined}
                fnc={undefined}
                img={undefined}
                recipe={undefined}
                findCompareRecipe={undefined}
                fucUnCheck={undefined}
                compareLength={undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </AContainer>
  );
}
