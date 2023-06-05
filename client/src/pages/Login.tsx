import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Login() {
  const [form, setForm] = useState({
    email: "aaron@kenny.com",
    name: "aaron",
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth.getUser());
    if (auth.getUser()) {
      navigate("/");
    }
  }, []);

  const handleClick = async (e: any) => {
    e.preventDefault();

    if (form.email && form.name) {
      await auth.login(form);
      toast.success("Login successful");
      setErrorMessage(false);
      location.reload();
    }
  };
  return (
    <div className="flex items-center justify-center w-full p-4 bg-white">
      <div className="flex-col items-center w-full max-w-screen-md p-3 pt-5 m-4 mx-auto my-10 mt-20 bg-white border-2 shadow-md md:w-6/12">
        <p className="inline-flex w-full text-lg ">Log into your account.</p>
        <form className="flex flex-col items-start w-full mt-2 space-y-5">
          <div className="w-full">
            <label className="block w-full" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded outline-2"
              onChange={(e) =>
                setForm((prev) => {
                  return { ...prev, email: e.target.value.trim() };
                })
              }
              value={form.email}
              id="Email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="w-full">
            <label className="block w-full" htmlFor="name">
              name
            </label>
            <input
              className="w-full p-2 border rounded outline-2 "
              onChange={(e) =>
                setForm((prev) => {
                  return { ...prev, name: e.target.value.trim() };
                })
              }
              type="text"
              minLength={8}
              value={form.name}
              id="Name"
              placeholder="Name"
              name="name"
            />
          </div>

          {/* <FormControl isInvalid={errorMessage}>
            <FormErrorMessage color={"red"}>{errorMessage}</FormErrorMessage>
          </FormControl> */}
          <button
            onClick={handleClick}
            className="px-4 py-2 text-white bg-blue-700 border rounded"
            disabled={(!form.email && true) || (!form.name && true)}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
