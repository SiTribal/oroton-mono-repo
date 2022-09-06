import * as components from '../components'
const {Menu, Form} = components

 const Login: React.FC = () => {
  return (
    <div>
        <Menu>
            <Form register={false}/>
        </Menu>
    </div>
  )
}


export default Login
