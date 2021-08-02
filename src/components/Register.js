import { motion } from "framer-motion";
import NavBar from "./NavBar";

const Register = ({ fadeVariants }) => {
  return (
    <>
      <NavBar />
      <motion.div {...fadeVariants}
        className="max-w-md font-body mx-4 sm:mx-auto border-2 border-gray-300 rounded-md p-12 my-12">
        <form className="flex flex-col">
          <label>Email</label>
          <input type="email" className="rounded-md outline-none border-2 border-red-300" />
          <label>Password</label>
          <input type="password" className="rounded-md outline-none border-2 border-red-300" />
        </form>
      </motion.div>
    </>
  );
}

export default Register;