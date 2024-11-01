import './App.css';
import Card from './components/Card';

function App() {
  return (
    <>
      <h1 className="bg-green-400 text-white text-2xl p-4 rounded-2xl mb-6">Tailwind Test</h1>
      <div className="flex flex-wrap justify-center gap-4">
        <Card
          username="FlameNft"
          btnText="ClickMe"
          imgSrc="https://media4.giphy.com/media/1gbqIc1fK8QgR3bHL7/giphy.gif?cid=790b7611a2f696d51a46ce892e420e77735707466a4abd3b&rid=giphy.gif&ct=g"
          price="5 BTC"
        />
        <Card
          username="US Liberty Nft"
          btnText="Purchase"
          imgSrc="https://res.cloudinary.com/ddcg0rzlo/image/upload/v1652470298/9StaF0UBJfih_df0248.gif"
          price="3 BTC"
        />
        <Card
          username="Laser Eye Nft"
          imgSrc="https://media1.giphy.com/media/z8n8dWgQ0mgEIyzlmV/giphy.gif?cid=790b7611a5ba988db1bc7457636dd163c28af6f6dbc84a77&rid=giphy.gif&ct=g"
          price="2 BTC"
        />
        <Card
          username="Laser Eye Nft"
          imgSrc="https://media1.giphy.com/media/z8n8dWgQ0mgEIyzlmV/giphy.gif?cid=790b7611a5ba988db1bc7457636dd163c28af6f6dbc84a77&rid=giphy.gif&ct=g"
          price="2 BTC"
        />
      </div>
    </>
  );
}

export default App;
