import { LoginForm } from "../ui/components/form"

function LoginPage() {
  return (
    <section className="w-screen h-screen  flex">
      <div className="w-[70%] h-full">
        <img className="w-full h-full object-cove7" alt="Login Image" src="./login_image.jpg"/>
      </div>
      <div className="flex-1 p-10">
        <LoginForm/>
      </div>
    </section>
  )
}

export default LoginPage