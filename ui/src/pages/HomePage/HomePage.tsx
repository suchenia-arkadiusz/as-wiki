import Card from "../../components/Card/Card.tsx";
import SignInOrSignUp from "../../components/SignInOrSignUp/SignInOrSignUp.tsx";

const HomePage = () => {
  return (
    <Card isCenter style={{ boxShadow: "0 0 20px #d9d9d9", width: "800px" }}>
      <SignInOrSignUp />
    </Card>
  );
};

export default HomePage;
