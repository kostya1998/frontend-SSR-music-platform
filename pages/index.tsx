import Layout from "../components/Layout";


const Index = () => {

  return (
    <>
      <Layout>
        <div className="center">
          <h1>Добро Пожаловать</h1>
          <h3>Сдесь собраны лутшие треки!</h3>
        </div>
      </Layout>

      <style jsx>
        {`
          .center {
            color: white;
            margin-top: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
};
export default Index;
