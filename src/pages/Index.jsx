import Title from "../components/Title";

const Index = () => {
  return (
    <>
      <div className="min-w-screen bg-cover h-64 bg-repeat-x bg-auto border-b-8 border-red-800"></div>
      <div className="container mx-auto bg-[#fcf7f4]">
        <div className="flex flex-col">
          <Title>
            <h1 className="text-red-800 sm:text-4xl">Magazine</h1>
          </Title>
          <div className="">MAGAZINE COMPONENT</div>
        </div>
      </div>
    </>
  );
};

export default Index;
