import React from 'react';
import {Form, Button} from 'react-bootstrap';


export default function Login(props) {

    const [pass, setPass] = React.useState("")

    const setPassword = (e) => {
        e.preventDefault();
        setPass(e.target.value);
    }

    const setLoginTrue = () => {
        pass === 'blockchain' && props.login(true)
    }

    return (
      <div className={'login'}>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e)}
            />
          </Form.Group>
          <Button variant="primary" onClick={setLoginTrue}>
            Login
          </Button>
      </div>
    );
}