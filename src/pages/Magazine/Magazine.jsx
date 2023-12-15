import { useState } from "react";
import FloatingActionButton from "../../components/FAB";
import MagazineAddForm from "../../components/magazine/AddForm";

const Magazine = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FloatingActionButton setIsOpen={setIsOpen} />
      <MagazineAddForm isOpen={isOpen} setIsOpen={setIsOpen}/>
      <div className="container mx-auto pt-20">Magazine</div>
    </>
  );
};

export default Magazine;
