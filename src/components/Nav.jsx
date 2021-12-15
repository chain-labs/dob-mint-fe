import { Navbar, Container } from "react-bootstrap";

const Nav = ({connectedAddress, network}) => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="https://daughtersofblockchain.com">Daughters of Blockchain</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {network} : {connectedAddress}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nav;
