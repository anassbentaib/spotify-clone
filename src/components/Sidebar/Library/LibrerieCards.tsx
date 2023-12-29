import Card from "../../ui/Card";

const LibrerieCards = () => {
  return (
    <div>
      <Card
        title="Create your first playlist"
        subTitle="it's easy we'll help you"
        label="Create playlist"
        onClick={() => window.location.assign("/login")}
      />
      <Card
        title="Let's find some podcasts to follow"
        subTitle="we'll keep you updated on new episodes"
        label="Browse Podcasts"
        onClick={() => window.location.assign("/login")}
      />
    </div>
  );
};

export default LibrerieCards;
