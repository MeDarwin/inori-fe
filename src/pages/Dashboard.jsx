import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Title from "../components/Title";
import { useGetVisitLogQuery } from "../reducer/services/visitApi";

const Home = () => {
  const { toPDF, targetRef } = usePDF();
  const user = useSelector((state) => state.auth.user);
  const { data: visitData, isLoading } = useGetVisitLogQuery();

  if (user?.role === "member") return <Navigate to="/" />;

  if (isLoading)
    return (
      <div className="container mx-auto bg-[#fcf7f4] pb-20">
        <Loading>Loading data...</Loading>;
      </div>
    );
  const data = {
    labels: Object.keys(visitData),
    datasets: [
      {
        label: "# of Visits",
        data: Object.values(visitData),
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="min-w-screen bg-cover h-64 bg-repeat-x bg-auto border-b-8 border-red-800 mb-4"></div>
      <div className="container mx-auto bg-[#fcf7f4] pb-20">
        <div className="flex border-b-2 border-red-800 gap-4 justify-center items-center pb-3">
          <p className="text-red-800">Manage - </p>
          <Link
            to="/magazine"
            className="rounded hover:cursor-pointer bg-red-800 text-white text-sm px-4 py-1 font-bold hover:bg-red-900"
          >
            Magazine
          </Link>
          <Link
            to="/category"
            className="rounded hover:cursor-pointer bg-red-800 text-white text-sm px-4 py-1 font-bold hover:bg-red-900"
          >
            Category
          </Link>
        </div>
        <div className="flex flex-col" ref={targetRef}>
          <Title>
            <h1 className="text-red-800 sm:text-4xl">Statistic</h1>
          </Title>
          <Bar data={data} options={{}} id="myChart" />
        </div>
        <Button onClick={() => toPDF()}>Download PDF</Button>
      </div>
    </>
  );
};

export default Home;
