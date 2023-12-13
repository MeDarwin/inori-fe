import Title from "../components/Title";

const Credits = () => {
  return (
    <div className="container mx-auto">
      <Title>
        All used assets from{" "}
        <a className="text-blue-600" href="https://www.freepik.com">
          Freepik
        </a>
        ,
      </Title>
      <ul>
        <li>
          <a
            className="text-blue-600"
            target="_blank"
            href="https://www.freepik.com/free-vector/hand-drawn-oriental-cloud-pattern-illustration_93571355.htm#from_view=detail_serie"
            rel="noreferrer"
          >
            Image by callmetak
          </a>{" "}
          on Freepik
        </li>
      </ul>
    </div>
  );
};

export default Credits;
