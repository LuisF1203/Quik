import { Layout } from "../components";

function Register() {

    const handleSubmit=(event)=>{
        event.preventDefault()
        const username=event.target.username.value;
        const password=event.target.password.value;
        const confirmPassword=event.target.confirmPassword.value;
        if(password===confirmPassword){
            console.log("passwords match");
        }
        else{
            alert("passwords do not match");
        }
    }


  return (
    <div className="bg-black w-full h-[100vh] text-white flex justify-center items-center">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col pt-2 p-20 gap-6">
          <input
            required
            id="username"
            type="text"
            className="rounded outline-none p-2 bg-transparent text-center text-white"
            placeholder="Username"
          />

          <label
            htmlFor="profPic"
            className="w-32 h-32 rounded-full overflow-hidden mx-auto flex items-center justify-center cursor-pointer"
          >
            <img
              src="https://media.kasperskydaily.com/wp-content/uploads/sites/87/2021/09/23141434/nft-2.jpg"
              alt=""
              className="w-full h-full object-cover blur-[1px] hover:blur-0 hover:scale-125 transition"
            />
          </label>

          <input type="file" name="" id="profPic" className="hidden" />

          <input
            required
            id="password"
            type="password"
            className="rounded outline-none text-black p-2"
            placeholder="Password"
          />
          <input
            required
            id="confirmPassword"
            type="password"
            className="rounded outline-none text-black p-2"
            placeholder="Confirm Password"
          />
          <button
            type="submit"
            class="bg-blue-500 rounded p-2 hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
