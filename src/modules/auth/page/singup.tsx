import { SignupForm } from "../ui/components/signup-form"

function SignupPage() {
  return (
    <section className="w-screen h-screen flex container">
      <div className="w-[70%] h-full hidden lg:block">
        <img className="w-full h-full object-cove7" alt="Login Image" src="./login_image.jpg"/>
      </div>
      <div className="flex-1 p-10">
        <SignupForm/>
      </div>
    </section>
  )
}

export default SignupPage