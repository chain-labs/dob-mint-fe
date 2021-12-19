import { Navbar, Container } from "react-bootstrap";
import "../style/style.scss"

const Nav = ({connectedAddress, network}) => {
  return (
    // <Navbar variant="dark">
    //   <Container>
    //     <Navbar.Brand href="https://daughtersofblockchain.com">Daughters of Blockchain</Navbar.Brand>
    //     <Navbar.Toggle />
    //     <Navbar.Collapse className="justify-content-end">
    //       <Navbar.Text>
    //         {network} : {connectedAddress}
    //       </Navbar.Text>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>  
    <div className="navBox pt-3 pb-3" style={{borderBottom:"1px solid #eaeaea",}}>
      <div>
        Daughters of Blockchain
      </div>
      <div>
        <a className="navLink m-3">HOME</a>
        <a className="navLink m-3">SWAG SHOP</a>
        <a className="navLink m-3">LICENSE</a>
        <a className="navLink m-3">PRESS KIT</a>

      </div>
    </div>
  );
};

export default Nav;
