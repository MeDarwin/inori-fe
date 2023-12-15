import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import Title from "../components/Title";

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
    },
  ],
};
const Home = () => {
  return (
    <>
      <div className="min-w-screen bg-cover h-64 bg-repeat-x bg-auto border-b-8 border-red-800 mb-4"></div>
      <div className="container mx-auto">
        <div className="flex border-b-2 border-red-800 gap-4 justify-center items-center pb-3">
          <p className="text-red-800">Manage - </p>
          <Link
            to="/magazine"
            className="rounded hover:cursor-pointer bg-red-800 text-white text-sm px-4 py-1 font-bold hover:bg-red-900"
          >
            Magazine
          </Link>
          <Link
            to=""
            className="rounded hover:cursor-pointer bg-red-800 text-white text-sm px-4 py-1 font-bold hover:bg-red-900"
          >
            Category
          </Link>
          <Link
            to=""
            className="rounded hover:cursor-pointer bg-red-800 text-white text-sm px-4 py-1 font-bold hover:bg-red-900"
          >
            Division
          </Link>
          <Link
            to=""
            className="rounded hover:cursor-pointer bg-red-800 text-white text-sm px-4 py-1 font-bold hover:bg-red-900"
          >
            User
          </Link>
        </div>
        <div className="flex flex-col">
          <Title>
            <h1 className="text-red-800 sm:text-4xl">Statistic</h1>
          </Title>
          <Bar data={data} options={{}} id="myChart" />
        </div>
      </div>
    </>
  );
};

export default Home;
