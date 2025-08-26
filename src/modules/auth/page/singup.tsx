import { SignupForm } from "../ui/components/signup-form"

function SignupPage() {
  return (
    <section className="w-screen h-screen flex">
      <div className="w-[60%] h-full hidden lg:block">
        <img className="w-full h-full object-cover" alt="Login Image" src="./login_image.jpg"/>
      </div>
      <div className="flex-1">
        <SignupForm/>
      </div>
    </section>
  )
}

export default SignupPage